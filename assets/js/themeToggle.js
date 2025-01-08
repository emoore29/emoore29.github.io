// Handles theme toggling after the HTML has loaded

const toggles = document.getElementsByClassName("toggle");
const hiddens = document.getElementsByClassName("hidden");

// Set initial display of theme after page load
for (let toggle of toggles) {
  if (theme === "light") {
    toggle.classList.add("light");
  } else {
    toggle.classList.add("dark");
  }
}

// Attach event listeners to desktop and mobile toggles
for (let toggle of toggles) {
  toggle.addEventListener("click", () => {
    let theme = localStorage.getItem("theme");
    if (theme === "light") {
      setDarkTheme(toggle);
    } else {
      setLightTheme(toggle);
    }
  });
}

function setDarkTheme(toggle) {
  localStorage.setItem("theme", "dark");
  document.documentElement.setAttribute("data-theme", "dark");
  toggle.classList.remove("light");
  toggle.classList.add("dark");
}

function setLightTheme(toggle) {
  localStorage.setItem("theme", "light");
  document.documentElement.setAttribute("data-theme", "light");
  toggle.classList.add("light");
  toggle.classList.remove("dark");
}
