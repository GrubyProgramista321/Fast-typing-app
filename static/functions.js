export var poprzednitop;
export var heightOf2Lines;
export var listOfLetters = []; // nasze literki / wartosci z literek
export var text;
export var letters; // lista z poszczegółnymi słowami
export var textDouble = text; // duplikat textu
export var newText = ""; // text gdzie dodajemy nasze słowa
export var indexOfWord = 0; // index słowa naszego textu
export var shiftClcked = true; // shift klikniety na klaiwatórze ekranowej (umieszczonej na stronie)
export var currnetWord; // słowo które weryfikuje program
export var currnetWordColor = currnetWord; // słowo które zmienia swoją wartosc na ! i @ aby wprowadzic kolory
export var SpaceClicked = false; // czy spacja kliknieta
export var niewiem;
export var WrittenLetters = 0;
var time = 5;
export var loaded = false;
export var FirstClick = false;
export var is = true;
export var seconds = time;
niewiem = seconds;
var secondsHTML = $("#seconds");
var minutesHTML = $("#minutes");
let isOverMinute = false;
if (time > 60) {
  isOverMinute = true;
  var hours = time / 60;
  var superancko = time % 60;
  var hours = parseInt(
    hours.toString().substring(0, hours.toString().indexOf("."))
  );
}
if (isOverMinute) {
  minutesHTML.html(hours);
  if (superancko < 10) {
    secondsHTML.html("0" + superancko);
  } else {
    secondsHTML.html(superancko);
  }
} else {
  minutesHTML.html("0");
  secondsHTML.html(seconds);
}
export function addLettersColored(userInput) {
  let fajnie = userInput.substring(currnetWord2o().length);
  let additionalLetters = "";
  for (let i = 0; i <= fajnie.length; i++) {
    if (typeof fajnie[i] == "undefined") {
      break;
    }
    let lettersAppend = `<letters class="additional-letters">${fajnie[i]}</letters>`;
    additionalLetters += lettersAppend;
  }
  $(".word")[indexOfWord].innerHTML += additionalLetters;

  let listOfAdditionalLetters = [];
  let parent = $(".word")[indexOfWord].children;
  for (let y = 0; y < parent.length; y++) {
    if (parent[y].className == "additional-letters") {
      listOfAdditionalLetters.push(parent[y]);
    }
  }
}
export function createWord() {
  $.ajax({
    url: "/create_word",
    success: function (result) {
      text = result.toLowerCase();
      $(".lds-spinner").remove();
      addWordsToHTML(text);
      heightOf2Lines =
        document.getElementById("word").getBoundingClientRect().height * 2;
      console.log(heightOf2Lines);
      loaded = true;
      $("#word-inner").fadeIn(200);
      $("body").append('<div class="blinkingCurrsor"></div>');
      setTimeout(function () {
        $(".blinkingCurrsor").fadeIn();
        showCurrsorBlinking($("#text-keyboard").val());
      }, 300);
    },
  });
}
export function scrollDownText(firstWord, SecondWord) {
  var wordds =
    document.getElementById("word-ds").getBoundingClientRect().top +
    document.getElementById("word-ds").getBoundingClientRect().height / 2;
  if (
    document
      .getElementsByClassName("word")
      [indexOfWord + 1].getBoundingClientRect().top > wordds
  ) {
    howmanyScroll = document.getElementById("word-inner").scrollTop;
    document.getElementById("word-inner").scrollTo(0, howmanyScroll + 56);
    $(".word")[indexOfWord].ariaCanBackspace = "nie";
  }
  console.log("line: ", line);
}
export function nextWord() {
  if ($("#text-keyboard").val().length >= 1) {
    if (indexOfWord + 1 < letters.length) {
      let superancko = $("#text-keyboard").val();
      $(".word")[indexOfWord].ariaValue = `${superancko}`;
      functions1.scrollDownText(
        $(".word")[indexOfWord],
        $(".word")[indexOfWord + 1]
      );
      indexOfWord++;
      $(".word")[indexOfWord].ariaSiema = "visited";
    }
    if ($(".word")[indexOfWord - 1].ariaSiema != "correct") {
      console.log("tak");
      $(".word")[indexOfWord - 1].style.borderBottom = "1px solid red";
    } else {
      $(".word")[indexOfWord - 1].style.border = "none";
    }
    if (
      indexOfWord + 1 == letters.length &&
      $(".word")[indexOfWord].ariaSiema === "correct" &&
      checkAllWords()
    ) {
      endOfGame();
    }
  }
}
export function scrollResize() {
  var oneOfthird = 55; // 1/3 wysokosci diva "word-ds"
  var oneLine = 56;
  // console.log(
  howmanyScroll = document.getElementById("word-inner").scrollTop;
  //   `  document.getElementById("word-ds").getBoundingClientRect().top +
  //     oneOfthird * 2`,
  //   document.getElementById("word-ds").getBoundingClientRect().top +
  //     oneOfthird * 3
  // );
  // console.log(
  //   `     document
  // .getElementsByClassName("word")
  // [indexOfWord].getBoundingClientRect().top`,
  //   document
  //     .getElementsByClassName("word")
  //     [indexOfWord].getBoundingClientRect().top
  // );
  if (
    document.getElementById("word-inner").getBoundingClientRect().top +
      oneOfthird +
      58 <
    $(".word")[indexOfWord].getBoundingClientRect().top
  ) {
    document.getElementById("word-inner").scrollTop = howmanyScroll + oneLine;
  }
  if (
    document.getElementById("word-inner").getBoundingClientRect().top +
      oneOfthird >
    $(".word")[indexOfWord].getBoundingClientRect().top
  ) {
    // howmanyScroll = document.getElementById("word-inner").scrollTop;
    document.getElementById("word-inner").scrollTop = howmanyScroll - oneLine;
  }
}
export function numberOFWords() {
  let GoodWordsCounter = 0;
  for (let i = 0; i < $(".word").length; i++) {
    if ($(".word")[i].ariaSiema == "correct") {
      GoodWordsCounter++;
    }
  }
  let timeToDivide = niewiem / 60;
  let result = GoodWordsCounter / timeToDivide;
  return result;
}
export function endOfGame() {
  $("body")
    .append(`<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                                <h5>${
                                  GoodWordsVsBadWords().GoodWordsCounter
                                } / ${GoodWordsVsBadWords().allWords}</h5>
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
        </div>`);
  $("#exampleModal").modal("show");
  try {
    $("body").append(
      "<script type='module' src='../static/update.js'></script>"
    );
  } catch (error) {}
}
export function breakWord() {
  if (
    $(".word")[indexOfWord].getBoundingClientRect().top != poprzednitop &&
    poprzednitop != undefined &&
    document.getElementById("text-keyboard").value.length != 1
  ) {
    console.log("oj tak tak jest inny");
    console.log(document.getElementById("text-keyboard").value.slice(0, -1));
    document.getElementById("text-keyboard").value = document
      .getElementById("text-keyboard")
      .value.slice(0, -1);
    checkAllWords();
    checkWord($("#text-keyboard").val().toLowerCase(), currnetWord2o());
    showCurrsorBlinking($("#text-keyboard").val());
  }
  // $("#text-keyboard").val() = $("#text-keyboard").val().slice(0, -1)
  // console.log("poprzednitop: ", poprzednitop);
  poprzednitop = $(".word")[indexOfWord].getBoundingClientRect().top;
}
export function currnetWord2o() {
  currnetWord = letters[indexOfWord];
  return currnetWord;
}

