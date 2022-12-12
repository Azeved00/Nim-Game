let responses = {};
let signal = [];

const fs = require("fs");

module.exports.update = function(game,input) {
    let message = input;
    if(typeof(input)==="object") message = JSON.stringify(input);
    
    console.log("updating " + responses[game].length + " responses -> " + message);    
    
    for(let response of responses[game]) {
        response.write("data: "+message+"\n\n");
    }
}

module.exports.remember = function(id,response) {
    if(responses[id])
        responses[id].push(response);   
    else
        responses[id] = [response];
    
    let s = signal.findIndex(e => e === id);
    if(s === -1) return;
    signal.splice(s,1);

    let data = JSON.parse(fs.readFileSync("data/games.json"));
    let play = data.playing;
    let game = play.find(e =>(e.id === id ));

    console.log("Updating: "+ JSON.stringify(game))
    let turn = game.player1;
    if(game.turn===false) turn = game.player2;
        
    setTimeout(() => {module.exports.update(game.id,{
        "turn":turn,
        "rack": game.rack
    })},500);
}

module.exports.forget = function(game,response) {
    let pos = responses[game].findIndex((resp) => resp === response);
    if(pos > -1) responses[game].splice(pos,1);
}

module.exports.signal = function(game){
    signal.push(game);
}

