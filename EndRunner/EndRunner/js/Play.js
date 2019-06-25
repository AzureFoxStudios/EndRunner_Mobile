
var Play = function(game) {};
Play.prototype = {

preload: function() {
	console.log('You are in play state');
},

create: function() {


	game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

	//make LR buttons
	//start at 100% alpha then fade to 0 after 10 seconds
	//if pointer1 and pointer2 at the same time to jump.

	//music cc0 from https://freesound.org/people/onderwish/sounds/416070/
	this.music = game.add.audio('music', 0.1);
	this.music.play('', 0, 1, true);

	//place your assets

	this.tileBKGD = game.add.tileSprite(0, 0, 1080, 550, 'tileBKGD');

	game.physics.startSystem(Phaser.Physics.ARCADE); //enables arcade game physics

	this.platforms = game.add.group(); //initializes platfroms to walk on

	this.platforms.enableBody = true; //enables physics for the platforms

	var ground = this.platforms.create(0,game.world.height - 80, 'platform'); //creates a platform called ground

	ground.body.immovable = true; //makes ground stationary

	this.cursors = game.input.keyboard.createCursorKeys();// looks for keyboard commands

	this.player = game.add.sprite(32, game.world.height - 250, 'sprites', 'dude1'); //player's character created
	game.physics.arcade.enable(this.player); //enables the player to have physics
	this.player.body.bounce.y = 0.2; //players physics properties
	this.player.body.gravity.y = 1500;
	this.player.body.collideWorldBounds = true;
	this.player.body.setSize(30, 48);

	this.player.animations.add('right', Phaser.Animation.generateFrameNames('dude', 1, 4), 10, true); //player walking right animation
	this.player.animations.play('right');

	this.baddies = game.add.group();
	this.baddies.enableBody = true;

	this.stars = game.add.group();
	this.stars.enableBody = true; //creates stars


	this.diamonds = game.add.group();
	this.diamonds.enableBody = true;

	this.score = 0;
	this.scoreText = game.add.text(16,16, 'Score: 0', {font: 'Helvetica', fontSize: '32px', fill: '#FFFFFF' }); //score text specifications

	game.time.events.add(20000, incrementEnemySize, this);
	this.maxEnemyScale = 2;
	this.coinRush = false;

	addTimeScore(this);


},

update: function() {
	//run the game loop

	var hitPlatform = game.physics.arcade.collide(this.player, this.platforms); //player collides with platfroms

	this.player.body.velocity.x = 0;

	//code assistance from "Nevan"
	// if(game.input.activePointer.x <= game.width * 0.25){
	// 	this.player.body.velocity.x = -450;
	// }
	// else if (game.input.activePointer.x > game.width * 0.25 && game.input.activePointer.x <= game.width * 0.5) {
	// 	this.player.body.velocity.x = 450;
	// } else {
	// 	this.player.body.velocity.y = -700;
	// }

	//code assistance from "Nevan"
	if(game.input.pointer1.active) {
		if (game.input.pointer1.x <= game.width * 0.25){
			this.player.body.velocity.x = -450;
		}
		else if (game.input.pointer1.x > game.width * 0.25 && game.input.pointer1.x <= game.width * 0.5) {
			this.player.body.velocity.x = 450;
		}
		else if (this.player.body.touching.down && hitPlatform) {
			this.player.body.velocity.y = -700;
		}
	}
	else {
		this.player.body.velocity.x = 0;
	}

	//code assistance from "Nevan"
	if(game.input.pointer2.active) {
		if (game.input.pointer2.x <= game.width * 0.25) {
			this.player.body.velocity.x = -450;
		}
		else if (game.input.pointer2.x > game.width * 0.25 && game.input.pointer2.x <= game.width * 0.5) {
			this.player.body.velocity.x = 450;
		}
	 	else if (this.player.body.touching.down && hitPlatform) {
			this.player.body.velocity.y = -700;
		}
	}



	this.tileBKGD.tilePosition.x -= 8;


	attemptDiamondSpawn(this.diamonds);
	attemptStarSpawn(this.stars, this.coinRush);
	attemptBaddieSpawn(this.baddies, this.coinRush, this.maxEnemyScale);
	game.physics.arcade.collide(this.stars, this.platforms); // stars bounce on platforms on collision
	game.physics.arcade.collide(this.baddies, this.platforms);
	game.physics.arcade.overlap(this.player, this.stars, collectStar, null, this); //if player overlaps with star
	game.physics.arcade.overlap(this.player, this.diamonds, collectDiamond, null, this);//if player overlaps with diamond
	game.physics.arcade.overlap(this.player, this.baddies, badcollide, null, this); //if baddie collides with player run badcollide function
}

}

