const fs = require("fs");
const path = require("path");
const configFilePath = path.join(process.cwd(), "_config.json");
const { promptUserInfo, saveUserInfo, getUserInfo } = require("./utils");
const sign = require("./sign");

const isFirstSign = () => !fs.existsSync(configFilePath);

module.exports = async url => {
  if (isFirstSign()) {
    console.log("第一次使用, 需要配置您的个人信息 :)");
    const userInfo = await promptUserInfo();
    await saveUserInfo(userInfo, configFilePath);
  }
  const userInfo = await getUserInfo(configFilePath);
  await sign({
    ...userInfo,
    url
  });
};
