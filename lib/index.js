const fs = require("fs");
const path = require("path");
const configFilePath = path.join(process.cwd(), "_config.json");
const { promptUserInfo, saveUserInfo, getUserInfo, now } = require("./utils");
const sign = require("./sign");

const isFirstSign = () => !fs.existsSync(configFilePath);

const main = async () => {
  if (isFirstSign()) {
    console.log("第一次使用, 需要配置您的个人信息 :)");
    const userInfo = await promptUserInfo();
    await saveUserInfo(userInfo, configFilePath);
  }
  await sign(await getUserInfo(configFilePath));
};

main();
