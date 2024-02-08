const totalNumberOfQuestions = 44;
const reloadTime = 2000;
let displayedQuestionNumber = 0;

// TEMPLATE: | png | Latin Modern | (12pt) Grande | 200 | Transparente | #unmarked | #unmarked |

function generate() {
    let questionNumber = 0;
    do {
        questionNumber = getRandomPositiveInteger(totalNumberOfQuestions);
    } while (questionNumber === displayedQuestionNumber);

    displayedQuestionNumber = questionNumber;
    document.getElementById("question").setAttribute("src", "assets/" + questionNumber + ".png");

    // the implementation below is probably not the most appropriate one, but I don't know a better one atm
    // this makes the website responsible by setting specific display widths based on a image natural width;
    let questionImg = new Image();
    questionImg.src = "assets/" + questionNumber + ".png";

    questionImg.onload = function() {
        let w = questionImg.naturalWidth;
        let questionImgElement = document.getElementById("question");

        if (w <= 200) {
            questionImgElement.setAttribute("width", "30%");
        } else if (w <= 300) {
            questionImgElement.setAttribute("width", "40%");
        } else if (w <= 400) {
            questionImgElement.setAttribute("width", "50%");
        } else if (w <= 500) {
            questionImgElement.setAttribute("width", "60%");
        } else {
            questionImgElement.setAttribute("width", "70%");
        }
    }

    let dummyArray = getShuffledArray();
    const answers = document.getElementById("answer-container").children;

    for (let i = 0; i < 3; i++) {
        answers[i].firstChild.setAttribute("src", "assets/" + questionNumber + "-" + dummyArray[i] + ".png");
        if (dummyArray[i] === 3) {
            answers[i].setAttribute("class", "answer correct");
        } else {
            answers[i].setAttribute("class", "answer incorrect");
        }

        // thank god stackoverflow exists, fixed the sizing problem
        let answerImg = new Image();
        answerImg.src = "assets/" + questionNumber + "-" + dummyArray[i] + ".png";
        answerImg.onload = function() {
            if (answerImg.naturalHeight <= 70) {
                answers[i].firstChild.setAttribute("height", "50%");
            } else {
                answers[i].firstChild.setAttribute("height", "80%");
            }
        }
    }
}

function getShuffledArray() {
    const array = [];
    array[0] = getRandomPositiveInteger(3);

    let i = 1;
    while (i < 3) {
        let temp = getRandomPositiveInteger(3);
        if (!array.includes(temp)) {
            array[i] = temp;
            i += 1;
        }
    }

    return array;
}

function checkAnswer(divClass, answerId) {
    blockUserClick();

    if (divClass === "answer correct") {
        styleCorrect(answerId);
    } else if (divClass === "answer incorrect") {
        styleIncorrect(answerId);
    }

    setTimeout(generate, reloadTime);
}

function blockUserClick() {
    const answers = document.getElementsByClassName("answer");
    for (let i = 0; i < 3; i++) {
        answers[i].setAttribute("onclick", null);
    }

    setTimeout(() => {
        for (let i = 0; i < 3; i++)
        answers[i].setAttribute("onclick", "checkAnswer(this.className, this.id)");
    }, reloadTime);
}

function setTheme(themeId) {
    document.getElementById("theme").setAttribute("href", "stylesheets/themes/" + themeId + ".css");
}

function styleCorrect(answerId) {
    document.getElementById(answerId).className = "answer styleCorrect";
    setTimeout(() => {
        document.getElementById(answerId).className = "answer";      
    }, reloadTime);
}

function styleIncorrect(answerId) {
    document.getElementById(answerId).className = "answer styleIncorrect";
    setTimeout(() => {
        document.getElementById(answerId).className = "answer";      
    }, reloadTime);
}

function getRandomPositiveInteger(inclusiveUpperLimit) {
    return 1 + Math.floor(Math.random() * inclusiveUpperLimit);
}