const mainContainer = document.querySelector('.main-container');

const button = document.createElement('button');

const body = document.querySelector('body');

body.insertBefore(button, mainContainer);

button.textContent = "Enter the number of squares";

button.addEventListener('click', reDraw);

button.setAttribute('style', 'margin: 10px auto; padding: 5px;');


let boxes = 16;
let grid = boxes ** 2;
const vHeight = window.innerHeight;
const vWidth = window.innerWidth;

let attHeight = (vHeight - (boxes * 4)) / boxes;
let attWidth = (vWidth - (boxes * 4)) / boxes;

drawGrid(grid, attHeight, attWidth);

function promptMe() {
  do {
    boxes = prompt("Enter the number of sides: ");
  } while (boxes > 100 || boxes < 1);
  return boxes;
}

function drawGrid(grid, attHeight, attWidth) {
  for (let i = 0; i < grid; i++) {
    let divs = mainContainer.appendChild(document.createElement('div'));
    divs.classList.add('group256');
    divs.setAttribute('id', `n:${i}`);
    divs.setAttribute('style', 'margin: 2px; background-color:violet;')
    divs.style.height = `${attHeight}px`;
    divs.style.width = `${attWidth}px`
  };
  const divs = document.querySelectorAll('.group256');

  divs.forEach(div => {
    div.addEventListener('mouseover', () => {
      div.style.backgroundColor = "yellow";
    })
  });
}

function removeGrid() {
  let grid = (document.querySelectorAll(".group256")).length;
  alert(grid);
  for (let i = 0; i < grid; i++) {
    mainContainer.removeChild(document.querySelector(".group256"));
  }
}


function reDraw(grid) {
  promptMe();
  removeGrid();
  grid = boxes ** 2;
  let attHeight = (vHeight - (boxes * 4)) / boxes;
  let attWidth = (vWidth - (boxes * 4)) / boxes;
  drawGrid(grid, attHeight, attWidth);
}
