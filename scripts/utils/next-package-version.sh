#! /bin/bash

DIR=$(pwd)
SCRIPTS="$DIR/scripts"
UTILS="$SCRIPTS/utils"

# $1 package path

package=$(echo "${1// /-}" | tr '[:upper:]' '[:lower:]')

current_version=$($UTILS/get-package-version.sh "$package")
changelog=$($UTILS/get-package-changelog.sh -p "$package")

bump_level='patch'
if [[ -n "$changelog" ]]; then
  bump_level=$($UTILS/detect-bump-level.sh "$changelog")
fi

next_version=$($UTILS/bump-version.sh $current_version $bump_level)

echo $next_version
