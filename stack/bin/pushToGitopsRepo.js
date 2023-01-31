#!/usr/bin/env node
/* eslint-disable */

const fs = require('fs')
const path = require('path')
const { promisify } = require('util')
const exec = promisify(require('child_process').exec)

const gitOpsRepo = `https://tribe-sys-v2:${process.env.DEPLOY_TOKEN}@gitlab.com/tribeplatform/devops/environments-v2.git`
const gitDir = path.join(__dirname, `../../environments`)

const serviceInfo = {
  name: process.env.SERVICE_NAME,
  version: process.env.SERVICE_VERSION,
  imageTag: process.env.SERVICE_IMAGE_TAG,
  manifestName: process.env.SERVICE_MANIFEST,
  path: process.env.SERVICE_PATH,
}

const targetCluster = {
  name: process.env.TARGET_CLUSTER,
  namespace: process.env.TARGET_NAMESPACE,
}

const getBuildInfo = () => {
  return {
    [serviceInfo.name]: {
      name: serviceInfo.name,
      buildImage: serviceInfo.imageTag,
      buildTime: new Date(),
    },
  }
}

/**
 * Setup Tribe SysOps Git user to access to the
 * GitOps repo
 */
const setUpGitUser = async () => {
  try {
    console.log('👩‍💻 Config Git User')
    await exec(`git config --global user.name 'Tribe SysOps'`)
    await exec(`git config --global user.email 'devops@tribe.so'`)
    console.log('✅ Git user config successfully')
  } catch (error) {
    panic(error, 'Cannot config the Gitlab user.')
  }
}

const panic = (error, message) => {
  console.log(`🤦‍♀️ ${message}`)
  console.error(error)
  process.exit(1)
}

// Check the deployment requirement before deploy to the cluster
const precheck = () => {
  const {
    TARGET_CLUSTER,
    TARGET_NAMESPACE,
    SERVICE_NAME,
    SERVICE_IMAGE_TAG,
    SERVICE_MANIFEST,
    SERVICE_PATH
  } = process.env
  if (
    TARGET_CLUSTER &&
    TARGET_NAMESPACE &&
    SERVICE_NAME &&
    SERVICE_IMAGE_TAG &&
    SERVICE_MANIFEST &&
    SERVICE_PATH
  ) {
    console.log(
      `✅ The precheck has been passed, will deploy ${serviceInfo.name}@${serviceInfo.version} to ${targetCluster.name}@${targetCluster.namespace}, the service is located at ${serviceInfo.path}.`,
    )
    return true
  }
  console.error("Deployment arguments:", {
    TARGET_CLUSTER,
    TARGET_NAMESPACE,
    SERVICE_NAME,
    SERVICE_IMAGE_TAG,
    SERVICE_MANIFEST,
    SERVICE_PATH
  })
  throw new Error('Some deployment arguments are missing')
}

const cloneRepo = async () => {
  try {
    console.log('Cloning the repo...')
    await exec(`rm -rf ${gitDir}`)
    await exec(
      `git clone --single-branch --branch master ${gitOpsRepo} ${gitDir}`,
    )
    console.log('✅ Cloned successfully')
  } catch (error) {
    panic(error, 'Cannot clone the Repo.')
  }
}

const getStackDir = () => {
  return `${serviceInfo.path}/stack/k8s/${serviceInfo.manifestName}/rollout.yaml`
}

const modifyK8sFile = async () => {
  try {
    console.log(`👩‍💻 Change the k8s yaml file for ${serviceInfo.name} service`)
    await replace({
      files: [getStackDir()],
      from: [/<< IMAGE_URI >>/g, '<< SERVICE_VERSION >>'],
      to: [
        `292539507498.dkr.ecr.us-east-1.amazonaws.com/${serviceInfo.imageTag}`,
        `"${serviceInfo.version}"`,
      ],
    })
    console.log('✅ Kubernetes file changed successfully')
  } catch (error) {
    panic(error, 'Cannot modify the Kubernetes files.')
  }
}

