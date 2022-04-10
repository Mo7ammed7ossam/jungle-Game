let textBoxInput = document.querySelector("input[type=text]");
let wrongMsgLine = document.querySelector(".wrongMsgLine");
let spanMessageContainer = document.querySelector('.spanMessage');
const letsPlayBtn = document.querySelector('.btnSubmit');

const letters = /^[ a-zA-Z\-\']+$/;
let isNameCorrect = false;


function pattenMatch(text, pattern) {
    if (text.match(pattern))
        return true
    return false;
}

let oneword = false;

/* a */ //validate the user input
textBoxInput.addEventListener("keyup", function (e) {
    console.log('wiko');

    if (e.keyCode == 32 && oneword == false) {
        oneword = true;
    }
    else if (e.keyCode == 32 && oneword == true) {
        alert('You must Enter just TWO Names !!')
        isNameCorrect = false;
        return 0;
    }

    let inputValue = textBoxInput.value;
    console.log(inputValue);
    // Not Empty & Not Spaces Only
    if (inputValue.length == 0) {
        alert('Name cannot be Empty!')
        isNameCorrect = false;
        oneword = false;
        return 0;
    } else {
        if (inputValue.trim().length == 0) {
            alert('Name cannot be Spaces only!')
            isNameCorrect = false;
            oneword = false;
            return 0;
        }
    }

    // Characters Only
    if (!pattenMatch(inputValue, letters)) {
        alert('Only Charachters are allowed !');
        isNameCorrect = false;
        return 0;
    }

    isNameCorrect = true;
});

// Everything is OK
letsPlayBtn.addEventListener('click', function (e) {
    if (!isNameCorrect) {
        e.preventDefault();
    }
});

