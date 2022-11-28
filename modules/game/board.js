
class Game {
    static board = Utils.getById("Board");

    constructor(n,ai,start,dificulty){
        this.config = new Config(n);
        this.playing = start;   // who is playing right now 
        this.inGame = false;    // 
        this.size = 'calc((100vh - var(--navbar-height) - 2*var(--navbar-margin-y) - '+ this.colls + '*2*0.2em - 3em)/' + this.colls + ')';;      // size of the balls
    }

    nimSum(){
        let sum = 0;
        for(let i = 0; i < this.config.size; i++){
            sum = sum ^ this.rack[i];
        }
        return sum;
    }
    
    finish(){
        for(let i = 0; i < this.config.size; i++){
            if (this.rack[i] == 0)
                return false
        }
        return true;
    }

    start(){
        if(!this.inGame){
            this.reload();
            this.inGame = true;
        }
        
        if(this.playing === false)            
            ai(this);
        this.draw();

        this.board.querySelectorAll("li").forEach((ball) => {
        ball.addEventListener("click", (e) => {
                var otr = e.target.dataset.number,
                    coll = e.target.parentNode.dataset.number;
                this.move(coll,otr);
                this.game();
            });
        });


        if(this.finish()){
            if(this.playing){
                let res = "Computer Won!"
                modal("FinishMessage", res);
                writeMessage(res);
                classTable.addEntry("demo", this.ai, this.diff, this.false);
            }
            else{
                let res ="Congratulations, You won the game!"
                modal("FinishMessage",res);
                writeMessage(res);
                classTable.addEntry("demo",this.ai ,this.diff,true);
            }
            this.reload();
            writeMessage("Play Again?");
        }
    }
    draw(){}
    reload(){
        this.playing = this.config.start;
        for(let i = 0; i < this.config.size;i++){
            this.balls[i] = i+1;
        }
    },
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

        writeMessage(`Taken ${opt.balls} balls from ${opt.col+1} collumn;`);
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
            writeMessage("You gave um on the game!");
        }
        else{
            writeMessage("Game not in progress!");
        }
    }
}

let config = {
    draw() {
        var board = getById("Board");
        board.innerHTML = "";        
        for(var i = 0; i < this.colls; i++){
            var coll = createElem("ul");
            coll.className="coll";
            coll.style.setProperty('--ball-size', this.size);
            coll.dataset.number=i+1;
            for(var j = 0; j < this.balls[i]; j++){
                var ball = createElem("li");
                ball.className="ball";
                ball.style.setProperty('--ball-size', this.size);
                ball.addEventListener("mouseover", (e) => {
                    e.target.className = "hovered-ball";
                    var prev = e.target.previousSibling;
                    if(prev)
                        triggerEvent(prev, "mouseover");
                });
                ball.addEventListener("mouseout", (e) => {
                    e.target.className = "ball";
                    var prev = e.target.previousSibling;
                    if(prev)
                        triggerEvent(prev, "mouseout");
                });

                ball.dataset.number=j+1;
                coll.appendChild(ball);
            }
            board.appendChild(coll);
        }
    },

    reload(){

    }
    
};
