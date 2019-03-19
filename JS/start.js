/* global bullets, reloadTime, canongPoint, canondPoint, canongX, end, BULLET_SPEED, bullet_damages, chemin, playerHP, statusPoints, spawnables, paraSp */

var startCanvas = document.getElementById("startCanvas");
var startContext = startCanvas.getContext("2d");
var canvasCanonLeft = document.getElementById("canonLeft");
var contextCanonLeft = canvasCanonLeft.getContext("2d");
var canvasCanonRight = document.getElementById("canonRight");
var contextCanonRight = canvasCanonRight.getContext("2d");

var axeX2 = startCanvas.width;
var axeY2 = startCanvas.height;

//canon gauche du start
var CANONG_WIDTH = axeX2 / 4; //Largeur du canon
var CANONG_HEIGHT = axeY2 / 4; //Hauteur du canon
var CANONG_X = (axeX2 / 4) - (CANONG_WIDTH / 2); //coordonnée X du canon
var CANONG_Y = (axeY2 / 4) - (CANONG_HEIGHT / 2); //coordonnée Y du canon

//canon droite du start
var CANOND_WIDTH = axeX2 / 4; //Largeur du canon
var CANOND_HEIGHT = axeY2 / 4; //Hauteur du canon
var CANOND_X = (axeX2 / 4)*3 + (CANOND_WIDTH / 2); //coordonnée X du canon
var CANOND_Y = (axeY2 / 4) - (CANOND_HEIGHT / 2); //coordonnée Y du canon

//ennemi du start screen
var SENNEMY_WIDTH = (1 / 12) * 0.5 * axeX2; //largeur
var SENNEMY_HEIGHT = (1 / 12) * 0.55 * axeY2; //hauteur
var SENNEMY_SPEED = 0; //vitesse
var ennemies = Array(); //tableau contenant tous les ennemis

function initialise(){
  setCosts();
  loadImages(); // charge les images
  window.addEventListener('resize', function(){
    initCanvas();
  }, false); //ce listener permet lancer une fonction pour rendre le jeu responsive
  document.addEventListener("mousemove", mouseMoveHandler, false); //listener pour le mouvement de la souris
  document.addEventListener("click", canong.shoot, false); //listener pour le click de souris
  document.addEventListener("click", canond.shoot, false);
  initCanvas();  
}

function initCanvas(){
	startCanvas.style.left = window.innerWidth * 0.125 + "px";
	startCanvas.width = window.innerWidth * 0.5;
  	startCanvas.height = window.innerWidth * 0.5;
 	canvasCanonLeft.style.left = window.innerWidth * 0.125 + "px";
  	canvasCanonLeft.width = window.innerWidth * 0.5;
  	canvasCanonLeft.height = window.innerWidth * 0.5;
        canvasCanonRight.style.left = window.innerWidth * 0.125 + "px";
  	canvasCanonRight.width = window.innerWidth * 0.5;
  	canvasCanonRight.height = window.innerWidth * 0.5;

  	var axeX2 = startCanvas.width;
	var axeY2 = startCanvas.height;
	CANONG_WIDTH = axeX2 / 4;
  	CANONG_HEIGHT = axeY2 / 4;
  	CANONG_X = (axeX2 / 2) - (CANONG_WIDTH / 2);
  	CANONG_Y = (axeY2 / 2) - (CANONG_HEIGHT / 2);
            //bullets
        var BULLET_WIDTH = (1 / 4) * (1 / 12) * axeX2; //largeur d'une bullet
        var BULLET_HEIGHT = (1 / 4) * (1 / 12) * axeY2; //hauteur d'une bullet
        var BULLET_SPEED = 5; //vitesse d'une bullet
        var reloadTime = 500; //temps de rechargement (en ms) du tir
        var bullet_damages = 1;
        var bullets = Array();
        
                //ennemies
        var ENNEMY_WIDTH = (1 / 12) * 0.5 * axeX2; //largeur d'un ennemi
        var ENNEMY_HEIGHT = (1 / 12) * 0.55 * axeY2; //hauteur d'un ennemi
        var ENNEMY_SPEED = (axeX2 / 12) / 50; //vitesse d'un ennemi
        var ennemies = Array(); //tableau contenant tous les ennemis
        
        

}

function mouseMoveHandler(e) {
  //calcul de la position de la souris en fonction du centre du canon
  mouseX = e.clientX - CANONG_WIDTH / 2 - window.innerWidth * 0.125;
  mouseY = e.clientY - CANONG_HEIGHT / 2;
  

  //calcul de l'angle en fonction du centre du canon et de la souris
  angle = Math.atan2((mouseY - CANONG_Y) , (mouseX - CANONG_X ));

  //on ajoute 1 radian (1.5708) à l'angle pour le tourner dans la bonne direction
  canong.angle = angle + 1.5708;
  canond.angle = angle - 1.5708;
}

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
var microWaveSprite = new Image();

