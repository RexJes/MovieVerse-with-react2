let body = document.body;
let mode = document.getElementById("mode");
let home = document.getElementById("home");

const darkLimit = 99;
let darkCounter = 0;
let darkRemainingLeft;

function darkMode() {
  if (darkRemainingLeft == 1) {
    mode.textContent = "Dark Mode habis";
    mode.style.display = "none";
    home.textContent = "Restart";
    return;
  }

  darkCounter += 1;
  darkRemainingLeft = darkLimit - darkCounter;
  mode.textContent = `Light Mode`;

  body.classList.toggle("dark");
}

function reRender() {
  global.reload();
}

// export default main;
