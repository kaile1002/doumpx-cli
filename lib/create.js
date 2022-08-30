const path = require('path');
const fs = require('fs-extra');
const inquirer = require("inquirer");
const Generator = require('./Generator')

module.exports=async function(name,options){
  console.log('create.js=>>>',name,options);
  const cwd=process.cwd();
  const targetDir=path.join(cwd,name);
  if(fs.existsSync(targetDir)){
    if(options.force){
      await fs.remove(targetDir);
    }else{
      let {action}=await inquirer.prompt([
        {
          name:"action",
          type:"list",
          message:"Target directory already exists Pick an action:",
          choices: [
            {
              name: 'Overwrite',
              value: 'overwrite'
            },{
              name: 'Cancel',
              value: false
            }
          ]
        }
      ]);
      if(!action){
        return;
      }else if(action=="overwrite"){
        await fs.remove(targetDir);
      };

    }
  }
  // 创建项目
  const generator = new Generator(name, targetDir);

  // 开始创建项目
  generator.create();
}