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
        console.log(data);
    })
    // 
    var giphyAPIurl = "https://api.giphy.com/v1/stickers/search?q=" + pokeValue + "&api_key=M1nneBO2F2uWYOhj8nw5UULJYWJSrSW0"
    fetch (giphyAPIurl)
    .then (function (response) {
       return response.json();
    })
    .then (function (gifData){
        console.log(gifData);
        // The code below will be used later to generate the area that the gif will be set to on the results page
        
        // var stickerUrl = gifData.data[0].embed_url;
        // var pokeSticker = document.createElement('iframe');
        // pokeSticker.setAttribute("src", stickerUrl);
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