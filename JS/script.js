//canvas vars
var canvas = document.getElementById("gameScreen"); //récupération du canvas principal
var context = canvas.getContext("2d"); //récupération du contexte du canvas principal
var canvasCanon = document.getElementById("canonCanvas"); //récupération du canvas du canon
var contextCanon = canvasCanon.getContext("2d"); //récupération du contexte du canvas du canon
var axeX = canvas.width; //création d'un axe X
var axeY = canvas.height; //création d'un axe Y

//infoDivVar
var infoDiv = document.getElementById("gameInfos");
var paraSp = document.getElementById("statusPoints");

//div buttons
var buttonsDiv = document.getElementById("buttonsDiv");

//pause div
var pauseMenu = document.getElementById("pause");

//gameOverDiv
var gameOverMenu = document.getElementById("gameOver");

//winMenu
var winScreen = document.getElementById("winScreen");

//chemin et points
var chemin = Array(); //array de points

//canon
var CANON_WIDTH = axeX / 4; //Largeur du canon
var CANON_HEIGHT = axeY / 4; //Hauteur du canon
var CANON_X = (axeX / 2) - (CANON_WIDTH / 2); //coordonnée X du canon
var CANON_Y = (axeY / 2) - (CANON_HEIGHT / 2); //coordonnée Y du canon

//bullets
var BULLET_WIDTH = (1 / 4) * (1 / 12) * axeX; //largeur d'une bullet
var BULLET_HEIGHT = (1 / 4) * (1 / 12) * axeY; //hauteur d'une bullet
var MAX_BULLET_SPEED = 5; //vitesse maximale d'une bullet
var BULLET_SPEED = MAX_BULLET_SPEED; //vitesse d'une bullet
var MAX_RELOAD_TIME = 500; //temps de rechargement maximal du tir (en s)
var reloadTime = MAX_RELOAD_TIME; //temps de rechargement (en ms) du tir
var bullet_damages = 1; //dégats des balles
var bullets = Array(); //tableau contenant toutes les bullet tirées

//ennemies
var ENNEMY_WIDTH = (1 / 12) * 0.625 * axeX; //largeur d'un ennemi
var ENNEMY_HEIGHT = (1 / 12) * 0.625 * axeY; //hauteur d'un ennemi
var ENNEMY_SPEED = (axeX / 12) / 50; //vitesse d'un ennemi
var ennemies = Array(); //tableau contenant tous les ennemis

//micro onde
var microWave_WIDTH = 0.925 / 12 * axeX; //largeur du micro-onde
var microWave_HEIGHT = 0.925 / 12 * axeY; //hauteur du micro-onde
var microWave_X = 3.15 / 12 * axeX; //coordonnée x du micro-onde
var microWave_Y = 4.95 / 12 * axeY; //coordonnée y du micro-onde

//sprites
var animationInterval; //intervale d'animation
var bulletSprite = new Image(); //sprite d'une bullet
var canonASprite = new Image(); //sprite du canon lvl 1
var canonBSprite = new Image(); //sprite du canon lvl 2
var canonCSprite = new Image(); //sprite du canon lvl 3
var canonDSprite = new Image(); //sprite du canon lvl 4
var tcOneASprite = new Image(); //sprite du TC lvl 1 tourné dans un sens
var tcOneBSprite = new Image(); //sprite du TC lvl 1 tourné dans l'autre sens
var tcTwoASprite = new Image(); //sprite du TC lvl 2 tourné dans un sens
var tcTwoBSprite = new Image(); //sprite du TC lvl 2 tourné dans l'autre sens
var tcThreeASprite = new Image(); //sprite du TC lvl 3 tourné dans un sens
var tcThreeBSprite = new Image(); //sprite du TC lvl 3 tourné dans l'autre sens
var microWaveSprite = new Image(); //sprite du micro-onde

//position de la souris
var angle; //angle (en rad) entre le centre du canon et la position de la souris (recalculé en permanence)
var mouseX; //position X de la souris
var mouseY; //position Y de la souris

//partie en général
var paused = false; //pause en cours ou non
var maxPlayerHP = 20; //points de vies maximums du joueur
var playerHP = maxPlayerHP; //points de vies du joueur
var statusPoints = 0; //points de status du joueur
var score = 0; //score du joueur
var interval; //intervale de la partie
var totalPoints = 0; //total des SP dépensés
var STRENGTH_COST = 20; //cout d'un niveau de dégats
var STRENGTH_MAX = 3; //nombre maximum de points dans la force
var RELOAD_TIME_COST = 50; //cout d'un niveau de reload time
var RELOAD_TIME_MAX = 3; //nombre de points maximal dans le reload time
var BULLET_SPEED_COST = 10; //cout d'un niveau de vitesse
var BULLET_SPEED_MAX = 5; //nombre de points maximal dans la vitesse
var pseudo;

