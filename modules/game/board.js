
class Game {
    static board = Utils.getById("Board");

    async setUp () {
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
        let url = `http://twserver.alunos.dcc.fc.up.pt:8008/update?nick=${Navbar.getUser()}&game=${this.id}`
        this.eventSource = new EventSource(url);
        console.log(this.id);
    }
    ai(){
        //this function is in another file
        AI(this);
    }

    constructor(conf){
        this.config = conf;
        this.size = conf.size;
        this.inGame = false; 
        this.rack = [];

        this.playing = conf.first;   // who is playing right now 
        this.cssSize = 'calc((100vh - var(--navbar-height) - 2*var(--navbar-margin-y) - '+ this.config.size + '*2*0.2em - 3em)/' + this.config.size + ')';      // size of the balls
        
        // prepare everything 
        for(let i = 0; i < this.config.size;i++){
            this.rack[i] = i+1;
        } 
        if(this.config.ai){
            if(!this.playing)
                this.ai();
        } 
        else 
            this.setUp();

        Game.board.addEventListener("play",() => {
            this.draw();
        });
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
        return true;
    }

    game(){
        if(!this.inGame){
            this.reload();
            this.inGame = true;
        }
        
        if(this.playing === false)            
            AI(this);
        this.draw();

        Game.board.querySelectorAll("li").forEach((ball) => {
        ball.addEventListener("click", (e) => {
                var otr = e.target.dataset.number,
                    coll = e.target.parentNode.dataset.number;
                this.play({
                    "pile":coll,
                    "otr":otr
                });
                this.game();
            });
        });


        if(this.finish()){
            let res = ""
            if(this.playing) res = "Computer Won!";
            else res = "Congratulations, You won the game!";
            
            Modals.Msgs.edit({
                title:"Finished Game!",
                show:true,
                message:res,
                buttons:[
                    {
                        text:"Ok",
                        callback: Modals.Msgs.toggle,
                    },
                    {
                        text:"Restart",
                        callback:() => {
                            this.reload();
                            Modals.Msgs.toggle();
                        }
                    }
                ]
            })
            Messages.add(res);
            classTable.addEntry({
                user:Navbar.getUser(),
                ai: this.ai,
                lvl: this.diff,
                vic: !this.playing
            });
            this.reload();
            Messages.add("Play Again?");
        }
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
                this.play({
                    "pile":coll,
                    "otr":otr
                });
                this.game();
            });
        });

    }

    //takes object with col and ball
    play(input){
        let opt = Utils.setDefaults(input,{
            otr: -1,
        })
        if(!this.inGame)
            return false;

        opt.pile = parseInt(opt.pile);
        opt.otr = parseInt(opt.otr);
        if(opt.pile !== 0  && Utils.isNOE(opt.pile) || Utils.isNOE(opt.otr)) return false;

        if(opt.otr === -1)
            this.rack[opt.pile] = 0;
        else
            this.rack[opt.pile]-=opt.otr; 

        if(this.rack[opt.pile] < 0) 
            this.rack[opt.pile] = 0;

        this.playing=!this.playing;

        Messages.add(`Taken ${opt.balls} balls from ${opt.col+1} collumn;`);
        return true;
    }

    giveUp(){
        if(this.inGame){
            this.board.innerHTML="";
            this.inGame=false;
            this.reload();
            modal("FinishMessage", "You Gave up!");
            classTable.addEntry({
                ai: this.config.lvl,
                vic: false,
            });
            Messages.add("You gave um on the game!");
        }
        else{
            Messages.add("Game not in progress!");
        }
    }
}
