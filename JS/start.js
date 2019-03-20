var startCanvas = document.getElementById("startCanvas");
var startContext = startCanvas.getContext("2d");
var canvasCanonLeft = document.getElementById("canonLeft");
var contextCanonLeft = canvasCanonLeft.getContext("2d");
var canvasCanonRight = document.getElementById("canonRight");
var contextCanonRight = canvasCanonRight.getContext("2d");
initCanvas();
var axeX2 = startCanvas.width;
var axeY2 = startCanvas.height;

var axeCNDX = canvasCanonRight.width;
var axeCNDY = canvasCanonRight.height;

var axeCNGX = canvasCanonLeft.width;
var axeCNGY = canvasCanonLeft.height;

var renderMainMenu = true;

var mouseAngleA;
var mouseAngleB;

//canon gauche du start
var CANONG_WIDTH = axeCNGX / 2; //Largeur du canon
var CANONG_HEIGHT = axeCNGY / 2; //Hauteur du canon
var CANONG_X = (axeCNGX / 2) - (CANONG_WIDTH / 2); //coordonnée X du canon
var CANONG_Y = (axeCNGY / 2) - (CANONG_HEIGHT / 2); //coordonnée Y du canon

//canon droite du start
var CANOND_WIDTH = axeCNDX / 2; //Largeur du canon
var CANOND_HEIGHT = axeCNDY / 2; //Hauteur du canon
var CANOND_X = (axeCNDX / 2) - (CANOND_WIDTH / 2); //coordonnée X du canon
var CANOND_Y = (axeCNDY / 2) - (CANOND_HEIGHT / 2); //coordonnée Y du canon

//ennemi du start screen
var SENNEMY_WIDTH = (1 / 12) * 0.8 * axeX2; //largeur
var SENNEMY_HEIGHT = (1 / 8) * axeY2; //hauteur
var SENNEMY_SPEED = 0; //vitesse

function initEnemy(){
    ennemi.width = 150;
    ennemi.x = axeX2 / 2;
    ennemy.y = (axeY2 / 4)*3;

}

ennemi = {
  x: (axeX2 / 2) - SENNEMY_WIDTH/2, // coordonnée X du canon
  y: (axeY2 / 4) * 2.5, // coordonnée Y du canon
  width: SENNEMY_WIDTH, // largeur du canon
  height: SENNEMY_HEIGHT, // hauteur du canon
  lvl: 2,
  sprite: tcTwoASprite,
  active: true,
  //hp: ennemi.lvl,
  // fonction qui dessine le canon
  draw: function(){
    //on dessine le canon
    startContext.drawImage(ennemi.sprite, ennemi.x, ennemi.y, ennemi.width, ennemi.height);

  },

  changeSprite: function(){
    if(ennemi.sprite === tcTwoASprite){
        ennemi.sprite = tcTwoBSprite;
      }else{
      ennemi.sprite = tcTwoASprite;
    }
  },

  

  update: function(){
    if(ennemi.hp <= 0){
      ennemi.active = false;
    }
  },

}

function angleCalculator(ev){
	let mX = axeX2 / 2;
	let mY = ev.clientY;

	let aX = axeX2 / 4;
	let aY = axeY2 / 2;

	let bX = (3 * axeX2) / 4;
	let bY = axeY2 / 2;

	let angleB = Math.atan2((mY - bY), (mX - bX));

	mouseAngleB = angleB + 1.5708;
	mouseAngleA = - mouseAngleB - 1.5708;
}

