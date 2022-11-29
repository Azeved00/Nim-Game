function closeBtn(){
    Utils.getById("playBtn").style.display="block";
    Utils.getById("configBtn").style.display="block";
    Utils.getById("giveUpBtn").style.display="none";

    modal("FinishMessage");
    config.reload();
}

function restartBtn(){
    modal("FinishMessage");
    config.game();
}


Utils.getById("playBtn").addEventListener("click",()=>{
    Utils.getById("playBtnWrapper").style.display="none";
    Utils.getById("giveUpBtnWrapper").style.display="block";
    Utils.getById("configBtnWrapper").style.display="none";

    game.game();
});

Utils.getById("configBtn").addEventListener("click", Modals.Config.toggle);


Utils.getById("giveUpBtn").addEventListener("click",() => {
    Utils.getById("playBtnWrapper").style.display="block";
    Utils.getById("configBtnWrapper").style.display="block";
    Utils.getById("giveUpBtnWrapper").style.display="none";

    //config.giveUp();
});

Utils.getById("classBtn").addEventListener("click", Modals.Class.toggle);
Utils.getById("messageBtn").addEventListener("click", Messages.toggleDisplay);
Utils.getById("rulesBtn").addEventListener("click", Modals.Rules.toggle)


