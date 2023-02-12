const mainContainer = document.querySelector('.main-container');

const input = 16;

const grid = input ** 2;

for (let i = 0; i < grid; i++) {
  let divs = mainContainer.appendChild(document.createElement('div'));
  divs.classList.add('group256');
  divs.setAttribute('id', `n:${i}`);
}

const divs = document.querySelectorAll('.group256');

const vHeight = window.innerHeight;
const vWidth = window.innerWidth;

const attHeight = (vHeight - (input * 4)) / input;
const attWidth = (vWidth - (input * 4)) / input;

divs.forEach(div => {
  div.setAttribute('style', 'margin: 2px; background-color:violet;')
  div.style.height = `${attHeight}px`;
  div.style.width = `${attWidth}px`
});


divs.forEach(div => {
  div.addEventListener('mouseover', () => {
    div.style.backgroundColor = "yellow";
  })
});
