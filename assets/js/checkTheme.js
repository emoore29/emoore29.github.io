// Initially sets the theme before the HTML has loaded

const storedTheme = localStorage.getItem("theme");
const darkPreference = window.matchMedia(
  "(prefers-color-scheme: dark)"
).matches;
const theme = storedTheme || (darkPreference ? "dark" : "light");
document.documentElement.setAttribute("data-theme", theme);

// Add dark mode stylesheet for Gist
if (theme == "dark") {
  addGistDarkMode();
}

// Add gist dark mode styles
function addGistDarkMode() {
  // Remove if already exists so it's not applied twice
  removeGistDarkMode();
  const darkModeStyles = document.createElement("link");
  darkModeStyles.rel = "stylesheet";
  darkModeStyles.href = "/assets/css/gist-dark-mode.css";
  darkModeStyles.id = "gist-dark-mode";
  document.head.appendChild(darkModeStyles);
}

// Remove gist dark mode styles
function removeGistDarkMode() {
  const gistDarkMode = document.getElementById("gist-dark-mode");
  if (gistDarkMode) {
    gistDarkMode.remove();
  }
}
