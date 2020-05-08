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
    afficherImages();
  } else {
    console.log("Erreur" + request.status + " : " + request.readyState);
  }
}
request.send();

function afficherImages(){
  var can = document.createElement('section');
  var myH2 = document.createElement('h2');
  var myPara = document.createElement('p');
  var myImg = document.createElement('img');

  products.forEach(function(product){
    var can = document.createElement('section');
    can.className = product.type;
    var myH2 = document.createElement('h2');
    var myPara = document.createElement('p');
    var myImg = document.createElement('img');

    var sectionContent=[];
    myH2.textContent = product.name;
    myPara.textContent = '$' + product.price;
    myImg.src='./images/' + product.image;

    sectionContent = [
      myH2,
      myPara,
      myImg
    ];

     for(let i=0; i < sectionContent.length ; i++){
       console.log(sectionContent[i]);
       can.appendChild(sectionContent[i]);
     };

    main.appendChild(can);
  });

}
