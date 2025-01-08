const themeToggle = document.getElementById("theme-toggle");

console.log(themeToggle.style);

// Listen for user clicking theme toggler
themeToggle.addEventListener("click", () => {
  console.log("theme toggle clicked");
  const theme = localStorage.getItem("theme");
  if (theme === "light") {
    setDarkTheme();
  } else {
    setLightTheme();
  }
});

function setDarkTheme() {
  localStorage.setItem("theme", "dark");
  document.documentElement.setAttribute("data-theme", "dark");
  themeToggle.classList.remove("light");
  themeToggle.classList.add("dark");
}

function setLightTheme() {
  localStorage.setItem("theme", "light");
  document.documentElement.setAttribute("data-theme", "light");
  themeToggle.classList.add("light");
  themeToggle.classList.remove("dark");
}
