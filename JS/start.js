var startCanvas = document.getElementById("startCanvas");
var startContext = startCanvas.getContext("2d");
var canvasCanonLeft = document.getElementById("canonLeft");
var contextCanonLeft = canvasCanonLeft.getContext("2d");
var canvasCanonRight = document.getElementById("canonRight");
var contextCanonRight = canvasCanonRight.getContext("2d");

var axeX2 = startCanvas.width;
var axeY2 = startCanvas.height;

var game = document.getElementById("game");
game.style.display="none";

function startButton(){
    var start = document.getElementById("startScreen");
    start.style.display="none";
    game.style.display="inline";
    initialise();
    render();
}

function initCanvas(){
	startCanvas.style.left = window.innerWidth * 0.125 + "px";
}
