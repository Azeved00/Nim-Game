var conf;
var game;
showSection("Logo");

//this is to simplify debugging
showSection("Play");
conf= new Config({
    size: 5,
    first: true,
    ai: true,
    debug: false,
    lvl: 2
});
game = Game.getSaved();
