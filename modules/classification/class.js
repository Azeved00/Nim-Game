//opt should have
//who won, against the ai, dificulty, which user played 
var classTable = (() =>{
    let token = "class-table-token";
    (()=>{
        let curr = localStorage.getItem(token);
        if(!curr) localStorage.setItem(token,JSON.stringify({users:[]}));
    })();
    return {
        getEntries:()=>{
            let arr = JSON.parse(localStorage.getItem(token)).users;
            arr.sort((l,r)=>{
                return (l.vic/l.games) < (r.vic/r.games);
            })
            return arr;
        },
        addEntry:(input)=>{         
            if(input.ai==false)
                return false;

            let opt = Utils.setDefaults(input,{
                user: Navbar.getUser(),
                lvl:2,
                vic:true,
            });

            let upd = classTable.getEntries();
            let res =0;
            if(opt.vic) res=1;

            let i;
            for(i = 0; i < upd.length ;i++)
            {
                if(upd[i].user === opt.user && upd[i].ai === opt.lvl){
                    upd[i].games++;
                    upd[i].vic+=res;
                    break;
                }
            };
            if(i==upd.length)
                upd.push({
                    user: opt.user,
                    ai: opt.lvl,
                    games: 1,
                    vic: res,
                });
            
            Modals.Class.removeLocal();
            Modals.Class.addLocal(upd);
            
            localStorage.setItem(token,JSON.stringify({users: upd}));
            return true;
        }
    }
})()

//add entries saved in local storage
Utils.getById("localBtn").addEventListener("click", () => {
    Modals.Class.addLocal(classTable.getEntries());
})
//add event listener to refresh ranking
Utils.getById("globalBtn").addEventListener("click",async () => {
    await makeRequest({
        command:"ranking",
        group:true,
        debug:false,
        body:{
            "size":conf.size,
        },
        okCallback: (response) => {
            Modals.Class.removeGlobal();
            Modals.Class.addGlobal(response.ranking);
        },
    })
});
