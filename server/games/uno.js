class Uno {
    
    constructor(game, config) {
        this.game = game;
        this.config = config;
    }
    handleCore = (socket) =>{
        socket.on('startGame', function(data){

        });
        socket.on('startRound', function(data){

        });
        socket.on('restartGame', function(data){

        });
        socket.on('endGame', function(data){

        });
    }
    handlePlayerTurn = (socket) =>{
        socket.on('playCard', function(data){

        });
        socket.on('drawCard', function(data){

        });
        socket.on('ranOutOfTime', function(data){

        });
        socket.on('forceDraw', function(data){
            
        })
    }
    handleUNO = (socket) =>{
        socket.on('uno', function(data){

        });
        socket.on('shoutUno', function(data){

        });
        socket.on('pauseGame', function(data){

        });
        socket.on('unpauseGame', function(data){
            
        });
    }
    hanldeRules = (socket) => {
        socket.on('switchCards', function(data){

        });
        socket.on('bluffing', function(data){

        });
        socket.on('jumpIn', function(data){

        });
        socket.on('drawingToMatch', function(data){

        });
        socket.on('stackCard', function(data){

        });
        socket.on('forcedPlay', function(data){

        });
    } 
    handleConnection = (socket) =>{
        socket.on('joinGame', function(data){

        });
        socket.on('leftGame', function(data){

        });
        socket.on('forceUpdate', function(data){

        });
        socket.on('emote', function(data){

        });
    }
};
function UnoConfig (time, playerMax, turnTime, forcePlay = false, drawToMatch = false, zeroSeven = false, jumpIn = false, stacking = false,  noBluffing = false, rounds = 1){
    this.time = time > 1200 ? 1200 : time;
    this.playerMax = playerMax > 6 ? 6 : playerMax;
    this.playerMin = 2;
    this.enableBots = false;
    this.turnTime = time > 30 ? 30 : turnTime;
    this.forcePlay = forcePlay;
    this.drawToMatch = drawToMatch;
    this.zeroSeven = zeroSeven;
    this.jumpIn = jumpIn;
    this.stacking = stacking;
    this.noBluffing = noBluffing;
    this.rounds = rounds;
    return this;
}
function UnoPlayer (userId, cards){
    this.id = userId;
    this.cards = cards;
    this.saidUno = false;
    this.saidUnoTime = Date.now();
    this.cardsPlayed = 0;
    this.cardHits = 0;
    this.callOuts = 0;
    this.wins = 0;
    this.placed = [];
    return this;
}
function UnoCard(color, number, special, type){
    this.color = color;
    this.number = number;
    this.special = special;
    this.type = type;
    return this;
}
