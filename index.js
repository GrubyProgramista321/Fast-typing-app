console.log("fajnie ")
console.log($("#text-keyboard"))
var listOfValue = []
var listOfLetters = []
text = "ale to jest fajne"
$(document).ready(function () {
    var shiftClcked = true
    const pattern = ['A', 'a', 'Ą', 'ą', 'B', 'b', 'C', 'c', 'Ć', 'ć', 'D', 'd', 'E', 'e', 'Ę', 'ę', 'F', 'f', 'G', 'g', 'H', 'h', 'I', 'i', 'J', 'j', 'K', 'k', 'L', 'l', 'Ł', 'ł', 'M', 'm', 'N', 'n', 'Ń', 'ń', 'O', 'o', 'Ó', 'ó', 'P', 'p', 'R', 'r', 'S', 's', 'Ś', 'ś', 'T', 't', 'U', 'u', 'W', 'w', 'Y', 'y', 'Z', 'z', 'Ź', 'ź', 'Ż', 'ż', "q", "Q", "X", "x", "!", ',', ".", "[", "]", "|"];
    $(".keys").click(function () {
        $("#text-keyboard").focus()
        if (pattern.includes($(this).val())) {
            console.log($(this).val())
            $("#text-keyboard")[0].value += $(this).val()
        }
        else {
            if (($(this).val() == "backspace")) {
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
            if (listOfLetters[i].value == e.key) {
                console.log(e.key)
                listOfLetters[i].style.backgroundColor = "green"
            }
        }
    })
    $(document).on("keyup", function (e) {
        for (var i = 0; i < listOfLetters.length; i++) {
            if (listOfLetters[i].value == e.key) {
                console.log(e.key)
                listOfLetters[i].style.backgroundColor = "white"
            }
        }
    })
    function checkWord(value) {

    }
})