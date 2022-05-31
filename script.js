let loadedPokemons = [];


async function init() {
    let url = `https://pokeapi.co/api/v2/pokemon?offset=0&limit=30`;
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
    const pokemonIdNumber = pokemon['id'];

    document.getElementById('listPokemonCards').innerHTML += /*html*/ `
    
    <div class="pokemonCards" onclick="openDetailView(${pokemon.id})">
        <div>
        <div class="idNumberPokemon"><h2>#${pokemonIdNumber}</h2></div>
            <img id="listPokemonImage" class="listPokemonImage"  src="${pokemonImage}">
                <h3 id="listPokemonName">${pokemonName}</h3>
                <div id="typList${pokemon.id}" style= "flex-direction: row;
    display: flex; algin-items: space-evenly;"></div>
        </div>
    </div>
    `;
    renderPokemonTypes(pokemon);
}


function renderPokemonTypes(pokemon) {
    for (let index = 0; index < pokemon.types.length; index++) {
        const pokemonType = pokemon['types'][index]['type']['name'];
        document.getElementById(`typList${pokemon.id}`).innerHTML += `<span id="listPokemonFeature" class="${pokemonType}">${pokemonType}</span>`;
    }
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
    const pokemonBaseStat = pokemon['stats'][0]['base_stat'];
    const pokemonAttack = pokemon['stats'][0]['base_stat'];
    const pokemonIdNumber = pokemon['id'];

    return /*html*/ ` 

<div class="detailView">
    <div class="containerContentDetailView ${pokemonType}">
       
        <div class="detailButtonAndIdNumber" >
            <h2>#${pokemonIdNumber}</h2>
            <button onclick="closeDetailView()" class="btn" style="color: #020506;">close</button>
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
            <p>Ability:<span>${pokemonAbility}</span></p>
            <p>Height:<span>${pokemonHeight}</span></p>
            <p>Weight:<span>${pokemonWeight}</span></p>
            <p>Base-State:<span>${pokemonBaseStat}</span> </p>
            <p>Attack:<span>${pokemonAttack}</span> </p>
        </div>
    </div>
</div>
    `;
}


// SEARCH POKEMON

function searchForPokemonsByName() {

    let search = document.getElementById('filterPokemon').value;
    const filteredPokemons = loadedPokemons.filter(p => p.name.includes(search));
    console.log(filteredPokemons);
    renderPokemons(filteredPokemons);
}

function renderPokemons(pokemons) {
    document.getElementById('listPokemonCards').innerHTML = '';
    for (let j = 0; j < pokemons.length; j++) {
        renderPokemon(pokemons[j])

    }
}