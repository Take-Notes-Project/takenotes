document.addEventListener(
  "DOMContentLoaded",
  () => {
    console.log("take-notes JS imported successfully!");
  },
  false
);


let old = $(".card").get(0);
$(".card").click(function () {
  if (old != null && $(old).hasClass("open")) $(old).toggleClass("open");
  $(this).toggleClass("open");
  old = this;
});
