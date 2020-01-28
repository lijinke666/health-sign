/**
 * @name 自动打卡
 */
const puppeteer = require('puppeteer')
const ora = require("ora");
const URL = 'https://jinshuju.net/f/S9GX5n'
const { now } = require('./utils')
const INPUT_DELAY = 200

module.exports = async ({ name, address }) => {
  const spinner = ora(
    `正在打开金数据链接: ${URL}`
  ).start();
  try {
    const browser = await puppeteer.launch({
      headless: true,
    })

    const page = await browser.newPage()
    await page.goto(URL, { waitUntil: 'networkidle2' })
    spinner.succeed('链接已打开')

    // 姓名
    spinner.info(`开始填写姓名: ${name}`)
    await page.waitForSelector('.field.field_1')
    await page.focus('.field.field_1')
    await page.type('.field.field_1', name, {
      delay: INPUT_DELAY,
    })
    spinner.succeed('填写姓名完成')

    // 目前所在城市— 地址请尽量精确到地级市
    spinner.info(`开始填写地址: ${address}`)
    await page.waitForSelector('.field.field_2')
    await page.focus('.field.field_2')
    await page.type('.field.field_2', address, {
      delay: INPUT_DELAY,
    })
    spinner.succeed('填写地址完成')

    // 身体健康
    await page.tap('.field.field_6 .choice-wrapper:nth-child(1)')
    spinner.succeed('填写是否身体不舒服完成')

    // 家人都健康
    await page.tap('.field.field_6 .choice-wrapper:nth-child(1)')
    spinner.succeed('填写家人是否有身体不舒服完成 ')

    // await page.tap('.ant-btn-primary')
    spinner.spinner('健康打开提交中...')

    await page.waitFor(2000)
    spinner.succeed(`健康打开已完成 (${now()}): , 祝你身体健康, 武汉加油 💪`)

    await browser.close()
  } catch (error) {
    spinner.fail()
    console.log('error\n', error)
    process.exit(0)
  }
}
