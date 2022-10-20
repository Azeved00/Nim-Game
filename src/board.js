let config = {
    colls   : 5,
    balls   : [1,2,3,4,5] ,
    start   : true,  //who starts the game (true if human)
    playing : true,  // true if the human is playing
    ai      : true,  // se e contra o computador
    diff    : 2,     //dificuldade do ai
    inGame  : false, //se esta em jogo
    size : "3em",

    nimSum() {
        var sum = 0;
        for(var i = 0; i < this.colls; i++){
            sum = sum ^ this.balls[i];
        }
        return sum;
    },

    move (a, b) {
        if(!this.inGame)
            return false;

        var col = parseInt(a);
        if(isNaN(col)) return false;
        col-=1;

        if(b === ""){
            this.balls[col] = 0;
        }
        else{
            var n = parseInt(b);
            if(isNaN(col)) return false;
            this.balls[col]-=n;
            if(this.balls[col] < 0) this.balls[col] = 0;
        }

        this.playing=!this.playing;

        writeMessage(`Taken ${n} balls from ${col+1} collumn;`);
        return true;
    },

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

    finish() {
        for(let i = 0; i < this.colls; i ++){
            if(this.balls[i] != 0)
                return false;
        }
        return true;
    },
    reload(){
        this.playing = this.start;
        for(let i = 0; i < this.colls;i++){
            this.balls[i] = i+1;
        }

        this.size = 'calc((100vh - var(--navbar-height) - 2*var(--navbar-margin-y) - '+ this.colls + '*2*0.2em - 3em)/' + this.colls + ')';

    },
    giveUp(){
        if(this.inGame){
            getById("Board").innerHTML="";
            this.inGame=false;
            this.reload();
            modal("FinishMessage", "You Gave up!");
            classTable.addEntry("demo", this.ai, this.diff, this.false);
            writeMessage("You gave um on the game!");
        }
        else{
            writeMessage("Game not in progress!");
        }
    },
    game() {
        if(!this.inGame){
            this.reload();
            this.inGame = true;
        }
        
        if(this.playing === false)            
            ai(this);
        this.draw();

        getById("Board").querySelectorAll("li").forEach((ball) => {
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
                let res ="You Won!"
                modal("FinishMessage",res);
                writeMessage(res);
                classTable.addEntry("demo",this.ai ,this.diff,true);
            }
            this.reload();
            writeMessage("Play Again?");
        }
    }
};
