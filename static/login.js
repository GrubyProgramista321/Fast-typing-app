var opened = false;
$(document).ready(function () {
  $("#submit-button").click(function (e) {
    $.ajax({
      url: "/login",
      method: "POST",
      data: { username: $("#username").val(), password: $("#password").val() },
      success: function (result) {
        console.log(result);
        if (result === "true") {
          location.reload();
        } else {
          try {
            $("#error").remove();
          } catch (error) {}
          $("#title").after(
            `<div class="alert alert-danger" role="alert">
            Username or password are not correct!
          </div>`
          );
        }
      },
    });
  });
  $("#dropdown-button-menu").click(function () {
    if (opened) {
      $(".login-form").fadeOut(175);
      $(".dropdown-menu-non-bootstrap").fadeOut(175);
      // $(".dropdown-menu-non-bootstrap").css("display", "none");
      opened = false;
    } else {
      $(".dropdown-menu-non-bootstrap").fadeIn(175);
      $(".login-form").fadeIn(175);
      opened = true;
    }
  });
  $(".input-login").on("keydown", function (e) {
    console.log(e.code);
    if (e.code === "Enter") {
      $("#submit-button").click();
    }
  });
});
function openDropdown() {}
