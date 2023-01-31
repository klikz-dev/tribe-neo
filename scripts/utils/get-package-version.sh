#! /bin/bash

DIR=$(pwd)
SCRIPTS="$DIR/scripts"
UTILS="$SCRIPTS/utils"

# $1 package
package=$1

package_json="$DIR/packages/$package/package.json"
current_version=$(cat $package_json | jq -r '.version')

echo $current_version
