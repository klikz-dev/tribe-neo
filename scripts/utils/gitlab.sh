#! /usr/bin/env bash


function get_project_url () {
  local project
  local url
  local id

  project=$(curl -s --header "PRIVATE-TOKEN: $GITLAB_API_TOKEN" "$GITLAB_API_BASE/$CI_PROJECT_ID")

  if [[ $? != 0 ]]; then
    echo $project
    return $?
  fi

  id=$(jq -r '.id' <<< $project)
  if [[ $id != $CI_PROJECT_ID ]]; then
    echo $project
    return 1
  fi

  echo "$project" | jq -r '.web_url'

}

function create_merge_request () {
  local -r source_branch=$1
  local -r target_branch=$2
  local response
  local merge_status
  local merge_request_id

  response=$(curl -s --request POST \
    --header "PRIVATE-TOKEN: $GITLAB_API_TOKEN" \
    --form "source_branch=$source_branch" \
    --form "target_branch=$target_branch" \
    --form "title=$source_branch to $target_branch" \
    --form "remove_source_branch=false" \
    "$GITLAB_API_BASE/$CI_PROJECT_ID/merge_requests")

  merge_request_id=$(echo "$response" | jq -r '.iid')
  merge_status=$(echo "$response" | jq -r '.merge_status')

  if [[ 'null' == "$merge_request_id" ]]; then
    local -r message=$(echo "$response" | jq -r '.message')
    if [[ $message == *"already exists"* ]]; then
      response=$(curl -s --header "PRIVATE-TOKEN: $GITLAB_API_TOKEN"  --request GET "$GITLAB_API_BASE/$CI_PROJECT_ID/merge_requests?state=opened&source_branch=$source_branch&target_branch=$target_branch")
      merge_request_id=$(echo "$response" | jq '.[0].iid')
      merge_status=$(echo "$response" | jq -r '.[0].merge_status')
    fi
  fi

  if [[ 'null' == "$merge_request_id" ]]; then
    printf "${red} ERR: Unable to create the merge request with $target_branch branch! Got:\n$response\n\n${normal}"
    return 1
  fi

  printf "${green}${bold} [OK] Created merge request with $target_branch.${normal}\n"
  printf "${bold}      Visit following URL to review it:${normal}\n"
  printf "${bold}      ${blue}$project_url/-/merge_requests/$merge_request_id${normal}\n"

  echo -e "Auto-merging..."

  while ! [[ $merge_status =~ ^can(not)?_be_merged$ ]]; do
    printf "${yellow} Mergeabilty has not been checked. Trying agian in a few seconds...${normal}\n"
    sleep 5
    response=$(curl -s --header "PRIVATE-TOKEN: $GITLAB_API_TOKEN"  --request GET "$GITLAB_API_BASE/$CI_PROJECT_ID/merge_requests/$merge_request_id")
    merge_status=$(echo "$response" | jq -r '.merge_status')
  done

  if [[ $merge_status == "cannot_be_merged" ]]; then
    printf "${red} ERR: Merge request cannot be accepted!${normal}\n\n "
    return 10
  else
    accept_response=$(curl -s --request PUT \
      --header "PRIVATE-TOKEN: $GITLAB_API_TOKEN" \
      "$GITLAB_API_BASE/$CI_PROJECT_ID/merge_requests/$merge_request_id/merge")

    mr_status=$(echo -e "$accept_response" | jq -r '.state')
    if [[ "merged" != "$mr_status" ]]; then
      printf "\n\n"
      printf "${yellow}${bold} WARN: Unable to auto-merge (possibly due to conflicts)!${normal}\n"
      printf "${yellow}${bold}       You should merge it manually!\n"
      printf "${yellow}${bold}       Got:\n$accept_response${normal}\n\n"
    else
      printf "\n ${green}${bold}✔︎ $source_branch has been merged into $target_branch\n"
    fi
  fi
  return 0
}

