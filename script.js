let pokemonJSON;

function init() {
    renderPokedex();
}

async function renderPokedex() {
    let url = `https://pokeapi.co/api/v2/pokemon?offset=0&limit=20`;
    let response = await fetch(url);
    pokemonJSON = await response.json();

    console.log('loaded Pokemon', pokemonJSON);

    getSinglePokemonData(pokemonJSON);
    renderPokemonInfo(pokemonJSON);
}


function renderPokemonInfo(pokemonJSON) {
    document.getElementById('pokemonName').innerHTML = pokemonJSON['forms'][0]['name'];
    document.getElementById('pokemonImg').src = pokemonJSON['sprites']['other']['dream_world']['front_default'];

}

async function getSinglePokemonData(pokemonJSON) {
    for (let i = 0; i < pokemonJSON.results.length; i++) {

        const singlePokemonURL = pokemonJSON['results'][i]['url'];
        const response = await fetch(singlePokemonURL);
        const singlePokemonJSON = await response.json();
    }
}


function renderPokemonListCard(i, singlePokemonJSON) {
    const pokemonName = singlePokemonJSON['forms'][0]['name'];
    const pokemonImage = singlePokemonJSON['sprites']['other']['dream_world']['front_default'];
    const pokemonType = singlePokemonJSON['types'][0]['type']['name'];

    const pokemonAbility = singlePokemonJSON['abilities'][0]['ability']['name'];
    const pokemonHeight = singlePokemonJSON['height'];
    const pokemonWeight = singlePokemonJSON['weight'];
}