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
var text = "toast friends bitches i like ale to nie ja jka cos ale to noie ja apdaofoo fjejfjiwe fewif ewifew fiewfie wfi ewi fewi fewi ewfi wefi efwi fewi efi efi efi efwi ewfi efwi i "
var letters; // lista z poszczegółnymi słowami
var textDouble = text; // duplikat textu
var newText = ""; // text gdzie dodajemy nasze słowa
var indexOfWord = 0; // index słowa naszego textu
var shiftClcked = true; // shift klikniety na klaiwatórze ekranowej (umieszczonej na stronie)
var currnetWord; // słowo które weryfikuje program
var currnetWordColor = currnetWord; // słowo które zmienia swoją wartosc na ! i @ aby wprowadzic kolory
var SpaceClicked = false // czy spacja kliknieta
var niewiem;
var WrittenLetters = 0;
var time = 30
var FirstClick = false
$(document).ready(function () {
    $(".keys").click(function () {
        $("#text-keyboard").focus();
        $("letter").css("color", "black");
        for (let x = 0; x < $("letter").length; x++) {
            $("letter")[x].style.color = "white";
        }
        if (pattern.includes($(this).val())) {
            $("#text-keyboard")[0].value += $(this).val();
        } else {
            if ($(this).val() == "Backspace") {
                let lastletter = $("#text-keyboard")[0].value.substring(
                    $("#text-keyboard")[0].value.length - 1
                );
                let costam = $("#text-keyboard")[0].value.replace(lastletter, "");
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
    function numberOFWords() {
        let GoodWordsCounter = 0
        for (let i = 0; i < $(".word").length; i++) {
            console.log($(".word")[i].ariaSiema)
            if ($(".word")[i].ariaSiema == "correct") {
                GoodWordsCounter++
            }
        }
        let timeToDivide = niewiem / 60
        console.log(GoodWordsCounter)
        console.log(timeToDivide)
        let result = GoodWordsCounter / timeToDivide
        return result
    }
    function endOfGame() {
        $("body").append(`<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="results">
                            <div class="wpm-style-div"><span class="wpm-style-text">WPM</span><span class="WPN-result-style">${numberOFWords().toString()}</span></div>
                            <div class="goodword/badwords">
                                <h4>Good / All</h4>
                                <h5>${GoodWordsVsBadWords().GoodWordsCounter} / ${GoodWordsVsBadWords().allWords}</h5>
                            </div>
                            <div class="allLettersyouWriten">
                                <h4>All letters you wrote </h4>
                                <h5>${WrittenLetters} </h5>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary">Save changes</button>
                    </div>
                </div>
            </div>
        </div>`)
        $('#exampleModal').modal('show')
    }
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
        $(".word")[indexOfWord].innerHTML += additionalLetters
        // console.log(additionalLetters)
        let listOfAdditionalLetters = []
        let parent = $(".word")[indexOfWord].children
        for (let y = 0; y < parent.length; y++) {
            if (parent[y].className == "additional-letters") {
                listOfAdditionalLetters.push(parent[y])
            }
        }
    }
    function GoodWordsVsBadWords() {
        let GoodWordsCounter = 0;
        let allWords = 0;
        for (let i = 0; i < $(".word").length; i++) {
            if ($(".word")[i].ariaSiema === "correct") {
                GoodWordsCounter++
            }
            if ($(".word")[i].ariaSiema === "none") {
                break
            }
            allWords++
        }
        return { GoodWordsCounter, allWords }
    }
    function nextWord() {
        if (indexOfWord + 1 < letters.length) {
            let superancko = $("#text-keyboard").val()
            $(".word")[indexOfWord].ariaValue = `${superancko}`
            indexOfWord++
        }
        console.log($(".word")[indexOfWord].ariaSiema)
        if (indexOfWord + 1 == letters.length && $(".word")[indexOfWord].ariaSiema === "correct" && checkAllWords()) {
            endOfGame()
        }
    }
    function checkAllWords() {
        let GoodWordsCounter = 0;
        for (let x = 0; x < $(".word").length; x++) {
            if ($(".word")[x].ariaSiema === "correct") {
                GoodWordsCounter++
            }
        }
        console.log(GoodWordsCounter)
        if (GoodWordsCounter === letters.length) {
            return true
        }
        else {
            return false
        }
    }
    function showCurrsorBlinking(valueFromUser) {
        // console.log($(".word")[indexOfWord].children[valueFromUser.length - 1].getBoundingClientRect())
        try {
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
            }
            else if (valueFromUser.length - 1 == 0 && SpaceClicked) {
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
        }
        catch (error) {

        }
    }
    function PrviousWord() {
        if ($(".word")[indexOfWord].previousElementSibling != null) {
            document.getElementById("text-keyboard").value = $(".word")[indexOfWord].previousElementSibling.ariaValue
            indexOfWord--
        }
    }
    function currnetWord2o() {
        currnetWord = letters[indexOfWord]
        return currnetWord
    }
    function checkWordValid(wordWithColors) {
        $(".word")[indexOfWord].ariaSiema = "visited"
        if (document.getElementById("text-keyboard").value.length >= 1) {
            var validPoints = 0;
            for (let i = 0; i < wordWithColors.length; i++) {
                if (currnetWordColor[i] === "!") {
                    validPoints++
                }
            }
            if (validPoints === wordWithColors.length && validPoints === document.getElementById("text-keyboard").value.length) {
                console.log("validPoints: ", validPoints)
                console.log("wordWithColors.length: ", wordWithColors)
                console.log("Udało sie")
                $(".word")[indexOfWord].ariaSiema = "correct"
                console.log($(".word")[indexOfWord].ariaSiema)
            }
            else {
                $(".word")[indexOfWord].ariaSiema = "notCorrect"
            }
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
    function canBackspace() {
        try {
            if ($(".word")[indexOfWord - 1].ariaSiema != "correct") {
                return true
            }
            else {
                return false
            }
        }
        catch (error) {

        }
    }
    function checkWord(valueUser, word) {
        let goodLetters = 0;
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
    }
    function Watch(time) {
        var Tick = setInterval(function () {
            seconds--
            // secondsHTML.html("")
            // minutesHTML.html("")
            if (isOverMinute) {
                if (superancko == 0) {
                    superancko = 60
                    hours--
                }
                minutesHTML.html(hours)
                superancko--
                if (superancko < 10) {
                    secondsHTML.html("0" + superancko)
                }
                else {
                    minutesHTML.html(hours)
                    secondsHTML.html(superancko)
                }
            }
            else {
                secondsHTML.html(seconds)
                if (seconds < 10) {
                    secondsHTML.html("0" + seconds)
                }
            }
            if (seconds <= 0) {
                clearInterval(Tick)
                endOfGame()
            }
        }, 1000)
    }
    var seconds = time
    niewiem = seconds
    var secondsHTML = $("#seconds")
    var minutesHTML = $("#minutes")
    let isOverMinute = false
    if (time > 60) {
        isOverMinute = true
        var hours = time / 60
        var superancko = time % 60
        var hours = parseInt(hours.toString().substring(0, hours.toString().indexOf(".")))
    }
    if (isOverMinute) {
        minutesHTML.html(hours)
        if (superancko < 10) {
            secondsHTML.html("0" + superancko)
        }
        else {
            secondsHTML.html(superancko)
        }
    }
    else {
        minutesHTML.html("0")
        secondsHTML.html(seconds)
    }
    function addWordsToHTML(textOf, additionalWord) {
        if (typeof (additionalWord) === "undefined") {
            letters = textOf.split(" ")
            for (var i = 0; i < letters.length; i++) {
                newText += `<span class="word" id="word">${letters[i]}</span>`;
                console.log("siema")
            }
            $("#word-inner").html(newText);
            for (var x = 0; x < $(".word").length; x++) {
                let siemaaaa = "";
                for (let i = 0; i < $(".word")[x].innerHTML.length; i++) {
                    siemaaaa += `<letter class="letters">${$(".word")[x].innerHTML[i]}</letter>`;
                }
                $(".word")[x].innerHTML = siemaaaa;
            }
            for (let i = 0; i < $(".word").length; i++) {
                $(".word")[i].ariaSiema = "none"
            }
        }
        else {
            let niewiem = additionalWord.split(" ")
            for (let i = 0; i < niewiem.length; i++) {
                letters.push(niewiem[i])
            }
            let fajnie = "";
            for (var i = 0; i < niewiem.length; i++) {
                fajnie += `<span class="word" id="additional-word">${niewiem[i]}</span>`;
            }
            console.log(fajnie)
            $("#word-inner").append(fajnie)
            for (var x = 0; x < $(".word").length; x++) {
                if ($(".word")[x].id === "additional-word") {
                    let lettersPodzielone = ""
                    console.log($(".word")[x])
                    for (let i = 0; i < $(".word")[x].innerHTML.length; i++) {
                        lettersPodzielone += `<letter class="letters">${$(".word")[x].innerHTML[i]}</letter>`
                        console.log(lettersPodzielone)
                    }
                    $(".word")[x].id = "word"
                    $(".word")[x].innerHTML = lettersPodzielone
                }
            }
        }
        $("#text-keyboard").focus()
        currnetWord = letters[indexOfWord]
    }
    $(".word-ds").on("click", function () {
        $("text-keyboard").focus()
    })
    addWordsToHTML(text)
    setTimeout(function () {
        fajnie = "ale to nie jak cos ale jak tma checie"
        text += fajnie
        addWordsToHTML(text, "tak to zajebiscie akurat")
        showCurrsorBlinking($("#text-keyboard").val())
    }, 3000)
    showCurrsorBlinking($("#text-keyboard").val())
    $("#text-keyboard").on("input", function (key) {
        if (pattern.includes(key.originalEvent.data)) {
            WrittenLetters++
        }
        if (!FirstClick) {
            Watch(time)
            FirstClick = true
        }
        checkAllWords()
        checkWord($("#text-keyboard").val(), currnetWord2o());
        showCurrsorBlinking($("#text-keyboard").val())
    });
    $("#text-keyboard").on("keydown", function (e) {
        if (e.code === "Space") {
            e.preventDefault()
            SpaceClicked = true
            nextWord()
            document.getElementById("text-keyboard").value = ""
            checkWordValid(currnetWordColor)
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
            }
        }
    })
    window.addEventListener("wheel", e => e.preventDefault(), { passive: false })
});
