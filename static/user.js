$(document).ready(function () {
  $(".user-profile-mini").click(function () {
    console.log("tal");
    $(".user-profile-mini").toggleClass("user-profile-mini-123");
    // $(".user-profile-mini").css("width", "300px");
    // $(".user-profile-mini").css("border-radius", "10px");
    // $(".user-profile-mini").css("border-bottom-left-radius", "0");
    // $(".user-profile-mini").css("border-bottom-right-radius", "0");
    setTimeout(function () {
      $(".user-profile-stats").toggleClass("user-profile-stats-123");
    }, 75);
  });
});
