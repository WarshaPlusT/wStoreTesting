const pptr = require('puppeteer')
const expect = require('chai').expect

const { 
    getText, getCount, 
    click, typeText, 
    waitForText, shouldNotExist 
} = require('../lib/helpers')

let browser
let page

describe('Login Tests', () => {
    before(async function() {
        browser = await pptr.launch({ 
            headless: false,        // true to hide the browser for faster test
            slowMo: 50,             // to delay each line code for check tests on the browser 
            devtools: false         // show consol log e.g
        })
        page = await browser.newPage()

        // await page.setDefaultTimeout(10000) // change the timeout for all function
        // await page.setDefaultNavigationTimeout(20000) // specify the timeout for the navigation
    })

    after(async function() {
        await browser.close()
    })

    it('should not passed Invalid Credentials', async function() {
        await page.goto('http://warsha.menastore.co/')
        
        await page.waitForSelector('body > div.page-wrapper > header > div.panel.wrapper > div > ul > li:nth-child(4) > a')
        await page.click('body > div.page-wrapper > header > div.panel.wrapper > div > ul > li:nth-child(4) > a')        
        
        await page.waitForSelector('#login-form > fieldset')
        await page.type('#email', 'Not_Falid_Emeail@gmail.com')
        await page.type('#pass', 'Ab0552454557')
        //await page.click('#user_remember_me')
        await page.click('#login-form > fieldset > div.actions-toolbar > div.primary')
        await page.waitForSelector('#wk-mp-menu-dashboard > a')
    })

    it('should pass Validate Credentials', async function() {        
        await page.goto('http://warsha.menastore.co/')
        
        await page.waitForSelector('body > div.page-wrapper > header > div.panel.wrapper > div > ul > li:nth-child(4) > a')
        await page.click('body > div.page-wrapper > header > div.panel.wrapper > div > ul > li:nth-child(4) > a')        
        
        await page.waitForSelector('#login-form > fieldset')
        await page.type('#email', 'bejad.alhrbie@gmail.com')
        await page.type('#pass', 'Ab0552454557')
        //await page.click('#user_remember_me')
        await page.click('#login-form > fieldset > div.actions-toolbar > div.primary')
        await page.waitForSelector('#wk-mp-menu-dashboard > a')
    })
})