//waves
var infiniteWaveTimer = 5000; //temps de recahrge de la vague infinie
var spawnables = Array(); //ennemis à faire apparaitres
var wn = 1; //numéro de la vague en cours
var intervals = Array(); //toutes les intervales des vagues

//permet de charger les images en leur attribuant une source
function loadImages(){
  bulletSprite.src = "../img/belette.png";
  canonASprite.src = "../img/canon_1.png";
  canonBSprite.src = "../img/canon_2.png";
  canonCSprite.src = "../img/canon_3.png";
  canonDSprite.src = "../img/canon_4.png";
  tcOneASprite.src = "../img/TC1_A.png";
  tcOneBSprite.src = "../img/TC1_B.png";
  tcTwoASprite.src = "../img/TC2_A.png";
  tcTwoBSprite.src = "../img/TC2_B.png";
  tcThreeASprite.src = "../img/TC3_A.png";
  tcThreeBSprite.src = "../img/TC3_B.png";
  microWaveSprite.src = "../img/micro_onde.png";
}

//fonction appelée au lancement
function initialise(playerPseudo){
  pseudo = playerPseudo;
  resetVars();
  setCosts();
  actualiseHP();
  actualiseASDiv();
  actualiseSSDiv();
  actualiseSTRDiv();
  loadImages();

  window.addEventListener('resize', function(){ //listener pour le redimensionnement
    resizeCanvas();
    replaceCanon();
    replaceBullets();
    replaceEnnemies();
    resizeDiv();
    resizeWinScreen();
    resizeGameOverMenu();
    resizePauseMenu();
  }, false);

  document.addEventListener("keydown", shortCuts, false); //listener pour les raccourcis clavier

  document.addEventListener("mousemove", mouseMoveHandler, false); //listener pour le mouvement de la souris
  resizeCanvas(); //adapte la taille du jeu à l'ecran
  resizeDiv(); // adapate la taille de la div d'infos
  resizePauseMenu();
  resizeGameOverMenu();
  setTimeout(function(){
    document.addEventListener("click", canon.shoot, false); //listener pour le click de souris
  }, 100);

  //réinitialisation des intervalles
  clearInterval(interval);
  interval = undefined;
  clearInterval(animationInterval);
  animationInterval = undefined;
  intervals.forEach(function(interv){
    clearInterval(interv);
    delete interv;
  });
  replaceEnnemies();
  //réinitialisation des tableaux
  spawnables = new Array();
  ennemies = new Array();
}

//function qui rend le jeu responsive
function resizeCanvas() {
  //ajustement de la taille du canvas en fonction des dimensions de l'écran
  canvas.style.left = window.innerWidth * 0.25 + "px";
  canvas.width = window.innerWidth * 0.5;
  canvas.height = window.innerWidth * 0.5;
  canvasCanon.style.left = window.innerWidth * 0.25 + "px";
  canvasCanon.width = window.innerWidth * 0.5;
  canvasCanon.height = window.innerWidth * 0.5;

  //redéfinition de la largeur et de la longueur du canvas
  axeX = canvas.width;
  axeY = canvas.height;

  //redéfinition des caractéristiques du canon
  CANON_WIDTH = axeX / 4;
  CANON_HEIGHT = axeY / 4;
  CANON_X = (axeX / 2) - (CANON_WIDTH / 2);
  CANON_Y = (axeY / 2) - (CANON_HEIGHT / 2);

  //redéfinition du chemin
  chemin = Array();
  chemin.push({x : (3.25 / 12) * axeX, y: (6.25 / 12) * axeY,});
  chemin.push({x : (2.75 / 12) * axeX, y: (6.5 / 12) * axeY,});
  chemin.push({x : (2.5 / 12) * axeX, y: (7 / 12) * axeY,});
  chemin.push({x : (2.5 / 12) * axeX, y: (8 / 12) * axeY,});
  chemin.push({x : (2.75 / 12) * axeX, y: (9 / 12) * axeY,});
  chemin.push({x : (3 / 12) * axeX, y: (9.25 / 12) * axeY,});
  chemin.push({x : (3.75 / 12) * axeX, y: (9.5 / 12) * axeY,});
  chemin.push({x : (6 / 12) * axeX, y: (9.5 / 12) * axeY,});
  chemin.push({x : (8.5 / 12) * axeX, y: (9 / 12) * axeY,});
  chemin.push({x : (9 / 12) * axeX, y: (8 / 12) * axeY,});
  chemin.push({x : (9.125 / 12) * axeX, y: (4 / 12) * axeY,});
  chemin.push({x : (9 / 12) * axeX, y: (2.75 / 12) * axeY,});
  chemin.push({x : (7 / 12) * axeX, y: (2.25 / 12) * axeY,});
  chemin.push({x : (3.75 / 12) * axeX, y: (2.25 / 12) * axeY,});
  chemin.push({x : (2.75 / 12) * axeX, y: (2.5 / 12) * axeY,});
  chemin.push({x : (2.5 / 12) * axeX, y: (3 / 12) * axeY,});
  chemin.push({x : (2.25 / 12) * axeX, y: (4 / 12) * axeY,});
  chemin.push({x : (2.5 / 12) * axeX, y: (4.5 / 12) * axeY,});
  chemin.push({x : (3.25 / 12) * axeX, y: (5.125 / 12) * axeY,});
}

