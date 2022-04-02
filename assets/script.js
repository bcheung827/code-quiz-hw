//create variable for questions with array for choices
var allQuestions = [
  {
    question: "Javascript is an _____ language?",
    choices: ["Object-Oriented", "Object-Based", "Procedural", "None of the Above"],
    answer: "Object-Oriented"
  },
  {
    question: "Which function is used to serialize an object into a JSON string in JS?",
    choices: ["parse()", "parseInt()", "stringify()", "None of the Above"],
    answer: "stringify()"
  },
  {
    question: "Which of the following are closures in JS?",
    choices: ["Variables", "Functions", "Objects", "All of the Above"],
    answer: "All of the Above"
  },
  {
    question: "How can a datatype be declared to be a constant type?",
    choices: ["var", "constant", "const", "None of the Above"],
    answer: "const"
  },
  {
    question: "How do we write a comment in JS?",
    choices: ["$", "/* */", "<>", "//"],
    answer: "//"
  },
];

//create variable for score and index for arrays
var score = 0;
var questionIndex = 0;

//create variable for timer and countdown set to 0
var seconds = 60;
var start = document.querySelector("#start");
var timer = document.querySelector("#timer");
var myQuestions = document.querySelector("#questions");
var wrapper = document.querySelector("#wrapper");
var result = document.querySelector(".result");
var timerInterval = 0;
var penalty = 10;
var ulCreate = document.createElement("ul");

function displayTimer() {
  var sec = seconds % 60 < 10 ? "0" + seconds % 60 : seconds % 60;
  var min = Math.floor(seconds / 60);

  timer.textContent = `${min}:${sec}`;
};

//create button function for timer
start.addEventListener("click", function () {
  document.querySelector(".intro").style.display="none";
  document.querySelector(".intro2").style.display="none";
  document.querySelector("#start").style.display="none";
  displayTimer()
  console.log("start");
  clearInterval(timerInterval);

  timerInterval = setInterval(function () {
    console.log(--seconds);

    displayTimer();

    if (seconds <= 0 || questionIndex >= allQuestions.length) {
      clearInterval(timerInterval);
      timer.textContent = "Time's Up!"
    }
  }, 1000);

  render(questionIndex);

});

//create render function to manipulate DOM elements
function render(questionIndex) {
  myQuestions.innerHTML = "";
  ulCreate.innerHTML = "";

  for (var i = 0; i < allQuestions.length; i++) {
    var userQuestion = allQuestions[questionIndex].question;
    var userChoices = allQuestions[questionIndex].choices;
    myQuestions.textContent = userQuestion;
  }
  userChoices.forEach(function (newItem) {
    var listItem = document.createElement("li");
    listItem.textContent = newItem;
    myQuestions.appendChild(ulCreate);
    ulCreate.appendChild(listItem);
    listItem.addEventListener("click", (compare));
  })
}

//create function to compare choices with answers
//create penalty for incorrect answers
function compare(event) {
  var element = event.target;

  if (element.matches("li")) {

    var create = document.createElement('h5');
    create.setAttribute("id", "create");
    if (element.textContent == allQuestions[questionIndex].answer) {
      score++;
      create.textContent = "Correct Answer: " + allQuestions[questionIndex].answer;

    } else {
      seconds = seconds - penalty;
      create.textContent = "Wrong Answer! The correct answer was: " + allQuestions[questionIndex].answer;
    }
  }

  questionIndex++;

  if (questionIndex >= allQuestions.length) {
    allDone();
    create.textContent = "You answered " + score + "/" + allQuestions.length + " correct.";

  } else {
    render(questionIndex);
  }
  myQuestions.appendChild(create);

}

//create page for after quiz is finished and insert initials
function allDone() {
  myQuestions.innerHTML = "";
  timer.innerHTML = "";

  var createHl = document.createElement("hl")
  createHl.setAttribute("id", "createH1");
  createHl.textContent = "Finished!"
  myQuestions.appendChild(createHl);

  var createP = document.createElement("p");
  createP.setAttribute("id", "createP");

  myQuestions.appendChild(createP);

  if (seconds >= 0) {
    var timeRemaining = seconds;
    var createP2 = document.createElement("p");
    clearInterval(timerInterval);
    createP.textContent = "Your final score is: " + timeRemaining;

    myQuestions.appendChild(createP2)
  }

  var createLabel = document.createElement("label");
  createLabel.setAttribute("id", "createLabel");
  createLabel.textContent = "Enter your initials: ";

  myQuestions.appendChild(createLabel);

  var createInput = document.createElement("input");
  createInput.setAttribute("type", "text");
  createInput.setAttribute("id", "initials");
  createInput.textContent = "";

  myQuestions.appendChild(createInput);

//create highscore page to keep scores
//use JSON stringify and parse to log scores into local storage
var createSubmit = document.createElement("button");
createSubmit.setAttribute("type", "submit");
createSubmit.setAttribute("id", "submit");
createSubmit.textContent = "Submit";
myQuestions.appendChild(createSubmit);

createSubmit.addEventListener("click", function () {
  var initials = createInput.value;

  if (initials === null) {

    console.log("Enter Initials");

  } else {
    var finalScore = {
      initials: initials,
      score: timeRemaining
    }
    console.log(finalScore);
    var allScores = localStorage.getItem("allScores");
    if (allScores === null) {
      allScores = [];

    } else {
      allScores = JSON.parse(allScores);
    }
    allScores.push(finalScore);
    var newScore = JSON.stringify(allScores);
    localStorage.setItem("allScores", newScore);
    window.location.replace("highscores.html");
  }
})}
