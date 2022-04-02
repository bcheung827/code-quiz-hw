//create variables for highscores
var highscores = document.querySelector("#highscores");
var clear = document.querySelector("#clear");
var goBack = document.querySelector("#goBack");

//create eventllistener to clear scores

clear.addEventListener("click", function () {
    localStorage.clear();
    location.reload();
})

//use JSON stringify and parse to log scores into local storage
var allScores = localStorage.getItem("allScores");
allScores = JSON.parse(allScores);

if (allScores !== null) {

    for (var i = 0; i < allScores.length; i++) {

        var createLi = document.createElement("li");
        createLi.textContent = allScores[i].initials + " - " + allScores[i].score;
        highscores.appendChild(createLi);
    }
}

goBack.addEventListener("click", function () {
    window.location.replace("index.html");
})
