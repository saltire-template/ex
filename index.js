// !!! Sharing the dependencies of caz
module.paths = require.main.paths

const path = require('path')
const chalk = require('chalk')
const { name, version } = require('./package.json')

const date = new Date()

module.exports = {
  name,
  version,
  metadata: {
    year: date.getFullYear(),
    month: ('0' + (date.getMonth() + 1)).substr(-2),
    day: ('0' + date.getDate()).substr(-2)
  },
  prompts: [
    {
      name: 'name',
      type: 'text',
      message: '项目名称：'
    },
    {
      name: 'install',
      type: 'confirm',
      message: '是否立即安装依赖：',
      initial: true
    },
    {
      name: 'pm',
      type: prev => process.env.NODE_ENV === 'test' || prev ? 'select' : null,
      message: '请选择npm包管理工具：',
      hint: ' ',
      choices: [
        { title: 'npm', value: 'npm' },
        { title: 'yarn', value: 'yarn' }
      ]
    }
  ],
  filters: {
    /** @param {{ features: string[] }} answers */
    'plugins/saltire_util.js': answers => answers.saltire_util,
  },
  install: 'npm',
  init: true,
  setup: async ctx => {
    ctx.config.install = ctx.answers.install && ctx.answers.pm
  },
  complete: async ctx => {
    console.clear()
    console.log(chalk.green(`\n ## 使用模板[${ctx.template}]成功创建了项目： ${ctx.project}\.\n`))
    if (ctx.dest !== process.cwd()) {
      console.log(chalk.cyan(`  $ cd ${path.relative(process.cwd(), ctx.dest)}`))
    }
    if (ctx.config.install === false) {
      console.log(chalk.cyan(`  $ npm install or # yarn`))
    }
    console.log(chalk.cyan(`  $ ${ctx.config.install ? ctx.config.install : 'npm'} run dev`))
    console.log(chalk.green(`\n ## 现在你可以使用它了,尝试进入该项目运行 npm run dev ~~`))
  }
}
