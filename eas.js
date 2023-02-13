const mainContainer = document.querySelector('.main-container');

const button = document.createElement('button');

const body = document.querySelector('body');

body.insertBefore(button, mainContainer);

button.textContent = "Enter the number of squares";

button.addEventListener('click', reDraw);



let boxes = 16;

function promptMe() {
  boxes = prompt("Enter the number of sides: ");
  return boxes;
}

button.setAttribute('style', 'margin: 10px auto; padding: 5px;');


const input = 16;

let grid = boxes ** 2;

function drawGrid(grid) {
  for (let i = 0; i < grid; i++) {
    let divs = mainContainer.appendChild(document.createElement('div'));
    divs.classList.add('group256');
    divs.setAttribute('id', `n:${i}`);
    divs.setAttribute('style', 'margin: 2px; background-color:violet;')
    divs.style.height = `${attHeight}px`;
    divs.style.width = `${attWidth}px`
  };
}

function removeGrid() {
  let grid = (document.querySelectorAll(".group256")).length;
  alert(grid);
  for (let i = 0; i < grid; i++) {
    mainContainer.removeChild(document.querySelector(".group256"));
  }
}


// const divs = document.querySelectorAll('.group256');

const vHeight = window.innerHeight;
const vWidth = window.innerWidth;

const attHeight = (vHeight - (input * 4)) / input;
const attWidth = (vWidth - (input * 4)) / input;




// divs.forEach(div => {
//   div.addEventListener('mouseover', () => {
//     div.style.backgroundColor = "yellow";
//   })
// });


drawGrid(grid);

function reDraw(grid) {
  promptMe();
  removeGrid();
  grid = boxes ** 2;
  drawGrid(grid);
}
