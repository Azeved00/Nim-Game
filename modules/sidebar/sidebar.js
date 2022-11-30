

Utils.getById("playBtn").addEventListener("click",()=>{
    Utils.getById("playBtnWrapper").style.display="none";
    Utils.getById("giveUpBtnWrapper").style.display="block";
    Utils.getById("configBtnWrapper").style.display="none";

    game = new Game(conf);
});

Utils.getById("configBtn").addEventListener("click", Modals.Config.toggle);


Utils.getById("giveUpBtn").addEventListener("click",() => {
    Utils.getById("playBtnWrapper").style.display="block";
    Utils.getById("configBtnWrapper").style.display="block";
    Utils.getById("giveUpBtnWrapper").style.display="none";

    game.giveUp();
});

Utils.getById("classBtn").addEventListener("click", Modals.Class.toggle);
Utils.getById("messageBtn").addEventListener("click", Messages.toggleDisplay);
Utils.getById("rulesBtn").addEventListener("click", Modals.Rules.toggle)

Utils.getById("commandsTab").addEventListener("gameLoaded",() =>{
    Utils.getById("playBtnWrapper").style.display="none";
    Utils.getById("giveUpBtnWrapper").style.display="block";
    Utils.getById("configBtnWrapper").style.display="none";
})

Utils.getById("commandsTab").addEventListener("gameUnloaded",() =>{
    Utils.getById("playBtnWrapper").style.display="block";
    Utils.getById("configBtnWrapper").style.display="block";
    Utils.getById("giveUpBtnWrapper").style.display="none";
})
