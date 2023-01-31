#! /usr/bin/env bash

DIR=$(pwd)
SCRIPTS="$DIR/scripts"
UTILS="$SCRIPTS/utils"

source $UTILS/colors.sh
source $UTILS/gitlab.sh
source $SCRIPTS/helpers.sh


function commit_local () {
  # Not in CI
  local -r -i dirty=$(git status --porcelain | grep -x -c '')
  if [[ $dirty -gt 0 ]]; then
    printf "\n${red}${bold} ERR: repository has uncommited changes\n\n"
    return 1
  fi
  git push -q
  if (( $? != 0 )); then
    printf "\n${red}${bold} ERR: unable to push to remote\n\n"
  fi

  # Informative section for when version is committed outside CI environment
  printf "\n"
  printf "${bold} ╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍${normal}\n"
  printf "${cyan}${bold}"
  printf " IMPORTANT NOTE\n\n"
  printf " \n"
  printf " Since you want to commit this release outside a CI environment,\n"
  printf " this script won't do anything, except for facilitating the interactions\n"
  printf " with Gitlab APIs to emulate the pipeline in your stead.\n"
  printf " \n"
  printf " If the script is interrupted, re-issue the command or continue the\n"
  printf " pipeline via Gitlab interface.\n"
  printf "${normal}"
  printf "${bold} ╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍${normal}\n\n"

  local commit_hash
  if [[ $branch_type == "hotfix" ]]; then
    commit_hash=$(git rev-parse --verify HEAD)
  else
    # For normal releases, we want the pipeline for previous commit
    commit_hash=$(git rev-parse --verify HEAD~1)
  fi
  local commit_message=$(git log --format=%B -n 1 $commit_hash)
  local pipeline_url=$(get_pipeline_for_commit $commit_hash)

  printf "${bold} ➞ Getting pipeline info for following commit...${normal}\n\n"
  printf "${bold}   Message: ${standout} $commit_message ${normal}\n"
  printf "${bold}       SHA: ${standout} $commit_hash ${normal}\n\n"

  retry=0
  while [[ -z "$pipeline_url" ]] && [[ $retry -lt 10 ]]; do
    printf "${yellow}${bold} Pipeline is not ready yet. Retrying...${normal}\n\n"
    sleep 5
    pipeline_url=$(get_pipeline_for_commit $commit_hash)
    retry=$(($retry+1))
  done

  if [[ -z "$pipeline_url" ]]; then
    printf "\n${yellow}${bold} [WARN] Was not able to retrive pipeline info."
    printf "\n${yellow}${bold}        This may be caused by various reasons."
    printf "\n${yellow}${bold}        You need to ${underline}promote${nounderline} this build manually.${norma}\n\n"
    return 0
  fi

  printf "${bold} ➞ Pipeline URL: ${green}$pipeline_url${normal}\n"

  local -r pipeline_id=$(echo "$pipeline_url" | rev | cut -d '/' -f 1 | rev)

  if [[ $branch_type == "hotfix" ]]; then
    if ! wait_on_job $pipeline_id "hotfix"; then
      printf "\n${red}${bold} [ERRO] hotfix job was unsuccessful\n\n${normal}"
      return 1
    fi
  fi
  if ! wait_on_job $pipeline_id "${branch_product}:promote"; then
    printf "\n${red}${bold} [ERRO] promot job unsuccessful\n\n${normal}"
    return 1
  fi
  printf "\n${green}${bold} ✔︎ All Done${normal}\n"
  git checkout -q $CI_DEFAULT_BRANCH
}


