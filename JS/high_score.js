let tab_score;
let low_score;
let select_score;

function myajax(stringScore, callback) {
    let url = "../php/index.php?action=" + stringScore;
    let requete = new XMLHttpRequest();
    requete.open("GET", url, true);
    if (callback != null) {
        requete.addEventListener("load", function () {
            callback(requete);
        });
    }
    requete.send(null);
}

function callback_score_all(req) {
    let tabObj = JSON.parse(req.responseText);
    let tabScore = new Array();

    tabObj.forEach(element => {
        tabScore.push(new Array(element.pseudo, element.score));
    })
    tab_score = tabScore;
}

function callback_score_low(req) {
    low_score = JSON.parse(req.responseText);
}

function callback_score_select(req) {
    select_score = JSON.parse(req.responseText);
}

// Stocke dans tab_score la liste des 10 premier scores
function score_list() {
    myajax("readAll", callback_score_all);
}

// Stock dans low_score le score le plus bas
function score_low() {
    let url = "../php/index.php?action=low";
    let requete = new XMLHttpRequest();
    // Travail en synchrone pour avoir le bon dernier score
    requete.open("GET", url, false);
    requete.addEventListener("load", function () {
        callback_score_low(requete);
    });
    requete.send(null);
}

// Stock dans score_select les stat du joueur de pseudo nick
function score_select(nick) {
    myajax("select&pseudo=" + nick, callback_score_select);
}

// Ajoute une nouvelle entrée dans la bdd
function score_new(nick, score) {
    myajax("create&pseudo=" + nick + "&score=" + score, null);
}

// Met a jour une entrée de la bdd
function score_update(nick, score) {
    myajax("update&pseudo=" + nick + "&score=" + score, null);
}

// Fonction qui ajoute un score si le pseudo est inconnu sinon update
function score_add(nick, score) {
    score_select(nick);
    let test = select_score;
    if (!test) {
        score_new(nick, score);
    } else {
        score_update(nick, score);
    }
}

// Fonction qui prend un score et l'ajoute dans la base de donnée si l'utilisateur est inconnu, sinon met à jour
function score(score) {
    score_low();
    if (score > low_score) {
        let rep = prompt("Veuillez donner votre pseudo");
        if (rep != null && rep != "") {
            score_select(rep);
            if (select_score && select_score.score < score) {
                score_add(rep, score);
            } else {
                score_add(rep, score);
            }
        }
    }
}