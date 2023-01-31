#! /usr/bin/env bash

DIR=$(pwd)
SCRIPTS="$DIR/scripts"
UTILS="$SCRIPTS/utils"

source $UTILS/colors.sh
source $UTILS/gitlab.sh
source $SCRIPTS/helpers.sh

function commit_ci () {
  local semver=$branch_version
  if [[ $branch_type == 'hotfix' ]]; then
    semver="$semver-hotfix"
  fi

  local build="$branch_product-$semver"

  if tag_exists_on_remote $build; then
    printf "${yellow}${bold} WARN: Tag already exists on remote. Nothing to do here.\n\n"
    return 0
  fi

  # $stage goes from 1 to 5.
  # It helps making commit command resumable by allowing to skip
  # some of the stpes, if the context can be recovered.
  # We have to handle the stages in a while-loop due to lack of
  # support for goto and case-statement fallthrough in bash < 4.0
  local -i stage=1

  while [[ $stage -lt 6 ]]; do
    case $stage in
      1)
        printf "\n${bold} ➞ Committing $branch_version...${normal}"
        if $UTILS/apply-version-to-package.sh "$product" "$branch_version" "$build"; then
          printf "${green}${bold} ✔︎ Ok${normal}\n"
        else
          printf "\n\n${red} ERR: Unable to apply new version${normal}\n\n"
          return 1
        fi
        ;;
      2)
        printf "\n${bold} ➞ Pushing $semver branch to remote...${normal}"
        if git push -q --no-progress --set-upstream origin $current_branch; then
          printf "${green}${bold} ✔︎ Ok${normal}\n"
        else
          printf "\n\n${red} ERR: Unable to push changes to remote!${normal}\n\n"
          return 1
        fi
        ;;
      3)
        printf "\n${bold} ➞ Tagging $build...${normal}"
        if git tag -a $build -m "$build"; then
          printf "${green}${bold} ✔︎ Ok${normal}\n"
        else
          printf "\n\n${red} ERR: Unable to tag the package!${normal}\n\n"
          return 1
        fi
        ;;
      4)
        printf "\n${bold} ➞ Update release notes for $semver...${normal}"
        # Make sure the tag is pushed
        git push -q origin $build

        if update_release_note "$product" "$semver" "$build"; then
          printf "${green}${bold} ✔︎ Ok${normal}\n"
        else
          printf "\n\n${red} ERR: Unable to update release notes!${normal}\n\n"
          return 1
        fi
        ;;
      5)
        printf "\n${bold} ➞ Creating merge request from $current_branch to $CI_DEFAULT_BRANCH...${normal}"
        create_merge_request $current_branch $CI_DEFAULT_BRANCH
        if (( $? != 0 )); then
          return $?
        fi
        ;;
    esac
    stage=$(($stage+1))
  done

  printf "\n${green}${bold} ✔︎ All Done${normal}\n\n"
}
