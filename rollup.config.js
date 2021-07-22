import ts from 'rollup-plugin-typescript2';  // 解析ts插件
import resolvePlugin from '@rollup/plugin-node-resolve'; // 解析第三方模块
const path  = require('path')

// 获取packages目录
let packagesDir = path.resolve(__dirname, 'packages')
let packageDir = path.resolve(packagesDir, process.env.TARGET)  // 获取对应的打包路径

const resolve = p => path.resolve(packageDir, p);  // 根据当前打包路径来解析

const pkg = require(resolve('package.json'));  // 拿到当前目录下的package.json

const buildOptions = pkg.buildOptions;

const name = path.basename(packageDir)  // 获取当前目录的名字

const outputConfig = {
  "esm-bundler": {
    file: resolve(`dist/${name}.esm-bundler.js`),
    format: 'es'
  },
  "cjs": {
    file: resolve(`dist/${name}.cjs.js`),
    format: 'cjs'
  },
  "global": {
    file: resolve(`dist/${name}.global.js`),
    format: 'iife'
  }
}

function createConfig(format, output) {
  output.name = buildOptions.name
  output.sourcemap = true
  return {
    input: resolve(`src/index.ts`),
    output,
    plugin: [
      ts({
        tsconfig: path.resolve(__dirname, 'tsconfig.json')
      }),
      resolvePlugin()
    ]
  }
}

export default buildOptions.formats.map(format => createConfig(format, outputConfig[format]))