function update_release_note () {
  local -r package=$1
  local -r version=$2
  local -r build=$3

  local -r package_path="packages/$package"

  local -r name="$(cat $DIR/packages.list | grep ",$package_path," | cut -d "," -f 1) v$version"
  local -r escaped_version=$(escape_version $version)
  local -r response=$(curl -s --request POST \
    --header "PRIVATE-TOKEN: $GITLAB_API_TOKEN" \
    --form "name=$name" \
    --form "tag_name=$build" \
    --form "description=$changelog" \
    "$GITLAB_API_BASE/$CI_PROJECT_ID/releases")

  local -r tag_name=$(echo "$response" | jq -r '.tag_name')
  if [[ $tag_name != $build ]]; then
    local -r message=$(echo $response | jq -r '.message')
    if [[ $message == "Release already exists" ]]; then
      echo -e "${yellow} WARN: Release already exists! Skipping...\n"
      return 0
    fi
    echo -e "${red}${bold} ERR: Unable to update release notes. Got:${nomal}\n"
    echo -e "${yellow}$response"
    echo -e "${nomal}\n"
    return 1
  fi

  return 0
}

function get_pipeline_for_commit () {
  local -r sha=$1
  local -r response=$(curl -s --request GET \
    --header "PRIVATE-TOKEN: $GITLAB_API_TOKEN" \
    "$GITLAB_API_BASE/$CI_PROJECT_ID/pipelines?sha=${sha}")

  echo "$response" | jq -r ".[0].web_url // empty"
}


function get_job_id_for_pipeline_by_name () {
  local -r pipeline_id=$1
  local -r job_name=$2
  local -r response=$(curl -s --request GET \
    --header "PRIVATE-TOKEN: $GITLAB_API_TOKEN" \
    "$GITLAB_API_BASE/$CI_PROJECT_ID/pipelines/${pipeline_id}/jobs")

  echo "$response" | jq -r "[.[] | select (.name == \"${job_name}\") | .id][0] // empty"
}

function get_job_status () {
  local -r job_id=$1
  local -r response=$(curl -s --request GET \
    --header "PRIVATE-TOKEN: $GITLAB_API_TOKEN" \
    "$GITLAB_API_BASE/$CI_PROJECT_ID/jobs/${job_id}")

  echo "$response" | jq -r ".status // empty"
}

function play_job () {
  local -r job_id=$1
  local -r response=$(curl -s --request POST \
    --header "PRIVATE-TOKEN: $GITLAB_API_TOKEN" \
    "$GITLAB_API_BASE/$CI_PROJECT_ID/jobs/${job_id}/play")

  echo "$response" | jq -r ".status // empty"
}

function wait_on_job () {

  local -r pipeline_id=$1
  local -r job_name=$2
  local job_id=$(get_job_id_for_pipeline_by_name $pipeline_id $job_name)
  if [[ -z $job_id ]]; then
    printf "\n${bold}${red} ERR: unable to get job id for $job_name\n\n"
    return 1
  fi

  printf "\n ➞ ${bold}Waiting on job ${blue}${job_name}${normal}${bold}...\n\n"

  while true
  do
    status=$(get_job_status $job_id)
    case $status in
      manual)
        printf "   ${magenta}${bold}Triggering ${job_name}...${normal}\n"
        status=$(play_job $job_id)
        ;;
      created|pending|running|waiting_for_resource)
        printf "   ${blue}${bold}Still wating... (${status})${normal}\n"
        ;;
      success)
        printf "   ${green}${bold}✔︎ Job ${job_name} was successfull${normal}\n"
        return 0
        ;;
      failed)
        printf "   ${red}${bold}✗ Job ${job_name} failed${normal}\n"
        return 1
        ;;
      skipped)
        printf "   ${red}${bold}✗ Job ${job_name} was skipped${normal}\n"
        return 2
        ;;
      canceled)
        printf "   ${red}${bold}✗ Job ${job_name} was canceled${normal}\n"
        return 3
        ;;
      *)
        printf "   ${yello}${bold}Couldn't get status for job: ${status}\n"
        ;;
    esac
    sleep 10
  done
}
