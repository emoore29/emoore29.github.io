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

if (currentBackgroundColor === "#f8f8f8") {
  toggleButton.innerHTML = sun;
  localStorage.setItem("darkTheme", false);
} else {
  toggleButton.innerHTML = moon;
  localStorage.setItem("darkTheme", true);
}

let darkTheme = localStorage.getItem("darkTheme") === "true";

toggleButton.addEventListener("click", () => {
  console.log("button clicked");
  if (!darkTheme) {
    // Switch to dark theme
    toggleButton.innerHTML = moon;
    document.documentElement.style.setProperty("--green", "#81ae93");
    document.documentElement.style.setProperty("--accent", "#e7f1e6");
    document.documentElement.style.setProperty("--purple", "#cf9ed4");
    document.documentElement.style.setProperty("--background-color", "#1e1e1f");
    document.documentElement.style.setProperty("--text", "#fff");
    darkTheme = true;
  } else {
    // Switch to light theme
    document.documentElement.style.setProperty("--green", "#386837");
    document.documentElement.style.setProperty("--accent", "#e7f1e6");
    document.documentElement.style.setProperty("--purple", "#9f4aa5");
    document.documentElement.style.setProperty("--background-color", "#f8f8f8");
    document.documentElement.style.setProperty("--text", "#000");
    toggleButton.innerHTML = sun;
    darkTheme = false;
  }
});

console.log("running theme");
