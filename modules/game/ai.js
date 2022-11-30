async function AI (b) {
    function bestMv(b){
        let nimSum = b.nimSum(),
            piles = b.rack,
            move = { pile: -1, otr: -1};

        for (let i = 0; i < b.size; i++){
            if ((piles[i] ^ nimSum) < piles[i]){
                move.pile = i;
                move.otr = piles[i] - (piles[i] ^ nimSum);
                break;
            }
        }

        return move;
    }

    function randomMv(b){
        let non_zero_indices = new Array(b.size),
            count= 0,
            piles = b.rack,
            move = { pile: -1, otr: -1};

        for (let i=0; i<b.size; i++)
            if (piles[i] > 0)
                non_zero_indices [count++] = i;

        //debugger;
        move.pile = non_zero_indices[Math.floor(Math.random() * (count))];
        move.otr = 1 + Math.floor(Math.random() * (piles[move.pile]));
        return move;
    }
    
    let mv = {pile: -1, otr: -1};
    if(b.nimSum() == 0){
        mv = randomMv(b);
    }
    else{
        switch (b.config.lvl){
            case 1:
                mv = randomMv(b);
                break;
            case 2:
                let m = Math.floor(Math.random() * 2);
                if(m == 1)
                    mv = bestMv(b)
                else
                    mv = randomMv(b);
                break;
            case 3:
                mv = bestMv(b);
            break;
        }
    }

    mv.isAi=true;
    await Utils.sleep(1000);
    b.play(mv);
    Game.trigger("play");
}

