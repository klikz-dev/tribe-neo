#! /usr/bin/env bash

DIR=$(pwd)
SCRIPTS="$DIR/scripts"

deps=($(node $SCRIPTS/get-dependencies.js $1))
for dep in "${deps[@]}"; do
  d=${dep#"@tribeplatform/"}
  changed_env_name=$(echo "${d//[ -]/_}_CHANGED" | tr '[:lower:]' '[:upper:]')
  if [[ ${!changed_env_name} ]]; then
    echo -e "$dep has changed. $1 package should be rebuilt."
    exit 0
  fi
done
exit 1
