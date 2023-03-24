class CategoryMenuComponent{
    categoryMenuLink(categoryText){
        return $$("//a[contains(text(),'" + categoryText +"')]");
    }
}
export default new CategoryMenuComponent();