//permet de placer et de redimensionner la div d'infos
function resizeDiv(){
  infoDiv.style.left = window.innerWidth * 0.75 + "px";
  infoDiv.style.width = window.innerWidth * 0.25 + "px";
  infoDiv.style.height = window.innerWidth * 0.5 + "px";

  buttonsDiv.style.width = window.innerWidth * 0.25 + "px";
  buttonsDiv.style.height = window.innerWidth * 0.5 + "px";
}

//permet de placer et de redimensionner le menu de pause
function resizePauseMenu(){
  pauseMenu.style.top = canvas.height * 0.25 + "px";
  pauseMenu.style.left = canvas.style.left.replace("px", "") * 1 + (0.0625 * canvas.width)  + "px";
}

//permet de placer et de redimensionner le menu de game over
function resizeGameOverMenu(){
  gameOverMenu.style.top = canvas.height * 0.25 + "px";
  gameOverMenu.style.left = canvas.style.left.replace("px", "") * 1 + (0.0625 * canvas.width)  + "px";
}

//permet de placer et de redimensionner le menu de victoire
function resizeWinScreen(){
  winScreen.style.top = canvas.height * 0.25 + "px";
  winScreen.style.left = canvas.style.left.replace("px", "") * 1 + (0.0625 * canvas.width)  + "px";
}

//réinitialise toites les variables
function resetVars(){
  totalPoints = 0;
  bullet_damages = 1;
  playerHP = maxPlayerHP;
  statusPoints = 0;
  score = 0;
  totalTime = 0;
  wn = 1;
  infiniteWaveTimer = 5000;
  reloadTime = MAX_RELOAD_TIME;
  BULLET_SPEED = MAX_BULLET_SPEED;
}

//fonction qui enregistre la position de la souris
function mouseMoveHandler(e) {
  //calcul de la position de la souris en fonction du centre du canon
  mouseX = e.clientX - CANON_WIDTH / 2 - window.innerWidth * 0.25;
  mouseY = e.clientY - CANON_HEIGHT / 2;

  //calcul de l'angle en fonction du centre du canon et de la souris
  angle = Math.atan2((mouseY - CANON_Y) , (mouseX - CANON_X ));

  //on ajoute 1 radian (1.5708) à l'angle pour le tourner dans la bonne direction
  canon.angle = angle + 1.5708;
}

