describe('advanced element interactions - examples', async() => {

    it('inputs', async() => {
        await browser.url("/Contact-Us/contactus.html");
        const firstNameTextField = $("[name='first_name']");

        //You can also use unicode characters like Left arrow or Back spaces:
        //https://w3c.github.io/webdriver/webdriver-spec.html#keyboard-actions
        //Doesn’t Clear element before typing:
        //https://webdriver.io/docs/api/element/addValue
        await firstNameTextField.addValue("Add your text here");
        await firstNameTextField.addValue("My added test");

        //Send a sequence of key strokes to an element (clears element before typing)
        //Keyword: clears before typing:
        //https://webdriver.io/docs/api/element/setValue        
        await firstNameTextField.setValue("xcv");

        //Clear a <textarea> or text <input> element’s value:
        //https://webdriver.io/docs/api/element/clearValue        
        await firstNameTextField.clearValue();
        
    });

    it('dropdowns', async() => {
        await browser.url("/Dropdown-Checkboxes-RadioButtons/index.html");
        const programingLanguage_DropdownList = await $("#dropdowm-menu-1");
        await programingLanguage_DropdownList.selectByAttribute('value', 'python');
        await expect(programingLanguage_DropdownList).toHaveValueContaining("python");
        //await browser.pause(3000);

        const tech_DropdownList = await $("#dropdowm-menu-2");
        await tech_DropdownList.selectByIndex(2);
        await expect(tech_DropdownList).toHaveValueContaining("TestNG", {ignoreCase: true});

        const frontendLanguage_DropdownList = await $("#dropdowm-menu-3");
        await frontendLanguage_DropdownList.selectByVisibleText("CSS");
        await expect(frontendLanguage_DropdownList).toHaveValueContaining("CSS", {ignoreCase: true});
    });

    it('state commands', async() => {
        await browser.url("/Dropdown-Checkboxes-RadioButtons/index.html");
        const lettuceRadioButton = await $('[value="lettuce"]');
        const lettuceRadioButton_isDisplayed = await lettuceRadioButton.isDisplayed();
        await expect(lettuceRadioButton_isDisplayed).toEqual(true);
        await expect(lettuceRadioButton).toBeEnabled();

        const lettuceRadioButton_isClicable = await lettuceRadioButton.isClickable();
        await expect(lettuceRadioButton_isClicable).toEqual(true);

        const cabbageRadioButton = await $('[value="cabbage"]');
        const cabbageRadioButton_isEnabled = await cabbageRadioButton.isEnabled();
        await expect(cabbageRadioButton_isEnabled).toEqual(false);
        await expect(cabbageRadioButton).toBeDisabled();
    });

    it('actions', async() => {
        await browser.url("/Actions/index.html");

        //Drag&Drop
        const elem = await $('#draggable');
        const target = await $('#droppable');
        await elem.dragAndDrop(target);

        //double click
        const doubleClick_button = await $('#double-click');
        await doubleClick_button.doubleClick();

        //mause over
        await $('//button[text()="Hover Over Me First!"]').moveTo();
        const firstLink = await $("(//*[text()='Link 1'])[1]");
        await firstLink.waitForClickable();
        await firstLink.click();
        
    });

    it('handling windows', async() => {
        await browser.url("https://www.webdriveruniversity.com/");
        await browser.newWindow("https://www.automationteststore.com/");
        let currentWindow_Title = await browser.getTitle();
        console.log(`>>Current Window Title : ${currentWindow_Title}`);
        await expect(browser).toHaveUrlContaining('automationteststore');

        await browser.switchWindow('webdriveruniversity.com');
        let parentWindow_Title = await browser.getTitle();
        console.log(`>>Parent Window Title : ${parentWindow_Title}`);
        expect(browser).toHaveUrlContaining('webdriveruniversity.com');

        await $('#contact-us').click();
        await browser.switchWindow('automationteststore');
        await browser.closeWindow();

        //if we close window the test is still focused on this closed window, 
        //we have to switch to another window, with which we want to interact next
        await browser.switchWindow('contactus');
        await browser.closeWindow();

        await browser.switchWindow('webdriver');
        console.log(await browser.getTitle());
    });

    it('IFrames', async() => {
        await browser.url('/IFrame/index.html');
        const iframe = await $('#frame');
        //it is crucial if working with iFrames to switch to proper frame before taking actions on it
        await browser.switchToFrame(iframe);
        await $('//a[text()="Our Products"]').click();
        await browser.switchToParentFrame();
    });
    it('Alerts', async() => {
        await browser.url('/Popup-Alerts/index.html');
        await $('#button1').click();
        await browser.acceptAlert();

        await $('#button4').click();
        const alertText = await browser.getAlertText();
        expect(alertText).toEqual('Press a button!');

        await browser.acceptAlert();
        await expect($('#confirm-alert-text')).toHaveText('You pressed OK!');

        await $('#button4').click();
        await browser.dismissAlert();
        await expect($('#confirm-alert-text')).toHaveText('You pressed Cancel!');
    });

    it('File Upload', async() => {
        await browser.url("/File-Upload/index.html");
        //${process.cwd()} - project's root directory
        await (await $('#myFile')).addValue(`${process.cwd()}\\data\\dummy_file.txt`);
        await $('#submit-button').click();
    });

    it.only('JS Execute', async() => {
        await browser.url("/Hidden-Elements/index.html");
        await browser.execute(() => {
            return document.getElementById("not-displayed").setAttribute("id", "");
        });

        //changing background color
        await browser.execute(() => {
            return document.body.style.backgroundColor = 'tomato';
        })
        await browser.pause(3000);
    });
});
