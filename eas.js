const mainContainer = document.querySelector('.main-container');

for (let i = 0; i < 16; i++) {
  let divs = mainContainer.appendChild(document.createElement('div'));
  divs.classList.add('group16');
  divs.setAttribute('id', `n:${i}`);
}

const divs = document.querySelectorAll('.group16');

divs.forEach(div => {
  div.setAttribute('style', 'height:10px; width: 10px; background-color:violet;')
});