//un tableau qui rassemble toutes les données sur le canon
canon = {
  x: CANON_X, // coordonnée X du canon
  y: CANON_Y, // coordonnée Y du canon
  width: CANON_WIDTH, // largeur du canon
  height: CANON_HEIGHT, // hauteur du canon
  angle: 0, //orientation du canon
  canShoot: true, //variable vérifiant si le canon est en rechargement
  lvl: 1, //niveau du canon
  sprite: canonASprite, //sprite du canon
  // fonction qui dessine le canon
  draw: function(){
    //on dessine le canon
    contextCanon.drawImage(canon.sprite, this.x, this.y, this.width, this.height);

    //on réinitialiser l'orientation du canvas du canon
    contextCanon.setTransform(1, 0, 0, 1, 0, 0);

    //on déplace le canvas aux coordonnée du centre du canon
    contextCanon.translate((CANON_X + CANON_WIDTH / 2), (CANON_Y + CANON_HEIGHT / 2));

    //on effectue une rotation selon l'angle
    contextCanon.rotate(canon.angle);

    // on effectue la translation inverse
    contextCanon.translate(-(CANON_X + CANON_WIDTH / 2), -(CANON_Y + CANON_HEIGHT / 2));
  },

  //fonction permettant d'actualiser les données du canon
  update: function(){

    //définition du niveau du canon en fonction des points dépensés
    if(totalPoints > 2 ){
      this.lvl = 2;
    }
    if(totalPoints > 5 ){
      this.lvl = 3;
    }
    if(totalPoints > 9){
      this.lvl = 4;
    }

    //définition du sprite en fonction du niveau
    if(canon.lvl === 1){
      canon.sprite = canonASprite;
    }else if(canon.lvl === 2){
      canon.sprite = canonBSprite;
    }else if(canon.lvl === 3){
      canon.sprite = canonCSprite;
    }else{
      canon.sprite = canonDSprite;
    }
  },

  //fonction permettant au canon de tirer
  shoot: function(e){
    //on vérifie que le canon puisse tirer
    if(canon.canShoot === true){
      if(paused === false){
        playShootSound();
        //on dit que le canon ne peut plus tirer
        canon.canShoot = false;

        //on enregistre les coordonnée du click de souris
        let mouseClickX = e.clientX - window.innerWidth * 0.25;
        let mouseClickY = e.clientY;

        //on créer un point en fonction de ces coordonnées
        pointDest = {x: mouseClickX, y: mouseClickY};

        //on instancie une nouvelle bullet à l'aide de ce point
        bullets.push(new Bullet(pointDest));

        //on dit qu'après le temps de rechargement, le canon peut de nouveau tirer
        setTimeout(function(){
          canon.canShoot = true;
        }, reloadTime);
      }
    }
  },
}

//micro-onde
microWave = {
  x: microWave_X, //coordonnée X du micro-onde
  y: microWave_Y, //coordonnée Y du micro-onde
  width: microWave_WIDTH, //largeur du micro-ondes
  height: microWave_HEIGHT, //hauteur du micro-onde
  sprite: microWaveSprite, //sprite du micro-onde

  update: function(){
    //redéfinition de la taille et position du micro-onde
    microWave_WIDTH = 0.925 / 12 * axeX;
    microWave.width = microWave_WIDTH;
    microWave_HEIGHT = 0.925 / 12 * axeY;
    microWave.height = microWave_HEIGHT;
    microWave_X = 3.15 / 12 * axeX;
    microWave.x = microWave_X;
    microWave_Y = 4.95 / 12 * axeY;
    microWave.y = microWave_Y;
  },

  draw: function(){
    //dessin du micro-onde
    context.drawImage(microWave.sprite, microWave.x, microWave.y, microWave.width, microWave.height);
  }
}

//fonction permettant d'actualiser les caractéristiques du canon après un changement de taille de l'écran
function replaceCanon(){
  canon.x = CANON_X;
  canon.y = CANON_Y;
  canon.width = CANON_WIDTH;
  canon.height = CANON_HEIGHT;
}

//fonction permettant d'actualiser les caractéristiques des ennemis après un changement de taille de l'écran
function replaceEnnemies(){

  ENNEMY_WIDTH = (1 / 12) * 0.625 * canvas.width;
  ENNEMY_HEIGHT = (1 / 12) * 0.625 * canvas.height;
  ENNEMY_SPEED = (axeX / 12) / 50;
  spawnables.forEach(function(ennemy){
    if(ennemy != undefined){
      ennemy.width = ENNEMY_WIDTH;
      ennemy.height = ENNEMY_HEIGHT;
      ennemy.speed = ENNEMY_SPEED;
      ennemy.x = chemin[ennemy.actualPoint].x;
      ennemy.y = chemin[ennemy.actualPoint].y;
    }
  });

  ennemies.forEach(function(ennemy){
    if(ennemy != undefined){
      ennemy.width = ENNEMY_WIDTH;
      ennemy.height = ENNEMY_HEIGHT;
      ennemy.speed = ENNEMY_SPEED;
      ennemy.x = chemin[ennemy.actualPoint].x;
      ennemy.y = chemin[ennemy.actualPoint].y;
    }
  });
}

//fonction permettant d'actualiser les caractéristiques des bullets après un changement de taille de l'écran
function replaceBullets(){
  BULLET_WIDTH = (1 / 4) * (1 / 12) * axeX;
  BULLET_HEIGHT = (1 / 4) * (1 / 12) * axeY;
  bullets.forEach(function(bullet){
    if(bullet != undefined){
      bullet.width = BULLET_WIDTH;
      bullet.height = BULLET_HEIGHT;
    }
  });
}

