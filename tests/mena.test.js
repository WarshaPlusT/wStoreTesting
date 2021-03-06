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
            slowMo: 40,             // to delay each line code for check tests on the browser 
            devtools: false         // show consol log e.g
        })
        page = await browser.newPage()

        // await page.setDefaultTimeout(10000) // change the timeout for all function
        // await page.setDefaultNavigationTimeout(20000) // specify the timeout for the navigation
    })

    after(async function() {
        await browser.close()
    })

    it('lets go', async function() {
        await page.goto('http://warsha.menastore.co/')
        
        await page.waitForSelector('body > div.page-wrapper > header > div.panel.wrapper > div > ul > li.authorization-link')
        await page.click('body > div.page-wrapper > header > div.panel.wrapper > div > ul > li.authorization-link')        
        
        await page.waitForSelector('#email')
        await page.type('#email', '0592066081')
        await page.type('#pass', 'Tt123456789')
        await page.click('#send2 > span')
        //await page.click('input[type="submit"]')
        await page.waitForSelector('body > div.page-wrapper > header > div.header.content > div.dropdown > label')
    })

    
})