/**
 * @name 自动打卡
 */
const puppeteer = require("puppeteer");
const ora = require("ora");
const { now } = require("./utils");

const URL = "https://jinshuju.net/f/S9GX5n";
const INPUT_DELAY = 500;

module.exports = async ({ name, address }) => {
  if (!name || !address) {
    throw new Error('无效的姓名和地址')
  }
  const spinner = ora(`正在打开金数据链接: ${URL}`).start();
  try {
    const browser = await puppeteer.launch({
      headless: true
    });

    const page = await browser.newPage();
    await page.goto(URL, { waitUntil: "networkidle2" });

    // 姓名
    spinner.start(`开始填写姓名`);
    await page.waitForSelector(".field.field_1");
    await page.focus(".field.field_1");
    await page.type(".field.field_1", name, {
      delay: INPUT_DELAY
    });
    spinner.succeed(`填写姓名完成: [${name}]`);

    // 目前所在城市— 地址请尽量精确到地级市
    spinner.start(`开始填写地址`);
    await page.waitForSelector(".field.field_2");
    await page.focus(".field.field_2");
    await page.type(".field.field_2", address, {
      delay: INPUT_DELAY
    });
    spinner.succeed(`填写地址完成: [${address}]`);

    // 身体健康
    await page.tap(".field.field_6 .choice-wrapper:nth-child(1)");
    spinner.succeed("填写是否身体不舒服完成: [健康]");

    // 家人都健康
    await page.tap(".field.field_6 .choice-wrapper:nth-child(1)");
    spinner.succeed("填写家人是否有身体不舒服完成: [都健康] ");

    // await page.tap('.ant-btn-primary')
    spinner.start("健康打卡提交中...");

    await page.waitFor(2000);
    spinner.succeed(`健康打卡已完成 (${now()}), 祝你身体健康, 武汉加油 💪`);

    await browser.close();
  } catch (error) {
    spinner.fail();
    console.log("error\n", error);
    process.exit(0);
  }
};
