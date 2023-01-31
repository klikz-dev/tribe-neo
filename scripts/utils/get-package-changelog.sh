#! /bin/bash

DIR=$(pwd)
SCRIPTS="$DIR/scripts"
UTILS="$SCRIPTS/utils"

source $UTILS/colors.sh
source $SCRIPTS/helpers.sh


declare is_compact=false
declare last_release=false
declare product=""
declare log=""

for arg in "$@"; do
  shift
  case "$arg" in
    '--compact')  set -- "$@" "-c" ;;
    '--release')  set -- "$@" "-r" ;;
    '--product')  set -- "$@" "-p" ;;
    *)            set -- "$@" "$arg"
  esac
done


while getopts 'crp:' flag; do
  case "${flag}" in
    c) is_compact=true ;;
    r) last_release=true ;;
    p) product="${OPTARG}" ;;
    *) exit 1 ;;
  esac
done

if [[ -z "$product" ]]; then
  printf "${red}${bold} ERR: product name is required to extract changelog${normal}"
  exit 1
fi

package_name=$(echo "${product// /-}" | tr '[:upper:]' '[:lower:]')

declare name=""
declare package_path="packages/$package_name"

while IFS= read -r line; do
  stored_path=$(echo "$line" | cut -d ',' -f 2)
  if [[ $package_path == $stored_path ]]; then
    name=$(echo "$line" | cut -d ',' -f 1 )
    break
  fi
done < "$DIR/packages.list"

if [[ -z $name ]]; then
  printf "${red}${bold} ERR: package $product is not listed as a valid package${normal}"
  exit 1
fi

changelog_path="$package_path/CHANGELOG.md"
# 1. Read the unreleased section of each changelog
# 2. Remove the first line with conatins [Unreleased] header
# 3. Remove any terminating patterns that may appear in the result
# 4. Remove empty lines
if $last_release; then
  # This will log the last released version instead of unreleased
  line_numbers=($(awk '/^## \[/ && NR>=1 && NR<=100 {print NR;}' $changelog_path))

  from=${line_numbers[0]}
  from=$(($from+1))

  to=${line_numbers[1]}
  if [[ -z "$to" ]]; then
    to=$(wc -l $changelog_path | awk '{ print $1 }')
  else
    to=$(($to-1))
  fi

  log=$(sed -n "${from},${to}p" $changelog_path )
else
  log=$(sed -n '/^## Unreleased/,${p;/^## \[/q;}' $changelog_path | sed 1d | sed '/^## \[/d' | sed '/^$/d' )
fi

if $is_compact; then
  log=$(echo -e "$log" | sed '/^$/d')
fi

if [[ -n $log ]]; then
  echo -e "$log"
fi
