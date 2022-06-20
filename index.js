
console.log($("#text-keyboard"))
const pattern = ['A', 'a', 'Ą', 'ą', 'B', 'b', 'C', 'c', 'Ć', 'ć', 'D', 'd', 'E', 'e', 'Ę', 'ę', 'F', 'f', 'G', 'g', 'H', 'h', 'I', 'i', 'J', 'j', 'K', 'k', 'L', 'l', 'Ł', 'ł', 'M', 'm', 'N', 'n', 'Ń', 'ń', 'O', 'o', 'Ó', 'ó', 'P', 'p', 'R', 'r', 'S', 's', 'Ś', 'ś', 'T', 't', 'U', 'u', 'W', 'w', 'Y', 'y', 'Z', 'z', 'Ź', 'ź', 'Ż', 'ż', "q", "Q", "X", "x", "!", ',', ".", "[", "]", "|"];
var listOfValue = []
var listOfLetters = []
var text = "ale to jest fajne"
var textDouble = text
var newText = ""
for(var i = 0; i < text.length; i++) {
    newText += `<letter>${text[i]}</letter>`
}
console.log(newText)
String.prototype.replaceAt = function(index, replacement) {
    return this.substring(0, index) + replacement + this.substring(index + replacement.length);
}
$(document).ready(function () {
    $("#word-inner").html(newText)
    console.log($("letter"))
    var shiftClcked = true
    $(".keys").click(function () {
        $("#text-keyboard").focus()
        $(this).css("background-color", "green")
        setTimeout(function() {
            $(this).css("background-color", "red")
        }, 100)
        if (pattern.includes($(this).val())) {
            console.log($(this).val())
            $("#text-keyboard")[0].value += $(this).val()
        }
        else {
            if (($(this).val() == "Backspace")) {
                var lastletter = $("#text-keyboard")[0].value.substring($("#text-keyboard")[0].value.length - 1)
                var costam = $("#text-keyboard")[0].value.replace(lastletter, "")
                $("#text-keyboard")[0].value = costam
            }
            if ($(this).val() == "shift") {
                for (var i = 0; i < $(".keys").length; i++) {
                    if (pattern.includes($(".keys")[i].value)) {
                        console.log($(".keys")[i].value.toUpperCase())
                        $(".keys")[i].value = $(".keys")[i].value.toUpperCase()
                        $(".keys")[i].innerHTML = $(".keys")[i].value.toUpperCase()
                    }
                }
                if (pattern.includes($(this).val())) {
                    shiftClcked = false
                }
                else {
                    if (!shiftClcked) {
                        shiftClcked = true
                    }
                    else {
                        shiftClcked = false
                    }
                }
                console.log("przd sprawdzeniem", shiftClcked)
                console.log("po sprawdzeniu", shiftClcked)
            }
            if (shiftClcked) {
                for (var i = 0; i < $(".keys").length; i++) {
                    if (pattern.includes($(".keys")[i].value)) {
                        console.log($(".keys")[i].value.toLowerCase())
                        $(".keys")[i].value = $(".keys")[i].value.toLowerCase()
                        $(".keys")[i].innerHTML = $(".keys")[i].value.toLowerCase()
                    }
                }
            }
            console.log(shiftClcked)
        }
    })
    for (let i = 0; i < $(".keys").length; i++) {
        listOfLetters.push($(".keys")[i])
        listOfValue.push($(".keys")[i].value)
    }
    console.log("lista liter: ", listOfLetters)
    console.log("lista value: ", listOfValue)
    $(document).on("keydown", function (e) {
        for (var i = 0; i < listOfLetters.length; i++) {
            if (listOfLetters[i].value == e.key || listOfLetters[i].value.toUpperCase() == e.key.toUpperCase() ) {
                console.log(e.key)
                listOfLetters[i].style.backgroundColor = "green"
            }
        }
    })
    $(document).on("keyup", function (e) {
        for (var i = 0; i < listOfLetters.length; i++) {
            if (listOfLetters[i].value == e.key || listOfLetters[i].value.toUpperCase() == e.key.toUpperCase() ) {
                console.log(e.key)
                listOfLetters[i].style.backgroundColor = "white"
            }
        }
    })
    function checkWord(valueUser,word) {
        for(var i = 0; i < word.length; i++) {
            if (typeof(valueUser[i]) == "undefined") {
                console.log(i)
                console.log("fajnie")
                break
            }
            else {
                if (valueUser[i] == word[i] ) {
                // console.log()
                word = word.replace(word[i], "!") 
                console.log(word)
                }
            }
        }
        for(var x = 0; x < word.length; x++) {
            console.log(valueUser)
            if (typeof(valueUser[x]) == "undefined") {
                break
            }
            if (word[x] == "!") {
                console.log("nie", valueUser)
                var index = textDouble.indexOf(valueUser[x])
                console.log("index z textDouble to: ", index)
                textDouble.replaceAt(index, `<span class="green">${valueUser[x]}</span>`)
            }
            console.log(textDouble)
        }
    }
    $("#text-keyboard").on("input",function() {
        checkWord($("#text-keyboard").val(), text)
    })
})