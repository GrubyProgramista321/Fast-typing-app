$(".register-inputs").focusin(function (e) {
  e.currentTarget.previousElementSibling.style.color = "white";
  e.currentTarget.parentNode.style.borderColor = "#7880d7";
  e.currentTarget.parentNode.style.backgroundColor = "#25262a";
});
$(".register-inputs").focusout(function (e) {
  if (e.currentTarget.value == 0) {
    e.currentTarget.previousElementSibling.style.color = "#949494";
  }
  e.currentTarget.parentNode.style.borderColor = "#2e3034";
  e.currentTarget.parentNode.style.backgroundColor = "transparent";
});
