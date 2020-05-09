/*-- --*/
var main = document.querySelector('main');

var productsURL = "products.json"
var products;

var request = new XMLHttpRequest();
request.open("GET", productsURL);
request.responseType = "json";

request.onload = function(){
  if(request.status == 200 || request.readyState == 4){
    products = request.response;
    console.log(products);
    products.forEach(function(product){
      getBlob(product);
    });
  } else {
    console.log("Erreur" + request.status + " : " + request.statusText);
  }
}
request.send();

function getBlob(product){
  var url = 'images/' + product.image;
  var request = new XMLHttpRequest();
  request.open("GET", url);
  request.responseType = 'blob';

  request.onload = function(){
    if(request.status == 200 || request.readyState ==4){
      console.log(request.response);
      console.log(request.response instanceof Blob);
      objectURL = URL.createObjectURL(request.response);
      showProduct(objectURL, product);
    } else {
      console.log("ERREUR " + request.status + " ; " + request.statusText);
    }
  }
  request.send();
}

function showProduct(objectURL, product){

  var can = document.createElement('section');
  can.className = product.type;
  var myH2 = document.createElement('h2');
  var myPara = document.createElement('p');
  var myImg = document.createElement('img');

  var sectionContent=[];
  myH2.textContent = product.name.replace(product.name.charAt(0), product.name.charAt(0).toUpperCase());
  console.log(`The character at index ${0} is ${product.name.charAt(0)}`);
  myPara.textContent = '$' + product.price.toFixed(2);
  myImg.src=objectURL;

  sectionContent = [
    myH2,
    myPara,
    myImg
  ];

  for(let i=0; i < sectionContent.length ; i++){
    can.appendChild(sectionContent[i]);
  };

  main.appendChild(can);

}
