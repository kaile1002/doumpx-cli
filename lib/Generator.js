const { getRepoList, getTagList } = require("./https");
const ora = require("ora");
const inquirer = require("inquirer");
const util = require("util");
const path = require("path");
const downloadGitRepo = require("download-git-repo");
const chalk=require('chalk');

async function warpLoading(fn, message, ...args) {
  const spinner = ora(message);
  spinner.start();
  try {
    const result = await fn(...args);
    spinner.succeed();
    return result;
  } catch (error) {
    console.log('\n dfdfdfdf',error);
    spinner.fail("Request failed, refetch ...");
  }
}

class Generator {
  constructor(name, targetDir) {
    // 目录名称
    this.name = name;
    // 创建位置
    this.targetDir = targetDir;
    this.downloadGitRepo = util.promisify(downloadGitRepo);
  }

  async getRepo() {
    const repoList = await warpLoading(
      getRepoList,
      "waiting fetch tempalte..."
    );
    if (!repoList) {
      return;
    }
    const repos = repoList.map((v) => v.name);
    //ps:这里的解构值repo一定要和name值相同，不然时undefined
    const { repo } = await inquirer.prompt({
      name: "repo",
      type: "list",
      choices: repos,
      message: "Please choose a template to create project",
    });
    return repo;
  }

  async getTags(repo) {
    const tagList = await warpLoading(
      getTagList,
      "waiting fetch tempalte...",
      repo
    );
    if (!tagList) {
      return;
    }
    const tags = tagList.map((v) => v.name);
    const { tag } = await inquirer.prompt({
      name: "tag",
      type: "list",
      choices: tags,
      message: "Please choose a template to create project",
    });
    return tag;
  }

  async downLoad(repo, tag) {
    const requestUrl = `wangkaile007/${repo}${tag ? "#" + tag : ""}`;
    await warpLoading(
      this.downloadGitRepo,
      "waiting download template",
      requestUrl,
      path.resolve(process.cwd(), this.targetDir)
    );
  }

  // 核心创建逻辑
  async create() {
    const repo = await this.getRepo();
    const tag = await this.getTags(repo);
    console.log("用户选择了==", repo);
    console.log("用户选择了==", tag);
    await this.downLoad(repo, tag);
    console.log(`\r\nSuccessfully created project ${chalk.cyan(this.name)}`);
    console.log(`\r\n  cd ${chalk.cyan(this.name)}`);
    console.log("  npm install\r\n");
    console.log("  npm run watch\r\n");
  }
}
module.exports = Generator;
