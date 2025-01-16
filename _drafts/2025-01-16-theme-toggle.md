---
title: "Building an accessible theme toggle"
date: 2025-01-16
---

To offer an inclusive user experience, most websites have both light and dark modes. Some of the key considerations for implementing a theme toggle include the following:

1. The default theme should initially reflect the user's system preferences
2. The theme toggler's purpose should be intuitive and minimal
3. It should be keyboard and screen-reader accessible

<br/>

#### Visual design

There are many different theme toggle designs online. Here are some examples:

<div width="100%" style="display: flex; justify-content: center">
<figure style="display: flex; flex-direction: column; width: 150px">
  <img src="{{site.url}}/assets/images/theme-toggle/mantine.gif" alt="Mantine's theme toggle" >
  <figcaption style="text-align: center"><a href="https://mantine.dev/">Mantine</a></figcaption>
</figure>
<figure style="display: flex; flex-direction: column; width: 150px">
    <img src="{{site.url}}/assets/images/theme-toggle/tailwind.gif" alt="Tailwind's theme toggle" >
  <figcaption style="text-align: center"><a href="https://mantine.dev/">Tailwind</a></figcaption>
</figure>
<figure style="display: flex; flex-direction: column; width: 150px">
  <img src="{{site.url}}/assets/images/theme-toggle/tabler.gif" alt="Tabler's theme toggle" >

  <figcaption style="text-align: center"><a href="https://tabler.io/">Tabler</a></figcaption>
</figure>
<figure style="display: flex; flex-direction: column; width: 100px">
<img src="{{site.url}}/assets/images/theme-toggle/portfolio.gif" alt="Emma Moore's portfolio theme toggle theme toggle" >
  <figcaption style="text-align: center"><a href="https://emoore29.github.io/">Emma Moore Portfolio</a></figcaption>
</figure>
</div>

I chose the latter design for the current version of my website because I felt that a switch was the best visual representation of the actual function of the button. The first two designs, which display a button with a sun icon when the page is in dark mode, might look confusing to some users.

However, there are some downsides to the latter design as well. It's slightly more cluttered than the first two designs, doesn't allow the user to select a 'system mode', and creates some additional accessibility concerns to address.

Ultimately, the design choice will come down to what is most suitable for the website in question.

#### Implementation

##### Building the logic: JavaScript and HTML Data Themes

In implementing the theme toggler logic on my own website, I initially took inspiration from [Derek Kedziora's guide](https://derekkedziora.com/blog/dark-mode-revisited). My code builds upon the code found in that guide; however, with several adjustments made in an attempt to simplify the logic and reduce repetition.

Using the data-\* HTML attribute on the `<html>` element allows for defining CSS variables that change depending on the value of the attribute. For example:

```
html[data-theme="light"] {
    --background-color: white;
    --text-color: black;
}

html[data-theme="dark"] {
    --background-color: black;
    --text-color: white;
}
```

Then, you can simply attach an event listener to a toggle button that toggles the data-theme between "light" and "dark", which will update the CSS variables and therefore the color scheme of the website.

There are a couple of options to ensure that on a user's first visit, the color scheme matches their system preferences.

[Derek Kedziora's guide](https://derekkedziora.com/blog/dark-mode-revisited) uses the `prefers-color-scheme` CSS media feature to detect the user's system preferences. This will work; however, a downside is that it introduces some repetitive CSS where the variables need to be defined both inside and outside the media query.

For example, if you only define the dark mode colors inside the media query and light mode outside the query, as shown below, the dark mode CSS variables will not be accessible to users who do not have a dark mode system preference:

```
html[data-theme="light"] {
	--light-text-color: grey;
  	--link-color: blue;
  	--main-background-color: white;
  	--main-text-color: black;
}

@media (prefers-color-scheme: dark) {
	html[data-theme="dark"] {
		--light-text-color: grey;
  		--link-color: light-blue;
  		--main-background-color: black;
  		--main-text-color: white;
	}
```

^^This will not work.

An alternative is to detect the user's preferred color scheme using JavaScript before the page fully loads, so that the correct color scheme is applied before the default CSS is loaded.

To do this, create a `checkTheme.js` file that will be linked in the `<head>` of your HTML document.

To start with, detect and set the user's preference with the following code:

```
const darkPreference = window.matchMedia(
  "(prefers-color-scheme: dark)"
).matches;
const theme = darkPreference ? "dark" : "light";
document.documentElement.setAttribute("data-theme", theme);
```

Then, set up your CSS variables:

```
html[data-theme="light"] {
  --grey: #575757;
  --background-color: #f8f8f8;
  --text: #000000bd;
  --em-text: #000000e1;
  --pink: #b93673;
}

html[data-theme="dark"] {
  --grey: #f8f8f8;
  --background-color: #1b1b1b;
  --text: #ffffffbd;
  --em-text: #ffffff;
  --pink: #b93673;
}
```

Now, if the user's system preferences are for dark mode, the dark mode CSS variables will be applied, and vice versa.

Another feature of dark/light mode toggle is to remember the user's chosen theme. Say their system preference is light mode, but they toggle to dark mode and then leave the website. The goal is to ensure the website is still in dark mode when they return. For this, you can use localStorage to store their preference, and then check if anything is stored before defaulting to their system preference.

To do this, update the `checkTheme.js` file to read as follows:

```
const storedTheme = localStorage.getItem("theme");
const darkPreference = window.matchMedia(
  "(prefers-color-scheme: dark)"
).matches;
const theme = storedTheme || (darkPreference ? "dark" : "light");
document.documentElement.setAttribute("data-theme", theme);
```

Now, before the page fully loads, the JavaScript runs and detects if the user's preference has been stored, and if not, defaults to their system preference.

Next, to add the toggle logic, create a file named `themeToggle.js` and add it to the HTML document, this time at the bottom of the document just after the body. The order is important, because it needs to be added after the body. If it loads before the body, it won't be able to find the toggle element to add a click event listener.

The JavaScript in your `themeToggle.js` will have to be customised to your specific design, but the fundamental logic should be the same:

1. Get your toggle button/element by id or className
2. Attach a click event listener to the toggle element that sets the data-theme to the opposite of the current theme, and updates the current theme in local storage

Depending on the HTML structure and styling on your toggle, you might also need to add additional logic. For example, the switch on my portfolio has a "sliding" pseudo-element, so that also required adding a "dark" class when dark mode was active to transform the pseudo-element with CSS.

You can view the code for my toggle in this portfolio's [repository](https://github.com/emoore29/emoore29.github.io/tree/main/assets/js), but to keep things simple, here's some pseudo-code for what a simple toggle button might need:

```javascript
const toggle = document.getElementById("toggle-button")

toggle.addEventListener("click", () => {
    let theme = localStorage.getItem("theme");
    if (theme === "light") {
      setDarkTheme();
    } else {
      setLightTheme();
    }

function setDarkTheme() {
  localStorage.setItem("theme", "dark");
  document.documentElement.setAttribute("data-theme", "dark");
}

function setLightTheme() {
  localStorage.setItem("theme", "light");
  document.documentElement.setAttribute("data-theme", "light");
}

```

You could also use session storage rather than local storage, if you think users are more likely to want the theme to match their system preferences than the last theme they selected on the site, which is shown in the aforementioned guide.

##### Building the design: HTML and CSS

As mentioned, the logic described above can be adapted to any design. For the switch design, I took inspiration from this [LetsBuildUI article](https://www.letsbuildui.dev/articles/building-a-dark-mode-theme-toggle/), again, with several adjustments to improve the accessibility of the switch.
