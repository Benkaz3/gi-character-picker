import { characters } from './data'

const filter = document.querySelector('.filter');
const characterList = document.querySelector('#character-list');

var labels = document.querySelectorAll('.label');

labels.forEach(function(label) {
  label.addEventListener('click', function() {
    label.classList.toggle('active');
    // Filter content based on active labels
  });
});

function renderCharacters(characters) {
  let html = '';
  characters.forEach(character => {
    html += `
        <div class="character card" 
        data-element="${character.element}" 
        data-rarity="${character.rarity}">
            <div class="card2">
                <div class="inner-card">
                    <img src="${character.image}" alt="${character.name}">
                    <h2>${character.name}</h2>
                    <p>Element: ${character.element}</p>
                    <p>Weapon: ${character.weapon}</p>
                    <p>Rarity: ${character.rarity}</p>
                </div>
            </div>
        </div>
        `;
  });
  characterList.innerHTML = html;
}

function applyFilters(characters) {
  const activeElementFilters = Array.from(filter.querySelectorAll('[data-element].active'))
    .map(label => label.dataset.element);
  const activeRarityFilters = Array.from(filter.querySelectorAll('[data-rarity].active'))
    .map(label => parseInt(label.dataset.rarity));
  if (activeElementFilters.length === 0 && activeRarityFilters.length === 0) {
    return characters;
  } else {
    return characters.filter(character => {
      const matchElement = activeElementFilters.length === 0 || activeElementFilters.includes(character.element);
      const matchRarity = activeRarityFilters.length === 0 || activeRarityFilters.includes(character.rarity);
      return matchElement && matchRarity;
    });
  }
}

function updateCharacterList() {
const filteredCharacters = applyFilters(characters);
renderCharacters(filteredCharacters);
}

filter.addEventListener('click', updateCharacterList);

// Initial render
updateCharacterList();