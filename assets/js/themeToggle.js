// Handles theme toggling after the HTML has loaded
const toggleInputs = document.getElementsByClassName("toggle-input");
const toggles = document.getElementsByClassName("toggle");
const hiddens = document.getElementsByClassName("visually-hidden");

// Set initial display of theme toggle after page load
for (let toggle of toggleInputs) {
  if (theme === "light") {
    toggle.classList.add("light");
  } else {
    toggle.classList.add("dark");
  }
}

// Attach event listeners to desktop and mobile toggles
for (let toggle of toggleInputs) {
  toggle.addEventListener("click", () => {
    let theme = localStorage.getItem("theme");
    if (theme === "light") {
      setDarkTheme(toggle);
      addGistDarkMode();
    } else {
      setLightTheme(toggle);
      removeGistDarkMode();
    }
  });
}

function setDarkTheme(toggle) {
  localStorage.setItem("theme", "dark");
  document.documentElement.setAttribute("data-theme", "dark");
  for (let toggler of toggles) {
    toggler.classList.add("dark");
  }
  toggle.classList.add("dark");
  for (let hidden of hiddens) {
    hidden.innerHTML = "Click to enable light mode";
  }
}

function setLightTheme(toggle) {
  localStorage.setItem("theme", "light");
  document.documentElement.setAttribute("data-theme", "light");
  for (let toggler of toggles) {
    toggler.classList.remove("dark");
  }
  for (let hidden of hiddens) {
    hidden.innerHTML = "Click to enable dark mode";
  }
}