const promotingToK8s = async () => {
  try {
    console.log(`👩‍💻 Start promoting to the k8s for ${serviceInfo.name} service`)

    const basePath = `${gitDir}/aws/environments/${targetCluster.name}/namespaces/${targetCluster.namespace}`
    const buildPath = `${basePath}/build.version.json`
    const buildInfo = JSON.parse(fs.readFileSync(buildPath))
    const servicePath = `${basePath}/apps/${serviceInfo.name}/rollout.yaml`
    const newBuildInfo = JSON.stringify(
      { ...buildInfo, ...getBuildInfo() },
      null,
      2,
    )

    fs.writeFileSync(buildPath, newBuildInfo)
    fs.copyFileSync(getStackDir(), servicePath)

    console.log('✅ Kubernetes file promoted successfully')
  } catch (error) {
    panic(error, 'Cannot promote the Kubernetes files.')
  }
}

const deployToCluster = async () => {
  if (precheck()) {
    console.log('%c 🌱 Start Promoting...')
    await setUpGitUser()
    await cloneRepo()
    await modifyK8sFile()
    await promotingToK8s()
    await deliverToGitOpsRepo()
    console.log('%c 🧚 Changes delivered to the GitOps repo.')
  }
}

const deliverToGitOpsRepo = async () => {
  try {
    console.log('👩‍💻 Start updating GitOps repo')
    await exec(`git add --all .`, {
      cwd: gitDir,
    })

    await exec(
      `git commit -m "Deploy ${serviceInfo.name} to ${targetCluster.name}@${targetCluster.namespace}"`,
      {
        cwd: gitDir,
      },
    )

    await exec(`git push origin master`, {
      cwd: gitDir,
    })

    console.log('✅ GitOps repo updated successfully')
  } catch (error) {
    panic(error, 'Cannot push to the GitopsRepo.')
  }
}

const getReplacement = (replace, isArray, i) => {
  if (isArray && typeof replace[i] === 'undefined') {
    return null
  }
  if (isArray) {
    return replace[i]
  }
  return replace
}

const makeReplacements = (contents, from, to, file, count = false) => {
  // Turn into array
  if (!Array.isArray(from)) {
    from = [from]
  }

  // Check if replace value is an array and prepare result
  const isArray = Array.isArray(to)
  const result = { file }

  // Counting? Initialize number of matches
  if (count) {
    result.numMatches = 0
    result.numReplacements = 0
  }

  // Make replacements
  const newContents = from.reduce((contents, item, i) => {
    // Call function if given, passing in the filename
    if (typeof item === 'function') {
      item = item(file)
    }

    // Get replacement value
    let replacement = getReplacement(to, isArray, i)
    if (replacement === null) {
      return contents
    }

    // Call function if given, appending the filename
    if (typeof replacement === 'function') {
      const original = replacement
      replacement = (...args) => original(...args, file)
    }

    // Count matches
    if (count) {
      const matches = contents.match(item)
      if (matches) {
        const replacements = matches.filter(match => match !== replacement)
        result.numMatches += matches.length
        result.numReplacements += replacements.length
      }
    }

    // Make replacement
    return contents.replace(item, replacement)
  }, contents)

  // Check if changed
  result.hasChanged = newContents !== contents

  // Return result and new contents
  return [result, newContents]
}

const replace = async ({ files, from, to }) => {
  for (const file of files) {
    // Extract relevant config and read file contents
    const contents = fs.readFileSync(file, 'utf-8')

    // Replace contents and check if anything changed
    const [, newContents] = makeReplacements(contents, from, to, file)
    fs.writeFileSync(file, newContents, 'utf-8')
  }
  return true
}

// Start deploying to the cluster
deployToCluster().catch(e => {
  process.exit(1)
})
