document.getElementById('search-button').addEventListener('click', () => {
    const query = document.getElementById('search-input').value.trim().toLowerCase();
    if (!query) {
      alert('Please enter a Pokémon name or ID');
      return;
    }
  
    fetch(`https://pokeapi.co/api/v2/pokemon/${query}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Pokémon not found');
        }
        return response.json();
      })
      .then(data => {
        displayPokemonData(data);
      })
      .catch(error => {
        alert('Pokémon not found');
      });
  });
  
  function displayPokemonData(data) {
    document.getElementById('pokemon-name').textContent = data.name.toUpperCase();
    document.getElementById('pokemon-id').textContent = `#${data.id}`;
    document.getElementById('weight').textContent = `Weight: ${data.weight}`;
    document.getElementById('height').textContent = `Height: ${data.height}`;
  
    const typesDiv = document.getElementById('types');
    typesDiv.innerHTML = '';
    data.types.forEach(type => {
      const typeSpan = document.createElement('span');
      typeSpan.textContent = type.type.name.toUpperCase();
      typesDiv.appendChild(typeSpan);
    });
  
    document.getElementById('hp').textContent = data.stats[0].base_stat;
    document.getElementById('attack').textContent = data.stats[1].base_stat;
    document.getElementById('defense').textContent = data.stats[2].base_stat;
    document.getElementById('special-attack').textContent = data.stats[3].base_stat;
    document.getElementById('special-defense').textContent = data.stats[4].base_stat;
    document.getElementById('speed').textContent = data.stats[5].base_stat;
  
    let sprite = document.getElementById('sprite');
    if (!sprite) {
      sprite = document.createElement('img');
      sprite.id = 'sprite';
      document.querySelector('.pokemon-info').insertBefore(sprite, document.getElementById('pokemon-id'));
    }
    sprite.src = data.sprites.front_default;
    sprite.alt = data.name;
  }
  