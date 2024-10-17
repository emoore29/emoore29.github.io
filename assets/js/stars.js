// Functions to generate random numbers
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;
const randomNum = (min, max) => Math.random() * (max - min) + min;
function biasedRandomInt(min, max) {
  // Generate a random number between 0 and 1
  let random = Math.random();
  // Bias towards left (0-25%) and right (75-100%)
  if (random < 0.4) {
    // 40% chance to pick a value between 1% and 25% (left side)
    return randomInt(min, max * 0.25);
  } else if (random > 0.6) {
    // 40% chance to pick a value between 75% and 100% (right side)
    return randomInt(max * 0.75, max);
  } else {
    return randomInt(min, max);
  }
}

// Function that creates and appends a star
function createStar() {
  const star = document.createElement("span");
  star.classList.add("star");
  star.innerHTML = `
            <svg viewBox="0 0 11 11" width="auto" height="100%" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
              <path d="M10.744,5.372C7.777,5.372,5.372,2.967,5.372,0c0,2.967-2.405,5.372-5.372,5.372c2.967,0,5.372,2.405,5.372,5.372
              C5.372,7.777,7.777,5.372,10.744,5.372z"/>
            </svg>`;
  // Set random position, scale, and opacity
  star.style.left = biasedRandomInt(1, 100) + "%";
  star.style.top = randomInt(1, 100) + "%";
  star.style.transform = `scale(${randomNum(0.5, 1)})`;
  star.style.opacity = randomNum(0.6, 1);
  // Randomize animation duration and delay for each star
  const duration = randomInt(5, 10); // Random duration between 10-15 seconds
  const delay = randomInt(0, 5); // Random delay between 0-5 seconds
  star.style.animationDuration = duration + "s";
  star.style.animationDelay = delay + "s";
  star.style.animationName =
    "float" + randomInt(1, 3) + ", fade" + randomInt(1, 3);
  // Append the star to the body
  document.body.appendChild(star);

  console.log(star);
}

function populateStars() {
  console.log("adding stars...");
  const numStars = 10;

  for (let i = 0; i <= numStars; i++) {
    createStar();
  }
}

populateStars();
