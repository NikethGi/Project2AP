const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
 
    {
        question: 'Originally, Amazon only sold what kind of product?',
        choice1: 'Books',
        choice2: 'Phones',
        choice3: 'Toys',
        choice4: 'Apples',
        answer: 1,
    },
    {
        question: 'What movie collected the highest amount of money',
        choice1: 'Avengers Endgame',
        choice2: 'Titanic',
        choice3: 'Avatar 1',
        choice4: 'Oppenheimer',
        answer: 3,
    },
    {
        question: 'What was the name of Drakes 2023 album?',
        choice1: 'Take Care',
        choice2: 'Honestly nevermind',
        choice3: 'Certified loverboy',
        choice4: 'None of the above',
        answer: 4,
    },
    {
        question: 'Which horoscope sign is a fish?',
        choice1: 'Aquarius',
        choice2: 'Cancer',
        choice3: 'Sagittarius',
        choice4: 'Pisces',
        answer: 4,
    },
    {
        question: 'What is the largest US state by landmass?',
        choice1: 'Texas',
        choice2: 'Alaska',
        choice3: 'California',
        choice4: 'Washington',
        answer: 2,
    },
    {
        question: 'What is the strongest muscle in the human body?',
        choice1: 'Heart',
        choice2: 'Glutes',
        choice3: 'Jaw',
        choice4: 'Biceps',
        answer: 3,
    },
    {
        question: 'Where was the first example of paper money used?',
        choice1: 'China',
        choice2: 'Turkey',
        choice3: 'Greece',
        choice4: 'Russia',
        answer: 1,
    },
    {
        question: 'Who is the G.O.A.T of this class',
        choice1: 'Niketh',
        choice2: 'William',
        choice3: 'Edgar',
        choice4: 'None of the above',
        answer: 1,
    }
]

const SCORE_POINTS = 125
const MAX_QUESTIONS = 8

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('./end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`
    
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()
