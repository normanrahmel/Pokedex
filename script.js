let pokemonJSON;


function init() {
    renderPokedex();
}


async function renderPokedex() {
    let url = `https://pokeapi.co/api/v2/pokemon?offset=0&limit=20`;
    let response = await fetch(url);
    pokemonJSON = await response.json();

    console.log('Zeig mir meine Datenstruktur', pokemonJSON);

    getSinglePokemonData(pokemonJSON);
}


async function getSinglePokemonData(pokemonJSON) {
    for (let i = 0; i < pokemonJSON.results.length; i++) {

        const singlePokemonURL = pokemonJSON['results'][i]['url'];
        const response = await fetch(singlePokemonURL);
        const singlePokemonJSON = await response.json();
        renderPokemonListCard(i, singlePokemonJSON);
    }
}


function renderPokemonListCard(i, singlePokemonJSON) {
    const pokemonName = singlePokemonJSON['forms'][0]['name'];
    const pokemonImage = singlePokemonJSON['sprites']['other']['dream_world']['front_default'];
    const pokemonType = singlePokemonJSON['types'][0]['type']['name'];

    const pokemonAbility = singlePokemonJSON['abilities'][0]['ability']['name'];
    const pokemonHeight = singlePokemonJSON['height'];
    const pokemonWeight = singlePokemonJSON['weight'];

    pushSinglePokemonDetails(pokemonName, pokemonImage, pokemonType, pokemonAbility, pokemonHeight, pokemonWeight);

    renderPokemonListCardHTML(i, pokemonName, pokemonImage, pokemonType);
}


function pushSinglePokemonDetails(pokemonName, pokemonImage, pokemonType, pokemonAbility, pokemonHeight, pokemonWeight) {
    const pokemon = {
        'name': pokemonName,
        'img': pokemonImage,
        'type': pokemonType,
        'ability': pokemonAbility,
        'height': pokemonHeight,
        'weight': pokemonWeight
    }
}


function renderPokemonListCardHTML(i, pokemonName, pokemonImage, pokemonType) {

    document.getElementById('listPokemonCards').innerHTML += /*html*/ `
    
        <div class="col-12 col-sm-6 col-md-4" onclick="openDetailView(${i})">
            <div class="card mb-4 list__card shadow-sm hvr-float-shadow">
                <img id="listPokemonImage" class="list__pokemon__image"  src="${pokemonImage}" alt="${pokemonName}">
                <div class="card-body">
                    <h5 id="listPokemonName" class="card-title">${pokemonName}</h5>
                    <span id="listPokemonFeature" class="card__text card__text__bg__${pokemonType}">${pokemonType}</span>
                </div>
            </div>
        </div>
        `;
}