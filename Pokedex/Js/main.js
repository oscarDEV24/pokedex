const  typeColors = {
    normal: '#A8A77A',
    fire: '#EE8130',
    water: '#6390F0',
    electric: '#F7D02C',
    grass: '#7AC74C',
    ice: '#96D9D6',
    fighting: '#C22E28',
    poison: '#A33EA1',
    ground: '#E2BF65',
    flying: '#A98FF3',
    psychic: '#F95587',
    bug: '#A6B91A',
    rock: '#B6A136',
    ghost: '#735797',
    dragon: '#6F35FC',
    dark: '#705746',
    steel: '#B7B7CE',
    fairy: '#D685AD'
}


const container = document.getElementById('pokemon-container');

const fetchPokemon = async (id) => {
    const response = await fetch (`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await response.json();
    createCard(data);
};

const fetchPokemons = async (start, count) => {
  for (let i = start; i < start + count; i++) {
    await fetchPokemon(i);
  }
};

const createCard = (pokemon) => {
    const card = document.createElement('div');
    card.classList.add('pokemon-card');

    const mainType = 
    pokemon.types[0].type.name;
    const color = typeColors[mainType];
    card.style.backgroundColor = color;
    card.style.color = 'white';

    card.innerHTML = `
    <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
    <h3>#${pokemon.id} ${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h3>
    <p>Tipo: ${pokemon.types.map(t => t.type.name).join(', ')}</p>
  `;

  container.appendChild(card);
};

let currentIndex = 1;
const loadCount = 20;

fetchPokemons(currentIndex, loadCount);

document.getElementById('load-more').addEventListener('click', () => {
  currentIndex += loadCount;
  fetchPokemons(currentIndex, loadCount);
});


document.getElementById('search').addEventListener('input', (e) => {
  const query = e.target.value.toLowerCase();
  const cards = document.querySelectorAll('.pokemon-card');
  
  cards.forEach(card => {
    const name = card.querySelector('h3').textContent.toLowerCase();
    if (name.includes(query)) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
});

const typeSelect = document.getElementById('type-filter');

for (const type in typeColors) {
  const option = document.createElement('option');
  option.value = type;
  option.textContent = type.charAt(0).toUpperCase() + type.slice(1);
  typeSelect.appendChild(option);
}

typeSelect.addEventListener('change', () => {
  const selected = typeSelect.value;
  const cards = document.querySelectorAll('.pokemon-card');

  cards.forEach(card => {
    const typeText = card.querySelector('p').textContent.toLowerCase();
    if (selected === 'all' || typeText.includes(selected)) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
});