function loadImages(){
  bulletSprite.src = "../img/vaisseau.jpg";
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
    contextCanonLeft.drawImage(canong.sprite, this.x, this.y, this.width, this.height);

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
    }else if(canong.lvl === 2){
      canong.sprite = canonBSprite;
    }else if(canong.lvl === 3){
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
  }
};
canond = {
  x: CANOND_X, // coordonnée X du canon
  y: CANOND_Y, // coordonnée Y du canon
  width: CANOND_WIDTH, // largeur du canon
  height: CANOND_HEIGHT, // hauteur du canon
  angle: 0, //orientation du canon
  canShoot: true, //variable vérifiant si le canon est en rechargement
  lvl: 1,
  sprite: canonASprite,
  // fonction qui dessine le canon
  draw: function(){
    //on dessine le canon
    contextCanonLeft.drawImage(canond.sprite, this.x, this.y, this.width, this.height);

    //on réinitialiser l'orientation du canvas du canon
    contextCanonLeft.setTransform(1, 0, 0, 1, 0, 0);

    //on déplace le canvas aux coordonnée du centre du canon
    contextCanonLeft.translate((CANOND_X + CANOND_WIDTH / 2), (CANOND_Y + CANOND_HEIGHT / 2));

    //on effectue une rotation selon l'angle
    contextCanonLeft.rotate(canond.angle);

    // on effectue la translation inverse
    contextCanonLeft.translate(-(CANOND_X + CANOND_WIDTH / 2), -(CANOND_Y + CANOND_HEIGHT / 2));
  },

  //fonction permettant d'actualiser les données du canon
  update: function(){
    if(canond.lvl === 1){
      canond.sprite = canonASprite;
    }else if(canond.lvl === 2){
      canond.sprite = canonBSprite;
    }else if(canond.lvl === 3){
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
  }
};

function replaceCanong(){
  canong.x = CANONG_X;
  canong.y = CANONG_Y;
  canong.width = CANONG_WIDTH;
  canong.height = CANONG_HEIGHT;
}

function replaceCanond(){
  canond.x = CANOND_X;
  canond.y = CANOND_Y;
  canond.width = CANOND_WIDTH;
  canond.height = CANOND_HEIGHT;
}

function replaceEnnemies(){
  ENNEMY_WIDTH = (1 / 12) * 0.625 * axeX2;
  ENNEMY_HEIGHT = (1 / 12) * 0.625 * axeY2;
  ENNEMY_SPEED = (axeX2 / 12) / 50;
  ennemies.forEach(function(ennemy){
    if(ennemy !== undefined){
      ennemy.width = ENNEMY_WIDTH;
      ennemy.height = ENNEMY_HEIGHT;
    }
  });
}

function replaceBullets(){
  BULLET_WIDTH = (1 / 4) * (1 / 12) * axeX2;
  BULLET_HEIGHT = (1 / 4) * (1 / 12) * axeY2;
  bullets.forEach(function(bullet){
    if(bullet !== undefined){
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

//fonction qui donne une direction de déplacement à un objet
function objectToDirection(object, point){
  //cette fonction fonctionne comme "objectToPoint" sauf qu'elle ne donne que les vitesses X et Y à l'objet
  let AC = point.y - object.y;
  let CB = point.x - object.x;
  let AB = Math.sqrt(AC * AC + CB * CB);
  let ratio = Math.floor(AB / object.speed);
  let diffX = CB / ratio;
  let diffY = AC / ratio;
  let x = point.x;
  let y = point.y;
  object.speedX = diffX;
  object.speedY = diffY;
}

function bulletToDirection(bullet){
  let canongX = axeX2 / 2;
  let canongY = axeY2 / 2;
  let canondX = axeX2 / 2;
  let canondY = axeY2 / 2;
  let endgX = canongPoint().x;
  let endgY = canongPoint().y;
  let enddX = canondPoint().x;
  let enddY = canondPoint().y;

  let ABg = endgX - canongX;
  let ABd = enddX - canondX;
  let BC = end

}

//fonction calculant les coordonnées du bout du canon en fonction de son angle
function canonPoint(){
  let canongX = Math.cos(angle) * CANONG_WIDTH / 2 + CANONG_X + CANONG_WIDTH / 2;
  let canongY = Math.sin(angle) * CANONG_WIDTH / 2 + CANONG_Y + CANONG_HEIGHT / 2;
  let canondX = Math.cos(angle) * CANOND_WIDTH / 2 + CANOND_X + CANOND_WIDTH / 2;
  let canondY = Math.sin(angle) * CANOND_WIDTH / 2 + CANOND_Y + CANOND_HEIGHT / 2;
  return resultg = {x: canongX, y: canongY};
  return resultd = {x: canondX, y: canondY};
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
      startContext.drawImage(this.sprite, this.x, this.y, this.width, this.height);
    }
  };

  //fonction qui actualise l'état d'une bullet
  this.update = function(){
    //si la bullet est en dehors de l'écran on la désactive
    if(this.x > axeX2 || this.x + this.width < 0 || this.y > axeY2 || this.y + this.height < 0 || !this.active){
      this.active = false;
    }else{
      //sinon on la fait avancer
        this.x += this.speedX;
        this.y += this.speedY;
    }
  };
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
    if(this.actualPoint === (chemin.length - 1) && this.x === chemin[chemin.length - 1].x && this.y === chemin[chemin.length - 1].y){
      if(this.active === true){
        playerHP -= this.lvl;
      }
      this.active = false;
    }
    if(this.hp <= 0){
      if(this.active === true){

        statusPoints += this.lvl;
      }
      this.active = false;
    }
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
      startContext.drawImage(this.sprite, this.x, this.y, this.width, this.height);
    }
  };
}


//fonction qui vérifie si une bullet touche un ennemi
function bulletCollider(){
  //pour chaque ennemi et chaque bullet
  ennemies.forEach(function(ennemy){
    if(ennemy !== undefined){
      bullets.forEach(function(bullet){
        //si la bullet touche l'ennemi
        if(bullet !== undefined){
          if(bullet.active && ennemy.active){
            if(ennemy.x < bullet.x + bullet.width
              && ennemy.x + ennemy.width > bullet.x
              && ennemy.y < bullet.y - bullet.height
              && ennemy.y + ennemy.height > bullet.y){

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

function playWave(wn, timeInterval){
  let newInterval = setInterval(function(){
    ennemies.push(spawnables[0]);
    spawnables.shift();
    if(spawnables.length === 0){
      spawnables = Array();
    }
  }, timeInterval);
}

function playGame(){
  let wn = 1;
  playWaveNumber(wn);
  let newInterval = setInterval(function(){
    if(spawnables.length === 0){
      wn += 1;
      let nextWave = true;
      for (var i = 0; i < ennemies.length; i++) {
        if(ennemies[i] !== undefined && [i].active === true){
          nextWave = false;
        }
      }
      if(nextWave === true){
        playWaveNumber(wn);
      }
    }
  }, 10);
}

function actualiseStatusPoints(){
  document.getElementById("statusPoints").innerHTML = "Points disponibles : " + statusPoints + " SP";
}

//diminue le temps de rechargement du tir
function increaseAttackSpeed(as){
  reloadTime -= as;
}



//augmente la vitesse des bullets
function increaseShootingSpeed(ss){
  BULLET_SPEED += ss;
}



function garbageCollector(){
  for (var i = 0; i < ennemies.length; i++) {
    if(ennemies[i] !== undefined && ennemies[i].active === false)
    delete ennemies[i];
  }

  ennemies = ennemies.filter(ennemy => ennemy !== undefined);

  for (var i = 0; i < ennemies.length; i++) {
    if(bullets[i] !== undefined && bullets[i].active === false)
    delete bullets[i];
  }

  bullets = bullets.filter(bullet => bullet !== undefined);

}

//augmente les dégats des bullets
function increasestrengh(s){
  bullet_damages += s;
  }



//fonction qui anime une fois chaque ennemi
function animateEnnemies(){
  ennemies.forEach(function(ennemy) {
    if(ennemy !== undefined){
      ennemy.changeSprite();
    }
  });
}

//affiche les Status points
function afficherStatusPoints(){
  paraSp.innerHTML = "Points disponibles : " + statusPoints;
}

//fonction qui actualise les données de tous les objets du jeu
function update(){
  garbageCollector();
  actualiseStatusPoints();
  if(winDetector() === true){
    alert("ok");
    clearInterval(interval);
  }
  replaceEnnemies();
  replaceCanon();
  replaceBullets();
  canong.update();
  bullets.forEach(function(bullet){
    if(bullet !== undefined){
      bulletCollider();
      bullet.update();
    }
  });

  ennemies.forEach(function(ennemy){
    if(ennemy !== undefined){
      ennemy.update();
    }
  });
}

//fonction qui dessine tous les objets du jeu
function draw(){
  startContext.clearRect(0, 0, startCanvas.width, startCanvas.height);
  contextCanonLeft.clearRect(0, 0, startCanvas.width, startCanvas.height);
  bullets.forEach(function(bullet){
    if(bullet !== undefined){
      if(!bullet.launched){
        objectToDirection(bullet, bullet.pointDest);
        bullet.launched = true;
      }
      bullet.draw();
    }
  });

  ennemies.forEach(function(ennemy){
    if(ennemy !== undefined){
      if(ennemy.totalMove === 0){
        if(ennemy.actualPoint < chemin.length - 1){
          objectToPoint(ennemy, chemin[ennemy.actualPoint + 1]);
          ennemy.actualPoint ++;
        }
      }
      ennemy.draw();
    }
  });

  canong.draw();
}

//fonction qui effectue le rendu du jeu (update + draw)
function render(){
  playGame();

  interval = setInterval(function(){
    animateEnnemies();
  }, 750);

  interval = setInterval(function(){
    update();
    draw();
  }, 10);
}
// initialise();
// render();
initialise();
render();