export function checkWordValid(wordWithColors) {
  console.log(wordWithColors);
  $(".word")[indexOfWord].ariaSiema = "visited";
  if (document.getElementById("text-keyboard").value.length >= 1) {
    var validPoints = 0;
    for (let i = 0; i < wordWithColors.length; i++) {
      if (currnetWordColor[i] === "!") {
        validPoints++;
      }
    }
    if (
      validPoints === wordWithColors.length &&
      validPoints === document.getElementById("text-keyboard").value.length
    ) {
      $(".word")[indexOfWord].ariaSiema = "correct";
    } else {
      $(".word")[indexOfWord].ariaSiema = "notCorrect";
    }
  }
}

export function changeColor(thisWord) {
  for (let x = 0; x < thisWord.length; x++) {
    $(".word")[indexOfWord].children[x].style.color = "rgb(114, 114, 114)";
  }
  for (let i = 0; i < thisWord.length; i++) {
    let colorLetter = $(".word")[indexOfWord].children[i].style.color;
    if (currnetWordColor[i] == "!") {
      $(".word")[indexOfWord].children[i].style.color = "white";
    } else if (currnetWordColor[i] == "@") {
      $(".word")[indexOfWord].children[i].style.color = "red";
    }
  }
}

export function canBackspace() {
  try {
    console.log(
      `$(".word")[indexOfWord - 1].getBoundingClientRect().top`,
      $(".word")[indexOfWord - 1].getBoundingClientRect().top
    );
    console.log(
      `$("#word-inner")[0].getBoundingClientRect().top`,
      $("#word-inner")[0].getBoundingClientRect().top
    );
    if (
      $(".word")[indexOfWord - 1].ariaSiema != "correct" &&
      $(".word")[indexOfWord - 1].getBoundingClientRect().top + 10 >
        $("#word-inner")[0].getBoundingClientRect().top
    ) {
      return true;
    } else {
      return false;
    }
  } catch (error) {}
}

