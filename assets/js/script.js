var pokeValue = "";
var searchBarEl = $(".search-name");

var randomPokeFetch = function(){
    var randomNum = Math.floor(Math.random() * pokemonList.length);
    var pokeValue = pokemonList[randomNum];
    pokeValue = pokeValue.toLowerCase();
    // this code generated the random pokemon name that will be picked to be used by both APIs
    var pokeAPIurl = "https://pokeapi.co/api/v2/pokemon/" + pokeValue
    fetch (pokeAPIurl)
    .then (function(response){
        return response.json();
    })
    .then (function (data){
        localStorage.setItem("data", JSON.stringify(data));
    })
    
    var giphyAPIurl = "https://api.giphy.com/v1/stickers/search?q=" + pokeValue + "&api_key=M1nneBO2F2uWYOhj8nw5UULJYWJSrSW0"
    fetch (giphyAPIurl)
    .then (function (response) {
       return response.json();
    })
    .then (function (data){
        localStorage.setItem("gifData", JSON.stringify(data));
        })
  }

// The this function makes an API call depending on the name that the user enters
var pokeFetch = function() {
    // add variable to get the value from the search form and set it as the pokeValue
    var pokeAPIurl = "https://pokeapi.co/api/v2/pokemon/" + pokeValue
    fetch (pokeAPIurl)
    .then (function(response){
        return response.json();
    })
    .then (function (data){
        localStorage.setItem("gifData", JSON.stringify(data));
    })
}

// The this function makes an API call depending on the name that the user enters
var giphyFetch = function() {
    // add variable to get the value from the search form and set it as the pokeValue
    var giphyAPIurl = "https://api.giphy.com/v1/stickers/search?q=" + pokeValue + "&api_key=M1nneBO2F2uWYOhj8nw5UULJYWJSrSW0"
    fetch (giphyAPIurl)
    .then (function (response) {
       return response.json();
    })
    .then (function (data){
        localStorage.setItem("gifData", JSON.stringify(data));
    })
}

var generateGif = function(){
    var gifData = JSON.parse(localStorage.getItem("gifData"));
    var stickerUrl = gifData.data[0].embed_url;
    var pokeSticker = document.createElement('iframe');
        pokeSticker.setAttribute("src", stickerUrl);
}
// TODO: SectionEL needs to be changed to an area in the results page
var generateInfo = function(){
    // the following lines point the the properties of the JSON object with the respective information for the pokemon that was searched
    var data = JSON.parse(localStorage.getItem("data"))
    var imgCreate = document.createElement("img")
    var pokemonArtwork = data.sprites.other["official-artwork"].front_default;
    var pokemonN = data.name;
        pokemonN = pokemonN.toUpperCase();
    var pokemonName = "Name: " + pokemonN;
    var pokemonNumber = "Pokemon Number: #" + data.id;
    // a math equation to convert the number provided to the proper unit, height/weight are represented as whole numbers multiplied by 10 instead of floating point numbers in the JSON object. (e.g 3 = .3m / 40 = 4.0 kg respectively)
    var pokemonHeight = "Height: " + data.height * 3.937 + " in";
    var pokemonWeight = "Weight: " + data.weight * .2204 + " lbs";
    var pokemonInfo = [pokemonName, pokemonNumber, pokemonHeight, pokemonWeight];
    imgCreate.setAttribute("src", pokemonArtwork);
    sectionEl.append(imgCreate);
    for(i = 0; i < pokemonInfo.length; i++){
        var lineCreate = document.createElement("p");
            lineCreate.textContent = pokemonInfo[i];
            lineCreate.setAttribute("class", "pokemon-info");
            sectionEl.append(lineCreate);
    }
    // A for loop to get every available ability to the pokemon and replaces any hyphens with spaces for a cleaner look
    for (i = 0; i < data.abilities.length; i++){
        var abilityName = data.abilities[i].ability.name;
        var pokemonAbilities = "Ability: " + abilityName.replace("-", " ");
        var lineCreate = document.createElement("p");
            lineCreate.textContent = pokemonAbilities;
            lineCreate.setAttribute("class", "pokemon-info");
            sectionEl.append(lineCreate);
    }
    // a for loop to get every base stat for the pokemon and replaces any hyphens with spaces for a cleaner look
    for (i = 0; i < data.stats.length; i++){ 
        var statName =  data.stats[i].stat.name;
        var baseStat = data.stats[i].base_stat;
        statName = statName.toUpperCase();
        var pokemonStats = statName.replace("-", " ") + ": " + baseStat;
        var lineCreate = document.createElement("p");
            lineCreate.textContent = pokemonStats;
            lineCreate.setAttribute("class", "pokemon-info");
            sectionEl.append(lineCreate);
    }
}