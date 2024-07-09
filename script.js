/*
    Trivia Quiz Game:
    Develop a trivia quiz game where users can answer multiple-choice questions. 
    The questions and answers can be stored in an array of objects, and the game 
    should keep track of the user's score.
*/
// Create an array of objects containing trivia questions, correct answer, possible answers
// Display the questions and possible answers
// Handle on click user input, check the selected answer against the correct answer
// Update the user score


import trivia from './questions.json' assert {type: 'json'};
// console.log(trivia);

const startButton = document.getElementById('start');
const questionElement = document.getElementById('question');
const nextElement = document.getElementById('next-button');
const counter = document.getElementById('counter');
const questionNum = document.getElementById('question-num');
let index = 0;
let count = 0;

function displayQuestion(index) {

    if (trivia[index] === undefined) {
        nextElement.innerHTML = '';
        counter.textContent = `Score: ${count}/${trivia.length}`;
        questionElement.innerHTML = 
            `<span><img src="images/owl_logo.png">
            <br>Congrats! You've completed the Trivia Quiz game.
            <br>${counter.textContent} correct answers</span>
            <span>Click <span>Start</span> to play again</span>`

        return questionElement;
    };

    const p = document.createElement('p');
    p.textContent = `${trivia[index].question}`;
    questionElement.appendChild(p);

    for (let i = 0; i < trivia[index].options.length; i++) {
        const input = document.createElement('input');
        input.type = 'radio';
        input.name = 'option';
        input.id = i;
        input.value = trivia[index].options[i];

        const label = document.createElement('label');
        label.textContent = input.value;
        label.htmlFor = i;

        questionElement.appendChild(input);
        questionElement.appendChild(label);
    };

    counter.textContent = `Score: ${count}/${trivia.length}`;
    questionNum.textContent = `Question: ${index + 1} of ${trivia.length}`;
};

function startGame() {

    questionElement.innerHTML = '';
    nextElement.innerHTML = '';
    index = 0;
    count = 0;
    displayQuestion(index);

    const nextButton = document.createElement('button');
    nextButton.textContent = '➡';
    nextButton.addEventListener('click', handleNextQuestion);
    nextElement.appendChild(nextButton);
};

function handleNextQuestion() {

    const input = document.querySelector('input[name="option"]:checked');
    if (input.value === trivia[index].answer) {
        count++;
    };

    questionElement.innerHTML = '';
    if (index <= trivia.length - 1) {
        index++;
        return displayQuestion(index)
    }
};

function displayQuestionElement() {
    document.getElementById('question-box').style.display = 'block';
};

startButton.addEventListener('click', () => {
    displayQuestionElement();
    startGame();
});
