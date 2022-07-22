var opened = false; // check if window is opened (login window)
var usernameGood;
var emailGood;
var Exsisted;
function changeUrl(href) {
  const nextURL = href;
  const nextTitle = 'My new page title';
  const nextState = { additionalInformation: 'Updated the URL with JS' };
  
  // This will create a new entry in the browser's history, without reloading
  window.history.pushState(nextState, nextTitle, nextURL);
  
  // This will replace the current entry in the browser's history, without reloading
  window.history.replaceState(nextState, nextTitle, nextURL);
}
// Login accout using AJAX
$(document).ready(function () {
  $(".login-input-div").click(function() {
    $(this).children()[1].focus()
  })
  $("#submit-button").click(function (e) {
    $.ajax({
      url: "/login",
      method: "POST",
      data: { username: $("#username-login").val(), password: $("#password-login").val() },
      success: function (result) {
        console.log(result);
        if (result === "true") {
          changeUrl("/")
          location.reload();
        } else {
          try {
            $(".siemaa").remove();
          } catch (error) {}
          $("#title").after(
            `<div class="alert alert-danger siemaa" role="alert">
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

  // click ENTER to submit login ----------------------------

  $(".input-login").on("keydown", function (key) {
    if (key.originalEvent.key === "Enter") {
      $("#submit-button").click();
    }
  });
  // --------------------------------------------------------

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
    console.log(usernameGood)
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
            $("#errors-data")
              .append(`<div class="alert alert-danger" role="alert">
            The email address provided is invalid or <b>does not exist</b>
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
        url: "/register_account",
        method: "POST",
        data: {
          username: $("#username-register").val(),
          password: $("#password-register").val(),
          email: $("#email").val(),
        },
        success: function (result) {
          if (result === "true") {
            changeUrl("/")
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
            console.log(usernameGood)
          }
        },
      });
    } else {
      emailGood = false;
      console.log(usernameGood)
      showErrors();
    }
  }

  function checkRegisterInputs() {
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
          checkEmail();
        },
      });
    } else {
      usernameGood = false;
      checkEmail();
    }
  }



  function submitUsername(boolean) {
    if (boolean) {
      usernameGood = true
    }
    else {
      usernameGood = false
    }
  }



  function checkPassword() {
    let sings = "!@#$%^&*(){}[];'<>,.?/|+_-=";
    const specialSings = sings.split("");
    let specialSingsPoints = 0;
    let largeLettersPoints = 0;
    let endFor = false
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
    checkRegisterInputs();
  });

$("#dropdown-button-menu").click(function() {
if (opened === false) {
  changeUrl("/")
}
else {
  changeUrl("/login")
}
})
$("#registerLink").click(function() {
  changeUrl("/register")
})
$(".exit-button").click(function(){
  if (opened) {
  changeUrl("/login")
  }
  else {
    changeUrl("/")
  }
})
});
