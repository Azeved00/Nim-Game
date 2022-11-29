
class Game {
    static board = Utils.getById("Board");
    
    reload(){
        this.playing = this.config.first;
        for(let i = 0; i < this.config.size;i++){
            this.rack[i] = i+1;
        }
    }
    
    constructor(conf){
        this.config = conf;
        this.playing = conf.first;   // who is playing right now 
        this.inGame = false;    // 
        this.cssSize = 'calc((100vh - var(--navbar-height) - 2*var(--navbar-margin-y) - '+ this.config.size + '*2*0.2em - 3em)/' + this.config.size + ')';      // size of the balls
        this.rack = [];
        this.size = conf.size;
        this.reload();
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
            if (this.rack[i] == 0)
                return true;
        }
        return false;
    }

    start(){
        if(!this.inGame){
            this.reload();
            this.inGame = true;
        }
        
        if(this.playing === false)            
            ai(this);
        this.draw();

        Game.board.querySelectorAll("li").forEach((ball) => {
        ball.addEventListener("click", (e) => {
                var otr = e.target.dataset.number,
                    coll = e.target.parentNode.dataset.number;
                this.move(coll,otr);
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
            coll.dataset.number=i+1;
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
    }


    //takes object with col and ball
    play(input){
        let opt = Utils.setDefaults(input,{
            balls: -1,
        })
        if(!this.inGame)
            return false;

        opt.col = parseInt(opt.col);
        opt.balls = parseInt(opt.balls);
        if(Utils.isNOE(opt.col) || Utils.IsNOE(opt.balls) ) return false;
        opt.col-=1;

        if(opt.balls === -1){
            this.rack[opt.col] = 0;
        }
        else{
            this.rack[opt.col]-=opt.balls; 
        }

        if(this.rack[col] < 0){ 
            this.rack[col] = 0;
        }

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
