var searchBarEl = $("#search-name");
var surpriseButton = $(".button-random");
var searchButton = $("#search-button");
var nextButton = $("#next-button");
var imgEl = $(".pokemon-img");
var figureEl = $(".pokemon-info");
var giphEl = $(".pokemon-gif");
var userWindow = window.location.href.includes("search.html");
var modalEl = $(".modal");
var modalButton = $(".modal-close");
var n = 0;
var z = 0;
var homeButton = $(".button-home");

var randomPokeFetch = function(){
    var randomNum = Math.floor(Math.random() * pokemonList.length);
    var pokeValue = pokemonList[randomNum];
    pokeValue = pokeValue.toLowerCase();
    pokeFetch(pokeValue);
  }

// The this function makes an API call depending on the name that the user enters
var pokeFetch = function(pokeValue) {
    // add variable to get the value from the search form and set it as the pokeValue
    if (pokeValue === "") {
        return;
    }
    var pokeAPIurl = "https://pokeapi.co/api/v2/pokemon/" + pokeValue;
    fetch (pokeAPIurl)
    .then (function(response){
        // first checks to see if the response is good from the API to force the 3 different fetch functions to run in order as opposed to running asynchronously.
        if (response.status === 200){
            giphyFetch(pokeValue);
        } else if (response.status !== 200){
            $(modalEl).attr("class", "modal is-active");
        }
        return response.json();
    })
    .then (function (data){
            localStorage.setItem("data", JSON.stringify(data));
    })
}

// The this function makes an API call depending on the name that the user enters
var giphyFetch = function(pokeValue) {
    // add variable to get the value from the search form and set it as the pokeValue
    var giphyAPIurl = "https://api.giphy.com/v1/stickers/search?q=" + pokeValue + "+pokemon&limit=5&api_key=M1nneBO2F2uWYOhj8nw5UULJYWJSrSW0";
    fetch (giphyAPIurl)
    .then (function (response) {
        if (response.status === 200){
            speciesFetch(pokeValue);
        }
        return response.json();
    })
    .then (function (gifData){
        localStorage.setItem("gifData", JSON.stringify(gifData));
    })
}

// a 3rd fetch function used to get the fun fact on the search.html page
var speciesFetch = function(pokeValue) {
    var speciesAPIurl = "https://pokeapi.co/api/v2/pokemon-species/" + pokeValue
    fetch (speciesAPIurl)
    .then (function(response){
        return response.json();
    })
    .then (function(speciesData){
        //after the last fetch function is successfully run then the window changes
        localStorage.setItem("speciesData", JSON.stringify(speciesData));
        window.location.href = "assets/search.html";
    })
}