function initCanvas(){
	document.addEventListener("mousemove", angleCalculator, false);
	startCanvas.style.left = 0 + "px";
	startCanvas.width = window.innerWidth;
  startCanvas.height = window.innerWidth * 0.5;
 	canvasCanonLeft.style.left = 0 + "px";
  canvasCanonLeft.width = window.innerWidth * 0.5;
  canvasCanonLeft.height = window.innerWidth * 0.5;
	canvasCanonRight.style.left = canvasCanonLeft.width + "px";
	canvasCanonRight.width = window.innerWidth * 0.5;
  canvasCanonRight.height = window.innerWidth * 0.5;

	CANONG_WIDTH = axeCNGX / 2;
  CANONG_HEIGHT = axeCNGY / 2;
	CANOND_WIDTH = axeCNGX / 2;
  CANOND_HEIGHT = axeCNGY / 2;
  CANONG_X = (axeCNGX / 2) - (CANONG_WIDTH / 2);
  CANONG_Y = (axeCNGY / 2) - (CANONG_HEIGHT / 2);
	CANOND_WIDTH = axeCNDX / 2;
  CANOND_HEIGHT = axeCNDY / 2;
  CANOND_X = (axeCNDX / 2) - (CANOND_WIDTH / 2);
  CANOND_Y = (axeCNDY / 2) - (CANOND_HEIGHT / 2);
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
		canong.angle = mouseAngleA + 1.5708;
  },

  //fonction permettant au canon de tirer
  shoot: function(e){
    //on vérifie que le canon puisse tirer
    if(canong.canShoot === true){
      //on dit que le canon ne peut plus tirer
      canong.canShoot = false;

      //on enregistre les coordonnée du click de souris
      let mouseClickX = ev.clientX;
      let mouseClickY = ev.clientY;

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
		canond.angle = mouseAngleB;
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
      pointDest = {x: e.clientX, y: e.clientY};

      //on instancie une nouvelle bullet à l'aide de ce point
      bullets.push(new Bullet(pointDest));


      //on dit qu'après le temps de rechargement, le canon peut de nouveau tirer
      setTimeout(function(){
        canond.canShoot = true;
      }, reloadTime);
    }
  },
}

function startBullet(pointDest){
  this.x = canonPoint().x; // coordonnée X d'une bullet (initialisée aux coordonnées du bout du canon)
  this.y = canonPoint().y; // coordonnée Y d'une bullet (initialisée aux coordonnées du bout du canon)
  this.height = BULLET_HEIGHT; // hauteur d'une bullet
  this.width = BULLET_WIDTH; // largeur d'une bullet
  this.sprite = bulletSprite; // sprite d'une bullet
  this.speed = BULLET_SPEED; //vitesse d'une bullet
  this.active = true; //boolean qui dit si la bullet doit être dessinée ou non
  this.speedX = 0; //vitesse X
  this.speedY = 0; // vitesse Y
  this.launched = false; //la bullet a été lancée ou non
  this.pointDest = pointDest; // destination de la bullet
  this.damages = bullet_damages; // dégats de la bullet

  //fonction qui dessine la bullet si elle est active
  this.draw = function(){
    if(this.active === true){
      context.drawImage(this.sprite, this.x, this.y, this.width, this.height);
    }
  }

  //fonction qui actualise l'état d'une bullet
  this.update = function(){
    //si la bullet est en dehors de l'écran on la désactive
    if(this.x > axeX || this.x + this.width < 0 || this.y > axeY || this.y + this.height < 0 || !this.active){
      this.active = false;
    }else{
      //sinon on la fait avancer
        this.x += this.speedX;
        this.y += this.speedY;
    }
  }
}
 
//fonction qui actualise les données de tous les objets du jeu
function mainMenuUpdate(){
	if(renderMainMenu === true){
		canond.update();
		canong.update();
    ennemi.update();
	}
}

//fonction qui dessine tous les objets du jeu
function mainMenuDraw(){
	if(renderMainMenu === true){
		contextCanonLeft.clearRect(0, 0, canvasCanonLeft.width, canvasCanonLeft.height);
		contextCanonRight.clearRect(0, 0, canvasCanonRight.width, canvasCanonRight.height);
		canond.draw();
		canong.draw();
    ennemi.draw();
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

loadImages();
initCanvas();
mainMenuRender();