export function checkWord(valueUser, word) {
  let goodLetters = 0;
  var parent = $(".word")[indexOfWord];
  var childrenElements = parent.querySelectorAll(".additional-letters");
  try {
    $(childrenElements).remove();
  } catch (error) {}
  currnetWordColor = currnetWord;
  for (let i = 0; i < word.length; i++) {
    if (valueUser[i] == currnetWord[i]) {
      currnetWordColor = currnetWordColor.replace(currnetWord[i], "!");
    } else {
      if (typeof valueUser[i] != "undefined") {
        currnetWordColor = currnetWordColor.replace(currnetWord[i], "@");
      }
    }
  }
  if (valueUser.length > word.length) {
    addLettersColored(valueUser);
  }
  changeColor(currnetWordColor);
  checkWordValid(currnetWordColor);
}

export function Watch(time) {
  var Tick = setInterval(function () {
    seconds--;
    if (isOverMinute) {
      if (superancko == 0) {
        superancko = 60;
        hours--;
      }
      minutesHTML.html(hours);
      superancko--;
      if (superancko < 10) {
        secondsHTML.html("0" + superancko);
      } else {
        minutesHTML.html(hours);
        secondsHTML.html(superancko);
      }
    } else {
      secondsHTML.html(seconds);
      if (seconds < 10) {
        secondsHTML.html("0" + seconds);
      }
    }
    if (seconds <= 0) {
      clearInterval(Tick);
      functions1.endOfGame();
    }
  }, 1000);
}
export function addWordsToHTML(textOf, additionalWord) {
  if (typeof additionalWord === "undefined") {
    letters = textOf.split(" ");
    for (var i = 0; i < letters.length; i++) {
      newText += `<span class="word" id="word">${letters[i]}</span>`;
    }
    $("#word-inner").html(newText);
    for (var x = 0; x < $(".word").length; x++) {
      let siemaaaa = "";
      for (let i = 0; i < $(".word")[x].innerHTML.length; i++) {
        siemaaaa += `<letter class="letters">${
          $(".word")[x].innerHTML[i]
        }</letter>`;
      }
      $(".word")[x].innerHTML = siemaaaa;
    }
    for (let i = 0; i < $(".word").length; i++) {
      $(".word")[i].ariaSiema = "none";
    }
  } else {
    let niewiem = additionalWord.split(" ");
    for (let i = 0; i < niewiem.length; i++) {
      letters.push(niewiem[i]);
    }
    let fajnie = "";
    for (var i = 0; i < niewiem.length; i++) {
      fajnie += `<span class="word" id="additional-word">${niewiem[i]}</span>`;
    }
    $("#word-inner").append(fajnie);
    for (var x = 0; x < $(".word").length; x++) {
      if ($(".word")[x].id === "additional-word") {
        let lettersPodzielone = "";
        for (let i = 0; i < $(".word")[x].innerHTML.length; i++) {
          lettersPodzielone += `<letter class="letters">${
            $(".word")[x].innerHTML[i]
          }</letter>`;
        }
        $(".word")[x].id = "word";
        $(".word")[x].innerHTML = lettersPodzielone;
      }
    }
  }
  // $("#text-keyboard").focus();
  currnetWord = letters[indexOfWord];
}
export function cursorShowingOrNot() {
  if (is) {
    $(".blinkingCurrsor").css("opacity", 0);
    is = false;
  } else {
    $(".blinkingCurrsor").css("opacity", 1);
    is = true;
  }
}
export function GoodWordsVsBadWords() {
  // taktaktaktkatka
  let GoodWordsCounter = 0;
  let allWords = 0;
  for (let i = 0; i < $(".word").length; i++) {
    if ($(".word")[i].ariaSiema === "correct") {
      GoodWordsCounter++;
    }
    if ($(".word")[i].ariaSiema === "none") {
      break;
    }
    allWords++;
  }
  return { GoodWordsCounter, allWords };
}

