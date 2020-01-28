const inquirer = require("inquirer");
const fs = require("fs");

exports.promptUserInfo = async () => {
  return await inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "姓名:"
    },
    {
      type: "input",
      name: "address",
      message: "目前所在城市— 地址请尽量精确到地级市:"
    }
  ]);
};

exports.saveUserInfo = async (userInfo = {}, filePath) => {
  await fs.writeFileSync(filePath, JSON.stringify(userInfo, undefined, 2), {
    encoding: "utf8"
  });
};

exports.getUserInfo = async filePath => {
  try {
    return JSON.parse(await fs.readFileSync(filePath).toString());
  } catch {
    return {};
  }
};

exports.now = () => {
  const date = new Date();
  return date.toLocaleString();
};
