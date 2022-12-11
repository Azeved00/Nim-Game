require('./utils.js');
const   fs = require('fs');

module.exports = function () {
    let module = {}

    let ranking = {}
    function validateParams(group,size){
        if(typeof(group) !== "number" || Math.floor(group) !== group) 
            return "Group must be an integer";
        else if(group < 0) 
            return "Group must be greater than 0";
        else if(typeof(size) !== "number" || Math.floor(size) !== size)
            return "Size must be an Integer";
        else if(size<1 || size > 100)
            return "Size should be between 1 and 100";
        else
            return true; 
    }

    function getRanking(group,size){
        try{
            let data = fs.readFileSync("data/leaderboard.json");
            data = JSON.parse(data.toString())["group"+group]
            if(!data)
                return [];
            
            data = data["size"+size];
            
            if(!data){
                data = []
            }
            return data; 
        }
        catch(err){
            throw err;
        }
    }

    function setRanking(group,size,ranking){
        try{
            let data = JSON.parse(fs.readFileSync("data/leaderboard.json"));
            if(!data["group"+group]){
                data["group"+group] = {}
            }
        
            data["group"+group]["size"+size] = ranking;
            fs.writeFileSync("data/leaderboard.json",JSON.stringify(data));
            ranking = null;
        }
        catch(err){
            throw err;
        } 
    }

    module.addEntry = (input) => {
        let opt = setDefaults(input,{
            size:5,
            group:5,
            result:true
        })

        let rank = getRanking(opt.group,opt.size);
        const search = rank.findIndex(elem => elem.nick === opt.nick);
        let res = 0;
        if(opt.result===true) res += 1;

        if(search === -1){
            rank.push({
                "nick":opt.nick,
                "games":1,
                "victories":res,
            })
        }
        else {
            rank[search].games+=1;
            rank[search].victories+=res;
        }

        setRanking(opt.group,opt.size,rank);
    }

    module.checkRank = (response,body) => {
        try{
            let valid = validateParams(body.group, body.size);
            if(valid !== true) return sendError(response,{msg: valid});

            let data = getRanking(body.group, body.size);
            data.sort((a,b)=>{return b.victories - a.victories});

            sendJSON(response,data.slice(0,9));
        }
        catch (err){
            console.log(err.message);
            sendError(response,{code:500,msg:"Servidor Error"})
        }
    }

    return module;
}
