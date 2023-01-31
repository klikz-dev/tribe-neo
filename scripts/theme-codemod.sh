#!/bin/bash

## before usage:
# 1. Install `cargo` - Rust package manager
# Linux: `sudo apt install cargo`
# Mac: `brew install cargo`
# 2. Run `cargo install fastmod`
# 3. Be sure to add `~/.cargo/bin` to your PATH to be able to run the installed binaries

declare -a paths=("./packages/components/src" "./packages/components/.storybook" "./packages/web/src")

for package in "${paths[@]}"; do
  fastmod -d "$package" --extensions ts,tsx,css,json --accept-all --print-changed-files "blue-([0-9]+)" 'actionPrimary-${1}'
  fastmod -d "$package" --extensions ts,tsx,css,json --accept-all --print-changed-files "primary-([0-9]+)" 'actionPrimary-${1}'
  fastmod -d "$package" --extensions ts,tsx,css,json --accept-all --print-changed-files 'indigo-([0-9]+)' 'actionPrimary-${1}'
  
  fastmod -d "$package" --extensions ts,tsx,css,json --accept-all --print-changed-files "secondary-([0-9]+)" 'actionSecondary-${1}'
  fastmod -d "$package" --extensions ts,tsx,css,json --accept-all --print-changed-files "accent-([0-9]+)" 'actionAccent-${1}'
  
  fastmod -d "$package" --extensions ts,tsx,css,json --accept-all --print-changed-files "primaryBase-([0-9]+)" 'main-${1}'
  fastmod -d "$package" --extensions ts,tsx,css,json --accept-all --print-changed-files "secondaryBase-([0-9]+)" 'surface-${1}'
 
#  fastmod -d "$package" --extensions ts,tsx,css,json --accept-all --print-changed-files '-gray-([0-9]+)' '-neutral-${1}'
#  
  fastmod -d "$package" --extensions ts,tsx,css,json --accept-all --print-changed-files 'red-([0-9]+)' 'danger-${1}'
  fastmod -d "$package" --extensions ts,tsx,css,json --accept-all --print-changed-files 'green-([0-9]+)' 'success-${1}'
  fastmod -d "$package" --extensions ts,tsx,css,json --accept-all --print-changed-files 'yellow-([0-9]+)' 'warning-${1}'
done
