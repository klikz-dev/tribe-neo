#! /bin/bash

DIR=$(pwd)
SCRIPTS="$DIR/scripts"
UTILS="$SCRIPTS/utils"

declare -r product=$1
declare -r version=$2
declare -r current_env=$3
declare -r current_job=$4
declare -r next_env=$5
declare -r next_job=$6
declare -r author=$7
declare -r pipeline_url=$8
declare -r changelog=$9

data=$(echo '{}' | jq --arg product "$product" '.product = $product')
data=$(echo -e $data | jq --arg version "$version" '.version = $version')
data=$(echo -e $data | jq --arg current_env "$current_env" '.current_env = $current_env')
data=$(echo -e $data | jq --arg current_job "$current_job" '.current_job = $current_job')
data=$(echo -e $data | jq --arg next_env "$next_env" '.next_env = $next_env')
data=$(echo -e $data | jq --arg next_job "$next_job" '.next_job = $next_job')
data=$(echo -e $data | jq --arg pipeline_url "$pipeline_url" '.pipeline_url = $pipeline_url')
data=$(echo -e $data | jq -r --arg changelog "$changelog" '.changelog = $changelog')

response=$(curl -s --location --request POST "$SLACK_BOT_URL" \
  --header 'Content-Type: application/json' \
  --header "X-Auth: $RELEASE_HOOK_SHARED_SECRET" \
  --data-raw "$data")

if (( $? != 0 )); then
  echo " [Err] Unable to post new version"
  exit 1
fi

success=$(jq -r '.success' <<< $response)

if [[ $success == 'null' ]]; then
  echo -e " [Err] Unable to post new version\n Got: $response"
  exit 1
fi

exit 0
