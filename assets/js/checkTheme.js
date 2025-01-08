// Initially sets the theme before the HTML has loaded

const storedTheme = localStorage.getItem("theme");
const darkPreference = window.matchMedia(
  "(prefers-color-scheme: dark)"
).matches;
const theme = storedTheme || (darkPreference ? "dark" : "light");
document.documentElement.setAttribute("data-theme", theme);
