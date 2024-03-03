const totalNumberOfQuestions = 72;
let reloadTime = 2000;
let questionNumber = 0;

/* Generates and then displays a new question and answers */
function generate() {
    let newQuestionNumber = getRandomPositiveInteger(totalNumberOfQuestions);
    while (newQuestionNumber === questionNumber) {
        newQuestionNumber = getRandomPositiveInteger(totalNumberOfQuestions);
    }

    questionNumber = newQuestionNumber;
    let questionImage = new Image();
    questionImage.src = "assets/questions/" + questionNumber + ".png";

    questionImage.onload = function() {
        let questionHeightAttribute;

        if (questionImage.naturalHeight <= 70) {
            questionHeightAttribute = "20%";
        } else {
            questionHeightAttribute = "35%";
        }

        document.getElementById("question").style.height = questionHeightAttribute;
    }

    const answerOrderArray = getRandomArray();
    const answers = document.getElementById("answer-container").children;

    for (let i = 0; i < 3; i++) {
        let answerImage = new Image();
        answerImage.src = "assets/questions/" + questionNumber + "-" + answerOrderArray[i] + ".png";
        answerImage.onload = function() {
            if (answerImage.naturalHeight <= 70) {
                answers[i].firstChild.style.height = "50%";
            } else {
                answers[i].firstChild.style.height = "80%";
            }
        }
    
        if (answerOrderArray[i] === 3) {
            answers[i].className = "answer correct";
        } else {
            answers[i].className = "answer incorrect";
        }

        answers[i].firstChild.src = answerImage.src;
    }

    document.getElementById("question").src = questionImage.src;
}

/* Clear the correct/incorrect visual feedback */
function clearAnswerFeedback() {
    document.getElementById("a").className = "answer";
    document.getElementById("b").className = "answer";
    document.getElementById("c").className = "answer";
}

/* Shuffles the [1, 2, 3] array and returns it */
function getRandomArray() {
    const array = [];
    array.push(getRandomPositiveInteger(3));

    let i = 1;
    while (i < 3) {
        let temp = getRandomPositiveInteger(3);
        if (!array.includes(temp)) {
            array.push(temp);
            i++;
        }
    }

    return array;
}

/* Verifies if the selected answers is correct or incorrect and then displays a visual feedback */
function checkAnswer(divClass, answerId) {
    if (divClass === "answer correct") {
        styleCorrect(answerId);
    } else if (divClass === "answer incorrect") {
        styleIncorrect(answerId);
    }

    let isAutoskipEnabled = document.getElementById("autoskip-checkbox").checked;

    if (isAutoskipEnabled) {
        blockUserClick(reloadTime);
        setTimeout(clearAnswerFeedback, reloadTime);
        setTimeout(generate, reloadTime);
    } else {
        showNextButton();
    }
}

/* Shows a button in UI to advance only if the auto-skip is disabled */
function showNextButton() {
    document.getElementById("next-button").style.visibility = "visible";
}

/* Hides the shown button after user clicks it */
function hideNextButton() {
    document.getElementById("next-button").style.visibility = "hidden";
}

/* Blocks the user click on answers only if auto-skip is enabled */
function blockUserClick(timeInterval) {
    const answers = document.getElementsByClassName("answer");
    for (let i = 0; i < 3; i++) {
        answers[i].setAttribute("onclick", null);
    }

    setTimeout(() => {
        for (let i = 0; i < 3; i++)
            answers[i].setAttribute("onclick", "checkAnswer(this.className, this.id)");
    }, timeInterval);
}

/* Displays the reload time selection whenever the auto-skip checkbox is checked */
function toggleRadioVisibility() {
    let radioContainer = document.getElementById("radio-container");
    if (document.getElementById("autoskip-checkbox").checked) {
        radioContainer.style.visibility = "visible";
    } else {
        radioContainer.style.visibility = "hidden";
    }
}

/* Sets the main page theme */
function setTheme(themeName) {
    document.getElementById("theme").setAttribute("href", "stylesheets/themes/" + themeName + ".css");
}

/* Sets the reload time for the auto-skip feature */ 
function setReloadTime(newReloadTime) {
    reloadTime = newReloadTime;
}

/* Shows visual feedback for a correct answer */
function styleCorrect(answerId) {
    document.getElementById(answerId).className = "answer styleCorrect";
}

/* Shows visual feedback for a incorrect answer */
function styleIncorrect(answerId) {
    document.getElementById(answerId).className = "answer styleIncorrect";
    if (document.getElementById("autoskip-checkbox").checked)
        styleCorrect(document.getElementsByClassName("answer correct")[0].id);
}

/* Returns a pseudo-random positive integer in the interval [1, upper] */
function getRandomPositiveInteger(upper) {
    return 1 + Math.floor(Math.random() * upper);
}