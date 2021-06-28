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
        await page.goto('http://zero.webappsecurity.com/index.html')
        
        await page.waitForSelector('#signin_button')
        await page.click('#signin_button')        
        
        await page.waitForSelector('#login_form')
        await page.type('#user_login', 'invalid id')
        await page.type('#user_password', 'invalid password')
        await page.click('#user_remember_me')
        await page.click('input[type="submit"]')
        await page.waitForSelector('.alert-error')
    })

    it('should pass Validate Credentials', async function() {        
        await page.goto('http://zero.webappsecurity.com/index.html')        
        await page.waitForSelector('#signin_button')
        await page.click('#signin_button')                
        await page.waitForSelector('#login_form')
        await page.type('#user_login', 'username')
        await page.type('#user_password', 'password')
        await page.click('#user_remember_me')
        await page.click('input[type="submit"]')
        await page.waitForSelector('#settingsBox')
    })
})