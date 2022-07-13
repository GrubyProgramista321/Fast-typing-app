var opened = false; // check if window is opened (login window)
var usernameGood;
var emailGood;
var Exsisted;
// Login accout using AJAX
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
  // -------------------------------------------------------------------------------------------

  // register account AJAX

  $("#submit-reigster-button").click(function () {});

  // ---------------------------------------------------------
  // open this login window

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

  //---------------------------------------------------------

  // button to open and close bootstrap modals (Register modals)
  $("#registerLink").click(function () {
    $("#registerModal").modal("show");
  });
  $(".btn-secondary").click(function () {
    $("#registerModal").modal("hide");
  });
  $(".exit-button").click(function () {
    $("#registerModal").modal("hide");
  });

  // ----------------------------------------------------------------

  function containsWhitespace(str) {
    return /\s/.test(str);
  }

  function showErrors() {
    $("#submit-reigster-button").attr("disabled", false);
    $(".bg-loader").remove();
    try {
      $("#errors-data").remove();
    } catch (error) {}
    $("#register-modal-body").append(
      "<div id='errors-data' class='errors-data'></div>"
    );
    if (!emailGood) {
      console.log("Taki email jest zły");
      $.ajax({
        url: "/email_data",
        method: "POST",
        data: { email: $("#email").val() },
        success: function (result) {
          if (result === "true") {
            console.log("takjest");
            $("#errors-data")
              .append(`<div class="alert alert-danger" role="alert">
            The email address provided is invalid or does not exist
          </div>`);
          } else {
            $("#errors-data")
              .append(`<div class="alert alert-warning" role="alert">
            Taki email instnieje :(
          </div>`);
          }
        },
      });
    }
    if (!usernameGood) {
      $("#errors-data").append(`<div class="alert alert-danger" role="alert">
    The username provided is too short or does exist
  </div>`);
    }
    $("#registerModal").effect("shake");
  }
  // function checkRegisterInput() {}
  function registerAccount() {
    if (usernameGood & emailGood) {
      console.log("tak bylo");
      $.ajax({
        url: "/register",
        method: "POST",
        data: {
          username: $("#username-register").val(),
          password: $("#password-register").val(),
          email: $("#email").val(),
        },
        success: function (result) {
          if (result === "true") {
            location.reload();
          } else {
            console.log("nie obchodiz mnie to");
            showErrors();
          }
        },
      });
    } else {
      showErrors();
    }
  }
  function checkEmail() {
    let hasMonkey = false;
    for (let i = 0; i < $("#email").val().length; i++) {
      console.log("tak");
      // check if email has @
      if ($("#email").val()[i] === "@") {
        hasMonkey = true;
        break;
      }
    }
    if (!containsWhitespace($("#email").val()) && hasMonkey) {
      $.ajax({
        url: "/email_ping",
        method: "POST",
        data: { email: $("#email").val() },
        success: function (result) {
          if (result === "true") {
            emailGood = true;
            registerAccount();
          } else {
            emailGood = false;
            showErrors();
          }
        },
      });
    } else {
      emailGood = false;
      showErrors();
    }
  }

  function checkUsername() {
    console.log("tak widzu");
    if ($("#username-register").val().length >= 4) {
      $.ajax({
        url: "/check_username",
        method: "POST",
        data: { username: $("#username-register").val() },
        success: function (result) {
          console.log("result from AJAX", result);
          if (result === "true") {
            usernameGood = true;
          } else {
            usernameGood = false;
          }
        },
      });
    } else {
      usernameGood = false;
    }
  }
  function checkPassword() {
    let sings = "!@#$%^&*(){}[];'<>,.?/|+_-=";
    const specialSings = sings.split("");
    let specialSingsPoints = 0;
    let largeLettersPoints = 0;
    if ($("#password-register").val().length >= 8) {
      for (let i = 0; i < $("#password-register").val().length; i++) {
        if (specialSings.includes($("#password-register").val()[i])) {
          specialSingsPoints++;
        }
        if (
          $("#password-register").val()[i] ===
          $("#password-register").val()[i].toUpperCase()
        ) {
          largeLettersPoints++;
        }
      }
    }
  }
  $("#submit-reigster-button").click(function () {
    $(".modal-content").append(`<div class="bg-loader">
    <div class="lds-ring">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>`);
    $("#submit-reigster-button").attr("disabled", true);
    checkUsername();
    checkEmail();
  });

  // change border width on register

  // $(".register-inputs").focusin(function (e) {
  //   let id = e.currentTarget.id;
  //   let idOfBorder = "#border-" + id;
  //   console.log(idOfBorder);
  //   console.log(($(idOfBorder)[0].style.width = "100%"));
  // });
  // $(".register-inputs").focusout(function (e) {
  //   console.log(e);
  //   let id = e.currentTarget.id;
  //   let idOfBorder = "#border-" + id;
  //   console.log(idOfBorder);
  //   $(idOfBorder)[0].style.width = "0%";
  // });
});
