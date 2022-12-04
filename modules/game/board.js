class Game {
    static board = Utils.getById("Board");
    static trigger(e) {Utils.triggerEvent(Game.board,e);}
    static token = "game-token";
    static getSaved(){
        let ls = localStorage.getItem(Game.token);
        if(!ls)return null;

        let arr = JSON.parse(localStorage.getItem(Game.token)).ingame;
        let t = null;
        arr.forEach((elem,i)=>{
            if(elem.user  == Navbar.getUser()){
                t = elem;
            }
        })
        if(!t)return null;        
    
        let g = new Game(t.config)
        g.rack = t.rack;
        g.playing = t.playing;
        Game.trigger("play");
        Utils.triggerEvent(Utils.getById("commandsTab"),"gameLoaded");
        return g;
    }

    async setUp () {
        if(!this.id){
            await makeRequest({
                "command" : "join",
                "body": {
                    "nick": Navbar.getUser(),
                    "password": Navbar.getPassword(),
                    "size": this.size,
                },
                "group":true,
                "okCallback": (body) => {
                    this.id = body.game;
                },
            })

        }

        let url = `http://twserver.alunos.dcc.fc.up.pt:8008/update?nick=${Navbar.getUser()}&game=${this.id}`
        this.eventSource = new EventSource(url);
        this.eventSource.onmessage = (ev) => {
            const data = JSON.parse(ev.data);
            console.log(data);
            if(this.inGame === false){
                if(data.winner && data.winner === null){
                    Modals.Msgs.edit({
                        title:"Game Timed Out!",
                        show:true,
                        message:"Opponent was now found",
                        closeBtn:true,
                        buttons:[
                            {
                                text:"Ok",
                                callback: () => {
                                    Modals.Msgs.toggle();
                                },
                            }
                        ]
                    })
                    this.end();
                    return null;
                }
                Utils.triggerEvent(Utils.getById("commandsTab"),"found");
                this.inGame = true;
                Modals.Msgs.edit({
                    title:"Game Started!",
                    show:true,
                    message:"Opponent was found and the game has started",
                    closeBtn:true,
                    buttons:[
                        {
                            text:"Ok",
                            callback: () => {
                                Modals.Msgs.toggle();
                            },
                        }
                    ]
                })
            }
            if(data.winner){
                let res;
                if(data.winner == Navbar.getUser()) res = "You Won!";
                else res = "You Lost!";
                Modals.Msgs.edit({
                    title:"Game Finished!",
                    show:true,
                    message:res,
                    closeBtn:false,
                    buttons:[
                        {
                            text:"Ok",
                            callback: () => {
                                Modals.Msgs.toggle();
                                Utils.triggerEvent(Utils.getById("commandsTab"),"gameEnded");
                            },
                        }
                    ]
                })
                this.end();
            }
            else{
                this.rack = data.rack;
                this.playing = (Navbar.getUser() == data.turn);
                Game.trigger("play");
            }
        }
    }
    
    ai(){
        //this function is in another file
        AI(this);
    }

    main(){
        this.draw();
        //this needs to be redone
        if(!this.finish()){
            if(this.config.ai===true && this.playing === false){
                this.ai();
                this.save();
            } 
        }
    }

    save(){
        if(!this.config.ai) return false;

        let temp = {};
        temp.user = Navbar.getUser();
        if(temp.user === "")
            return false;
        temp.config = this.config;
        temp.rack = this.rack;
        temp.playing = this.playing;

        let ls = localStorage.getItem(Game.token);
        let arr=[];
        if(ls) arr = JSON.parse(ls).ingame;
        let a = true;
        arr.forEach((elem,i)=>{
            if(elem.user  == temp.user){
                arr[i]=temp;
                a = false;
            }
        })
        if(a)arr.push(temp);

        localStorage.setItem(Game.token,JSON.stringify({ingame:arr}));
    }

    constructor(conf){
        this.config = conf;
        this.size = conf.size;
        this.rack = [];
        this.inGame = false;

        this.playing = conf.first;   // who is playing right now 
        this.cssSize = 'calc((100vh - var(--navbar-height) - 2*var(--navbar-margin-y) - '+ this.config.size + '*2*0.2em - 3em)/' + this.config.size + ')';      // size of the balls
        
        // prepare everything
        Game.board.onplay = () => {this.main();};
        for(let i = 0; i < this.config.size;i++){
            this.rack[i] = i+1;
        }


        Game.trigger("play");
        if(this.config.ai)
        {
            Utils.triggerEvent(Utils.getById("commandsTab"),"found");
            this.inGame = true;
        }   
        else{
            this.setUp();
        }

    }

    nimSum(){
        let sum = 0;
        for(let i = 0; i < this.config.size; i++){
            sum = sum ^ this.rack[i];
        }
        return sum;
    }
    
    finish(){
        for(let i = 0; i < this.size; i++){
            if (this.rack[i] != 0)
                return false;
        }


        let res = ""
        if(this.playing) res = "Computer Won!";
        else res = "Congratulations, You won the game!";
        
        Modals.Msgs.edit({
            title:"Finished Game!",
            show:true,
            message:res,
            closeBtn:false,
            buttons:[
                {
                    text:"Ok",
                    callback: () => {
                        Modals.Msgs.toggle();
                        Utils.triggerEvent(Utils.getById("commandsTab"),"gameEnded");
                    },
                },
                {
                    text:"Restart",
                    callback:() => {
                        this.end();
                        game = new Game(conf);
                        Modals.Msgs.toggle();
                    }
                }
            ]
        })
        classTable.addEntry({
            user:Navbar.getUser(),
            ai: this.config.ai,
            lvl: this.config.lvl,
            vic: !this.playing
        });
        this.end();
        Messages.add(res);
        return true;
    }

    draw(){
        Game.board.innerHTML = "";        
        for(let i = 0; i < this.size; i++){
            let coll = Utils.createElem({
                tag: "ul",
                cls: "coll",
            });
            coll.style.setProperty('--ball-size', this.cssSize);
            coll.dataset.number=i;
            for(let j = 0; j < this.rack[i]; j++){
                let ball = Utils.createElem({
                    tag: "li",
                    cls: "ball"
                });
                ball.style.setProperty('--ball-size', this.cssSize);
                ball.addEventListener("mouseover", (e) => {
                    e.target.className = "hovered-ball";
                    let prev = e.target.previousSibling;
                    if(prev)
                        Utils.triggerEvent(prev, "mouseover");
                });
                ball.addEventListener("mouseout", (e) => {
                    e.target.className = "ball";
                    let prev = e.target.previousSibling;
                    if(prev)
                        Utils.triggerEvent(prev, "mouseout");
                });

                ball.dataset.number=j+1;
                coll.appendChild(ball);
            }
            Game.board.appendChild(coll);
        }

        Game.board.querySelectorAll("li").forEach((ball) => {
            ball.addEventListener("click", (e) => {
                var otr = e.target.dataset.number,
                    coll = e.target.parentNode.dataset.number;
                if(this.play({
                    "pile":coll,
                    "otr":otr
                }))
                Game.trigger("play");
            });
        });
    }

    //takes object with col and ball
    play(input){
        let opt = Utils.setDefaults(input,{
            otr: -1,
            isAi: false,
        })
        if(this.inGame == false){            
            Modals.Msgs.edit({
                title:"Invalid Move",
                show:true,
                message:"Game has not started!",
                buttons:[
                    {
                        text:"Ok",
                        callback: Modals.Msgs.toggle,
                    }
                ]
            })
            return false;
        }
        if(this.playing === true && opt.isAi === true) return false;
        if(this.playing === false && opt.isAi === false){
            Modals.Msgs.edit({
                title:"Invalid Move",
                show:true,
                message:"It's not your turn!",
                buttons:[
                    {
                        text:"Ok",
                        callback: Modals.Msgs.toggle,
                    }
                ]
            })
            return false;
        }

        opt.pile = parseInt(opt.pile);
        opt.otr = parseInt(opt.otr);
        if(opt.pile !== 0  && Utils.isNOE(opt.pile) || Utils.isNOE(opt.otr)) return false;

        if(this.config.ai===false){
            makeRequest({
                "command" : "notify",
                "body": {
                    "nick": Navbar.getUser(),
                    "password": Navbar.getPassword(),
                    "game": this.id,
                    "stack": opt.pile,
                    "pieces": this.rack[opt.pile]-opt.otr,
                },
                "group":true,
            })

        }else{
            if(opt.otr === -1)
                this.rack[opt.pile] = 0;
            else
                this.rack[opt.pile]-=opt.otr; 

            if(this.rack[opt.pile] < 0) 
                this.rack[opt.pile] = 0;
        }
        this.playing=!this.playing;

        Messages.add(`Taken ${opt.balls} balls from ${opt.col+1} collumn;`);
        return true;
    }

    async giveUp(){
        Modals.Msgs.edit({
            title:"Finished Game!",
            show:true,
            message:"You gave up on the game!",
            buttons:[
                {
                    text:"Ok",
                    callback: Modals.Msgs.toggle,
                },
                {
                    text:"Restart",
                    callback:() => {
                        Modals.Msgs.toggle();
                    }
                }
            ]
        })
        if(this.config.ai){
            classTable.addEntry({
                user:Navbar.getUser(),
                ai: this.config.ai,
                lvl: this.config.lvl,
                vic: false,
            });
        }
        else{
            await makeRequest({
                command:"leave",
                body:{
                    nick: Navbar.getUser(),
                    password: Navbar.getPassword(),
                    game: this.id
                }
            })
        }
        this.end();
        Messages.add("You gave up the the game!");
    }

    async cancelSearch(){
        Modals.Msgs.edit({
            title:"Opponent Not Found",
            show:true,
            message:"You canceled the search before an opponent was found!",
            buttons:[
                {
                    text:"Ok",
                    callback: Modals.Msgs.toggle,
                },
            ]
        })
        await makeRequest({
            command:"leave",
            body:{
                nick: Navbar.getUser(),
                password: Navbar.getPassword(),
                game: this.id
                }
        })
        this.end();
        Messages.add("Opponent Search was cancelled");
    }

    end(){
        Game.board.innerHTML="";
        Game.board.onplay = () => {};
        if(!this.config.ai)
            this.eventSource.close();
        delete this;

        let ls = localStorage.getItem(Game.token);
        if(!ls) return;
        let arr = JSON.parse(ls).ingame;
        arr.forEach((elem,i)=>{
            if(elem.user  == Navbar.getUser()){
                arr.splice(i,1);
            }
        })
        localStorage.setItem(Game.token,JSON.stringify({ingame:arr}));
    }
}

//add event listeners for some events that might ocu
Game.board.addEventListener("login", () => {
    game = Game.getSaved();
})
Game.board.addEventListener("logout", () => {
    if(game){
        game.save();
        game.end();
        Utils.triggerEvent(Utils.getById("commandsTab"),"gameUnloaded")
    }
})
