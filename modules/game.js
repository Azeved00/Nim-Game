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
    function update(id){
        console.log("game " + id + " updated")
        deleteGame(id);
    }
    module.join  = function (nick,group,size) {
        try{
            let g = searchGame(group,size,nick);
            return {"game":g.id};
        }
        catch(err){
            console.log("Error searching game");
            throw err;
        }
    };
    module.play  = function (nick,game) {};
    module.leave = function (nick,id) {
        try{
            let data = JSON.parse(fs.readFileSync("data/games.json"));
            let wait = data.waiting, play = data.playing;

            let game = wait.findIndex(e => (e.id === id));
            if(game !== -1) {
                wait[game].rack = [0];
                if(wait[game].player1 === nick)
                    wait[game].who = true;
                else
                    wait[game].who = false;
                update(id);
                wait.splice(game,1);
            }
            else{
                game = play.findIndex(e => (e.id === id));
                if(game !== -1){
                    play[game].rack = [0];
                    if(play[game].player1 === nick)
                        play[game].who = true;
                    else
                        play[game].who = false;
                    update(id);
                    play.splice(game,1);
                }
                else{
                    return false;
                }
            }
            
            fs.writeFileSync("data/games.json",JSON.stringify({"waiting":wait,"playing":play}));
            return true;
        }
        catch(err){
            console.log(err.message);
            throw err;
        }        
    };

    return module;
}
