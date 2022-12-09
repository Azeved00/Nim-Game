let commandsTab = Utils.getById("commandsTab"),
    playBtn = Utils.getById("playBtn"),
    playBtnWrapper = Utils.getById("playBtnWrapper"),
    cancelBtn = Utils.getById("cancelBtn"),
    cancelBtnWrapper = Utils.getById("cancelBtnWrapper"),
    giveUpBtn = Utils.getById("giveUpBtn"),
    giveUpBtnWrapper = Utils.getById("giveUpBtnWrapper"),
    configBtn = Utils.getById("configBtn"),
    configBtnWrapper = Utils.getById("configBtnWrapper");

//simple modals toggle
configBtn.addEventListener("click", Modals.Config.toggle);
Utils.getById("messageBtn").addEventListener("click", Messages.toggleDisplay);
Utils.getById("rulesBtn").addEventListener("click", Modals.Rules.toggle);
Utils.getById("classBtn").addEventListener("click", () => {
    Utils.triggerEvent(Utils.getById("localBtn"),"click");
    Utils.triggerEvent(Utils.getById("localBtn"),"click");
    Modals.Class.toggle();
});

//more complex operations
playBtn.addEventListener("click",()=>{
    playBtnWrapper.style.display="none";
    cancelBtnWrapper.style.display="block";
    configBtnWrapper.style.display="none";

    game = new Game(conf);
});

giveUpBtn.addEventListener("click",() => {
    playBtnWrapper.style.display="block";
    configBtnWrapper.style.display="block";
    giveUpBtnWrapper.style.display="none";
    cancelBtnWrapper.style.display="none";

    game.giveUp();
});

cancelBtn.addEventListener("click",() => {
    playBtnWrapper.style.display="block";
    configBtnWrapper.style.display="block";
    giveUpBtnWrapper.style.display="none";
    cancelBtnWrapper.style.display="none";

    game.cancelSearch();
});


//events trigger by some other entity
commandsTab.addEventListener("found", () => {
    playBtnWrapper.style.display="none";
    cancelBtnWrapper.style.display="none";
    giveUpBtnWrapper.style.display="block";
    configBtnWrapper.style.display="none";
})
commandsTab.addEventListener("gameLoaded",() =>{
    playBtnWrapper.style.display="none";
    cancelBtnWrapper.style.display="none";
    giveUpBtnWrapper.style.display="block";
    configBtnWrapper.style.display="none";
})
commandsTab.addEventListener("gameUnloaded",() =>{
    playBtnWrapper.style.display="block";
    configBtnWrapper.style.display="block";
    giveUpBtnWrapper.style.display="none";
    cancelBtnWrapper.style.display="none";
})
commandsTab.addEventListener("gameEnded",() =>{
    playBtnWrapper.style.display="block";
    configBtnWrapper.style.display="block";
    giveUpBtnWrapper.style.display="none";
    cancelBtnWrapper.style.display="none";
})
