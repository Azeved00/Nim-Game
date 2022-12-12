
require("./utils.js");
const updater = require("./updater.js");
const fs = require("fs");
const rank = require("./ranking.js")();
const file = "data/games.json";

//---------------------GAME FUNCTIONS---------------------
function deleteGame(id){
    try{
        console.log("Deleting " + id);
        let data = JSON.parse(fs.readFileSync(file));
        let wait = data.waiting, play = data.playing;

        let game = wait.findIndex(e => (e.id === id));
        if(game !== -1) wait.splice(game,1);

        let game2 = play.findIndex(e => (e.id === id));
        if(game2 !== -1) play.splice(game2,1);

        fs.writeFileSync(file,JSON.stringify({"waiting":wait,"playing":play}));
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
        "rack": [],
        "turn":false
    }
    let i;
    for(i=0;i < size;i++)
        game.rack[i] = i+1;
    setTimeout(()=>{deleteGame(game.id)},300000)
    return game;
}

function finished (game){
    let i;
    for(i = 0; i < game.size; i++)
        if(game.rack[i] !== 0) return false;
    return true;
}


function update(game,inWait = false){
    if(finished(game) ) {
        rank.addEntry({
            "nick":game.player1,
            "result":!game.turn,
            "group":game.group,
            "size":game.size
        });
        rank.addEntry({
            "nick":game.player2,
            "result":game.turn,
            "group":game.group,
            "size":game.size
        })

        if(inWait) updater.update(game.id,{"winner":null});
        if(game.turn === true) updater.update(game.id,{"winner":game.player2});
        else updater.update(game.id,{"winner":game.player1}); 
        deleteGame(game.id);
        return;
    }
    
    console.log("Updating: "+ JSON.stringify(game));
    let turn = game.player1;
    if(game.turn===false) turn = game.player2;
    
    //search for the game
    updater.update(game.id,{
        "turn":turn,
        "rack": game.rack
    });
}

function searchGame(group,size,nick){
    try{
        let data = JSON.parse(fs.readFileSync(file));
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
            updater.signal(g.id);
        }

        fs.writeFileSync(file,JSON.stringify({"waiting":wait,"playing":play}));
        return g;
    }
    catch(err){
        console.log(err.message);
        throw err;
    }
}

module.exports = function () {
    let module = {};

    //---------------------MODULE FUNCTIONS------------------- 

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
    
    module.play  = function (nick,id,stack,pieces) {
        try{
            if(typeof(stack) !== "number" || Math.floor(stack) !== stack || stack < 0) return "Invalid Move";
            if(typeof(pieces) !== "number" || Math.floor(pieces) !== pieces || pieces < 0) return "Invalid Move";
            
            let data = JSON.parse(fs.readFileSync(file));
            let wait = data.waiting, play = data.playing;

            let game = play.findIndex(e =>(e.id === id ));
            if(game === -1) return "Couldn't Find Game";
            
            if(play[game].player1 === nick){
                if(play[game].turn !== true) return "Not your turn";

                play[game].turn = false;
            }    
            else if (play[game].player2 === nick){
                if(play[game].turn !== false) return "Not Your turn";
                
                play[game].turn = true;
            }
            else return "Player is not part of game";
            
            if(play[game].rack[stack] <= pieces) return "Invalid Move";
            play[game].rack[stack] = pieces;
            
            fs.writeFileSync(file,JSON.stringify({"waiting":wait,"playing":play}));
            update(play[game]);
            return true;
        }
        catch(err){
            console.log(err.message);
            throw err;
        }                
    };
    
    module.leave = function (nick,id) {
        try{
            let data = JSON.parse(fs.readFileSync(file));
            let wait = data.waiting, play = data.playing;

            let game = wait.findIndex(e => (e.id === id));
            if(game !== -1) {
                wait[game].rack = Array(wait[game].size).fill(0);
                if(wait[game].player1 === nick)
                    wait[game].turn = true;
                else
                    wait[game].turn = false;
                update(wait[game],false);
                wait.splice(game,1);
            }
            else{
                game = play.findIndex(e => (e.id === id));
                if(game !== -1){
                    play[game].rack =  Array(play[game].size).fill(0);
                    if(play[game].player1 === nick)
                        play[game].turn = true;
                    else
                        play[game].turn = false;
                    update(play[game]);
                    play.splice(game,1);
                }
                else{
                    return false;
                }
            }
            
            fs.writeFileSync(file,JSON.stringify({"waiting":wait,"playing":play}));
            return true;
        }
        catch(err){
            console.log(err.message);
            throw err;
        }        
    };

    return module;
}
