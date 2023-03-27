import BasePage from "./base.page";
import ItemComponent from "./components/item.comp";
import MainMenuTopComponent from "../../pageObjects/automation-test-store/components/main-menu-top.comp";
import CartPage from "../../pageObjects/automation-test-store/cart.page";

class SkinCarePage extends BasePage {
  get itemComponent() {
    return ItemComponent;
  }

  async addSpecificItems_ValidateTotal(item1, item2) {
    const skincareProducts_Header_Links = await ItemComponent.itemHeaderLinks;
    const itemPrices = [];
    for (const header of skincareProducts_Header_Links) {
      const tempHeaderText = await header.getText();

      if (
        tempHeaderText.toLowerCase() == item1.toLowerCase() ||
        tempHeaderText.toLowerCase() == item2.toLowerCase()
      ) {
        const attr = await header.getAttribute("href");
        //https://automationteststore.com/index.php?rt=product/product&path=43&product_id=93
        const itemId = attr.split("id=").pop();

        await $('//a[@data-id="' + itemId + '"]').click();
        await browser.pause(4000);
        itemPrices.push(
          await $(
            "//a[@data-id='" +
              itemId +
              "']/following-sibling::div/div[@class='pricenew']" +
              "| //a[@data-id='" +
              itemId +
              "']/following-sibling::div/div[@class='oneprice']"
          ).getText()
        );
      }

      const formattedItemPrices = [];
      itemPrices.forEach((price) => {
        formattedItemPrices.push(price.replace("$", ""));
      });

      var itemsTotal = 0;
      formattedItemPrices.forEach((price) => (itemsTotal += parseFloat(price)));
    }
    await MainMenuTopComponent.mainMenuTopLink("Cart").click();
    await expect(browser).toHaveUrlContaining("checkout");

    var shippingRate = await CartPage.getShippingRate();
    itemsTotal += shippingRate;
    console.log("Items Total + Shiiping Rate = " + itemsTotal);

    //extract cart total
    var cartTotal = await CartPage.getCartTotal();
    expect(itemsTotal).toEqual(1000);
  }
}
export default new SkinCarePage();
