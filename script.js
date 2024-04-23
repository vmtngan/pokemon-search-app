'use strict';

const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const pokemonName = document.getElementById('pokemon-name');
const pokemonID = document.getElementById('pokemon-id');
const weight = document.getElementById('weight');
const height = document.getElementById('height');
const spriteContainer = document.getElementById('sprite-container');
const types = document.getElementById('types');
const hp = document.getElementById('hp');
const attack = document.getElementById('attack');
const defense = document.getElementById('defense');
const specialAttack = document.getElementById('special-attack');
const specialDefense = document.getElementById('special-defense');
const speed = document.getElementById('speed');

const resetUI = () => {
  pokemonName.textContent = '';
  pokemonID.textContent = '';
  weight.textContent = '';
  height.textContent = '';
  spriteContainer.innerHTML = '';
  types.innerHTML = '';
  hp.textContent = '';
  attack.textContent = '';
  defense.textContent = '';
  specialAttack.textContent = '';
  specialDefense.textContent = '';
  speed.textContent = '';
};

const updateUI = (data) => {
  pokemonName.textContent = data.name.toUpperCase();
  pokemonID.textContent = `#${data.id}`;
  weight.textContent = `Weight: ${data.weight}`;
  height.textContent = `Height: ${data.height}`;
  spriteContainer.innerHTML = `
    <img
      id="sprite"
      src="${data.sprites.front_default}"
      alt="${data.name} front default sprite"
    />
    `;
  types.innerHTML = data.types
    .map((obj) => `<span class="type ${obj.type.name}">${obj.type.name}</span>`)
    .join('');
  hp.textContent = data.stats[0].base_stat;
  attack.textContent = data.stats[1].base_stat;
  defense.textContent = data.stats[2].base_stat;
  specialAttack.textContent = data.stats[3].base_stat;
  specialDefense.textContent = data.stats[4].base_stat;
  speed.textContent = data.stats[5].base_stat;
};

const getPokemon = async () => {
  try {
    const pokemonNameOrID = searchInput.value.toLowerCase();
    const response = await fetch(
      `https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${pokemonNameOrID}`
    );
    const data = await response.json();
    updateUI(data);
  } catch (err) {
    alert('Pokémon not found');
    resetUI();
  }
};

searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  getPokemon();
});