function render(){
game.debug.pointer(game.input.pointer1);
game.debug.pointer(game.input.pointer2);
game.debug.pointer(game.input.activePointer);
}


function addTimeScore(context){
	context.score += 10;
	context.scoreText.text = 'Score: ' + context.score;
	game.time.events.add(100, this.addTimeScore, this, context);

}


function collectStar(player, star){
      //removes star from screen
      star.kill();

      //Play Sound
			this.pop01 = game.add.audio('pop01', 0.5);
      this.pop01.play('', 0, 1, false);

      this.score += 10;
      this.scoreText.text = 'Score: ' + this.score;
    }

function attemptStarSpawn(stars,coinRush){
		var chance = 0.006;
		if(coinRush){
			chance = 1.2;
		}
		if(game.rnd.frac() < chance){
		var star =	stars.create(this.game.width-10, game.rnd.integerInRange(100,400), 'sprites', 'star');
		star.body.setSize(24,22);
		star.outOfBoundsKill = true;
		star.checkWorldBounds = true;
		star.body.velocity.x = -300;
		star.body.gravity.y = 500; //gravity makes stars fall
		star.body.bounce.y = 0.7 + Math.random() * 0.2; //random bounce value to stars
	}
}

function attemptBaddieSpawn(baddies, coinRush, maxEnemyScale){
		if(game.rnd.frac() < .006 && !coinRush){
		var baddie =	baddies.create(this.game.width-10, game.rnd.integerInRange(340,370), 'sprites', 'baddie1');
		baddie.body.setSize(32,32);
		baddie.outOfBoundsKill = true;
		baddie.checkWorldBounds = true;
		baddie.body.velocity.x = -300;
		baddie.body.gravity.y = 500; //gravity makes baddies fall
		baddie.body.bounce.y = 0.7 + Math.random() * 0.2; //random bounce value to stars
		baddie.animations.add('left',Phaser.Animation.generateFrameNames('baddie', 1, 2), 10, true);
		baddie.animations.play('left');
		var scale = game.rnd.integerInRange(1, maxEnemyScale);
		baddie.scale.x = scale;
		baddie.scale.y = scale;
		}
}

function incrementEnemySize(){
	this.maxEnemyScale = 3;
}


function attemptDiamondSpawn(diamonds){
	if(game.rnd.frac() < .0009){
		var diamond =	diamonds.create(this.game.width-10, game.rnd.integerInRange(300,400), 'sprites', 'diamond');
		diamond.body.setSize(32,28);
		diamond.outOfBoundsKill = true;
		diamond.checkWorldBounds = true;
		diamond.body.velocity.x = -300;
	}
}

function collectDiamond(player, diamond){
	diamond.kill(); //diamond disappears

	this.ding = game.add.audio('ding', 0.4);
	this.ding.play('', 0, .4, false);

	this.score += 50; // 50 points for collecting diamond
	this.scoreText.text = 'Score: ' + this.score; //score is updated
	this.coinRush = true;
	game.time.events.add(5000, function(){
		this.coinRush = false;
	}, this);
}

function badcollide (player, baddie){
      //removes baddie1 from screen
      baddie.kill();

      this.score -= 25;
      this.scoreText.text = 'Score: ' + this.score;

			this.music.stop();

      //load "GameOver" state
      game.state.start('GameOver', true, false, this.score);
			this.music.fadeOut(1000);
    }
