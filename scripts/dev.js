// 打包入口 这里是打包所有的包入口，所以要去各个包里面构建自定义的选项
const execa = require('execa')

async function build(target) {
  // -c 是配置文件   -cw w是监控
  await execa('rollup', ['-cw', '--environment', `TARGET:${target}`], {stdio: 'inherit'}) // stdio 子进程在一行中输出
}

build('reactivity')