var generateGif = function(){
    var gifData = JSON.parse(localStorage.getItem("gifData"));
    // if there is no gif stickers available then the function is killed early, this is done to ensure the rest of the code is ran on the search.html page
    if (gifData.pagination.count === 0){
        return;
    } else if (gifData.data[0].embed_url){
    var stickerUrl = gifData.data[0].embed_url;
    var pokeSticker = document.createElement('iframe');
        pokeSticker.setAttribute("src", stickerUrl);
        pokeSticker.setAttribute("alt", "pokemon-gif")
        giphEl.append(pokeSticker); 
}
}
var generateInfo = function(){
    // the following lines point the the properties of the JSON object with the respective information for the pokemon that was searched
    var data = JSON.parse(localStorage.getItem("data"));
    var speciesData = JSON.parse(localStorage.getItem("speciesData"));
    // a for loop to ensure the fun fact is output in english
    for (i = 0; i < speciesData.flavor_text_entries.length; i++){
        if(speciesData.flavor_text_entries[z].language.name !== "en"){
            z++
        }
    }
    var imgCreate = document.createElement("img");
    var pokemonArtwork = data.sprites.other["official-artwork"].front_default;
    var pokemonN = data.name;
    pokemonN = pokemonN.toUpperCase();
    var pokemonName = "Name: " + pokemonN;
    var pokemonNumber = "Pokemon Number: #" + data.id; 
    var pokemonFact = speciesData.flavor_text_entries[z].flavor_text;
        pokemonFact = "Fun Fact: " + pokemonFact.replace("\f", " ");
    // a math equation to convert the number provided to the proper unit, height/weight are represented as whole numbers multiplied by 10 instead of floating point numbers in the JSON object. (e.g 3 = .3m / 40 = 4.0 kg respectively)
    var pokemonHeight = "Height: " + data.height * 3.937 + " in";
    var pokemonWeight = "Weight: " + data.weight * .2204 + " lbs";
    var pokemonInfo = [pokemonName, pokemonNumber, pokemonFact, pokemonHeight, pokemonWeight];
    imgCreate.setAttribute("src", pokemonArtwork);
    imgCreate.setAttribute("alt", "pokemon-artwork");
    imgEl.append(imgCreate);
    // A for loop to to create new p tags for all the miscellaneous information about the pokemon denoted in the pokemonInfo array
    for(i = 0; i < pokemonInfo.length; i++){
        var lineCreate = document.createElement("p");
            lineCreate.textContent = pokemonInfo[i];
            lineCreate.setAttribute("class", "pokemon-info");
            figureEl.append(lineCreate);
    }
    // A for loop to get every available ability to the pokemon and replaces any hyphens with spaces for a cleaner look. The loop also creates a new <p> element and appends it for every different ability that is obtained from the API.
    for (i = 0; i < data.abilities.length; i++){
        var abilityName = data.abilities[i].ability.name;
        var pokemonAbilities = "Ability: " + abilityName.replace("-", " ");
        var lineCreate = document.createElement("p");
            lineCreate.textContent = pokemonAbilities;
            lineCreate.setAttribute("class", "pokemon-info");
            figureEl.append(lineCreate);
    }
    // a for loop to get every base stat for the pokemon and replaces any hyphens with spaces for a cleaner look. The loop also creates a new <p> element and appends it for every new stat that is obtained from the API.
    for (i = 0; i < data.stats.length; i++){ 
        var statName =  data.stats[i].stat.name;
        var baseStat = data.stats[i].base_stat;
        statName = statName.toUpperCase();
        var pokemonStats = statName.replace("-", " ") + ": " + baseStat;
        var lineCreate = document.createElement("p");
            lineCreate.textContent = pokemonStats;
            lineCreate.setAttribute("class", "pokemon-info");
            figureEl.append(lineCreate);
    }
    //after all of the info is generated for the pokemon, the generate gif function will be called to display the gif sticker next to the info.
    generateGif();
}

var surpriseFetchHandler = function(){
    localStorage.clear();
    randomPokeFetch();
}

// checks to see if the user is on the search.html page before running the generateInfo() function, since the generate function will dynamically create the information that will be displayed to the user on the search.html page
if (userWindow){
    generateInfo();
}

// applied to the search bar submit button, it will capture the user's value and change it to lowercase before trying to fetch any data. non lowercase inputs will respond with a status of 404 from the API
searchButton.on("click", function(event) {
    event.preventDefault();
    var pokeValue = searchBarEl.val();
    pokeValue = pokeValue.toLowerCase();
    pokeFetch(pokeValue);
});

surpriseButton.on("click", surpriseFetchHandler);

// a simple function used to ensure the next button will display any next available gif stickers
nextButton.on("click", function () {
    n++;
    var gifData = JSON.parse(localStorage.getItem("gifData"));
    var stickerUrl = gifData.data[n].embed_url;
        $("iframe").attr("src", stickerUrl);
});

modalButton.on("click", function() {
    $(modalEl).attr("class", "modal");
})

homeButton.on("click", function(){
    window.location.href = "../index.html";
    localStorage.clear();
})