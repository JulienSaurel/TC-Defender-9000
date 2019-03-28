
function loadStartScreen(){
  document.getElementById("startScreen").style.display = "inline";
  document.getElementById("game").style.display = "none";
}

function startButton(){
  let playerPseudo = document.forms["pseudoForm"]["pseudo"].value;
  if(playerPseudo === ""){

  }else{
    document.getElementById("startScreen").style.display = "none";
    document.getElementById("game").style.display = "inline";
    initialise(playerPseudo);
    render();
  }
}

function setHighScores(){
  let table = document.getElementById("scoresTable");
  score_list();
  tab_score.forEach(function(score){
    let tr = document.creatElement("tr");
    let td = document.creatElement("td");
    tr.appendChild(td);
    table.appendChild(tr);
  })
}
