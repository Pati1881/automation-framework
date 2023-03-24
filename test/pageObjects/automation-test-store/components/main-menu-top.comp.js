class MainMenuTopComponent{
    mainMenuTopLink(menuText){
        return $("//ul[@id='main_menu_top']//span[text()='" + menuText + "']");
    }
}
export default new MainMenuTopComponent();