export function checkAllWords() {
  let GoodWordsCounter = 0;
  for (let x = 0; x < $(".word").length; x++) {
    if ($(".word")[x].ariaSiema === "correct") {
      GoodWordsCounter++;
    }
  }
  if (GoodWordsCounter === letters.length) {
    return true;
  } else {
    return false;
  }
}
export function showCurrsorBlinking(valueFromUser) {
  try {
    if (valueFromUser.length - 1 == -1) {
      let currnetLetterWidth =
        $(".word")[indexOfWord].children[
          valueFromUser.length
        ].getBoundingClientRect().width;
      let currnetLetterTop =
        $(".word")[indexOfWord].children[
          valueFromUser.length
        ].getBoundingClientRect().top;
      let currnetLetterBottom =
        $(".word")[indexOfWord].children[
          valueFromUser.length
        ].getBoundingClientRect().bottom;
      let currnetLetterLeft =
        $(".word")[indexOfWord].children[
          valueFromUser.length
        ].getBoundingClientRect().left;
      let currnetLetterRight =
        $(".word")[indexOfWord].children[
          valueFromUser.length
        ].getBoundingClientRect().right;
      $(".blinkingCurrsor").css("top", currnetLetterTop);
      $(".blinkingCurrsor").css("bottom", currnetLetterBottom);
      $(".blinkingCurrsor").css("left", currnetLetterLeft);
      $(".blinkingCurrsor").css("rigth", currnetLetterRight);
    } else if (valueFromUser.length - 1 == 0 && SpaceClicked) {
      let currnetLetterWidth =
        $(".word")[indexOfWord].children[
          valueFromUser.length - 1
        ].getBoundingClientRect().width;
      let currnetLetterTop =
        $(".word")[indexOfWord].children[
          valueFromUser.length
        ].getBoundingClientRect().top;
      let currnetLetterBottom =
        $(".word")[indexOfWord].children[
          valueFromUser.length
        ].getBoundingClientRect().bottom;
      let currnetLetterLeft =
        $(".word")[indexOfWord].children[
          valueFromUser.length
        ].getBoundingClientRect().left;
      let currnetLetterRight =
        $(".word")[indexOfWord].children[
          valueFromUser.length
        ].getBoundingClientRect().right;
      $(".blinkingCurrsor").css("top", currnetLetterTop);
      $(".blinkingCurrsor").css("bottom", currnetLetterBottom);
      $(".blinkingCurrsor").css("left", currnetLetterLeft - currnetLetterWidth);
      $(".blinkingCurrsor").css("rigth", currnetLetterRight);
    } else {
      let currnetLetterWidth =
        $(".word")[indexOfWord].children[
          valueFromUser.length - 1
        ].getBoundingClientRect().width;
      let currnetLetterTop =
        $(".word")[indexOfWord].children[
          valueFromUser.length - 1
        ].getBoundingClientRect().top;
      let currnetLetterBottom =
        $(".word")[indexOfWord].children[
          valueFromUser.length - 1
        ].getBoundingClientRect().bottom;
      let currnetLetterLeft =
        $(".word")[indexOfWord].children[
          valueFromUser.length - 1
        ].getBoundingClientRect().left;
      let currnetLetterRight =
        $(".word")[indexOfWord].children[
          valueFromUser.length - 1
        ].getBoundingClientRect().right;
      $(".blinkingCurrsor").css("top", currnetLetterTop);
      $(".blinkingCurrsor").css("bottom", currnetLetterBottom);
      $(".blinkingCurrsor").css("left", currnetLetterLeft + currnetLetterWidth);
      $(".blinkingCurrsor").css("rigth", currnetLetterRight);
    }
  } catch (error) {}
}

export function PrviousWord() {
  if ($(".word")[indexOfWord].previousElementSibling != null) {
    document.getElementById("text-keyboard").value =
      $(".word")[indexOfWord].previousElementSibling.ariaValue;
    indexOfWord--;
    breakWord();
  }
  $(".word")[indexOfWord].style.border = "none";
}
