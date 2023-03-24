describe.skip('Description of test suite', () => {
    before(() => {
        console.log("Runs once before first test in this test block");
    });
    after(() => {
        console.log("Runs once after last test in this test block");
    });

    beforeEach(() => {
        console.log("Runs before each test in this block")
    });

    afterEach(() => {
        console.log("Runs after each test in this block")
    });

    it('Description of individual test 1', () => {
        console.log("Execute code: Individual test 1");
    });
    it('Description of individual test 2', () => {
        console.log("Execute code: Individual test 2");
    });
});