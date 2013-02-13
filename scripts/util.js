Crafty.Util = {};

function toggleSound(id) {
  Crafty.audio.stop(id);
  Crafty.myGame[id] = !Crafty.myGame[id];
}

function muteSound() {
	Crafty.audio.toggleMute();
}

function newGame() {
	Crafty.scene('main');
}
function highScores() {
	Crafty.scene('highscores');
}
function clearScores() {
	window.localStorage.removeItem('memoryScoreData');
}

Crafty.Util.arrayShuffle = function(o) {
    for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};