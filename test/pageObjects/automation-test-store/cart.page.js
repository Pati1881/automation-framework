import BasePage from "./base.page";

class CartPage extends BasePage{
    get shippingRate(){
        return $("//span[text()='Flat Shipping Rate:']/../following-sibling::td");
    }
    
    get cartTotal(){
        return $("//span[text()='Total:']/../following-sibling::td");
    }

    async getShippingRate(){
        var tempShippingRate = await this.shippingRate.getText();
        return parseFloat(tempShippingRate.replace("$", ""));
    }

    async getCartTotal(){
        var cartTotal = await this.cartTotal.getText();
        return parseFloat(cartTotal.replace("$", ""));
    }
      
      
      
}
export default new CartPage();