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
var winSound;

var isFirstOpen = true;
var mute = false;

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

  winSound = new Audio("../sounds/winSound.wav");
  winSound.volume = 0.4;

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
  if(mute === false){
    hitSound.currentTime = 0;
    hitSound.play();
  }
}

function playLostHPSound(){
  if(mute === false){
    lostHPSound.currentTime = 0;
    lostHPSound.play();
  }
}

function playShootSound(){
  if(mute === false){
    shootSound.currentTime = 0;
    shootSound.play();
  }
}

function playHoverButtonSound(){
  if(mute === false){
    hoverButtonSound.currentTime = 0;
    hoverButtonSound.play();
  }
}

function playPausingSound(){
  if(mute === false){
    pausingSound.currentTime = 0;
    pausingSound.play();
  }
}

function playGameOverSound(){
  if(mute === false){
    gameOverSound.currentTime = 0;
    gameOverSound.play();
  }
}

function playUpgradeSound() {
  if(mute === false){
    upGradeSound.currentTime = 0;
    upGradeSound.play();
  }
}

function playResumeSound() {
  if(mute === false){
    resumeSound.currentTime = 0;
    resumeSound.play();
  }
}

function playEnnemyDyingSound(){
  if(mute === false){
    ennemiDyingSound.currentTime = 0;
    ennemiDyingSound.play();
  }
}

function playNotUpgradableSound(){
  if(mute === false){
    notUpgradableSound.currentTime = 0;
    notUpgradableSound.play();
  }
}

function playWinSound(){
  if(mute === false){
    winSound.currentTime = 0;
    winSound.play();
  }
}

function muteInterface(){
  mute = true;
}

function unmuteInterface(){
  mute = false;
}

function muteBackground(){
  backGroundAudio.pause();
}

function unmuteBackground(){
  backGroundAudio.play();
}

function muteSound(){
  muteInterface();
  muteBackground();
}

function unmuteSound(){
  unmuteInterface();
  unmuteBackground();
}

function globalSound(){
  if(mute == true){
    unmuteSound();
    //document.getElementById('globalsound').value = "Global sounds off";
  }else{
    muteSound();
    //document.getElementById('globalsound').value = "Global sounds on";
  }
}

function interfaceSound(){
  if(mute == true){
    unmuteInterface();
    //document.getElementById('interfacesound').value = "Interface sounds off";
  }else{
    muteInterface();
    //document.getElementById('interfacesound').value = "Interface sounds on";
  }
}

function musicSound(){
  if(mute == true){
    unmuteBackground();
    //document.getElementById('musicsound').value = "Music sounds off";
  }else{
    muteBackground();
    //document.getElementById('musicsound').value = "Music sounds on";
  }
}

initSounds();
