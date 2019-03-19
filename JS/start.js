var startCanvas = document.getElementById("startCanvas");
var startContext = startCanvas.getContext("2d");
var canvasCanonLeft = document.getElementById("canonLeft");
var contextCanonLeft = canvasCanonLeft.getContext("2d");
var canvasCanonRight = document.getElementById("canonRight");
var contextCanonRight = canvasCanonRight.getContext("2d");

var axeX2 = startCanvas.width;
var axeY2 = startCanvas.height;

renderMainMenu = true;

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
	startCanvas.style.left = 0 + "px";
	startCanvas.width = window.innerWidth;
  startCanvas.height = window.innerWidth * 0.5;
 	canvasCanonLeft.style.left = 0 + "px";
  canvasCanonLeft.width = window.innerWidth * 0.5;
  canvasCanonLeft.height = window.innerWidth * 0.5;
	canvasCanonRight.style.left = canvasCanonLeft.width + "px";
	canvasCanonRight.width = window.innerWidth * 0.5;
  canvasCanonRight.height = window.innerWidth * 0.5;

  var axeX2 = startCanvas.width;
	var axeY2 = startCanvas.height;
	CANONG_WIDTH = axeX / 4;
  CANONG_HEIGHT = axeY / 4;
  CANONG_X = (axeX / 2) - (CANONG_WIDTH / 2);
  CANONG_Y = (axeY / 2) - (CANONG_HEIGHT / 2);
}

//un tableau qui rassemble toutes les données sur le canon
canong = {
  x: CANONG_X, // coordonnée X du canon
  y: CANONG_Y, // coordonnée Y du canon
  width: CANONG_WIDTH, // largeur du canon
  height: CANONG_HEIGHT, // hauteur du canon
  angle: 0, //orientation du canon
  canShoot: true, //variable vérifiant si le canon est en rechargement
  lvl: 1,
  sprite: canonASprite,
  // fonction qui dessine le canon
  draw: function(){
    //on dessine le canon
    contextCanonLeft.drawImage(canong.sprite, canong.x, canong.y, canong.width, canong.height);

    //on réinitialiser l'orientation du canvas du canon
    contextCanonLeft.setTransform(1, 0, 0, 1, 0, 0);

    //on déplace le canvas aux coordonnée du centre du canon
    contextCanonLeft.translate((CANONG_X + CANONG_WIDTH / 2), (CANONG_Y + CANONG_HEIGHT / 2));

    //on effectue une rotation selon l'angle
    contextCanonLeft.rotate(canong.angle);

    // on effectue la translation inverse
    contextCanonLeft.translate(-(CANONG_X + CANONG_WIDTH / 2), -(CANONG_Y + CANONG_HEIGHT / 2));
  },

  //fonction permettant d'actualiser les données du canon
  update: function(){
    if(canong.lvl === 1){
      canong.sprite = canonASprite;
    }else if(canon.lvl === 2){
      canong.sprite = canonBSprite;
    }else if(canon.lvl === 3){
      canong.sprite = canonCSprite;
    }else{
      canong.sprite = canonDSprite;
    }
  },

  //fonction permettant au canon de tirer
  shoot: function(e){
    //on vérifie que le canon puisse tirer
    if(canong.canShoot === true){
      //on dit que le canon ne peut plus tirer
      canong.canShoot = false;

      //on enregistre les coordonnée du click de souris
      let mouseClickX = e.clientX - window.innerWidth * 0.125;
      let mouseClickY = e.clientY;

      //on créer un point en fonction de ces coordonnées
      pointDest = {x: mouseClickX, y: mouseClickY};

      //on instancie une nouvelle bullet à l'aide de ce point
      bullets.push(new Bullet(pointDest));


      //on dit qu'après le temps de rechargement, le canon peut de nouveau tirer
      setTimeout(function(){
        canong.canShoot = true;
      }, reloadTime);
    }
  },
}

canond = {
  x: CANOND_X, // coordonnée X du canon
  y: CANOND_Y, // coordonnée Y du canon
  width: CANOND_WIDTH, // largeur du canon
  height: CANOND_HEIGHT, // hauteur du canon
  angle: 0, //orientation du canon
  canShoot: true, //variable vérifiant si le canon est en rechargement
  lvl: 1 ,
  sprite: canonASprite,
  // fonction qui dessine le canon
  draw: function(){
    //on dessine le canon
    contextCanonRight.drawImage(canond.sprite, canond.x, canond.y, canond.width, canond.height);

    //on réinitialiser l'orientation du canvas du canon
    contextCanonRight.setTransform(1, 0, 0, 1, 0, 0);

    //on déplace le canvas aux coordonnée du centre du canon
    contextCanonRight.translate((CANOND_X + CANOND_WIDTH / 2), (CANOND_Y + CANOND_HEIGHT / 2));

    //on effectue une rotation selon l'angle
    contextCanonRight.rotate(canond.angle);

    // on effectue la translation inverse
    contextCanonRight.translate(-(CANOND_X + CANOND_WIDTH / 2), -(CANOND_Y + CANOND_HEIGHT / 2));
  },

  //fonction permettant d'actualiser les données du canon
  update: function(){
    if(canon.lvl === 1){
      canond.sprite = canonASprite;
    }else if(canon.lvl === 2){
      canond.sprite = canonBSprite;
    }else if(canon.lvl === 3){
      canond.sprite = canonCSprite;
    }else{
      canond.sprite = canonDSprite;
    }
  },

  //fonction permettant au canon de tirer
  shoot: function(e){
    //on vérifie que le canon puisse tirer
    if(canond.canShoot === true){
      //on dit que le canon ne peut plus tirer
      canond.canShoot = false;

      //on enregistre les coordonnée du click de souris
      let mouseClickX = e.clientX - window.innerWidth * 0.125;
      let mouseClickY = e.clientY;

      //on créer un point en fonction de ces coordonnées
      pointDest = {x: mouseClickX, y: mouseClickY};

      //on instancie une nouvelle bullet à l'aide de ce point
      bullets.push(new Bullet(pointDest));


      //on dit qu'après le temps de rechargement, le canon peut de nouveau tirer
      setTimeout(function(){
        canond.canShoot = true;
      }, reloadTime);
    }
  },
}

//fonction qui actualise les données de tous les objets du jeu
function mainMenuUpdate(){
	if(renderMainMenu === true){
		canond.update();
		canong.update();
	}
}

//fonction qui dessine tous les objets du jeu
function mainMenuDraw(){
	if(renderMainMenu === true){
		canond.draw();
		canong.draw();
	}
}

//fonction qui effectue le rendu du jeu (update + draw)
function mainMenuRender(){
	interval = setInterval(function(){
	  mainMenuUpdate();
	  mainMenuDraw();
	}, 10);
}
// initialise();
// render();

function startButton(){
  document.getElementById("startScreen").style.display = "none";
  document.getElementById("game").style.display = "inline";
	renderMainMenu = false;
  initialise();
  render();
}

initCanvas();
loadImages();
mainMenuRender();
