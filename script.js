// Función para obtener datos de la PokéAPI
async function fetchPokemons() {
    try {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
      const data = await response.json();
      return data.results;
    } catch (error) {
      console.error('Error al obtener datos de Pokémon:', error);
    }
  }
  
  // Función para mostrar los Pokémon en la página
  async function displayPokemons() {
    const pokemons = await fetchPokemons();
    const container = document.getElementById('pokemonContainer');
    container.innerHTML = '';
  
    // Recorrer la lista de Pokémon con forEach
    pokemons.forEach(async (pokemon) => {
      // Obtener información detallada del Pokémon
      const response = await fetch(pokemon.url);
      const data = await response.json();
  
      const pokemonCard = document.createElement('div');
      pokemonCard.classList.add('pokemon-card');
  
      const pokemonImage = document.createElement('img');
      pokemonImage.classList.add('pokemon-image');
      pokemonImage.src = data.sprites.front_default; // Utilizar la URL correcta de la imagen
  
      const pokemonName = document.createElement('p');
      pokemonName.textContent = pokemon.name;
  
      pokemonCard.appendChild(pokemonImage);
      pokemonCard.appendChild(pokemonName);
      container.appendChild(pokemonCard);
    });
  }
  
  displayPokemons();
  
  document.getElementById('searchInput').addEventListener('input', function () {
    const searchQuery = this.value.toLowerCase();
    fetchPokemons().then(pokemons => {
      //filter
      const filteredPokemons = pokemons.filter(pokemon => pokemon.name.includes(searchQuery));
      displayFilteredPokemons(filteredPokemons);
    });
  });
  
  function displayFilteredPokemons(pokemons) {
    const container = document.getElementById('pokemonContainer');
    container.innerHTML = '';
  
    
    pokemons.forEach(async (pokemon) => {
      
      const response = await fetch(pokemon.url);
      const data = await response.json();
  
      const pokemonCard = document.createElement('div');
      pokemonCard.classList.add('pokemon-card');
  
      const pokemonImage = document.createElement('img');
      pokemonImage.classList.add('pokemon-image');
      pokemonImage.src = data.sprites.front_default; // Utilizar la URL correcta de la imagen
  
      const pokemonName = document.createElement('p');
      pokemonName.textContent = pokemon.name;
  
      pokemonCard.appendChild(pokemonImage);
      pokemonCard.appendChild(pokemonName);
      container.appendChild(pokemonCard);
    });
  }
  
  // find 
  function findPokemon(pokemonName) {
    fetchPokemons().then(pokemons => {
      const foundPokemon = pokemons.find(pokemon => pokemon.name.toLowerCase() === pokemonName.toLowerCase());
      if (foundPokemon) {
        console.log('¡Pokémon encontrado!');
        console.log(foundPokemon);
      } else {
        console.log('Pokémon no encontrado.');
      }
    });
  }
  
  // some 
  function hasPokemonType(type) {
    fetchPokemons().then(pokemons => {
      const hasType = pokemons.some(pokemon => pokemon.types.some(p => p.type.name === type.toLowerCase()));
      if (hasType) {
        console.log(`Existe al menos un Pokémon del tipo ${type}.`);
      } else {
        console.log(`No hay Pokémon del tipo ${type}.`);
      }
    });
  }
  
  // sort 
  function sortPokemonsAlphabetically() {
    fetchPokemons().then(pokemons => {
      const sortedPokemons = pokemons.sort((a, b) => a.name.localeCompare(b.name));
      console.log('Pokémon ordenados alfabéticamente:');
      console.log(sortedPokemons);
    });
  }
  
  // map 
  function getPokemonNames() {
    fetchPokemons().then(pokemons => {
      const pokemonNames = pokemons.map(pokemon => pokemon.name);
      console.log('Nombres de Pokémon:');
      console.log(pokemonNames);
    });
  }
  
 
  findPokemon('bulbasaur');
  hasPokemonType('fire');
  sortPokemonsAlphabetically();
  getPokemonNames();
  
