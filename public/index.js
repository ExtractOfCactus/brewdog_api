
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
  var li = createLi()
  var liImg = createLiImg(beer);
  
  li.innerText = beer.name;
  li.value = beers.indexOf(beer);

  ul.appendChild(li);
  ul.appendChild(liImg);
}


var createLi = function() {
  var li = document.createElement("li");
  li.classList.add("beer-item");
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


var app = function () {
  var url = "https://api.punkapi.com/v2/beers";
  makeRequest(url, requestComplete);
}

window.addEventListener('load', app);
