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
    Utils.getById("playBtn").style.display="none";
    Utils.getById("giveUpBtn").style.display="block";
    Utils.getById("configBtn").style.display="none";

    config.game();
});

Utils.getById("configBtn").addEventListener("click", () => {modal("Config")});


Utils.getById("giveUpBtn").addEventListener("click",() => {
    Utils.getById("playBtn").style.display="block";
    Utils.getById("configBtn").style.display="block";
    Utils.getById("giveUpBtn").style.display="none";

    config.giveUp();
});

Utils.getById("classBtn").addEventListener("click",() => {modal("Class")});
Utils.getById("messageBtn").addEventListener("click", () => {Messages.toggleDisplay()});
Utils.getById("rulesBtn").addEventListener("click",() => {modal("Rules")})


