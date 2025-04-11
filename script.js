import getQuestions from "./getQuestions.js";

const startButton = document.getElementById("startBtn");
const questionElement = document.getElementById("question");
const buttonWrapper = document.getElementById("buttonBox");
const counter = document.getElementById("counter");
const questionNum = document.getElementById("questionNum");
const questionWrapper = document.getElementById("questionBox");
let trivia = null;
let index = 0;
let count = 0;

function displayQuestion(index) {
  if (trivia[index] === undefined) {
    buttonWrapper.innerHTML = "";
    counter.textContent = `Score: ${count}/${trivia.length}`;
    questionElement.innerHTML = `<div class="quiz-score"><img src="images/owl_logo.png">
            <br>Congrats! You've completed the Trivia Quiz game.
            <br><span>${counter.textContent} correct answers</span></div>
            <div class="quiz-end">Click <span>Start</span> to play again</div>`;

    return questionElement;
  }

  const question = document.createElement("p");
  question.textContent = `${trivia[index].question}`;
  questionElement.appendChild(question);

  for (let i = 0; i < trivia[index].options.length; i++) {
    const input = document.createElement("input");
    input.type = "radio";
    input.name = "option";
    input.id = i;
    input.value = trivia[index].options[i];

    const label = document.createElement("label");
    const option = document.createElement("p");
    option.textContent = input.value;
    label.appendChild(option);
    label.htmlFor = i;

    questionElement.appendChild(input);
    questionElement.appendChild(label);
  }

  counter.textContent = `Score: ${count}/${trivia.length}`;
  questionNum.textContent = `Question: ${index + 1} of ${trivia.length}`;
}

function startGame() {
  questionElement.innerHTML = "";
  buttonWrapper.innerHTML = "";
  trivia = null;
  index = 0;
  count = 0;

  getQuestions().then((data) => {
    trivia = data;
    displayQuestion(index);
  });

  const nextButton = document.createElement("button");
  nextButton.textContent = "Next";
  nextButton.addEventListener("click", handleNextQuestion);
  buttonWrapper.appendChild(nextButton);

  questionWrapper.classList.add("active");
}

function handleNextQuestion() {
  const input = document.querySelector('input[name="option"]:checked');
  if (!input) return;
  if (input.value === trivia[index].answer) {
    count++;
  }

  questionElement.innerHTML = "";
  if (index <= trivia.length - 1) {
    index++;
    return displayQuestion(index);
  }
}

startButton.addEventListener("click", () => {
  startGame();
  setTimeout(() => {
    questionWrapper.scrollIntoView({ behavior: "smooth" });
  }, 150);
});
