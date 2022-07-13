$(document).ready(function () {
  $(".user-profile-mini").click(function () {
    console.log("taktonieje");
    $(".user-profile-mini").toggleClass("user-profile-mini-123");
    // setTimeout(function () {}, 100);
    setTimeout(function () {
      $(".user-profile-stats").toggleClass("user-profile-stats-123");
      $(".stats").toggleClass("statsFajnie");
    }, 75);
  });
  $("#registerModal").modal({ backdrop: "static", keyboard: false });
  $(document).on("keydown", function (key) {
    if (key.originalEvent.code === "Escape") {
      // console.log("tak");
      key.preventDefault();
    }
  });
});
