#! /usr/bin/env bash

# Normal flow:
#
#         ------------------ < -------------------------
#       /                                                \ (merge request)
#      /                                                  \
#   master --- :prepare ---> release/product/x.y.z --- :commit ---> tags/product-x.y.z
#
# Hotfix flow:
#
#                                                                       ----> master
#                                                    (merge request)  /
#                                                                    /
#   tags/x.y.z --- :prepare ---> release/product/x.y.(z+1) ---- :commit ------> tags/product-x.y.(z+1)-hotfix
#

# Usage:
#   Regular release:
#     1. ./release.sh
#     2. ./release.sh --commit
#   Hotfix:
#     1. ./release.sh --hotfix [--version version-to-be-fixed]
#     2. ./release.sh --commit

# Load local configs.
# Following variables can only be read from .versionrc or global environment:
#  - $GITLAB_API_TOKEN
#  - $LINK_OPENER
#  - $CI_PROJECT_ID
#  - $CI_PROJECT_URL
#  - $CI_DEFAULT_BRANCH
#  - $WEB_VERSION_ENDPOINT
#  - $APP_CANARY_HEADER

DIR=$(pwd)
RELEASERC="$DIR/.releaserc"
SCRIPTS="$DIR/scripts"
UTILS="$SCRIPTS/utils"

if [[ -f "$RELEASERC" ]]; then
  source $RELEASERC
fi

GITLAB_API_BASE="$CI_API_V4_URL/projects"

source $UTILS/colors.sh
source $UTILS/gitlab.sh

if [[ -z $CI ]]; then
  source $UTILS/select.sh
fi

###
#
# Versioning procedure begins here...
#
##
for arg in "$@"; do
  shift
  case "$arg" in
    '--fix' | '--hotfix') set -- "$@" "-f" ;;
    '--commit')           set -- "$@" "-c" ;;
    '--product')          set -- "$@" "-p" ;;
    '--version')          set -- "$@" "-v" ;;
    *)                    set -- "$@" "$arg"
  esac
done

declare project_url
declare prod_version
declare canary_version
declare current_version

declare is_committing=false
declare is_hotfix=false
declare product=''
declare version_arg='minor'
while getopts 'fcp:v:' flag; do
  case "${flag}" in
    f) is_hotfix=true ;;
    c) is_committing=true ;;
    p) product="${OPTARG}" ;;
    v) version_arg="${OPTARG}" ;;
    *) exit 1 ;;
  esac
done

if [[ $is_committing == true ]] && [[ $is_hotfix == true ]]; then
  printf "${yellow} WARN: Ignoring hotifx flag: Hotfix flag can only be used when preparing a version initially.${normal}"
  is_hotfix=false
fi

readonly is_committing
readonly is_hotfix

if (( $? != 0 )); then
  echo "${red} ERR: Unable to fetch project info!"
  exit 1
fi

###
# Release functions
###
if [[ -n $CI ]]; then
  source $SCRIPTS/ci-release.sh
else
  source $SCRIPTS/local-release.sh
fi

