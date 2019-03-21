var backGroundAudio;
var hitSound; //Son joué quand une bullet touche un ennemi
var ennemiDyingSound;
var lostHPSound;
var shootSound;
var hoverButtonSound;
var pausingSound;
var resumeSound;
var gameOverSound;
var upGradeSound;
var notUpgradableSound;

var isFirstOpen = true;

function initSounds(){
  backGroundAudio = document.getElementById("playAudio");
  backGroundAudio.volume = 0.05;

  upGradeSound = new Audio("../sounds/upGradeSound.wav");
  upGradeSound.volume = 0.4;

  ennemiDyingSound = new Audio("../sounds/ennemiDyingSound.wav");
  ennemiDyingSound.volume = 0.6;

  hitSound = new Audio("../sounds/hitSound.wav");
  hitSound.volume = 0.05;

  lostHPSound = new Audio("../sounds/lostHPSound.wav");
  lostHPSound.volume = 0.05;

  shootSound = new Audio("../sounds/shootSound.wav");
  shootSound.volume = 0.05;

  hoverButtonSound = new Audio("../sounds/hoverButtonSound.wav");
  hoverButtonSound.volume = 0.05;

  pausingSound = new Audio("../sounds/pausingSound.wav");
  pausingSound.volume = 0.4;

  resumeSound = new Audio("../sounds/resumeSound.wav");
  resumeSound.volume = 0.4;

  gameOverSound = new Audio("../sounds/gameOverSound.wav");
  gameOverSound.volume = 1;

  notUpgradableSound = new Audio("../sounds/notUpgradableSound.wav");
  notUpgradableSound.volume = 0.2;

  playAmbianceSound();
}

function playAmbianceSound(){

  var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
  if(isChrome === true){
    window.addEventListener('mousedown', function(){
      if(!isFirstOpen) return;
      isFirstOpen = false;
      backGroundAudio.play();
    });
  }

  backGroundAudio.addEventListener('ended', function() {
    this.currentTime = 0;
    this.play();
  }, false);
}

function playHitSound(){
  hitSound.currentTime = 0;
  hitSound.play();
}

function playLostHPSound(){
  lostHPSound.currentTime = 0;
  lostHPSound.play();
}

function playShootSound(){
  shootSound.currentTime = 0;
  shootSound.play();
}

function playHoverButtonSound(){
  hoverButtonSound.currentTime = 0;
  hoverButtonSound.play();
}

function playPausingSound(){
  pausingSound.currentTime = 0;
  pausingSound.play();
}

function playGameOverSound(){
  gameOverSound.currentTime = 0;
  gameOverSound.play();
}

function playUpgradeSound() {
  upGradeSound.currentTime = 0;
  upGradeSound.play();
}

function playResumeSound() {
  resumeSound.currentTime = 0;
  resumeSound.play();
}

function playEnnemyDyingSound(){
  ennemiDyingSound.currentTime = 0;
  ennemiDyingSound.play();
}

function playNotUpgradableSound(){
  notUpgradableSound.currentTime = 0;
  notUpgradableSound.play();
}

initSounds();
