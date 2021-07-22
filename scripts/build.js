// 打包入口 这里是打包所有的包入口，所以要去各个包里面构建自定义的选项
const fs = require('fs')

const execa = require('execa')

const dirs = fs.readdirSync('packages').filter((p) => {
  // 只去文件夹 做为打包模块
  if(!fs.statSync(`packages/${p}`).isDirectory()) {
    return false
  }
  return true
})

async function build(target) {
  await execa('rollup', ['-c', '--environment', `TARGET:${target}`], {stdio: 'inherit'}) // stdio 子进程在一行中输出
}

async function runParallel(dirs, iterFn) {
  let result = [];
  for (let item of dirs) {
    result.push(iterFn(item))
  }

  return Promise.all(result)
}

runParallel(dirs, build).then(res => {
  console.log('success')
})
