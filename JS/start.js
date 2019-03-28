
function loadStartScreen(){
  document.getElementById("startScreen").style.display = "inline";
  document.getElementById("game").style.display = "none";
  score_list();
  setHighScores();
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
  score_list();
  let table = document.getElementById("scoresTable");
  setTimeout(function(){
    tab_score.forEach(function(score){
      let tr = document.createElement("tr");
      let tdpseudo = document.createElement("td");
      let tdscore = document.createElement("td");
      tdpseudo.innerHTML = score[0];
      tdscore.innerHTML = score[1];
      tr.appendChild(tdpseudo);
      tr.appendChild(tdscore);
      table.appendChild(tr);
    })
  }, 100);
}
