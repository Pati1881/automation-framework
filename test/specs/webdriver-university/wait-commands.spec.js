describe('wait commands - examples', async() => {
    beforeEach(async() => {
        await browser.url("/Ajax-Loader/index.html");
    });
    it('pause command', async() => {
        const clickMe_Button = await $("//*[text()='CLICK ME!']/..");

        await browser.pause(3000);
        await clickMe_Button.click();
        await browser.pause(1500);
        
    });
    it('waitForClickable', async() => {
        const clickMe_button = await $("#button1");
        await clickMe_button.waitForClickable();
        await clickMe_button.click();
        await browser.pause(1500);
    });
    it('waitForDisplayed', async() => {
        const clickMe_button = await $("#button1");
        await clickMe_button.waitForDisplayed(); 
    });
    it.skip('waitForExist', async() => {
        const clickMe_button = await $("#button1");
        await clickMe_button.waitForExist();        
        await clickMe_button.click() // this test will fail because waitForExists checks only if button exists in HTML DOM, not on the screen
    });
    it('waitUntil', async() => {
        await browser.url("/Accordion/index.html");
        const loadingStatus_UI = await $('#text-appear-box');
        await loadingStatus_UI.waitUntil(async() => {
            return (await this.getText()) === 'LOADING COMPLETE.' 
        },
        {
            timeout: 20000,
            timeoutMsg: 'expected text to be different after 20 seconds'
        }) 
    });
});