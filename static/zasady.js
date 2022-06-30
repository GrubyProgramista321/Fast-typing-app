import { showCurrsorBlinking } from "./index"

$(window).on("resize", function () {
    showCurrsorBlinking($("#text-keyboard").val())
})