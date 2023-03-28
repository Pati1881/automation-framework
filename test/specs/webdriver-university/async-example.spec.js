describe('async vs sync - webdriverio example', () => {
    it('async vs sync', async() => {
        //await browser.url('/');
        await browser.url('https://www.webdriveruniversity.com/');
        await expect(browser).toHaveUrl('https://www.webdriveruniversity.com/')
    });
});