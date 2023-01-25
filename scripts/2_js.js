// VARIABLES
const wrapperElement = document.querySelector('.wrapper');
const startBtnElement = document.querySelector('#start-btn');
const nextBtnElement = document.querySelector('#next-btn');
const quizQuestionElement = document.querySelector('.quiz__question');
const questionElement = document.querySelector('#question');
const answerBtnsElement = document.querySelector('#answers-btns');
const resultElement = document.querySelector('#result');

let questions = [];
let index;
let score = 0;

// FUNCTIONS
// -- starting quiz (after pressing "START QUIZ")
const startQuiz = () => {
  startBtnElement.classList.add('hide');

  quizQuestionElement.classList.remove('hide');

  if (!resultElement.classList.contains('hide')) {
    resultElement.classList.add('hide');
    score = 0;
  }

  index = 0;

  setNextQuestion();
};

// -- resetting "NEXT QUESTION" button and setting new question
const setNextQuestion = () => {
  resetState();
  showQuestion(questions[index]);
};

// -- selecting answer (by clicking on it's button)
const selectAnswer = (e) => {
  const correct = e.target.dataset.correct;

  if (correct) {
    e.target.classList.add('btn-correct');
    e.target.innerHTML += ` <i class="fas fa-check-circle"></i>`;
    score++;
  } else {
    e.target.classList.add('btn-wrong');
    e.target.innerHTML += ` <i class="fas fa-times-circle"></i>`;
  }

  Array.from(answerBtnsElement.children).forEach((x) => {
    x.disabled = true;
  });

  if (questions.length > index + 1) {
    nextBtnElement.classList.remove('hide');
  } else {
    startBtnElement.innerText = 'RESTART QUIZ';
    startBtnElement.classList.remove('hide');

    resultElement.classList.remove('hide');

    if (score / questions.length === 1) {
      resultElement.innerHTML = `Correct answers: ${score} from ${questions.length}. You're an JavaScript <i class="fas fa-star"></i>`;
    } else {
      resultElement.innerText = `Correct answers: ${score} from ${questions.length}.`;
    }
  }
};

// -- showing question and answers from questions array
const showQuestion = ({ question, answers }) => {
  questionElement.innerText = question;

  answers.forEach((answer) => {
    const button = document.createElement('button');

    button.innerText = answer.text;
    button.classList.add('btn', 'btn-js');

    if (answer.correct) button.dataset.correct = answer.correct;

    button.addEventListener('click', selectAnswer);

    answerBtnsElement.appendChild(button);
  });
};

// -- showing next question (after clicking "NEXT QUESTION" button)
const showNextQuestion = () => {
  index++;
  setNextQuestion();
};

// -- resetting "NEXT QUESTION" button and answers buttons
const resetState = () => {
  nextBtnElement.classList.add('hide');

  while (answerBtnsElement.firstChild) {
    answerBtnsElement.removeChild(answerBtnsElement.firstChild);
  }
};

// EVENTS
document.addEventListener('DOMContentLoaded', async () => {
  wrapperElement.style.backgroundColor = 'var(--js-color)';
  startBtnElement.style.backgroundColor = 'var(--js-color)';

  const data = await (await fetch('../data/JS_questions.json')).json();
  questions = [...data];
});

startBtnElement.addEventListener('click', startQuiz);
nextBtnElement.addEventListener('click', showNextQuestion);
