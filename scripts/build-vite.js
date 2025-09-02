const fs = require('fs')
const spawn = require('cross-spawn')
const path = require('path')

function buildPackage(packageName) {
  const packagePath = path.join(__dirname, '..', 'packages', packageName)
  console.log(`Building ${packageName}...`)

  const result = spawn.sync('npx', ['vite', 'build'], {
    cwd: packagePath,
    stdio: 'inherit',
  })

  if (result.status !== 0) {
    console.error(`Failed to build ${packageName}`)
    process.exit(1)
  }

  console.log(`✅ ${packageName} build completed`)
}

// Build packages in order
console.log('🚀 Building Fortune Sheet packages with Vite...')

// Build core first (dependency for react)
buildPackage('core')

// Then build react
buildPackage('react')

console.log('🎉 All packages built successfully!')
