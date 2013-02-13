/**
  * Allow a card to be flipped
  */
Crafty.sprite(100, 'img/card.png', {FlippedCard: [0, 0]});
Crafty.c('Flippable', {
  init: function() {
		this.requires('2D');
		this.flippedCardEn = Crafty.e('2D, DOM, FlippedCard')
			.attr({x: this.attr('x'), y: this._y, w: this._w, h: this._h, z: this._z+1})
		;
  },
  reveal: function() {
    this.flippedCardEn.visible = false;
  },
  hide: function() {
    this.flippedCardEn.visible = true;
  }
});

Crafty.c('Scoreboard', {
	init: function(e) {
		this.requires('Text');
		this.score = 0;
		this.found = 0;
		this.start = new Date().getTime();
		Crafty.bind('FlipSuccess', function() {
			Crafty('Scoreboard')._success().show();
		});
		Crafty.bind('FlipFail', function() {
			Crafty('Scoreboard')._fail().show();
		});
	},
	show: function() {
		this.text('Score:'+this.score);
		var timeTaken = new Date().getTime() - this.start;
		if (this.found === 15)	Crafty.trigger('GameSuccess', {score: this.score, time: timeTaken});
		return this;
	},
	_success: function() {
		this.score += 5;
		this.found++;
		return this;
	},
	_fail: function() {
		this.score -= 1;
		return this;
	}
});

Crafty.c('Highscore', {
	init: function() {
		//this.requires('Persist'); // Don't lose high score between scene changes
		this.scoreData = JSON.parse(window.localStorage.getItem('memoryScoreData'))||[];
		Crafty.bind('GameSuccess', function(res) {
			var that = Crafty('Highscore');																											if (!that) throw new Error('No Highscore component found!');
			that.scoreData.push({
				name:		that.playerName,
				score:	res.score,
				time:		res.time
			});
			that.scoreData.sort(function(a,b) {
				if (a.score !== b.score)
					return a.score < b.score;		// Biggest score first
				else
					return a.time > b.time;			// Then shortest time
			});
			// Keep only top 5 scores
			that.scoreData = that.scoreData.splice(0,5);
			window.localStorage.setItem('memoryScoreData', JSON.stringify(that.scoreData));
			Crafty.trigger('GameOver');
		});
	},
	setPlayer: function(name) {
		this.playerName = name;
		return this;
	}
});