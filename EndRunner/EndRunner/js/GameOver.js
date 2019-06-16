//GameOver.js

var GameOver = function(game) {};
GameOver.prototype = {
  init:function(score){
    this.gameOverText = game.add.text(game.width/2, game.height/2, 'You died\npress UP to try again!\nYour score was: ' + score, {font: 'Helvetica', fontSize: '32px', fill: '#fff'});
    this.gameOverText.anchor.setTo(0.5, 0.5)
  },

preload: function(){},

create: function(){
},

update: function(){
  if(game.input.activePointer.isDown) {
    game.state.start('Play');
    newHighScore = false;
  }
},

}
