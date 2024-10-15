window.addEventListener("scroll", function () {
  if (window.scrollY > 55) {
    document.getElementById("header").classList.add("sticky");
  } else {
    document.getElementById("header").classList.remove("sticky");
  }
});
