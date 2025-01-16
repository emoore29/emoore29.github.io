document.addEventListener("keydown", (event) => {
  if (event.key === "Tab" || event.key === "Shift") {
    document.documentElement.classList.add("keyboard-navigation");
  }
});

document.addEventListener("mousedown", () => {
  document.documentElement.classList.remove("keyboard-navigation");
});
