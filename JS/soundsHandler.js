var ambianceSound; //son d'ambiance général
var hitSound; //son joué quand une bullet touche un ennemi
var lostHPSound; //son joué lorsque le joueur perd un HP
var shootSound; //son joué lorsque le joueur tire
var hoverButtonSound; //son joué lorsque la souris d'un joueur survole un button
var pausingSound; //son joué au début d'une pause

function initSounds(){
  ambianceSound = new Audio("../sounds/ambiance_sound.mp3");
  ambianceSound.volume = 0.8;

  playAmbianceSound();
}

function playAmbianceSound(){
  ambianceSound.autoplay = true;
  ambianceSound.addEventListener('ended', function() {
    this.currentTime = 0;
    this.play();
  }, false);
}

function playHitSound(){
  hitSound.play();
}

function playLostHPSound(){
  lostHPSound.play();
}

function playShootSound(){
  shootSound.play();
}

function playHoverButtonSound(){
  hoverButtonSound.play();
}

function playPausingSound(){
  pausingSound.play();
}

initSounds();
