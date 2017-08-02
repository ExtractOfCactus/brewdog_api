
var makeRequest = function(url, callback) {
  var request = new XMLHttpRequest()

  request.addEventListener('load', callback);

  request.open("GET", url);
  request.send();
}


var requestComplete = function() {
  if (this.status !== 200) return;

  var jsonString = this.responseText;
  var beers = JSON.parse(jsonString);

  populateBeersList(beers);
}


var populateHelper = function(beer, ul) {
  console.log(beer);
  var li = document.createElement("li");
  li.classList.add("beer-item");
  li.innerText = beer.name;
  li.value = beers.indexOf(beer);

  ul.appendChild(li);
}


var populateBeersList = function(beers) {
  var beerListUl = document.querySelector("#beer-list");
  beers.forEach(function(beer) {
    populateHelper(beer, beerListUl);
  })
}
 

var app = function () {
  var url = "https://api.punkapi.com/v2/beers";
  makeRequest(url, requestComplete);
}

window.addEventListener('load', app);
