const URL_BASE = 'https://swapi.dev/api';
const URL_PEOPLE = URL_BASE + '/people/';
let datos; 
let cardContainer1, cardContainer2, cardContainer3;
let gen1, gen2, gen3;
let btnReveal1, btnReveal2, btnReveal3;
let notGo = false;


function* cardGeneratorRange(datos, container, start, end, color) {
  const characterToShow = datos.slice(start, end);

  for (const character of characterToShow) {
    yield character.name;
    container.innerHTML += `
    <div class="col-6 col-md-4">
      <div class="card">
      <div class="card-container">
            <div class="card-icon">
            <i class="fa-solid fa-circle fa-2xl" style="color: #${color};"></i> 
            </div>
          <div class="card-body">
            <h5 class="card-title">${character.name}</h5>
            <p class="card-text"><strong>Estatura:</strong> ${character.height} cm | <strong>Peso:</strong> ${character.mass} kg</p>
          </div>
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
    <div class="col-6 col-md-4">
      <div class="card">
        <div class="card-container">
            <div class="card-icon">
            <i class="fa-solid fa-circle fa-2xl" style="color: #fa8072;"></i> 
            </div>
          <div class="card-body">
            <h5 class="card-title">En esta sección...</h5>
            <p class="card-text">Encontrarás información sobre los personajes más populares de las películas.</p>
          </div>
        </div>
      </div>
    </div>
  `;

  cardContainer2 = document.querySelector('.cardContainer2');
  cardContainer2.innerHTML = `
    <div class="col-6 col-md-4">
      <div class="card">
      <div class="card-container">
            <div class="card-icon">
            <i class="fa-solid fa-circle fa-2xl" style="color: #90ee90;"></i> 
            </div>
        <div class="card-body">
          <h5 class="card-title">En esta sección...</h5>
          <p class="card-text">Encontrarás información sobre personajes secundarios importantes.</p>
        </div>
        </div>
      </div>
    </div>
  `;

  cardContainer3 = document.querySelector('.cardContainer3');
  cardContainer3.innerHTML = `
    <div class="col-6 col-md-4">
      <div class="card">
      <div class="card-container">
         <div class="card-icon">
            <i class="fa-solid fa-circle fa-2xl" style="color: #87cefa;"></i> 
          </div>
        <div class="card-body">
          <h5 class="card-title">En esta sección...</h5>
          <p class="card-text">Encontrarás otros personajes significativos.</p>
        </div>
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

  vline = document.querySelector('.v-line');

  datos = await fetchPeople();
  console.log('datos: ', datos);
  gen1 = cardGeneratorRange(datos, cardContainer1, 0, 5, 'fa8072');
  gen2 = cardGeneratorRange(datos, cardContainer2, 5, 10, '90ee90');
  gen3 = cardGeneratorRange(datos, cardContainer3, 10, 15, '87cefa');

  btnReveal1.style.display = 'inline';
  btnReveal2.style.display = 'inline';
  btnReveal3.style.display = 'inline';

  vline.style.display = 'inline';

  gen1.next();
  gen2.next();
  gen3.next();

});


const fetchPeople = async () => {
  try {
    const promises = [];

    for (let id = 1; id <= 15; id++) {
      const url = URL_PEOPLE + id;
      promises.push(fetch(url).then(response => response.json()));
    }

    const characters = await Promise.all(promises);
    return characters;
  } catch (error) {
    console.error('Error al obtener los datos:', error);
    throw error;
  }
};