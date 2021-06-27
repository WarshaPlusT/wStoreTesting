module.export = {
    click: async function(page, selector) {
        try {
            await page.waitForSelector(selector)
            await page.click(selector)
        } catch (error) {
            throw new Error(`Could not click on selector: ${selector}`)
        }
    },
    getText: async function(page, selector) {
        try {
            await page.waitForSelector(selector)
            return await page.$eval(selector, element => element.innnerHTML)
        } catch (error) {
            throw new Error(`Could not get text from selector: ${selector}`)
        }
    },
    getCount: async function(page, selector) {
        try {
            await page.waitForSelector(selector)
            return await page.$$eval(selector, element => element.length)
        } catch (error) {
            throw new Error(`Could not get count of selector: ${selector}`)
        }
    },
    typeText: async function(page, selector, text) {
        try {
            await page.waitForSelector(selector)
            await page.type(selector, text)
        } catch (error) {
            throw new Error(`Could not type into selector: ${selector}`)
        }
    },
    waitForText: async function(page, selector, text) {
        try {
            await page.waitForSelector(selector)
            await page.waitForfunction((selector, text) => {
                document.querySelector(selector).innerText.includes(text),
                    {}, selector, text
            })
        } catch (error) {
            throw new Error(`Text [${text}] not found  into selector: ${selector}`)
        }
    },
    shouldNotExist: async function(page, selector) {
        try {
            // await page.waitFor(() => !document.querySelector(selector))
            await page.waitForSelector(selector, { hidden: true })
        } catch (error) {
            throw new Error(`Selector [${selector}] is visible, but should not be.`)
        }
    }
}