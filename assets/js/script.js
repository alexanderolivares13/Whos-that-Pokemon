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
        return response.json();
    })
    .then (function (gifData){
        localStorage.setItem("gifData", JSON.stringify(gifData));
        window.location.href = "assets/search.html";
    })
}

var generateGif = function(){
    var gifData = JSON.parse(localStorage.getItem("gifData"));
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
    var imgCreate = document.createElement("img");
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
    imgCreate.setAttribute("alt", "pokemon-artwork");
    imgEl.append(imgCreate);
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
    generateGif();
}

var surpriseFetchHandler = function(){
    localStorage.clear();
    randomPokeFetch();
}

if (userWindow){
    generateInfo();
}


searchButton.on("click", function(event) {
    event.preventDefault();
    var pokeValue = searchBarEl.val();
    pokeValue = pokeValue.toLowerCase();
    pokeFetch(pokeValue);
});

surpriseButton.on("click", surpriseFetchHandler);


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