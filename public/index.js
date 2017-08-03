
var beers;

var makeRequest = function(url, callback) {
  var request = new XMLHttpRequest()

  request.addEventListener('load', callback);

  request.open("GET", url);
  request.send();
}


var requestComplete = function() {
  if (this.status !== 200) return;

  var jsonString = this.responseText;
  beers = JSON.parse(jsonString);

  populateBeersList(beers);
}


var populateBeersList = function(beers) {
  var beerListUl = document.querySelector("#beer-list");
  beers.forEach(function(beer) {
    populateHelper(beer, beerListUl);
  })
}


var populateHelper = function(beer, ul) {
  var li = createLi(beer)
  var liImg = createLiImg(beer);

  var ingredients = createIngredientsList(beer.ingredients)

  ul.appendChild(li);
  ul.appendChild(liImg);
  ingredients.forEach(function(ingredient) {
    ul.appendChild(ingredient);
  })
}


var createLi = function(beer) {
  var header = document.createElement("h2")
  var li = document.createElement("li");
  li.classList.add("beer-item");
  header.innerText = beer.name;
  li.appendChild(header);
  return li;
}

var createLiImg = function(beer) {
  var li = document.createElement("li");
  var img = document.createElement("img");
  li.classList.add("list-image");
  img.classList.add("beer-img");
  img.src = beer.image_url;

  li.appendChild(img);
  return li;
}

var createIngredientsList = function(ingredients) {
  var h3Malt = createIngredientHeader("Malt");
  var liMaltArr = createIngredientsItems(ingredients.malt);
  var ulMalt = appendItems(h3Malt, liMaltArr);

  var h3Hops = createIngredientHeader("Hops");
  var liHopsArr = createIngredientsItems(ingredients.hops);
  var ulHops = appendItems(h3Hops, liHopsArr);

  var h3Yeast = createIngredientHeader("Yeast");
  var ulYeast = document.createElement("ul");
  ulYeast.classList.add("ingredient-type");
  var liYeast = document.createElement("li");
  liYeast.innerText = ingredients.yeast;

  // ulMalt.appendChild(h3Malt);
  // ulHops.appendChild(h3Hops);
  ulYeast.appendChild(h3Yeast);
  ulYeast.appendChild(liYeast);

  return ingredientsArray = [ulMalt, ulHops, ulYeast];
}

var createIngredientHeader = function(title) {
  var h3 = document.createElement("h3");
  h3.innerText = title;
  return h3;
}

var createIngredientsItems = function(ingredients) {
  var liArray = [];
  ingredients.forEach(function(ingredient) {
    var li = document.createElement("li");
    li.innerText = ingredient.name;
    liArray.push(li);
  })
  return liArray;
}
  
var appendItems = function(h3, liArr) {
  var ul = document.createElement("ul");
  ul.classList.add("ingredient-type");
  ul.appendChild(h3);
  liArr.forEach(function(li) {
    ul.appendChild(li);
  });
  return ul;
}

var app = function () {
  var url = "https://api.punkapi.com/v2/beers";
  makeRequest(url, requestComplete);
}

window.addEventListener('load', app);
