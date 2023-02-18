const questions = [
	{
		question: "Какой язык работает в браузере?",
		answers: ["Java", "C", "Python", "JavaScript"],
		correct: 4,
	},
	{
		question: "Что означает CSS?",
		answers: [
			"Central Style Sheets",
			"Cascading Style Sheets",
			"Cascading Simple Sheets",
			"Cars SUVs Sailboats",
		],
		correct: 2,
	},
	{
		question: "Что означает HTML?",
		answers: [
			"Hypertext Markup Language",
			"Hypertext Markdown Language",
			"Hyperloop Machine Language",
			"Helicopters Terminals Motorboats Lamborginis",
		],
		correct: 1,
	},
	{
		question: "В каком году был создан JavaScript?",
		answers: ["1996", "1995", "1994", "все ответы неверные"],
		correct: 2,
	},
];


const quiz = document.getElementById('quiz');
const list = document.getElementById('list');
const title = document.getElementById('title');
const btnSubmit = document.getElementById('submit');
const btnStart = document.getElementById('start');

const resultWrap = document.querySelector('.result-wrapper');
const titleRes = resultWrap.querySelector('.title');
const summary = resultWrap.querySelector('.summary');
const result = resultWrap.querySelector('.result');


let questionIndex = 0;
let score = 0;


const renderQuestion = (index) => {
	list.innerHTML = '';
	title.textContent = questions[questionIndex].question;

	questions[index].answers.forEach((answer, indexAnswer) => {
		list.insertAdjacentHTML('beforeend', `
		<li>
			<label>
				<input class="answer" type="radio" name="answer" value="${(indexAnswer + 1)}" />
				<span>${answer}</span>
			</label>
		</li>`);
	});
};


const addBlockStyles = (block1, block2) => {
	if (block1) block1.style.display = 'block';
	if (block2) block2.style.display = 'none';
};


const dataReset = () => {
	addBlockStyles(btnSubmit, btnStart);
	addBlockStyles(title, resultWrap);

	questionIndex = 0;
	score = 0;

	renderQuestion(questionIndex);
};


const startOver = () => {
	addBlockStyles(btnStart, btnSubmit);
	btnStart.addEventListener('click', dataReset);
};


const gameOver = () => {
	addBlockStyles(resultWrap, title);
	list.innerHTML = '';

	titleRes.innerHTML = 'Поздравляем! &#127941;';
	result.innerHTML = `${score} из ${questions.length}`;

	if (score === questions.length) {
		addBlockStyles(summary);
		summary.innerHTML = 'Вы ответили не все вопросы правильно! &#128170;';
	} else {
		addBlockStyles('', summary);
	}

	startOver();
};


const checkAnswer = (index) => {
	const listAnswers = document.querySelectorAll('.answer');

	let statusAnswer = false;

	listAnswers.forEach(answer => {
		if (answer.checked) {
			checkQuestion(index, +answer.value);
			statusAnswer = true;
		}
	});

	return statusAnswer;
};


const checkQuestion = (index, value) => {
	if (value === questions[index].correct) score++;
};


btnSubmit.addEventListener('click', () => {

	if (checkAnswer(questionIndex)) {
		questionIndex++;

		if (questionIndex >= questions.length) {
			gameOver();
		} else {
			renderQuestion(questionIndex);
		}
	}

});


renderQuestion(questionIndex);