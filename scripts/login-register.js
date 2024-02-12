/* The whole thing below is very stupid, but works */

function checkInputLength(fieldId) {
    setTimeout(checkInputLengthForReal, 10, fieldId);
}

function checkInputLengthForReal(fieldId) {
    let textContent = document.getElementById(fieldId).value;
    switch (fieldId) {
        case "username-field":
            let usernameSubtitle = document.getElementById("username-subtitle");
            if (textContent.length < 4) {
                usernameSubtitle.style.color = "hsl(0, 100%, 50%)";
            } else {
                usernameSubtitle.style.color = "hsl(100, 100%, 30%)";
            }
            break;
        case "password-field":
            let passwordSubtitle = document.getElementById("password-subtitle");
            if (textContent.length < 8) {
                passwordSubtitle.style.color = "hsl(0, 100%, 50%)";
            } else {
                passwordSubtitle.style.color = "hsl(100, 100%, 30%)";
            }
            break;
    }
}