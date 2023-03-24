import BasePage from "./base.page";
import CategoryMenuComponent from "../../pageObjects/automation-test-store/components/category-menu.comp";
import MainMenuTopComponent from "../../pageObjects/automation-test-store/components/main-menu-top.comp";

class HomePage extends BasePage {
    open(){
        return super.open("");
    }

    get categoryMenuComponent(){
        return CategoryMenuComponent;
    } 

    get mainMenuTopComponent(){
        return MainMenuTopComponent;
    } 
}
export default new HomePage();