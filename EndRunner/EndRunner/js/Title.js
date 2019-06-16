//Code greatly mangled from nathan altice's class coding examples
// Title state

var Title = function(game) {};
Title.prototype = {

	preload(){

		//preload assets
		game.load.atlas('sprites', 'assets/img/sprites.PNG', 'assets/img/sprites.JSON');
		game.load.image('platform','assets/img/platform.PNG');
		game.load.image('tileBKGD', 'assets/img/tileBKGD.PNG');

		game.load.audio('pop01', 'assets/audio/pop01.mp3');
		game.load.audio('ding', 'assets/audio/ding.wav');
		game.load.audio('music', 'assets/audio/music.mp3');
		console.log('you are in title');
	},

	create() {

		game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

		//TITLE SCREEN TEXT
		var titleText = game.add.text(game.width/2, game.height/2, 'End Runner', {font: 'Helvetica', fontSize: '48px', fill: '#fff'});
		titleText.anchor.set(0.5);

		var instructText = game.add.text(game.width/2, game.height/2 + 62, 'Use the ARROW keys to dodge baddies! \nCollect Stars and Diamonds!', {font: 'Helvetica', fontSize: '24px', fill: '#fff'});
		instructText.anchor.set(0.5);

		var playText = game.add.text(game.width/2, game.height*.8, 'Press UP to Start', {font: 'Helvetica', fontSize: '24px', fill: '#fff'});
		playText.anchor.set(0.5);

	},

	update() {
		// check for UP input
		if(game.input.activePointer.isDown){
		game.state.start('Play');
		newHighScore = false;
	}
	}
};
