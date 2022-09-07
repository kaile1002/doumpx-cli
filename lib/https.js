const axios=require('axios');

axios.interceptors.response.use(res => {
  return res.data;
});

/**
 * 获取模板列表
 * @returns Promise
 */
 async function getRepoList() {//https://api.github.com/users/{用户名}/repos
  return axios.get('https://api.github.com/repos/wangkaile007/mpx-template')
  // return axios.get('https://api.github.com/users/wangkaile007/repos')
}

/**
 * 获取版本信息
 * @param {string} repo 模板名称
 * @returns Promise
 */
async function  getTagList(repo) {
  return axios.get(`https://api.github.com/repos/wangkaile007/${repo}/tags`)
}

module.exports = {
  getRepoList,
  getTagList
}