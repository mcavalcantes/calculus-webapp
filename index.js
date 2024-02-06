// The 'totalNumberOfQuestions' variable should be defined in a better way. Having a
// method to count all the files in the 'assets' directory and dividing this number by 4
// is a good idea (since there is four images per question). The variable is used for generating
// the random number to pick the question. Example: if we have 40 files (images) in 'assets' directory, then
// we have (40 / 4) = 10 question in total. So, the random number should be a integer in the [1, 10]
// range, inclusively.

// DO NOT FORGET THESE FUCKERS RIGHT HERE
const totalNumberOfQuestions = 44;
const reloadTime = 2000;
let displayedQuestionNumber = 0;

// FIXME:
// - change the theme preview button to a .svg file in >that diagonal style
// - try to find a way to properly size the images on the PROMPT container
// - try to find a way to properly size the images (questions) on answer's div
//         -> a good way of doing this is by setting a conditional statement where the main thing is
//            the picture height. the point is that the questions normally are either "one-liners" or have
//            some kind of fractions in it. so, when the image has a height less/equal to 70px, it probably
//            is one of the "one-liner" type; otherwise, it is the fractions type (most of these have a > 80px 
//            height). IMPORTANT: the images must be generated according to THESE settings:
// --> png | Latin Modern | (12pt) Grande | 200 | Transparente | #unmarked | #unmarked <--
// - try to find a way to set the 'totalNumberOfQuestions' variable value automatically

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
    document.getElementById("theme").setAttribute("href", "themes/" + themeId + ".css");
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