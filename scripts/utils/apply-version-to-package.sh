#! /bin/bash

DIR=$(pwd)
SCRIPTS="$DIR/scripts"
UTILS="$SCRIPTS/utils"

source $SCRIPTS/helpers.sh

# $1 package name
# $2 version: is applied to package.json
# $3 tag: used to generate URL

package_name=$(echo "${1// /-}" | tr '[:upper:]' '[:lower:]')
version=$2
tag=$3

package_path="$DIR/packages/$package_name"
manifest_path="$package_path/package.json"
changelog_path="$package_path/CHANGELOG.md"

escaped_version=$(escape_version $version)
escaped_tag=$(escape_version $tag)

version_date=$(date +%F)

perl -i -pe 's/"version"\: ".*"/"version"\: "'"$escaped_version"'"/g' $manifest_path

git add $manifest_path

perl -i -pe 's/## Unreleased/## Unreleased\n\n## \['"$escaped_version"'\]($ENV{CI_PROJECT_URL}\/tags\/'"$escaped_tag"') <sub>\/ '"$version_date"'<\/sub>/g' $changelog_path

platform="$(uname -s)"
case "${platform}" in
  Darwin*)    sed -i '' '/^$/N;/^\n$/D' $changelog_path;;
  *)          sed -i '/^$/N;/^\n$/D' $changelog_path;;
esac

git add $changelog_path
git commit -q -m "$package_name -> $version"

exit 0
