#! /usr/bin/env node

//ps：#!和/usr/bin/env 之间没有空格隔开
//ps：注意不要把/usr 写成 /user
//ps：上面两个的问题修改之后，删除之前npm link的连接，重新npm link

//ps:Must use import to load ES Module: F:\WangklProject\node-cli\node_modules\inquirer\lib\inquirer.js
//这种错误一般都是版本的问题，降低版本
//node:12.16.1 inquirer:8.2.0
const program = require("commander");
const chalk =require("chalk");
const figlet=require("figlet");

program
  .command("create <app-name>")
  .description("create a new project")
  .option("-f, --force", "overwrite target directory if it exist")
  .action((name, options) => {
    require('../lib/create.js')(name, options)
  });

program
  .version(`v${require("../package.json").version}`)
  .usage("<command> [option]");

// 配置 config 命令
program
  .command('config [value]')
  .description('inspect and modify the config')
  .option('-g, --get <path>', 'get value from option')
  .option('-s, --set <path> <value>')
  .option('-d, --delete <path>', 'delete option from config')
  .action((value, options) => {
    console.log(value, options)
  })

// 配置 ui 命令
program
  .command('ui')
  .description('start add open roc-cli ui')
  .option('-p, --port <port>', 'Port used for the UI Server')
  .action((option) => {
    console.log(option)
  })

program
  // 监听 --help 执行
  .on('--help', () => {
    // 使用 figlet 绘制 Logo
    console.log('\r\n' + figlet.textSync('doumpx', {
      font: 'Ghost',
      horizontalLayout: 'default',
      verticalLayout: 'default',
      width: 80,
      whitespaceBreak: true
    }));
    // 新增说明信息
    console.log(`\r\nRun ${chalk.cyan(`doumpx <command> --help`)} for detailed usage of given command\r\n`)
  })

program.parse(process.argv);
