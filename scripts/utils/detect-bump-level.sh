#! /bin/bash

bump_level='patch'
if [[ $1 == *'`major`'* ]]; then
  bump_level='major'
elif [[ $1 == *'`minor`'* ]]; then
  bump_level='minor'
fi
echo $bump_level
