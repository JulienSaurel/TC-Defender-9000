var startCanvas = document.getElementById("startCanvas");
var startContext = startCanvas.getContext("2d");
var canvasCanonLeft = document.getElementById("canonLeft");
var contextCanonLeft = canvasCanonLeft.getContext("2d");
var canvasCanonRight = document.getElementById("canonRight");
var contextCanonRight = canvasCanonRight.getContext("2d");

var axeX2 = startCanvas.width;
var axeY2 = startCanvas.height;

//canon gauche du start
var CANONG_WIDTH = axeX / 4; //Largeur du canon
var CANONG_HEIGHT = axeY / 4; //Hauteur du canon
var CANONG_X = (axeX / 4) - (CANONG_WIDTH / 2); //coordonnée X du canon
var CANONG_Y = (axeY / 4) - (CANONG_HEIGHT / 2); //coordonnée Y du canon

//canon droite du start
var CANOND_WIDTH = axeX / 4; //Largeur du canon
var CANOND_HEIGHT = axeY / 4; //Hauteur du canon
var CANOND_X = (axeX / 4)*3 + (CANOND_WIDTH / 2); //coordonnée X du canon
var CANOND_Y = (axeY / 4) - (CANOND_HEIGHT / 2); //coordonnée Y du canon

//ennemi du start screen
var SENNEMY_WIDTH = (1 / 12) * 0.5 * axeX; //largeur
var SENNEMY_HEIGHT = (1 / 12) * 0.55 * axeY; //hauteur
var SENNEMY_SPEED = 0; //vitesse
var ennemies = Array(); //tableau contenant tous les ennemis


function initCanvas(){
	startCanvas.style.left = window.innerWidth * 0.125 + "px";
	startCanvas.width = window.innerWidth * 0.5;
  	startCanvas.height = window.innerWidth * 0.5;
 	canvasCanonLeft.style.left = window.innerWidth * 0.125 + "px";
  	canvasCanonLeft.width = window.innerWidth * 0.5;
  	canvasCanonLeft.height = window.innerWidth * 0.5;

  	var axeX2 = startCanvas.width;
	var axeY2 = startCanvas.height;
	CANONG_WIDTH = axeX / 4;
  	CANONG_HEIGHT = axeY / 4;
  	CANONG_X = (axeX / 2) - (CANONG_WIDTH / 2);
  	CANONG_Y = (axeY / 2) - (CANONG_HEIGHT / 2);
}

