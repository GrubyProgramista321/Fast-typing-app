

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
var text;
var letters; // lista z poszczegółnymi słowami
var textDouble = text; // duplikat textu
var newText = ""; // text gdzie dodajemy nasze słowa
var indexOfWord = 0; // index słowa naszego textu
var shiftClcked = true; // shift klikniety na klaiwatórze ekranowej (umieszczonej na stronie)
var currnetWord; // słowo które weryfikuje program
var currnetWordColor = currnetWord; // słowo które zmienia swoją wartosc na ! i @ aby wprowadzic kolory
var SpaceClicked = false; // czy spacja kliknieta
var niewiem;
var WrittenLetters = 0;
var time = 30; // game time 
var heightOf2Lines;
var loaded = false;
var FirstClick = false;
var isLoged = false;
var lettersMissed = 0; // literki nie udane 



// confectti 
var maxParticleCount = 200; //set max confetti count
var particleSpeed = 2; //set the particle animation speed
var startConfetti; //call to start confetti animation
var stopConfetti; //call to stop adding confetti
var toggleConfetti; //call to start or stop the confetti animation depending on whether it's already running
var removeConfetti; //call to stop the confetti animation and remove all confetti immediately
var maxParticleCount = 150; //set max confetti count
var particleSpeed = 2; //set the particle animation speed
(function() {
	startConfetti = startConfettiInner;
	stopConfetti = stopConfettiInner;
	toggleConfetti = toggleConfettiInner;
	removeConfetti = removeConfettiInner;
	var colors = ["DodgerBlue", "OliveDrab", "Gold", "Pink", "SlateBlue", "LightBlue", "Violet", "PaleGreen", "SteelBlue", "SandyBrown", "Chocolate", "Crimson"]
	var streamingConfetti = false;
	var animationTimer = null;
	var particles = [];
	var waveAngle = 0;
	
	function resetParticle(particle, width, height) {
		particle.color = colors[(Math.random() * colors.length) | 0];
		particle.x = Math.random() * width;
		particle.y = Math.random() * height - height;
		particle.diameter = Math.random() * 10 + 5;
		particle.tilt = Math.random() * 10 - 10;
		particle.tiltAngleIncrement = Math.random() * 0.07 + 0.05;
		particle.tiltAngle = 0;
		return particle;
	}

	function startConfettiInner() {
		var width = window.innerWidth;
		var height = window.innerHeight;
		window.requestAnimFrame = (function() {
			return window.requestAnimationFrame ||
				window.webkitRequestAnimationFrame ||
				window.mozRequestAnimationFrame ||
				window.oRequestAnimationFrame ||
				window.msRequestAnimationFrame ||
				function (callback) {
					return window.setTimeout(callback, 16.6666667);
				};
		})();
		var canvas = document.getElementById("confetti-canvas");
		if (canvas === null) {
			canvas = document.createElement("canvas");
			canvas.setAttribute("id", "confetti-canvas");
			canvas.setAttribute("style", "display:block;z-index:999999;pointer-events:none");
			document.body.appendChild(canvas);
			canvas.width = width;
			canvas.height = height;
			window.addEventListener("resize", function() {
				canvas.width = window.innerWidth;
				canvas.height = window.innerHeight;
			}, true);
		}
		var context = canvas.getContext("2d");
		while (particles.length < maxParticleCount)
			particles.push(resetParticle({}, width, height));
		streamingConfetti = true;
		if (animationTimer === null) {
			(function runAnimation() {
				context.clearRect(0, 0, window.innerWidth, window.innerHeight);
				if (particles.length === 0)
					animationTimer = null;
				else {
					updateParticles();
					drawParticles(context);
					animationTimer = requestAnimFrame(runAnimation);
				}
			})();
		}
	}

	function stopConfettiInner() {
		streamingConfetti = false;
	}

	function removeConfettiInner() {
		stopConfetti();
		particles = [];
	}

	function toggleConfettiInner() {
		if (streamingConfetti)
			stopConfettiInner();
		else
			startConfettiInner();
	}

	function drawParticles(context) {
		var particle;
		var x;
		for (var i = 0; i < particles.length; i++) {
			particle = particles[i];
			context.beginPath();
			context.lineWidth = particle.diameter;
			context.strokeStyle = particle.color;
			x = particle.x + particle.tilt;
			context.moveTo(x + particle.diameter / 2, particle.y);
			context.lineTo(x, particle.y + particle.tilt + particle.diameter / 2);
			context.stroke();
		}
	}

	function updateParticles() {
		var width = window.innerWidth;
		var height = window.innerHeight;
		var particle;
		waveAngle += 0.01;
		for (var i = 0; i < particles.length; i++) {
			particle = particles[i];
			if (!streamingConfetti && particle.y < -15)
				particle.y = height + 100;
			else {
				particle.tiltAngle += particle.tiltAngleIncrement;
				particle.x += Math.sin(waveAngle);
				particle.y += (Math.cos(waveAngle) + particle.diameter + particleSpeed) * 0.5;
				particle.tilt = Math.sin(particle.tiltAngle) * 15;
			}
			if (particle.x > width + 20 || particle.x < -20 || particle.y > height) {
				if (streamingConfetti && particles.length <= maxParticleCount)
					resetParticle(particle, width, height);
				else {
					particles.splice(i, 1);
					i--;
				}
			}
		}
	}
})();
$(document).ready(function () {
  function checkLegin() {
    $.ajax({
      url: "/current_user",
      method: "GET",
      success: function(result) {
        if (result !== "false") {
          isLoged = true
        }
        checkURLlogin()
      }
    })
  }
 function createWord() {
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







  function scrollResize() {
    var oneOfthird = 55; // 1/3 of height "word-ds" div
    var oneLine = 56;
    howmanyScroll = document.getElementById("word-inner").scrollTop;
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
      document.getElementById("word-inner").scrollTop = howmanyScroll - oneLine;
    }
  }



  function numberOFWords() {
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


  
  function endOfGame() {
    $("#text-keyboard").blur()
    $(
      "body"
    ).append(`<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
    // $("#exampleModal").modal("show");
    $(".app").fadeOut(200)
    $(".blinkingCurrsor").fadeOut(200)
    setTimeout(function() {
      $(".app").hide()
      $(".game-div").append(`<div class="end-screen" id="end-screen">
        <div class="results" id="results"><h1 class="words-per-minute-result">WPM ${numberOFWords().toString()}</h1></div>
      </div>
      <canvas id="confetti-canvas" style="display:block;z-index:999999;pointer-events:none" width="2540" height="1815"></canvas>`) 
      $("#end-screen").fadeIn(200)
      saveWpm();
      startConfetti()
      setTimeout(function() {
        stopConfetti()
      },3000)
    },250)
  }


  function saveWpm() {
    if (isLoged) {
      $.ajax({
        url: "/save_game",
        method: "POST",
        data: { wpm: numberOFWords().toString() },
        success: function (result) {
          console.log(result.succces);
        }
      });
    }
  }

  
  function addLettersColored(userInput) {
    let fajnie = userInput.substring(currnetWord2o().length);
    lettersMissed++
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



  function GoodWordsVsBadWords() {
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



  function nextWord() {
    if ($("#text-keyboard").val().length >= 1) {
      if (indexOfWord + 1 < letters.length) {
        let superancko = $("#text-keyboard").val();
        $(".word")[indexOfWord].ariaValue = `${superancko}`;
        scrollDownText($(".word")[indexOfWord], $(".word")[indexOfWord + 1]);
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



  function checkAllWords() { // check if all words are correctł
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



  function showCurrsorBlinking(valueFromUser) { // blinking cursor when user writes something in input field
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
        $(".blinkingCurrsor").css(
          "left",
          currnetLetterLeft - currnetLetterWidth
        );
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
        $(".blinkingCurrsor").css(
          "left",
          currnetLetterLeft + currnetLetterWidth
        );
        $(".blinkingCurrsor").css("rigth", currnetLetterRight);
      }
    } catch (error) {}
  }



  function PrviousWord() { // backspace word 
    if ($(".word")[indexOfWord].previousElementSibling != null) {
      document.getElementById("text-keyboard").value =
        $(".word")[indexOfWord].previousElementSibling.ariaValue;
      indexOfWord--;
      breakWord();
    }
    $(".word")[indexOfWord].style.border = "none";
  }



  function currnetWord2o() { // simple function to get current word
    currnetWord = letters[indexOfWord];
    return currnetWord;
  }



  function checkWordValid(wordWithColors) { // chekc valid of word using this "currentWordColored" and append validPoints if letter is valid and if word is good valid points are the same as the length of the word and the lenght of the word is the same as the length of the userInput
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



  function changeColor(thisWord) { // change color of word in HTML using "currentWordColor" wchich was created in "createWord" function
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



  function canBackspace() { // check if can backspace 
    try {
      if (
        $(".word")[indexOfWord - 1].ariaSiema != "correct" &&
        $(".word")[indexOfWord - 1].getBoundingClientRect().top + 10 > // check if prvious word is on our screen and if it is not correct
          $("#word-inner")[0].getBoundingClientRect().top
      ) {
        return true;
      } else {
        return false;
      }
    } catch (error) {}
  }



  function checkWord(valueUser, word) { // check word and change "currnetWordColor" to ! and @ and after that starts function changeColor and checkWordValid to provide colors to letters and check if word is correct
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



  function Watch(time) { // starts ticking the clock
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
        endOfGame();
      }
    }, 1000);
  }



  function addWordsToHTML(textOf, additionalWord) {
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



  function cursorShowingOrNot() {
    if (is) {
      $(".blinkingCurrsor").css("opacity", 0);
      is = false;
    } else {
      $(".blinkingCurrsor").css("opacity", 1);
      is = true;
    }
  }
  function currentUserIsLogedError() {
    console.log("jest błą")
    $("body").append(`
    <div class="toast-login">
      <i class="fa-solid fa-circle-xmark error-icon-register"></i>
      <div class="information-error">
        <h2 class="error-title">Error</h2>
        <h5 class="error-details"> You cannot open this page because you are already Logged!</h5>
        <div>
      <div class="timer-bar"></div>
    </div>
  `)
      $(".toast-login").toast("show")
      $(".toast-login").animate({
        top: "6.5%"
      })
      $(".timer-bar").animate({
        width: "96.5%"
      },3000)
      changeUrl("/")
      setTimeout(function() {
        $(".toast-login").animate({
          top: "-10%"
        })
        setTimeout(function() {
          $(".toast-login").remove()
        },500)
      },3000)
  }
  function changeUrl(href) {
    const nextURL = href;
    
    // This will replace the current entry in the browser's history, without reloading
    window.history.replaceState("", "", nextURL);
  }


  function checkURLlogin() {
    if (window.location.href.indexOf("login") > -1 ) {
      if (isLoged === false) {
        console.log("tak")
        $(".dropdown-menu-non-bootstrap").fadeIn(175);
        $(".login-form").fadeIn(175);
        opened = true;
      }
      else {
        console.log("taktak")
        currentUserIsLogedError()
    }
  }
  else if (window.location.href.indexOf("register") > -1) {
    if (isLoged === false) {
      $("#registerModal").modal("show")
    }
    else {
      currentUserIsLogedError()
    }
  }
}

// --------------------------------------------------








// APPLICATION  --------------------------------------------------









$("#word-inner").hide();
createWord();
checkLegin()
// setTimeout(function() {
//     checkURLlogin()
//   },30)
  $(".keys").click(function () {
    // $("#text-keyboard").focus();
    if (!FirstClick) {
      Watch(time);
      FirstClick = true;
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
    checkAllWords();
    checkWord($("#text-keyboard").val(), currnetWord2o());
    showCurrsorBlinking($("#text-keyboard").val());
  });
  var line = 0;
  var howmanyScroll = 0;
  function scrollDownText(firstWord, SecondWord) {
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
    for (let i = 0; i < $(".keys").length; i++) {
      listOfLetters.push($(".keys")[i]);
    }
    $(document).on("keydown", function (e) {
      // press key
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
  
  var seconds = time;
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
    if (seconds < 10 ) {
    secondsHTML.html("0" + seconds);
    }
    else {
      secondsHTML.html(seconds)
    }
  }
  $("#word-ds").on("click", function () {
    console.log("tak");
    $("#text-keyboard").focus();
  });
  var poprzednitop;
  function breakWord() {
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
  var Working = true;
  setTimeout(function () {
    if (loaded) {
      showCurrsorBlinking($("#text-keyboard").val());
    }
  }, 3000);
  showCurrsorBlinking($("#text-keyboard").val());
  $("#text-keyboard").on("input", function (key) {
    if (!loaded) {
      $("#text-keyboard").val("");
    }
    if (loaded) {
      Working = false;
      $(".blinkingCurrsor").css("opacity", 1);
      clearInterval(fajnie);
      if (pattern.includes(key.originalEvent.data)) {
        WrittenLetters++;
      }
      if (!FirstClick) {
        Watch(time);
        FirstClick = true;
      }
      checkAllWords();
      checkWord($("#text-keyboard").val().toLowerCase(), currnetWord2o());
      showCurrsorBlinking($("#text-keyboard").val());
      breakWord();
      // console.log("poprzednitop: ", poprzednitop);
    }
  });
  $("#text-keyboard").on("keydown", function (k) {
    let e = k.originalEvent;
    if (e.code === "Space") {
      e.preventDefault();
      if (loaded) {
        SpaceClicked = true;
        checkWordValid(currnetWordColor);
        nextWord();
        document.getElementById("text-keyboard").value = "";
        showCurrsorBlinking($("#text-keyboard").val());
        SpaceClicked = false;
      }
    }
    if (e.code == "Backspace") {
      if ($("#text-keyboard").val() <= 0) {
        e.preventDefault();
        if (canBackspace()) {
          PrviousWord();
          showCurrsorBlinking($("#text-keyboard").val());
        }
      }
    }
    if (e.code === "Tab") {
      e.preventDefault();
    }
  });
  window.addEventListener("wheel", (e) => e.preventDefault(), {
    passive: false,
  });
  var is = true;
  let fajnie = setInterval(function () {
    if (Working) {
      cursorShowingOrNot();
    }
  }, 750);
  $(window).on("resize", function () {
    scrollResize();
    // $("#text-keyboard").focus();
    showCurrsorBlinking($("#text-keyboard").val());
  });
});

console.clear()