//fonction qui déplace un objet à un point
function objectToPoint(object, point) {
  //test si l'objet n'est pas déjà au point
  if(object.x !== point.x && object.y !== point.y){
    //on calcule plusieurs distances pour utiliser le thérorème de pythagore
    let AC = point.y - object.y; // coté A
    let CB = point.x - object.x; // coté B
    let AB = Math.sqrt(AC * AC + CB * CB); //hypothenuse = distance à parcourir

    //on calcule un ratio qui divisera la distance en fonction de la vitesse de déplacement de l'objet
    let ratio = Math.floor(AB / object.speed);

    //on divise les distances X et Y par ce ration
    let diffX = CB / ratio;
    let diffY = AC / ratio;
    let x = point.x;
    let y = point.y;
    object.objectiveX = x; // on attribue à l'objet son point de destination X
    object.objectiveY = y; // on attribue à l'objet son point de destination Y
    object.speedX = diffX; // on attribue à l'objet sa vitesse X ( le nombre de pixels qu'elle parcourera en X à chaque itération)
    object.speedY = diffY; // on attribue à l'objet sa vitesse Y ( le nombre de pixels qu'elle parcourera en Y à chaque itération)
    object.totalMove = ratio; //on attribue à l'objet le nombre d'itérations de mouvement qu'elle doit effectuer
  }else{
    console.log("already at destination");
  }
}

//fonction qui permet de tirer une bullet dans la direction du canon
function shootBullet(object, point){
  let AC = point.y - (canon.x + canon.width / 2);
  let CB = point.x - (canon.y + canon.height / 2);
  let AB = Math.sqrt(AC * AC + CB * CB);
  let ratio = Math.floor(AB / object.speed);
  let diffX = CB / ratio;
  let diffY = AC / ratio;
  let x = point.x;
  let y = point.y;
  object.speedX = diffX;
  object.speedY = diffY;
}

//fonction calculant les coordonnées du bout du canon en fonction de son angle
function canonPoint(){
  let canonX = Math.cos(angle) * CANON_WIDTH / 2 + CANON_X + CANON_WIDTH / 2;
  let canonY = Math.sin(angle) * CANON_WIDTH / 2 + CANON_Y + CANON_HEIGHT / 2;
  return result = {x: canonX, y: canonY,};
}

