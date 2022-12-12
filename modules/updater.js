let responses = {};

module.exports.remember = function(game,response) {
    if(responses[game])
        responses[game].push(response);   
    else
        responses[game] = [response];
}

module.exports.forget = function(game,response) {
    let pos = responses[game].findIndex((resp) => resp === response);
    if(pos > -1) responses[game].splice(pos,1);
}

module.exports.update = function(game,input) {
    console.log(game);
    let message = input;
    if(typeof(input)==="object") message = JSON.stringify(input);
    
    for(let response of responses[game]) {
        response.write('data: '+ message+'\n\n');
    }
}
