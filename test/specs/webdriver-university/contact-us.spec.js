import allureReporter from "@wdio/allure-reporter";
import ContactUsPage from "../../pageObjects/webdriver-university/contact-us.page";


describe('webdriveruniversity - contact us page', function() {
    //this.retries(1);//Retry all tests in this suite up to 1 times (we cannot use arrow function in definition of test block)

    beforeEach(async () => {
        await ContactUsPage.open();
        //console.log(`>>Browser Object: ${JSON.stringify(browser)}`);
        // console.log("CONFIG ENV: " + browser.options.config.environment);
        // console.log("CONFIG EMAIL: " + browser.config.email);
        // console.log("CONFIG FIRST NAME: " + browser.config.firstName);
        // console.log("CONFIG PASSWORD: " + browser.config.password);
        // console.log("BASE URL: " + browser.config.baseUrl);



    });

    it('valid submission - submit all information', async() => {
        allureReporter.addFeature("Contact us Page - valid Submission");
        allureReporter.addDescription("Validate contact us page by submitting all data");
        allureReporter.addSeverity("critical");

        ContactUsPage.submitForm_usingRandomData("Joe", "Blogs");

        //await browser.debug();
        //await submitButton.click();
        //using custome command:
        //await browser.waitThenClick(submitButton);

        
        //console.log(`successfulSubmissionHeader Element: ` + JSON.stringify(await ContactUsPage.successfulSubmissionHeader));
        await expect(ContactUsPage.successfulSubmissionHeader).toHaveText('Thank You for your Message!');
		
		//Jest Assertion:
        //const successfulSubmissionHeader2 = await $('#contact_reply > h1').getText();
        //expect(successfulSubmissionHeader2).toEqual('Thank You for your Message!555');
    });

    it('invalid submission - dont submit all information', async() => {
        allureReporter.addFeature("Contact us Page - invalid Submission");
        allureReporter.addDescription("Validate contact us page by not submitting all data");
        allureReporter.addSeverity("normal");

        ContactUsPage.submitForm("Sarah", "Blogs", "", "Hello world!");

        await expect(ContactUsPage.unsuccessfulSubmissionHeader).toHaveTextContaining(['Error: all fields are required', 'Error: Invalid email address']);
    });

    it('only type a first name', async () => {
        ContactUsPage.submitForm("Sarah", "", "", "");
        await expect(ContactUsPage.unsuccessfulSubmissionHeader).toHaveTextContaining(['Error: all fields are required', 'Error: Invalid email address']);
    });
});