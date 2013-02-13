/**
	* Generate a Set of Cards
	*/
Crafty.myGame.generateEntities = function() {

	var W = Crafty.myGame.W,
			H = Crafty.myGame.H;
	
	Crafty.sprite(100, 'img/cards.png', {
		Card00: [0, 0], Card10: [1, 0], Card20: [2, 0], Card30: [3, 0], Card40: [4, 0], 
		Card01: [0, 1], Card11: [1, 1], Card21: [2, 1], Card31: [3, 1], Card41: [4, 1], 
		Card02: [0, 2], Card12: [1, 2], Card22: [2, 2], Card32: [3, 2], Card42: [4, 2]
	});
	
	// Generate deck of cards
	this.cards = [];
	for (var c=0; c<15; c++)
		this.cards[c*2] = this.cards[c*2+1] = 'Card'+c%5+Math.floor(c/5);
	
	// Shuffle cards
	this.cards = Crafty.Util.arrayShuffle(this.cards);
	
	this._cardSet = [];
	for (var x=0; x < 6; x++) {
		this._cardSet[x] = [];
		for (var y=0; y < 5; y++) {
			this._cardSet[x][y] = Crafty.e(this.cards[y*6+x]+', 2D, DOM, Mouse')
				.setName(this.cards[y*6+x])
				.attr({x: 5+x*105, y: 20+5+y*105, w:100, h: 100})
				//.unbind('Click')
				.bind('Click', function(e) {
					Crafty.trigger('CardClicked', this);
				})
				.addComponent('Flippable')
				;
		}
	}
	
	// Scoreboard
	var sb = Crafty.e('2D, DOM, Text, Scoreboard, Highscore')
		.attr({x: 3, y:3, w: 100, h: 20, z: 3})
		.css({
			"color":				"white",
			"font-family":	"Helvetica",
			"font-size":		"14px"
		})
		.setPlayer(window.prompt('Please type your name:'))
		.show()
	;
	sb.attach(
		Crafty.e('2D, DOM, Color')
			.attr({x: sb._x-3, y: sb._y, w: sb.w, h: 20, alpha: 0.5, z:sb._z-1})
			.setName('Board BG')
			.color('rgb(200, 200, 200)')
	);
	
	// Player's Name
	var pn = Crafty.e('DOM, Text')
		.attr({x: Crafty.myGame.W-150-8, y:3, w: 150, h: 20, z: 3})
		.css({
			"color":					"white",
			"font-family":		"Helvetica",
			"font-size":			"14px",
			"text-align":			"right",
			"padding-right":	"10px"
		})
		.text(Crafty('Highscore').playerName)
	;
	// Background to player's name
	pn.attach(
		Crafty.e('2D, DOM, Color')
			.attr({x: pn._x+3, y: pn._y, w: pn.w, h: pn.h, alpha: 0.5, z:sb._z-1})
			.setName('Board BG')
			.color('rgb(200, 200, 200)')
	);
	
};