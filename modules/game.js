require("./utils.js");

const fs = require("fs");


module.exports = function () {
    let module = {};

    //---------------------GAME FUNCTIONS---------------------
    function getGame(game){}
    function updGame(game){}
    function deleteGame(id){
        try{
            let data = JSON.parse(fs.readFileSync("data/games.json"));
            let wait = data.waiting, play = data.playing;

            let game = wait.findIndex(e => (e.id === id));
            if(game !== -1) wait.splice(game,1);

            
            game = play.findIndex(e => (e.id === id));
            if(game !== -1) play.splice(game,1);
            

            fs.writeFileSync("data/games.json",JSON.stringify({"waiting":wait,"playing":play}));
        }
        catch(err){
            console.log(err.message);
            throw err;
        }
    }
    function newGame(group,size,nick){
        let date = new Date;
        let game = {
            "id": hashString(group+size+nick+date),
            "group":group,
            "size":size,
            "player1":nick,
            "player2":null,
            "date": date,
            "clear": () => {
                console.log("Timed out game " + game.id);
                deleteGame(game.id)
            }
        }
        setTimeout(game.clear,300000);
        return game;
    }

    function searchGame(group,size,nick){
        try{
            let data = JSON.parse(fs.readFileSync("data/games.json"));
            let wait = data.waiting, play = data.playing;
            const game = wait.findIndex(e => (e.group === group && e.size === size && e.player1 !== nick))
            let g;

            if(game === -1){
                g = newGame(group,size,nick);
                wait.push(g);
            }
            else{
                g=wait[game];
                g.player2 = nick;
                wait.splice(game,1);
                play.push(g);
            }

            fs.writeFileSync("data/games.json",JSON.stringify({"waiting":wait,"playing":play}));
            return g;
        }
        catch(err){
            console.log(err.message);
            throw err;
        }
    }

    //---------------------MODULE FUNCTIONS-------------------
    function update(id){}
    module.join  = function (nick,group,size) {
        try{
            let g = searchGame(group,size,nick);
            return g;
        }
        catch(err){
            console.log("Error searching game");
            throw err;
        }
    };
    module.play  = function (nick,game) {};
    module.leave = function (nick,game) {};

    return module;
}
