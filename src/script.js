import pokemonCardTpl from "./templates/pokemon-card";

const pokemonCard = document.querySelector('.js-card-container');
const input = document.querySelector('.form-control');
const btn = document.querySelector('.btn');

btn.addEventListener('click', (e) => {
    e.preventDefault();
    const number = input.value;

    fetch(`https://pokeapi.co/api/v2/pokemon/${number}`)
    .then(response => response.json())
    .then(pokemon => {
        const markup = pokemonCardTpl(pokemon)

        pokemonCard.innerHTML = markup;
    })
    .catch((err) => {
        alert('Не вдалось знайти покемона')
    })

    input.value = '';
});