function init_hotfix () {

  local -r project_url=$(get_project_url)
  # Prompt the apps list and ask developer to choose one
  local -a apps
  while IFS= read -r entry; do
    app=$(echo "$entry" | cut -d ',' -f 1)
    path=$(echo "$entry" | cut -d ',' -f 2)
    apps+=("$app")
    if [[ $path == "packages/$product" ]]; then
      selected_app="$app"
      break
    fi
  done < "packages.list"

  if  [[ -z "$selected_app" ]]; then
    printf "\n${magenta}${bold} Choose the application you want to hotfix:${normal}\n"
    select_option "${apps[@]}"
    choice=$?

    if [[ -z $choice ]]; then
      echo "${red} ERR: You need to specify an app!"
      return 1
    fi

    selected_app="${apps[$choice]}"
  fi

  echo -e "${bold} ➞ Preparing a hotfix for ${magenta}$selected_app${normal}...\n"

  tag_prefix=$(echo "${selected_app// /-}" | tr '[:upper:]' '[:lower:]')
  version_url_env_name=$(echo "${selected_app//[ -]/_}_VERSION_ENDPOINT" | tr '[:lower:]' '[:upper:]')
  url=${!version_url_env_name}

  if [[ -z $url ]]; then
    printf "${yellow} WARN: No version endpoint is set for $selected_app.\n"
    printf "${yellow}       Unable to determine deployed versions.${normal}\n"
  else
    get_prod_version $url
    get_canary_version $url

    printf "${bold}  Production Version: "
    if [[ $? != 0 || -z $prod_version ]]; then
      printf "${red}Unable to determine!${normal}"
    else
      v=$(get_numeric_version $prod_version)
      b=$(get_build_number $prod_version)
      printf "${green}$v${normal}"
      if [[ -n "$b" ]];then
        printf " ${green}(build: $b)${normal}"
      fi
    fi

    printf "\n${bold}      Canary Version: "
    if [[ $? != 0 || -z $canary_version ]]; then
      printf "${red}Unable to determine!${normal}"
    else
      v=$(get_numeric_version $canary_version)
      b=$(get_build_number $canary_version)
      printf "${green}$v${normal}"
      if [[ -n "$b" ]];then
        printf " ${green}(build: $b)${normal}"
      fi
    fi
    printf "\n"
  fi

  # 1. Fetch and display all tags (Annotate the live and canary versions)
  #    and ask developers to select the version they want to fix
  git fetch -q --all --tags

  local -r -a latest_tags=($(git tag -l "$tag_prefix-*" --sort=-creatordate | head -n 10))

  printf "\n\n"
  printf "${bold} These are the latest versions for ${blue}${selected_app}${normal}${bold}.${normal}\n\n"
  printf "${magenta}${bold} Which version you want to fix?${normal}\n\n"
  local -a tag_options

  for tag_index in "${!latest_tags[@]}"
  do
    label=$(get_numeric_version ${latest_tags[$tag_index]})
    b=$(get_build_number ${latest_tags[$tag_index]})
    if [[ -n $b ]]; then
      label="$label-$b"
    fi
    if [[ ${latest_tags[$tag_index]} == $prod_version ]]; then
      label="${label} (🐓)"
    fi
    if [[ ${latest_tags[$tag_index]} == $canary_version ]]; then
      label="${label} (🐥)"
    fi
    tag_options+=($label)
  done

  tag_options+=("Other")

  select_option "${tag_options[@]}"
  choice=$?

  local base_tag="${latest_tags[$choice]}"

  if [[ -z "$base_tag" ]]; then
    # 1.a. Selected "Other" option
    printf " ${bold}Give me the version you want to fix.${normal}\n"
    printf " ${bold}Keep in mind that you only need to provide the numeric part (x.y.z).${normal}\n"
    printf " ${bold}I'll find the proper that tag belongs to ${blue}${selected_app}${normal}${bold}.\n\n"
    read -r -p "  ${bold}${magenta}Version: " response
    printf "${normal}\n"

    t="$tag_prefix-$response"
    if tag_exists $t; then
      base_tag=$t
    else
      printf "${red}${bold} ERR: Tag $t does not exits.\n\n"
      return 1
    fi
  fi

  printf "${bold} ➞ Calculating patch version for ${magenta}$base_tag${normal}...\n"

  # 3. Create the release branch: release/x.y.(z+1)
  local next_tag=""

  local base_version=$(get_numeric_version "$base_tag")
  local next_version="$($UTILS/bump-version.sh "$base_version" patch)"
  while true; do
    next_tag="$tag_prefix-$next_version"
    if tag_exists "$next_tag"; then
      printf "${yellow}{$bold} [WARN] $next_tag already exists.\n"
      next_version=$($UTILS/bump-version.sh $next_version patch)
    else
      printf "${bold} ➞ Using ${blue}$next_version${normal}${bold} as the next version.\n"
      break
    fi
  done

  local -r hotfix_branch="hotfix/$tag_prefix/$next_version"

  printf "${bold} ➞ Preparing hotifx branch ${blue}$hotfix_branch${normal}${bold}..."

  if git checkout -q tags/$base_tag -b $hotfix_branch; then
    printf "${green}${bold} ✔︎ Ok${normal}\n"
  else
    echo "\n\n ${red}{$bold}ERR: Unable to create $hotfix_branch branch${normal}\n"
    return 1
  fi


  printf "${bold} ➞ Pushing ${blue}$hotfix_branch${normal}${bold} to remote..."
  if git push -q --set-upstream origin $hotfix_branch; then
    printf "${green}${bold} ✔︎ Ok${normal}\n"
  else
    printf "${red}${bold} ERR: Unable to push changes to remote!"
    printf "${red}${bold}      Try again when the issue is resolved:\n"
    printf "${red}${bold}          git push --set-upstream origin $hotfix_branch\n\n"
    return 1
  fi

  # 6. Prompt developer about the next steps
  compare_url="$project_url/-/compare/$base_tag...$hotfix_branch"
  printf "${bold} \n╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍\n\n"
  printf "${bold} Hotfix branch has been prepared. Now you should:\n"
  printf "${bold}   1) Fix the issue, commit, and push the changes.\n"
  printf "${bold}   2) Review the changes to make sure everything is in order:\n"
  printf "${bold}          ${magenta}$compare_url${normal}\n"
  printf "${bold}   3) Update the package changelog.\n"
  printf "${bold}   4) Once you've confirmed the fix, resume the pipeline!\n"

  return 0
}
