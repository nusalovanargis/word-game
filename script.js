let words = [
    {
      word: "book",
      hint: "a set of written, printed, or blank sheets bound together between a front and back cover",
    },
    {
      word: "pen",
      hint: "an instrument for writing or drawing with ink, typically consisting of a metal nib or ball, or a nylon tip, fitted into a metal or plastic holder.",
    },
    {
      word: "pencil",
      hint: "an instrument for writing or drawing, consisting of a thin stick of graphite or a similar substance enclosed in a long thin piece of wood or fixed in a cylindrical case.",
    },
    {
      word: "bag",
      hint: "a flexible container with an opening at the top, used for carrying things.",
    },
    {
      word: "sweet",
      hint: "having the pleasant taste characteristic of sugar or honey; not salt, sour, or bitter.",
    },
  ];
  
let start = document.querySelector(".start"); 
let timer = document.querySelector(".time");
let score = document.querySelector(".scoreNumber");
let letters = document.querySelectorAll(".letters>div"); 
let nextWord = document.querySelector(".Next");
let hintButton = document.querySelector(".Hint"); 
let hintBox = document.querySelector(".HHHint");
let wordBoxes = document.querySelector(".wordPart");
let selectedWord = "";
let selectedHint = "";
let wordNumber = 0;

function changeScore(point) {
  score.innerHTML = Number(score.innerHTML) + point;
}

function checkBoxes() {
  let boxes = document.querySelectorAll(".Letterss");
  for (let i = 0; i < boxes.length; i++) {
    if (boxes[i].innerHTML == "") {
      return false;
    }
  }
  return true;
}

function startTimer() {
  let time = 30;
  timer.style.backgroundColor = "green";
  timer.innerHTML = "Time: " + time;
  let interval = setInterval(() => {
    time--;
    timer.innerHTML = "Time: " + time;
    if (time <= 0) {
      timer.style.backgroundColor = "red";
      clearInterval(interval);
      alert("Time is up. Please refresh page");
      hintButton.removeEventListener("click", showHint);
      nextWord.removeEventListener("click", gotoNextWord);
      letters.forEach((element) => {
        element.removeEventListener("click", searchingword);
      });
      start.removeEventListener("click", onStartButtonPressed);
    }
  }, 1000);
}

function createBoxes() {
  wordBoxes.innerHTML = "";
  for (let i = 0; i < selectedWord.length; i++) {
    let div = document.createElement("div");
    div.classList.add("Letterss");
    wordBoxes.appendChild(div);
  }
}

function resetLetters() {
  letters.forEach((e) => {
    e.style.backgroundColor = "aqua";
  });
  hintBox.innerHTML = "";
}

function onStartGame() {
  selectedWord = words[0].word;
  selectedHint = words[0].hint;
  wordNumber = 0;
  wordBoxes.style.backgroundColor = "rgb(197, 184, 184,0)";
  createBoxes();
}

start.addEventListener("click", onStartButtonPressed);
function onStartButtonPressed() {
  startTimer();
  onStartGame();
  hintButton.addEventListener("click", showHint);
  nextWord.addEventListener("click", gotoNextWord);
  letters.forEach((element) => {
    element.addEventListener("click", searchingword);
  });
}

function searchingword(e) {
  let boxes = document.querySelectorAll(".Letterss");
  if (selectedWord.includes(e.target.textContent)) {
    for (let i = 0; i < selectedWord.length; i++) {
      if (selectedWord[i] == e.target.textContent) {
        boxes[i].innerHTML = e.target.textContent;
        changeScore(10);
        e.target.style.backgroundColor = "green";
        if (checkBoxes()) {
          gotoNextWord();
          resetLetters();
        }
      }
    }
  } else {
    e.target.style.backgroundColor = "red";
    changeScore(-10);
  }
}

function gotoNextWord() {
  hintBox.innerHTML = "";
  wordNumber++;
  selectedWord = words[wordNumber].word;
  selectedHint = words[wordNumber].hint;
  createBoxes();
}

function showHint() {
  hintBox.innerHTML = "";
  let div = document.createElement("div");
  div.classList.add("HHint");
  div.innerHTML = selectedHint;
  hintBox.appendChild(div);
}
