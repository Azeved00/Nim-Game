let config = {
    colls: 5,
    balls: [1,2,3,4,5] ,
    player: true, // true if the human is playing
    ai   : true, // se e contra o computador
    diff : 3, //dificuldade do ai
    play: false, //se esta em jogo 

    nimSum() {
        var sum = 0;
        for(var i = 0; i < this.colls; i++){
            sum = sum ^ this.balls[i];   
        }
        return sum;
    },

    move (a, b) {
        if(!this.play)
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
    
        this.player=!this.player;

        writeMessage(`Taken ${n} balls from ${col+1} collumn;`);
        return true;
    },

    draw() { 
        var board = getById("Board");
        board.innerHTML = "";

        for(var i = 0; i < this.colls; i++){
            var coll = createElem("ul");
            coll.className="coll";
            coll.dataset.number=i+1;
            for(var j = 0; j < this.balls[i]; j++){
                var ball = createElem("li");
                ball.className="ball";
                ball.addEventListener("mouseover", (e) => {
                    e.target.className = "hovered-ball";
                    var prev = e.target.previousSibling;
                    if(prev)
                        triggerEvent(prev, "mouseover");
                    e.target.parentNode.className="hovered-coll";
                });
                ball.addEventListener("mouseout", (e) => {
                    e.target.className = "ball";
                    var prev = e.target.previousSibling;
                    if(prev)
                        triggerEvent(prev, "mouseout");
                    e.target.parentNode.className="coll";
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
        for(let i = 0; i < this.colls;i++){
            this.balls[i] = i+1;
        }
    },
    giveUp(){
        if(this.play){
            getById("Board").innerHTML="";
            this.play=false;
            this.reload();
            writeMessage("You gave um on the game!");
        }
        else{
            writeMessage("Game not in progress!");
        }
    },
    game() {
        this.play = true;
        if(this.player == false)
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
            if(this.player){
                modal("FinishMessage", "Computer Won!");
                writeMessage("Computer Won!");
            }
            else{
                modal("FinishMessage","You Won!");
                writeMessage("You Won!");
            }
            this.reload();
            writeMessage("Play Again?");
        }
    }
};
