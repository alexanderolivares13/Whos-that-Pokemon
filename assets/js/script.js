var pokeValue = "";
var searchBarEl = $(".search-name");

var randomPokeFetch = function(){
    var randomNum = Math.floor(Math.random() * pokemonList.length);
    var pokeValue = pokemonList[randomNum];
    pokeValue = pokeValue.toLowerCase();
    // this code generated the random pokemon name that will be picked to be used by both APIs
    console.log(pokeValue);
    var pokeAPIurl = "https://pokeapi.co/api/v2/pokemon/" + pokeValue
    fetch (pokeAPIurl)
    .then (function(response){
        return response.json();
    })
    .then (function (data){
        // the following lines point the the properties of the JSON object with the respective information for the pokemon that was searched
        var pokemonArtwork = data.sprites.other["official-artwork"].front_default;
        var pokemonName = "Name: " + data.name;
        var pokemonNumber = "Pokemon Number: " + data.id;
        // a math equation to convert the number provided to the proper unit, height/weight are represented as whole numbers multiplied by 10 instead of floating point numbers in the JSON object. (e.g 3 = .3m / 40 = 4.0 kg respectively)
        var pokemonHeight = "Height: " + data.height * 3.937 + " in";
        var pokemonWeight = "Weight: " + data.weight * .2204 + " lbs";
        // A for loop to get every available ability to the pokemon and replaces any hyphens with spaces for a cleaner look
        for (i = 0; i < data.abilities.length; i++){
            var abilityName = data.abilities[i].ability.name;
            console.log("Ability: " + abilityName.replace("-", " "));

        }
        // a for loop to get every base stat for the pokemon and replaces any hyphens with spaces for a cleaner look
        for (i = 0; i < data.stats.length; i++){ 
            var statName =  data.stats[i].stat.name;
            var baseStat = data.stats[i].base_stat;
            statName = statName.toUpperCase()
            console.log(statName.replace("-", " ") + ": " + baseStat);
        }
    })
    
    var giphyAPIurl = "https://api.giphy.com/v1/stickers/search?q=" + pokeValue + "&api_key=M1nneBO2F2uWYOhj8nw5UULJYWJSrSW0"
    fetch (giphyAPIurl)
    .then (function (response) {
       return response.json();
    })
    .then (function (gifData){
        console.log(gifData);
        // The code below will be used later to generate the area that the gif will be set to on the results page
        
        var stickerUrl = gifData.data[0].embed_url;
        var pokeSticker = document.createElement('iframe');
        pokeSticker.setAttribute("src", stickerUrl);
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
        console.log(data);
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
    .then (function (gifData){
        console.log(gifData);
    })
}