const toggleButton = document.getElementById("theme-toggle");

const currentBackgroundColor = getComputedStyle(document.documentElement)
  .getPropertyValue("--background-color")
  .trim();

const moon = `<svg xmlns="http://www.w3.org/2000/svg" width="auto" height="100%" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
</svg>
`;

const sun = `<svg xmlns="http://www.w3.org/2000/svg" width="auto" height="100%" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
</svg>`;

// Check system preference for theme
let darkPreference = window.matchMedia("(prefers-color-scheme: dark)");

let theme = localStorage.getItem("theme");

// If no theme is stored, set the theme based on system preference
if (!theme) {
  if (!darkPreference.matches) {
    toggleButton.innerHTML = sun;
    document.documentElement.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light");
  } else {
    toggleButton.innerHTML = moon;
    document.documentElement.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
  }
} else {
  // If theme is stored, set theme based on stored value
  if (theme === "light") {
    toggleButton.innerHTML = sun;
    document.documentElement.setAttribute("data-theme", "light");
  } else {
    document.documentElement.setAttribute("data-theme", "dark");
    toggleButton.innerHTML = moon;
  }
}

// Listen for user clicking theme toggler
toggleButton.addEventListener("click", () => {
  theme = localStorage.getItem("theme");

  if (theme === "light") {
    dark();
  } else {
    light();
  }
});

function dark() {
  localStorage.setItem("theme", "dark");
  document.documentElement.setAttribute("data-theme", "dark");
  toggleButton.innerHTML = moon;
}

function light() {
  localStorage.setItem("theme", "light");
  toggleButton.innerHTML = sun;
  document.documentElement.setAttribute("data-theme", "light");
}

// function setDarkTheme() {
//   toggleButton.innerHTML = moon;
//   localStorage.setItem("theme", "dark");

//   // Update colors
//   document.documentElement.style.setProperty("--green", "#81ae93");
//   document.documentElement.style.setProperty("--accent", "#e7f1e6");
//   document.documentElement.style.setProperty("--purple", "#cf9ed4");
//   document.documentElement.style.setProperty("--grey", "#f8f8f8");

//   document.documentElement.style.setProperty("--background-color", "#1e1e1f");
//   document.documentElement.style.setProperty("--text", "#fff");
// }

// function setLightTheme() {
//   toggleButton.innerHTML = sun;
//   localStorage.setItem("theme", "light");

//   document.documentElement.style.setProperty("--green", "#386837");
//   document.documentElement.style.setProperty("--accent", "#e7f1e6");
//   document.documentElement.style.setProperty("--purple", "#9f4aa5");
//   document.documentElement.style.setProperty("--grey", "#575757");

//   document.documentElement.style.setProperty("--background-color", "#f8f8f8");
//   document.documentElement.style.setProperty("--text", "#000");
// }
