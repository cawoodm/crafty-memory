Crafty.scene("loading", function() {

  Crafty.e("2D, DOM, Color, Text").attr({
    w: 100,
    h: 20,
    x: 150,
    y: 120
  }).text("Loading").css({
    "text-align": "center",
    "color": "#FFFFFF"
  });

  Crafty.load(['img/cards.png', 'img/card.png'], function() {
    Crafty.scene("main");
  });

});
Crafty.scene("loading");

Crafty.scene("main", function() {

  Crafty.myGame.control = new window.GameControl();
  
  Crafty.myGame.audio();

});

Crafty.scene("highscores", function() {

  var sb = JSON.parse(window.localStorage.getItem('memoryScoreData'))||{scores:[]};
  var css = {
		
  };
  sb.scores.forEach(function(s, i) {
		Crafty.e('2D, DOM, Text')
			.attr({x: 100, y: 100+i*30, w: 100, h: 30})
			.text((i+1) + '. ' + s.name)
		;
		Crafty.e('2D, DOM, Text')
			.attr({x: 200, y: 100+i*30, w: 100, h: 30})
			.text(s.score)
		;
		Crafty.e('2D, DOM, Text')
			.attr({x: 300, y: 100+i*30, w: 100, h: 30})
			.text((1e2+Math.floor(s.time/60000)+'').substr(1)+':'+(1e2+Math.floor(s.time/1000)%60+"").substr(1))
		;
  });
  
});