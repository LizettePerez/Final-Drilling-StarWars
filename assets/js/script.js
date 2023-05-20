const URL_BASE = 'https://swapi.dev/api';
const URL_PEOPLE = URL_BASE + '/people/';
let datos; 
let cardContainer1, cardContainer2, cardContainer3;
let gen1, gen2, gen3;
let btnReveal1, btnReveal2, btnReveal3;
let notGo = false;


function* cardGeneratorRange(datos, container, start, end) {
  const characterToShow = datos.slice(start, end);

  for (const character of characterToShow) {
    yield character.name;
    container.innerHTML += `
    <div class="col-md-2">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">${character.name}</h5>
          <p class="card-text"><strong>Gender:</strong> ${character.gender.charAt(0).toUpperCase() + character.gender.slice(1)}</p>
          <p class="card-text"><strong>Hair Color:</strong> ${character.hair_color.charAt(0).toUpperCase() + character.hair_color.slice(1)}</p>
          <p class="card-text"><strong>Height:</strong> ${character.height} cm</p>
          <p class="card-text"><strong>Weight:</strong> ${character.mass} kg</p>  
        </div>
      </div>
    </div>
    `;
  }
}


const revealCharacter = (event, generator) => {
  event.preventDefault();
  notGo = false; // Reiniciar la variable notGo

  if (!notGo) {
    const { value, done } = generator.next();
    console.log('value:', value);
    console.log('done:', done);
    notGo = done;
  } else {
    datos = undefined;
  }
};

document.addEventListener('DOMContentLoaded', async () => {
  cardContainer1 = document.querySelector('.cardContainer1');
  cardContainer1.innerHTML = `
    <div class="col-md-2">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Section 1</h5>
          <p class="card-text">You will find information about the most popular characters in the movies.</p>
        </div>
      </div>
    </div>
  `;

  cardContainer2 = document.querySelector('.cardContainer2');
  cardContainer2.innerHTML = `
    <div class="col-md-2">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Section 2</h5>
          <p class="card-text">You will find information about important secondary characters.</p>
        </div>
      </div>
    </div>
  `;

  cardContainer3 = document.querySelector('.cardContainer3');
  cardContainer3.innerHTML = `
    <div class="col-md-2">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Section 3</h5>
          <p class="card-text">You will find other significant characters.</p>
        </div>
      </div>
    </div>
  `;

  btnReveal1 = document.querySelector('#btnReveal1');
  btnReveal1.addEventListener('mouseover', (event) => revealCharacter(event, gen1));

  btnReveal2 = document.querySelector('#btnReveal2');
  btnReveal2.addEventListener('mouseover', (event) => revealCharacter(event, gen2));

  btnReveal3 = document.querySelector('#btnReveal3');
  btnReveal3.addEventListener('mouseover', (event) => revealCharacter(event, gen3));


  datos = await fetchPeople();
  console.log('datos: ', datos);
  gen1 = cardGeneratorRange(datos, cardContainer1, 0, 5);
  gen2 = cardGeneratorRange(datos, cardContainer2, 5, 10);
  gen3 = cardGeneratorRange(datos, cardContainer3, 10, 15);

  btnReveal1.style.display = 'inline';
  btnReveal2.style.display = 'inline';
  btnReveal3.style.display = 'inline';

  gen1.next();
  gen2.next();
  gen3.next();

});


const fetchPeople = async () => {
  let characters = [];

  for (let id = 1; id <= 15; id++) {
    const url = URL_PEOPLE + id;
    const response = await fetch(url);
    const character = await response.json();
    characters.push(character);
  }

  return characters;
};