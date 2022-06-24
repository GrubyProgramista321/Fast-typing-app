const pattern = [
    "A",
    "a",
    "Ą",
    "ą",
    "B",
    "b",
    "C",
    "c",
    "Ć",
    "ć",
    "D",
    "d",
    "E",
    "e",
    "Ę",
    "ę",
    "F",
    "f",
    "G",
    "g",
    "H",
    "h",
    "I",
    "i",
    "J",
    "j",
    "K",
    "k",
    "L",
    "l",
    "Ł",
    "ł",
    "M",
    "m",
    "N",
    "n",
    "Ń",
    "ń",
    "O",
    "o",
    "Ó",
    "ó",
    "P",
    "p",
    "R",
    "r",
    "S",
    "s",
    "Ś",
    "ś",
    "T",
    "t",
    "U",
    "u",
    "W",
    "w",
    "Y",
    "y",
    "Z",
    "z",
    "Ź",
    "ź",
    "Ż",
    "ż",
    "q",
    "Q",
    "X",
    "x",
    "!",
    ",",
    ".",
    "[",
    "]",
    "|",
];
var listOfLetters = []; // nasze literki / wartosci z literek
var text = "szedl sobie ziomek co mial bardzo duzo poziomek ale niestety spadl i sie zapadl w depresje ";
var letters = text.split(" "); // lista z poszczegółnymi słowami
var textDouble = text; // duplikat textu
var newText = ""; // text gdzie dodajemy nasze słowa
var indexOfWord = 0; // index naszego textu
var shiftClcked = true; // shift klikniety na klaiwatórze ekranowej (umieszczonej na stronie)
var currnetWord = letters[indexOfWord] // słowo które weryfikuje program
var currnetWordColor = currnetWord; // słowo które zmienia swoją wartosc na ! i @ aby wprowadzic kolory
var SpaceClicked = false // czy spacja kliknieta
for (var i = 0; i < letters.length; i++) {
    newText += `<span class="word" id="word">${letters[i]}</span>`;
}
$(document).ready(function () {
    $("#word-inner").html(newText);
    for (var x = 0; x < $(".word").length; x++) {
        var siemaaaa = "";
        for (let i = 0; i < $(".word")[x].innerHTML.length; i++) {
            siemaaaa += `<letter class="letters">${$(".word")[x].innerHTML[i]}</letter>`;
        }
        $(".word")[x].innerHTML = siemaaaa;
    }
    $(".keys").click(function () {

        $("#text-keyboard").focus();
        $("letter").css("color", "black");
        for (var x = 0; x < $("letter").length; x++) {
            $("letter")[x].style.color = "white";
        }
        if (pattern.includes($(this).val())) {
            $("#text-keyboard")[0].value += $(this).val();
        } else {
            if ($(this).val() == "Backspace") {
                var lastletter = $("#text-keyboard")[0].value.substring(
                    $("#text-keyboard")[0].value.length - 1
                );
                var costam = $("#text-keyboard")[0].value.replace(lastletter, "");
                $("#text-keyboard")[0].value = costam;
            }
            if ($(this).val() == "shift") {
                for (var i = 0; i < $(".keys").length; i++) {
                    if (pattern.includes($(".keys")[i].value)) {
                        $(".keys")[i].value = $(".keys")[i].value.toUpperCase();
                        $(".keys")[i].innerHTML = $(".keys")[i].value.toUpperCase();
                    }
                }
                if (pattern.includes($(this).val())) {
                    shiftClcked = false;
                } else {
                    if (!shiftClcked) {
                        shiftClcked = true;
                    } else {
                        shiftClcked = false;
                    }
                }
            }
            if (shiftClcked) {
                for (var i = 0; i < $(".keys").length; i++) {
                    if (pattern.includes($(".keys")[i].value)) {
                        $(".keys")[i].value = $(".keys")[i].value.toLowerCase();
                        $(".keys")[i].innerHTML = $(".keys")[i].value.toLowerCase();
                    }
                }
            }
        }
        checkWord($("#text-keyboard").val(), currnetWord2o());
    });
    for (let i = 0; i < $(".keys").length; i++) {
        listOfLetters.push($(".keys")[i]);
    }
    $(document).on("keydown", function (e) { // press key 
        for (var i = 0; i < $(".letter").length; i++) {
            $(".letter")[i].style.color = "black";
        }
        if (e.key == "Enter") {
            e.preventDefault();
        }
        for (var i = 0; i < listOfLetters.length; i++) {
            if (
                listOfLetters[i].value == e.key ||
                listOfLetters[i].value.toUpperCase() == e.key.toUpperCase()
            ) {
                listOfLetters[i].style.backgroundColor = "green";
            }
        }
    });
    $(document).on("keyup", function (e) {
        for (var i = 0; i < listOfLetters.length; i++) {
            if (
                listOfLetters[i].value == e.key ||
                listOfLetters[i].value.toUpperCase() == e.key.toUpperCase()
            ) {
                listOfLetters[i].style.backgroundColor = "white";
            }
        }
    });

    function addLettersColored(userInput) {
        let fajnie = userInput.substring(currnetWord2o().length)
        let additionalLetters = ""
        for (let i = 0; i <= fajnie.length; i++) {
            if (typeof (fajnie[i]) == "undefined") {
                break;
            }
            let lettersAppend = `<letters class="additional-letters">${fajnie[i]}</letters>`
            additionalLetters += lettersAppend
        }
        console.log(additionalLetters)
        $(".word")[indexOfWord].innerHTML += additionalLetters
        // console.log(additionalLetters)
        let listOfAdditionalLetters = []
        let parent = $(".word")[indexOfWord].children
        for (let y = 0; y < parent.length; y++) {
            console.log(parent[y].className)
            if (parent[y].className == "additional-letters") {
                listOfAdditionalLetters.push(parent[y])
            }
        }
        console.log(listOfAdditionalLetters)
    }
    function nextWord() {
        let superancko = $("#text-keyboard").val()
        $(".word")[indexOfWord].ariaValue = `${superancko}`
        indexOfWord++
    }
    function showCurrsorBlinking(valueFromUser) {
        console.log(valueFromUser.length)
        // console.log($(".word")[indexOfWord].children[valueFromUser.length - 1].getBoundingClientRect())
        if (valueFromUser.length - 1 == -1) {
            let currnetLetterWidth = $(".word")[indexOfWord].children[valueFromUser.length].getBoundingClientRect().width
            let currnetLetterTop = $(".word")[indexOfWord].children[valueFromUser.length].getBoundingClientRect().top
            let currnetLetterBottom = $(".word")[indexOfWord].children[valueFromUser.length].getBoundingClientRect().bottom;
            let currnetLetterLeft = $(".word")[indexOfWord].children[valueFromUser.length].getBoundingClientRect().left;
            let currnetLetterRight = $(".word")[indexOfWord].children[valueFromUser.length].getBoundingClientRect().right;
            $(".blinkingCurrsor").css("top", currnetLetterTop)
            $(".blinkingCurrsor").css("bottom", currnetLetterBottom)
            $(".blinkingCurrsor").css("left", currnetLetterLeft)
            $(".blinkingCurrsor").css("rigth", currnetLetterRight)
            console.log("no i koniec")
        }
        else if (valueFromUser.length - 1 == 0 && SpaceClicked) {
            console.log("fajnie")
            let currnetLetterWidth = $(".word")[indexOfWord].children[valueFromUser.length - 1].getBoundingClientRect().width
            let currnetLetterTop = $(".word")[indexOfWord].children[valueFromUser.length].getBoundingClientRect().top
            let currnetLetterBottom = $(".word")[indexOfWord].children[valueFromUser.length].getBoundingClientRect().bottom;
            let currnetLetterLeft = $(".word")[indexOfWord].children[valueFromUser.length].getBoundingClientRect().left;
            let currnetLetterRight = $(".word")[indexOfWord].children[valueFromUser.length].getBoundingClientRect().right;
            $(".blinkingCurrsor").css("top", currnetLetterTop)
            $(".blinkingCurrsor").css("bottom", currnetLetterBottom)
            $(".blinkingCurrsor").css("left", currnetLetterLeft - currnetLetterWidth)
            $(".blinkingCurrsor").css("rigth", currnetLetterRight)
        }
        else {
            let currnetLetterWidth = $(".word")[indexOfWord].children[valueFromUser.length - 1].getBoundingClientRect().width
            let currnetLetterTop = $(".word")[indexOfWord].children[valueFromUser.length - 1].getBoundingClientRect().top
            let currnetLetterBottom = $(".word")[indexOfWord].children[valueFromUser.length - 1].getBoundingClientRect().bottom;
            let currnetLetterLeft = $(".word")[indexOfWord].children[valueFromUser.length - 1].getBoundingClientRect().left;
            let currnetLetterRight = $(".word")[indexOfWord].children[valueFromUser.length - 1].getBoundingClientRect().right;
            // console.log("literlka", $(".word")[indexOfWord].children[valueFromUser.length], currnetLetter)
            $(".blinkingCurrsor").css("top", currnetLetterTop)
            $(".blinkingCurrsor").css("bottom", currnetLetterBottom)
            $(".blinkingCurrsor").css("left", currnetLetterLeft + currnetLetterWidth)
            $(".blinkingCurrsor").css("rigth", currnetLetterRight)
        }
        console.log("uservalue = ", valueFromUser.length)
    }
    function PrviousWord() {
        console.log("sieeweeqweqw")
        if ($(".word")[indexOfWord].previousElementSibling != null) {
            console.log($(".word")[indexOfWord].previousElementSibling.ariaValue)
            document.getElementById("text-keyboard").value = $(".word")[indexOfWord].previousElementSibling.ariaValue
            indexOfWord--
        }
    }
    function currnetWord2o() {
        currnetWord = letters[indexOfWord]
        return currnetWord
    }
    function checkWordValid(wordWithColors) {
        var validPoints = 0;
        for (let i = 0; i < wordWithColors.length; i++) {
            if (currnetWordColor[i] === "!") {
                validPoints++
            }
        }
        console.log("validPoints: ", validPoints)
        console.log("word.length: ", wordWithColors.length)
        console.log("userInput.length", document.getElementById("text-keyboard").value.length)
        if (validPoints === wordWithColors.length && validPoints === document.getElementById("text-keyboard").value.length) {
            $(".word")[indexOfWord].ariaSiema = "correct"
            console.log($(".word")[indexOfWord].aria)
        }
        else {
            $(".word")[indexOfWord].ariaSiema = ""
        }
    }

    function changeColor(thisWord) {
        for (let x = 0; x < thisWord.length; x++) {
            $(".word")[indexOfWord].children[x].style.color = "white"
        }
        for (let i = 0; i < thisWord.length; i++) {
            let colorLetter = $(".word")[indexOfWord].children[i].style.color;
            if (currnetWordColor[i] == "!") {
                $(".word")[indexOfWord].children[i].style.color = "green"
            }
            else if (currnetWordColor[i] == "@") {
                $(".word")[indexOfWord].children[i].style.color = "red"
            }
        }
    }
    console.log($("#word"))
    function canBackspace() {
        console.log(indexOfWord - 1)
        if ($(".word")[indexOfWord - 1].ariaSiema != "correct") {
            return true
        }
        else {
            return false
        }
    }
    function checkWord(valueUser, word) {
        let goodLetters = 0;
        console.log("tak", childrenElements)
        var parent = $(".word")[indexOfWord]
        var childrenElements = parent.querySelectorAll(".additional-letters")
        try {
            $(childrenElements).remove()
        }
        catch (error) {
        }
        currnetWordColor = currnetWord
        for (let i = 0; i < word.length; i++) {
            if (valueUser[i] == currnetWord[i]) {
                currnetWordColor = currnetWordColor.replace(currnetWord[i], "!")
            }
            else {
                if (typeof (valueUser[i]) != "undefined") {
                    currnetWordColor = currnetWordColor.replace(currnetWord[i], "@")
                }
            }
        }
        if (valueUser.length > word.length) {
            addLettersColored(valueUser)
        }
        changeColor(currnetWordColor)
        checkWordValid(currnetWordColor)
        console.log(childrenElements)
    }

    $("#text-keyboard").on("input", function () {
        checkWord($("#text-keyboard").val(), currnetWord2o());
        showCurrsorBlinking($("#text-keyboard").val())
    });
    $("#text-keyboard").on("keydown", function (e) {
        if (e.code === "Space") {
            SpaceClicked = true
            nextWord()
            checkWordValid(currnetWordColor)
            document.getElementById("text-keyboard").value = ""
            e.preventDefault()
            showCurrsorBlinking($("#text-keyboard").val())
            SpaceClicked = false
        }
        if (e.code == "Backspace") {
            if ($("#text-keyboard").val() <= 0) {
                e.preventDefault()
                if (canBackspace()) {
                    PrviousWord()
                    showCurrsorBlinking($("#text-keyboard").val())
                }
                // if (canBackspace()) {
                //     console.log(":yea")
                //     showCurrsorBlinking($("#text-keyboard").val)
                // }
            }
        }
    })
    function Watch(time) {
        let seconds = 0
        setInterval(function () {
            let secondsHTML = $("#seconds")
        }, 1000)
    }
});
