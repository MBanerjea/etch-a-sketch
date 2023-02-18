const mainContainer = document.querySelector('.main-container');

const button = document.createElement('button');

const body = document.querySelector('body');

body.insertBefore(button, mainContainer);

button.textContent = "Enter the number of squares";

button.setAttribute('style', 'margin: 10px auto; padding: 8px; border-radius: 10px; background-color: #f7e2dd;');


button.addEventListener('click', reDraw);



let boxes = 16;
let grid = boxes ** 2;
const vHeight = (window.innerHeight) - 46;
const vWidth = window.innerWidth;

let attHeight = (vHeight - (boxes * 4)) / boxes;
let attWidth = (vWidth - (boxes * 4)) / boxes;

drawGrid(grid, attHeight, attWidth);

function promptMe() {
  do {
    boxes = prompt("Enter the number of boxes on each side: ");
  } while (boxes > 100 || boxes < 1);
  return boxes;
}

function drawGrid(grid, attHeight, attWidth) {
  for (let i = 0; i < grid; i++) {
    let div = mainContainer.appendChild(document.createElement('div'));
    div.classList.add('group256');
    div.setAttribute('id', `n:${i}`);
    div.setAttribute('style', 'margin: 2px; background-color: rgb(256,256,256);')
    div.dataset.redFactor = 0;
    div.dataset.greenFactor = 0;
    div.dataset.blueFactor = 0;
    div.style.height = `${attHeight}px`;
    div.style.width = `${attWidth}px`
  };
  const divs = document.querySelectorAll('.group256');


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
  let grid = (document.querySelectorAll(".group256")).length;
  for (let i = 0; i < grid; i++) {
    mainContainer.removeChild(document.querySelector(".group256"));
  }
}

function colorGenerator() {
  let color = "#";
  color += Math.random().toString(16).slice(2, 8);
  return color;
}


function reDraw(grid) {
  promptMe();
  removeGrid();
  grid = boxes ** 2;
  let attHeight = (vHeight - (boxes * 4)) / boxes;
  let attWidth = (vWidth - (boxes * 4)) / boxes;
  drawGrid(grid, attHeight, attWidth);
}

function shader(currentColor, div) {
  let rgbString = currentColor.slice(4, -1);
  let rgbArray = rgbString.split(',');
  let red = rgbArray[0];
  let green = rgbArray[1];
  let blue = rgbArray[2];

  // alert(div.dataset.redFactor);
  // alert(typeof (div.dataset.redFactor));

  if (div.dataset.redFactor != 0) {
    currentColor = newColor(red, green, blue, div);
    div.style.backgroundColor = `rgb(${currentColor})`;
  } else {
    setFactor(red, green, blue, div);
    currentColor = newColor(red, green, blue, div);
    div.style.backgroundColor = `rgb(${currentColor})`;
  }
}


function setFactor(r, g, b, div) {
  div.dataset.redFactor = (r !== 0) ? Math.ceil(r / 10) : 0;
  div.dataset.greenFactor = (g !== 0) ? Math.ceil(g / 10) : 0;
  div.dataset.blueFactor = (b !== 0) ? Math.ceil(b / 10) : 0;
}


function newColor(r, g, b, div) {
  let newRed = r - (div.dataset.redFactor);
  let newGreen = g - (div.dataset.greenFactor);
  let newBlue = b - (div.dataset.blueFactor);

  return [newRed, newGreen, newBlue];
}