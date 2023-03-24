describe("Locating elements ", () => {
  beforeEach(async () => {
    await browser.url("https://selectors.webdriveruniversity.com/");
  });
  it("$ - locate element", async () => {
    await browser.$("//a[@href='#portfolio']").click();
    const webdriverioButton = await $("[data-target='#portfolioModal1']");
    webdriverioButton.click();
  });
  it("$$ - locate elements", async () => {
    const expectedTitles = [
      "#",
      "First",
      "Last",
      "Handle",
      "1",
      "2",
      "3",
      "Firstname",
      "Lastname",
      "Age",
    ];
    const tableHeaderTitles = await $$("//table//th");
    const actualTitles = [];
    for (const title of tableHeaderTitles) {
      //console.log(await title.getText());
      actualTitles.push(await title.getText());
    }
    await expect(expectedTitles).toEqual(actualTitles);
  });
});
