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
    
        <div class="pokemonCards" onclick="openDetailView(${i})">
            <div>
                <img id="listPokemonImage" class="listPokemonImage"  src="${pokemonImage}">
                    <h3 id="listPokemonName">${pokemonName}</h3>
                    <span id="listPokemonFeature" class="${pokemonType}">${pokemonType}</span>
            </div>
        </div>
        `;
}


function openDetailView(pokemonName, pokemonImage, pokemonType, pokemonAbility, pokemonHeight, pokemonWeight) {
    document.getElementById('containerDetailView').classList.add('detailView');
    containerDetailView.innerHTML = templateOpenDetailViewHTML(pokemonName, pokemonImage, pokemonType, pokemonAbility, pokemonHeight, pokemonWeight);
}


function closeDetailView() {
    document.getElementById('containerDetailView').classList.remove('detailView');
    containerDetailView.innerHTML = '';
}


function parametersDetailView(i) {
    const pokemonName = pokemonDetails[i].name;
    const pokemonImage = pokemonDetails[i].img;
    const pokemonType = pokemonDetails[i].type;
    const pokemonAbility = pokemonDetails[i].ability;
    const pokemonHeight = pokemonDetails[i].height;
    const pokemonWeight = pokemonDetails[i].weight;

    templateOpenDetailViewHTML(pokemonName, pokemonImage, pokemonType, pokemonAbility, pokemonHeight, pokemonWeight);
}


function templateOpenDetailViewHTML(pokemonName, pokemonImage, pokemonType, pokemonAbility, pokemonHeight, pokemonWeight) {
    return /*html*/ ` 

<div class="detail__header" id="detail-header">

    <h2 id="detailName">
         ${pokemonName}
    </h2>

    <div class="" onclick="closeDetailView()">
        <div class=""></div>
        <span class="">close</span>
    </div>

    <div class="detailPicContainer">
        <img src="${pokemonImage}">
    </div>

    <div class="">
        <p>Ability: <span id="detailAbility">${pokemonAbility}</span></p>
        <p>Height: <span id="detailHeight">${pokemonHeight}</span></p>
        <p>Weight: <span id="detailWeight">${pokemonWeight}</span></p>
    </div>
</div>
    `;
}