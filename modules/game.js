require("./utils.js");
const updater = require("./updater.js");
const fs = require("fs");
const file = "data/games.json";

//---------------------GAME FUNCTIONS---------------------
function deleteGame(id){
    try{
        let data = JSON.parse(fs.readFileSync(file));
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
        "rack": [],
        "turn":false
    }
    let i;
    for(i=0;i < size;i++)
        game.rack[i] = i+1;
    setTimeout(()=>{deleteGame(game.id)},300000)
    return game;
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
            update(g);
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
    function update(game){
        //check if game has ended
        //search for the game
        updater.update(game.id,);
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
            //update(play[game].id);

            fs.writeFileSync(file,JSON.stringify({"waiting":wait,"playing":play}));
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
                wait[game].rack = [0];
                if(wait[game].player1 === nick)
                    wait[game].turn = true;
                else
                    wait[game].turn = false;
                update(id);
                wait.splice(game,1);
            }
            else{
                game = play.findIndex(e => (e.id === id));
                if(game !== -1){
                    play[game].rack = [0];
                    if(play[game].player1 === nick)
                        play[game].turn = true;
                    else
                        play[game].turn = false;
                    update(id);
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
