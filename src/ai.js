function ai(b){
    var mv = {pile: -1, otr: -1};
    switch (b.diff){
        case 1:
            break;
        case 2:
            break;
        case 3:
            mv = aiLvl3(b);
            break;
    }
    b.move(mv.pile, mv.otr);
}

function aiLvl3(b)
{
    let nimSum = b.nimSum(),
        piles = b.balls,
        move = { pile: -1, otr: -1};
 
    if (nimSum != 0)
    {
        for (let i = 0; i < b.colls; i++)
        {
            if ((piles[i] ^ nimSum) < piles[i])
            {
                move.pile = i;
                move.otr = piles[i] - (piles[i] ^ nimSum);
                break;
            }
        }
    } 
    else
    {
        let non_zero_indices = new Array(b.colls);
        var count= 0;
 
        for (let i=0; i<b.colls; i++)
            if (piles[i] > 0)
                non_zero_indices [count++] = i;
 
        move.pile = Math.floor(Math.random() * (count));
        move.otr = 1 + Math.floor(Math.random() * (piles[move.pile]));
    
    }
    move.pile+=1;
    return move;
}
