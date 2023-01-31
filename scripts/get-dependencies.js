/* eslint-disable no-console */
/* eslint-disable global-require */
const tribePrefix = '@tribeplatform'
const traversedPackages = {}

const cwd = process.cwd()
/**
 * @param {string} package
 */
const traverse = package => {
  const localPath = package.replace(tribePrefix, 'packages')
  const packageJson = require(`${cwd}/${localPath}/package.json`)
  if (packageJson.name in traversedPackages) {
    return []
  }
  traversedPackages[package] = true
  Object.entries(packageJson.dependencies || {})
    .filter(([dependency]) => dependency.startsWith(tribePrefix))
    .forEach(([dependency]) => {
      traverse(dependency)
    })
}

/**
 *@type {string}
 */
let rootPackage = process.argv[2] || ''
if (rootPackage.length === 0) {
  console.error('Package name not provided')
  process.exit(1)
}
if (!rootPackage.startsWith(tribePrefix)) {
  rootPackage = `${tribePrefix}/${rootPackage}`
}
traverse(rootPackage)

Object.keys(traversedPackages).forEach(v => console.log(v))