//constructeur d'une bullet
function Bullet(pointDest){
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

//constructeur d'un ennemi
function Ennemy(lvl){
  this.lvl = lvl;
  this.x = chemin[0].x; //coordonnée X d'un ennemi (initialisée au premier point du chemin)
  this.y = chemin[0].y; //coordonnée Y d'un ennemi (initialisée au premier point du chemin)
  this.height = ENNEMY_HEIGHT; //hauteur d'un ennemi
  this.width = ENNEMY_WIDTH; //largeur d'un ennemi
  this.sprite; //image d'un ennemi
  //on initialise l'image soit par le sprite qui regarde à droite, soit par l'autre (pour la diversité)
  if(Math.floor(Math.random() * Math.floor(2)) === 0){
    if(this.lvl === 1){
      this.sprite = tcOneASprite;
    }else if(this.lvl === 2){
      this.sprite = tcTwoASprite;
    }else{
      this.sprite = tcThreeASprite;
    }
  }else{
    if(this.lvl === 1){
      this.sprite = tcOneBSprite;
    }else if(lvl === 2){
      this.sprite = tcTwoBSprite;
    }else{
      this.sprite = tcThreeBSprite;
    }
  }
  this.speedX = 0; //vitesse X
  this.speedY = 0; //vitesse Y
  this.objectiveX = 0; //coordonnée X du point objectif
  this.objectiveY = 0; //coordonnée Y du point objectif
  this.totalMove = 0; //nombre de mouvement à effectuer
  this.actualPoint = 0; //position actuel
  this.speed = ENNEMY_SPEED * 1 / this.lvl; //vitesse
  this.active = true; //ennemi vivant ou non
  this.hp = this.lvl; //points de vies d'un ennemi

  //fonction qui alterne les sprites (pour l'animation)
  this.changeSprite = function(){
    if(this.sprite === tcOneASprite || this.sprite === tcTwoASprite || this.sprite === tcThreeASprite){
      if(this.lvl === 1){
        this.sprite = tcOneBSprite;
      }else if(lvl === 2){
        this.sprite = tcTwoBSprite;
      }else{
        this.sprite = tcThreeBSprite;
      }
    }else{
      if(this.lvl === 1){
        this.sprite = tcOneASprite;
      }else if(lvl === 2){
        this.sprite = tcTwoASprite;
      }else{
        this.sprite = tcThreeASprite;
      }
    }
  };

  //fonction qui actualise les caractéristiques d'un ennemi
  this.update = function(){

    //gestion de la perte de points de vies
    if(this.actualPoint === (chemin.length - 1) && this.x === chemin[chemin.length - 1].x && this.y === chemin[chemin.length - 1].y){
      if(this.active === true){
        playLostHPSound();
        playerHP -= this.lvl;
      }
      this.active = false;
    }

    //gestion de la défaite
    if(this.hp <= 0){
      if(this.active === true){
        score += this.lvl;
        statusPoints += this.lvl;
      }
      playEnnemyDyingSound();
      this.active = false;
    }

    //gestion du déplacement
    if(this.totalMove > 0){
      this.x += this.speedX;
      this.y += this.speedY;
      this.totalMove --;

      if(this.totalMove === 1){
        this.x = this.objectiveX;
        this.y = this.objectiveY;
      }
    }else{
      this.speedX = 0;
      this.speedY = 0;
      this.objectiveX = 0;
      this.objectiveY = 0;
    }
  };

  //fonction qui dessine un ennemi
  this.draw = function(){
    if(this.active === true){
      context.drawImage(this.sprite, this.x, this.y, this.width, this.height);
    }
  };
}

//fonction qui vérifie si une bullet touche un ennemi
function bulletCollider(){
  //pour chaque ennemi et chaque bullet
  ennemies.forEach(function(ennemy){
    if(ennemy != undefined){
      bullets.forEach(function(bullet){
        //si la bullet touche l'ennemi
        if(bullet != undefined){
          if(bullet.active && ennemy.active){
            if(ennemy.x < bullet.x + bullet.width
              && ennemy.x + ennemy.width > bullet.x
              && ennemy.y < bullet.y + bullet.height
              && ennemy.y + ennemy.height > bullet.y){


              if(ennemy.hp > bullet.damages){
                playHitSound();
              }

              //la bullet se désactive
              bullet.active = false;

              //on diminue les HP de l'ennemi
              ennemy.hp -= bullet.damages;
            }
          }
        }
      });
    }
  });
}

//detecteur de victoire
function winDetector(){
  if(playerHP <= 0){
    return true;
  }else{
    return false;
  }
}

//génération des ennemis de la première vague
function waveOne(waveLength){
  for (var i = 0; i < waveLength; i++) {
    spawnables.push(new Ennemy(1));
  }
}

//génération des ennemis de la seconde vague
function waveTwo(waveLength){
  for (var i = 0; i < waveLength; i++) {
    spawnables.push(new Ennemy(1));
    if(i < waveLength / 2){
      spawnables.push(new Ennemy(2));
    }
  }
}

//génération des ennemis de la troisième vague
function waveThree(waveLength){
  for (var i = 0; i < waveLength; i++) {
    spawnables.push(new Ennemy(1));
    spawnables.push(new Ennemy(2));
    if(i < waveLength / 2){
      spawnables.push(new Ennemy(3));
    }
  }
}

//génération des ennemis de la quatrième vague
function waveFour(waveLength){
  for (var i = 0; i < waveLength; i++) {
    spawnables.push(new Ennemy(1));
    spawnables.push(new Ennemy(1));
    spawnables.push(new Ennemy(2));
    spawnables.push(new Ennemy(3));
  }
}

//génération de la vague infinie
function playUnlimitedWave(){
  if(paused === false){
    if(wn === 5){
      //on génère un ennemi aléatoire
      let rdm = Math.floor(Math.random() * 3) + 1;
      ennemies.push(new Ennemy(rdm));

      //on diminue le temps de réapparition
      if(infiniteWaveTimer > 100){
        infiniteWaveTimer -= 100;
      }

      //on rapelle la fonction
      setTimeout(playUnlimitedWave, infiniteWaveTimer);
    }
  }
}

//permet de jouer une vague
function playWave(wn, timeInterval){
   intervals.push(setInterval(function(){
    if(paused === false){
      ennemies.push(spawnables[0]);
      spawnables.shift();
      if(spawnables.length === 0){
        spawnables = Array();
      }
    }
  }, timeInterval));
}


//permet de jouer une vague en focntion d'un numéro
function playWaveNumber(wn){
  if(wn === 5){
    publishScore(score, pseudo);
    launchWinScreen();
  }else{
    if(wn === 1){
      waveOne(20);
    }else if(wn === 2){
      waveTwo(35);
    }else if(wn === 3){
      waveThree(50);
    }else if(wn === 4){
      waveFour(60);
    }
    playWave(wn, 1500);
  }
}

//joue le jeu en entier
function playGame(){
  //on joue la première vague
  playWaveNumber(wn);

  //on lance le reste du jeu
  intervals.push(setInterval(function(){

    //quand plus aucun ennemis ne doit apparaitre
    if(spawnables.length === 0){

      //si plus aucun ennemi n'est rpésent sur la carte
      let nextWave = true;
      for (var i = 0; i < ennemies.length; i++) {
        if(ennemies[i] != undefined && ennemies[i].active === true){
          nextWave = false;
        }
      }

      //on joue la prochaine vague
      if(nextWave === true){
        if(wn != 5){
          wn += 1;
          if(wn === 2){
            score += 10;
          }else if(wn === 3){
            score += 100;
          }else if(wn === 4){
            score += 200;
          }
          playWaveNumber(wn);
          nextWave = false;
        }
      }
    }
  }, 10));
}

//fonction permettant de détruire les variables inutiles
function garbageCollector(){
  for (var i = 0; i < ennemies.length; i++) {
    if(ennemies[i] != undefined && ennemies[i].active === false)
    delete ennemies[i];
  }

  ennemies = ennemies.filter(ennemy => ennemy != undefined);

  for (var i = 0; i < ennemies.length; i++) {
    if(bullets[i] != undefined && bullets[i].active === false)
    delete bullets[i];
  }

  bullets = bullets.filter(bullet => bullet != undefined);

  intervals = intervals.filter(interv => interv != undefined);

}

//actualise les différents paragraphes des menus
function actualiseHP(){
  document.getElementById("hp").innerHTML = "HP : " + playerHP + " / " + maxPlayerHP;
}
function actualiseScore(){
  document.getElementById("scorePoints").innerHTML = "Score : " + score;
}
function actualiseStatusPoints(){
  document.getElementById("statusPoints").innerHTML = "Status Points : " + statusPoints + " SP";
}
function actualiseWaveNumber(){
  let waneNum = document.getElementById("wn");
  if(wn !== 5){
      waneNum.innerHTML = "Wave :" + wn;
  }else{
      waneNum.innerHTML = "Wave : ∞";
  }
}

//diminue le temps de rechargement du tir
function increaseAttackSpeed(as){
  reloadTime -= as;
}
function actualiseASDiv(){
  document.getElementById("rt").innerHTML = "Reload Time : " + ((500 - reloadTime) / 100) + " / " + RELOAD_TIME_MAX;
}
function buttonAS(){
  if(statusPoints >= RELOAD_TIME_COST && reloadTime - RELOAD_TIME_MAX > 200){
    playUpgradeSound();
    statusPoints -= RELOAD_TIME_COST;
    increaseAttackSpeed(100);
    actualiseASDiv();
    actualiseStatusPoints();
    totalPoints += 1;
  }else{
    playNotUpgradableSound();
  }
}

//augmente la vitesse des bullets
function increaseShootingSpeed(ss){
  BULLET_SPEED += ss;
}
function actualiseSSDiv(){
  document.getElementById("ss").innerHTML = "Shot Speed : " + (BULLET_SPEED - 5) + " / " + BULLET_SPEED_MAX;
}
function buttonSS(){
  if(statusPoints >= BULLET_SPEED_COST && BULLET_SPEED - BULLET_SPEED_MAX < BULLET_SPEED_MAX){
    playUpgradeSound();
    statusPoints -= BULLET_SPEED_COST;
    increaseShootingSpeed(1);
    actualiseSSDiv();
    actualiseStatusPoints();
    totalPoints += 1;
  }else{
    playNotUpgradableSound();
  }
}

//augmente les dégats des bullets
function increasestrengh(s){
  bullet_damages += s;
}
function actualiseSTRDiv(){
  document.getElementById("str").innerHTML = "Strength : " + bullet_damages + " / " + STRENGTH_MAX;
}
function buttonSTR(){
  if(statusPoints >= STRENGTH_COST && bullet_damages < STRENGTH_MAX){
    playUpgradeSound();
    statusPoints -= STRENGTH_COST;
    increasestrengh(1);
    actualiseSTRDiv();
    actualiseStatusPoints();
    totalPoints += 1;
  }else{
    playNotUpgradableSound();
  }
}

//permet d'attribuer les bon prix
function setCosts(){
  document.getElementById("strCost").innerHTML = "Cost : " + STRENGTH_COST + " SP";
  document.getElementById("rtCost").innerHTML = "Cost : " + RELOAD_TIME_COST + " SP";
  document.getElementById("ssCost").innerHTML = "Cost : " + BULLET_SPEED_COST + " SP";
}

//fonction qui anime une fois chaque ennemi
function animateEnnemies(){
  ennemies.forEach(function(ennemy) {
    if(ennemy != undefined){
      ennemy.changeSprite();
    }
  });
}

//affiche les Status points
function afficherStatusPoints(){
  paraSp.innerHTML = "Points disponibles : " + statusPoints;
}

//gère les raccourcis clavier
function shortCuts(e){
  if(e.code === "Space"){
    if(paused === true){
      resume();
    }else{
      pause();
    }
  }else if(e.key === "a"){
    buttonSTR();
  }else if(e.key === "z"){
    buttonAS();
  }else if(e.key === "e"){
    buttonSS();
  }else if(e.key === "r"){
    loadGame();
  }
}

//pause le jeu
function pause(){
  if(paused === false){
    playPausingSound();
    paused = true;
    pauseMenu.style.display = "inline";
    setTimeout(function(){
      pauseMenu.classList.add("isActive");
    }, 10);
  }
}

//gère le bouton de pause
function pauseButton(){
  if(paused === true){
    resume();
  }else{
    pause();
  }
}

//désactive la pause
function resume(){
  if(paused === true){
    playResumeSound();
    pauseMenu.classList.remove("isActive");
    setTimeout(function(){
      pauseMenu.style.display = "none";
      paused = false;
    }, 500);
  }
}

//charge le menu principal depuis le menu game over
function GOloadStartScreen(){
  gameOverMenu.classList.remove("isActive");
  gameOverMenu.style.display = "none";
  loadStartScreen();
}

//charge le jeu depuis le menu game over
function GOloadGame(){
  gameOverMenu.classList.remove("isActive");
  gameOverMenu.style.display = "none";
  loadGame();
}

//charge le jeu depuis le menu de victoire
function WINloadGame(){
  winScreen.classList.remove("isActive");
  setTimeout(function(){
    winScreen.style.display = "none";
    playUnlimitedWave();
  }, 500);
}

//charge le menu principal depuis le menu de victoire
function WINloadStartScreen(){
  winScreen.classList.remove("isActive");
  winScreen.style.display = "none";
  loadStartScreen();
}

//charge le menu de victoire
function launchWinScreen(){
  resizeWinScreen();
  playWinSound();
  document.getElementById("winFinalScore").innerHTML = "Final Score : " + score;
  winScreen.style.display = "inline";
  setTimeout(function(){
    winScreen.classList.add("isActive");
  }, 10);
}

//charge le menu game over
function gameOver(){
  resizeWinScreen();
  playGameOverSound();
  document.getElementById("finalScore").innerHTML = "Final Score : " + score;
  gameOverMenu.style.display = "inline";
  setTimeout(function(){
    gameOverMenu.classList.add("isActive");
  }, 10);
}

//charge le jeu
function loadGame(){
  playResumeSound();
  document.getElementById("startScreen").style.display = "none";
  document.getElementById("game").style.display = "inline";
  initialise();
  render();
}

//fonction qui actualise les données de tous les objets du jeu
function update(){
  if(winDetector() === true){
    publishScore(score, pseudo);
    gameOver();
    clearInterval(interval);
    delete interval;
  }
  if(paused === false){
    garbageCollector();
    actualiseHP();
    actualiseStatusPoints();
    actualiseScore();
    actualiseWaveNumber();
    microWave.update();
    replaceCanon();
    replaceBullets();
    canon.update();
    bullets.forEach(function(bullet){
      if(bullet != undefined){
        bulletCollider();
        bullet.update();
      }
    });

    ennemies.forEach(function(ennemy){
      if(ennemy != undefined){
        ennemy.update();
      }
    });
  }
}

//fonction qui dessine tous les objets du jeu
function draw(){
  if(paused === false){
    context.clearRect(0, 0, canvas.width, canvas.height);
    contextCanon.clearRect(0, 0, canvas.width, canvas.height);
    microWave.draw();
    bullets.forEach(function(bullet){
      if(bullet != undefined){
        if(!bullet.launched){
          shootBullet(bullet, bullet.pointDest);
          bullet.launched = true;
        }
        bullet.draw();
      }
    });

    ennemies.forEach(function(ennemy){
      if(ennemy != undefined){
        if(ennemy.totalMove === 0){
          if(ennemy.actualPoint < chemin.length - 1){
            objectToPoint(ennemy, chemin[ennemy.actualPoint + 1]);
            ennemy.actualPoint ++;
          }
        }
        ennemy.draw();
      }
    });

    canon.draw();
  }
}

//fonction qui effectue le rendu du jeu (update + draw)
function render(){
  //lancement du jeu
  playGame();

  animationInterval = setInterval(function(){
    animateEnnemies();
  }, 750);

  interval = setInterval(function(){
    update();
    draw();
  }, 10);
}
