/*
The End Runner
William Porter
*/

var game = new Phaser.Game(1080, 550, Phaser.AUTO);

// Setup game states
game.state.add('Title', Title);
game.state.add('Play', Play);
game.state.add('GameOver', GameOver);
game.state.start('Title');

//////////////
//PAUSE CODE//
//////////////

//CODE FROM NATHAN'S P2 PHYSICS CODE EXAMPLE
  // bind pause key to browser window event
window.onkeydown = function(event) {
	// capture keycode (event.which for Firefox compatibility)
	var keycode = event.keyCode || event.which;
	if(keycode === Phaser.Keyboard.P) {
		pauseGame();
	}
}

//CODE FROM NATHAN'S P2 PHYSICS CODE EXAMPLE
function pauseGame() {
	// toggle game pause
	game.paused ? game.paused = false : game.paused = true;
}

/////////////////////
//END OF PAUSE CODE//
/////////////////////
