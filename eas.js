const mainContainer = document.querySelector('.main-container');

const button = document.createElement('button');

const body = document.querySelector('body');

body.insertBefore(button, mainContainer);

button.textContent = "Enter the number of squares";

button.setAttribute('style', 'margin: 10px auto; padding: 8px; border-radius: 10px; background-color: #f7e2dd;');

const steps = 10;

// First round values values
let boxes = 16;
let grid = boxes ** 2;
const vHeight = (window.innerHeight) - 46; //46 is the top and bottom space required by the button.

const vWidth = window.innerWidth;
let boxHeight = (vHeight - (boxes * 4)) / boxes;
let boxWidth = (vWidth - (boxes * 4)) / boxes;

// First round of drawing
drawGrid(grid, boxHeight, boxWidth);


button.addEventListener('click', reDraw);


function promptMe() {
  do {
    boxes = prompt("Enter the number of boxes between 2 and 100 on each side: ");

    // Check for String input
    if (Number.isNaN(+boxes)) {
      alert("Input was not a number. Setting number of boxes to default: 16");
      boxes = 16;

      // check for no input
    } else if (!boxes) {
      alert("No input. Setting number of boxes to default: 16");
      boxes = 16;
    }

    // check for input within range
  } while (boxes > 100 || boxes < 2);
  return boxes;
}

function drawGrid(grid, boxHeight, boxWidth) {
  // initialising all values for the divs.
  for (let i = 0; i < grid; i++) {
    let div = mainContainer.appendChild(document.createElement('div'));
    div.classList.add('boxGroup');
    // Setting ID isn't required but done for experimental purposes.
    div.setAttribute('id', `n:${i}`);
    div.setAttribute('style', 'margin: 2px; background-color: rgb(255,255,255);')
    div.dataset.redFactor = 0;
    div.dataset.greenFactor = 0;
    div.dataset.blueFactor = 0;
    div.style.height = `${boxHeight}px`;
    div.style.width = `${boxWidth}px`
  };

  const divs = document.querySelectorAll('.boxGroup');

  // Decide whether to colour (if white) or shade a div (if already coloured).
  divs.forEach(div => {
    div.addEventListener('mouseover', (e) => {
      if (e.target.style.backgroundColor === "rgb(255, 255, 255)") {
        div.style.backgroundColor = colorGenerator();
      } else {
        shader(e.target.style.backgroundColor, div);
      }
    })
  });
}

function removeGrid() {
  // Get the total number of divs to be removed.
  let grid = (document.querySelectorAll(".boxGroup")).length;
  for (let i = 0; i < grid; i++) {
    mainContainer.removeChild(document.querySelector(".boxGroup"));
  }
}

function reDraw() {
  promptMe();
  removeGrid();
  grid = boxes ** 2;
  let boxHeight = (vHeight - (boxes * 4)) / boxes;
  let boxWidth = (vWidth - (boxes * 4)) / boxes;
  drawGrid(grid, boxHeight, boxWidth);
}

function colorGenerator() {
  let color = "#";
  // Convert output of random to hexadecimal and take 6 characters after the 0. .
  color += Math.random().toString(16).slice(2, 8);
  return color;
}


function shader(currentColor, div) {
  let rgbString = currentColor.slice(4, -1);
  let rgbArray = rgbString.split(',');
  let red = rgbArray[0];
  let green = rgbArray[1];
  let blue = rgbArray[2];

  if (div.dataset.redFactor == 0 && div.dataset.greenFactor == 0 && div.dataset.blueFactor == 0) {
    setFactor(red, green, blue, div);
  }

  currentColor = newColor(red, green, blue, div);
  div.style.backgroundColor = `rgb(${currentColor})`;
}

// since we need to darken a colour by 10%, the factor is value/10.
// if colour is already black, then darkening factor should be 0.
function setFactor(r, g, b, div) {
  div.dataset.redFactor = (r !== 0) ? Math.ceil(r / steps) : 0;
  div.dataset.greenFactor = (g !== 0) ? Math.ceil(g / steps) : 0;
  div.dataset.blueFactor = (b !== 0) ? Math.ceil(b / steps) : 0;
}

// subtract the SAME factor from the shaded colour every time. Thus achieving rgb( 0, 0, 0) in 10 
function newColor(r, g, b, div) {
  let newRed = r - (div.dataset.redFactor);
  let newGreen = g - (div.dataset.greenFactor);
  let newBlue = b - (div.dataset.blueFactor);

  return [newRed, newGreen, newBlue];
}