function init_release () {
  local package_path
  if [[ -z $product ]]; then
    if [[ -n $CI ]]; then
      printf "${red}${bold} ERR: product is not specified!${normal}\n\n"
      return 1
    else
      source $UTILS/select.sh
      tput clear
      tput cup 0 0
      tput ri
      # Prompts the apps list and ask developer to choose one
      local -a packages
      local -a package_paths
      while IFS= read -r entry; do
        n=$(echo "$entry" | cut -d ',' -f 1)
        p=$(echo "$entry" | cut -d ',' -f 2)
        packages+=("$n")
        package_paths+=("$p")
      done < "packages.list"

      printf "\n${magenta}${bold}Choose the package you want to release:${normal}\n\n"
      select_option "${packages[@]}"
      choice=$?
      if [[ -z $choice ]]; then
        echo "${red} ERR: You need to specify an app!"
        return 1
      fi
      package_name="${packages[$choice]}"
      package_path="${package_paths[$choice]}"
      product=$(echo "${package_name// /-}" | tr '[:upper:]' '[:lower:]')
    fi
  else
    package_path="packages/$product"
    if [[ ! -d $package_path ]]; then
      printf "${red}${bold} ERR: invalid product. ${package_path} does not exist.${normal}\n\n"
      return 1
    fi
  fi

  printf "${bold} ➞ Preparing a new version for ${magenta}$product${normal}...\n"

  # 1. Detect bump level
  local -r changes=$($UTILS/get-package-changelog.sh -p "$product")
  bump_level=$($UTILS/detect-bump-level.sh "$changes")

  # 2. Bump the version based on bump level
  current_version=$($UTILS/get-package-version.sh $product)

  next_version=$($UTILS/bump-version.sh $current_version $bump_level)
  printf "${bold} ╭─────────────────────────────────────${normal}\n"
  printf "${bold} ├─ Current version:  ${green}$current_version${normal}\n"
  printf "${bold} ├──── Next version:  ${blue}$next_version${normal}\n"
  printf "${bold} ╰─────────────────────────────────────${normal}\n"

  # 3. Prompt unreleased changes
  printf "${bold}   Changes in this version: ${normal}\n\n"
  if [[ -z "$changes" ]]; then
    printf "${yellow}${bold}   Changelog is empty! 🥴\n\n"
  else
    echo -e "${cyan}$changes${normal}"
  fi
  printf "${normal}\n"

  # 4. Create the release branch for the new version
  local -r release_branch="release/$product/$next_version"
  printf "\n${bold} ➞ Checking out to ${magenta}$release_branch${normal}..."

  if git checkout -q -b $release_branch; then
     printf "${green}${bold} ✔︎ Ok${normal}\n"
  else
    # Branch may already exist!
    if git checkout $release_branch; then
      printf "${green}${bold} ✔︎ Ok${normal}\n"
    else
      printf "\n\n"
      printf "${red}{$bold} ERR: Unable to prepare the new version!${normal}\n\n"
      return 1
    fi
  fi

  printf "\n${bold} ➞ Pushing release branch ${magenta}$release_branch${normal} to remote..."
  if git push -f -q --set-upstream origin $release_branch; then
    printf "${green}${bold} ✔︎ Ok${normal}\n"
  else
    printf "\n\n${red}${bold}"
    printf " ERR: Unable to push changes to remote!"
    return 1
  fi
  return 0
}


if [[ $is_committing == false ]]; then
  ###
  # Preparing a new version...
  ###
  if [[ $is_hotfix == false ]]; then
    # This block should be executed in CI
    if [[ -z $CI ]]; then
      printf "\n ${bold}${red} [ERR] Please promote a build via Gitlab interface\n\n"
      exit 1
    else
      init_release
    fi

  else
    # HOTFIX!
    # This block is executed on developer's local machine
    if [[ -z $CI ]]; then
      tput clear
      tput cup 0 0
      tput ri
      init_hotfix
    else
      printf " ${bold}${red} [ERR] Hotifx branches cannot be initiated in CI"
      exit 1
    fi
  fi
  exit 0
else

  ##
  # Committing the version
  ##

  declare -r current_branch=$(git branch --show-current)

  if [[ ! $current_branch =~ ^(hotfix|release)\/[a-z-]+\/([0-9]+\.){2}[0-9]+$ ]]; then
    printf "${red}${bold} ERR: Invalid branch name: $current_branch\n"
    printf "${red}${bold}      New releases can only be created from release/product-name/x.y.z or hotfix/product-name/x.y.z branches\n\n"
    exit 1
  fi

  # 1. Extract the version in progress and try to assert the context.
  declare -r branch_type=$(echo "$current_branch" | cut -d '/' -f 1)
  declare -r branch_product=$(echo "$current_branch" | cut -d '/' -f 2)
  declare -r branch_version=$(echo "$current_branch" | cut -d '/' -f 3)

  product=$branch_product

  if [[ -z $CI ]]; then
    commit_local
    exit $?
  else
    commit_ci
    exit $?
  fi
  exit 0
fi
