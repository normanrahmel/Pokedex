let loadedPokemons = [];


async function init() {
    let url = `https://pokeapi.co/api/v2/pokemon?offset=0&limit=20`;
    let response = await fetch(url);
    let pokemonList = await response.json();

    console.log('Zeig mir meine Datenstruktur', pokemonList);

    getAndRenderPokemonFromList(pokemonList);
}


async function getAndRenderPokemonFromList(pokemonList) {

    for (let i = 0; i < pokemonList.results.length; i++) {
        const pokemon = await getPokemonByUrl(pokemonList['results'][i]['url']);
        loadedPokemons.push(pokemon);
        renderPokemon(pokemon);
    }
}


function renderPokemon(pokemon) {

    const pokemonName = pokemon['forms'][0]['name'];
    const pokemonImage = pokemon['sprites']['other']['dream_world']['front_default'];
    const pokemonType = pokemon['types'][0]['type']['name'];

    document.getElementById('listPokemonCards').innerHTML += /*html*/ `
    
    <div class="pokemonCards" onclick="openDetailView(${pokemon.id})">
        <div>
            <img id="listPokemonImage" class="listPokemonImage"  src="${pokemonImage}">
                <h3 id="listPokemonName">${pokemonName}</h3>
                <span id="listPokemonFeature" class="${pokemonType}">${pokemonType}</span>
        </div>
    </div>
    `;
}


async function getPokemonByUrl(pokemonUrl) {
    const response = await fetch(pokemonUrl);
    const singlePokemonJSON = await response.json();
    return singlePokemonJSON;
}


function openDetailView(pokemonId) {
    document.getElementById('containerDetailView').classList.add('detailView');
    containerDetailView.innerHTML = templateOpenDetailViewHTML(pokemonId);
}


function closeDetailView() {
    document.getElementById('containerDetailView').classList.remove('detailView');
    containerDetailView.innerHTML = '';
}


function templateOpenDetailViewHTML(pokemonId) {

    const pokemon = loadedPokemons.find(p => p.id == pokemonId)

    const pokemonName = pokemon['forms'][0]['name'];
    const pokemonImage = pokemon['sprites']['other']['dream_world']['front_default'];
    const pokemonType = pokemon['types'][0]['type']['name'];

    const pokemonAbility = pokemon['abilities'][0]['ability']['name'];
    const pokemonHeight = pokemon['height'];
    const pokemonWeight = pokemon['weight'];

    return /*html*/ ` 

<div class="detailView">
    <div class="containerContentDetailView ${pokemonType}">

        <div class="detailButton" >
            <button onclick="closeDetailView()" class="btn">close</button>
        </div>

        <div class="detailName">
        <h2>
            ${pokemonName}
        </h2>
        </div>

        <div class="detailImg">
            <img src="${pokemonImage}">
        </div>

        <div class="attribute">
            <p>Ability: <span id="detailAbility">${pokemonAbility}</span></p>
            <p>Height: <span id="detailHeight">${pokemonHeight}</span></p>
            <p>Weight: <span id="detailWeight">${pokemonWeight}</span></p>
        </div>
    </div>
</div>
    `;
}