/*-- --*/
var productsURL = "products.json"
const request = new XMLHttpRequest();
request.open("GET", productsURL);
request.responseType = "json";

request.onload = function(){
  if(request.status == 200 || request.readyState == 4){
    products = request.response;
    console.log(products);
    initialize(products);
  } else {
    console.log("Erreur" + request.status + " : " + request.statusText);
  }
}
request.send();


//Fonction d'initialisation
function initialize(products){
  var main = document.querySelector('main');
  var categorySelect = document.querySelector('#category');
  var searchField = document.querySelector('#searchItem');
  var filterBtn = document.querySelector('button');

  let finalGroup;
  let categoryGroup;

  finalGroup = products;
  updateDisplay();

  filterBtn.onclick = filterCategory;

  function filterCategory(e){
    e.preventDefault(); // Stop l'envoi du formulaire
    finalGroup = [];
    categoryGroup = [];

    if(categorySelect.value === 'All'){
      console.log("ALL");
      categoryGroup = products;
    } else {
      products.forEach(function(product){
        if(categorySelect.value.trim().toLowerCase() === product.type.trim().toLowerCase()){
          categoryGroup.push(product);
        }
      });
    }
    filterTerms();
  }

  function filterTerms(){
    if(searchTerm.value.trim().toLowerCase() == ''){
      finalGroup = categoryGroup;
    } else {

      categoryGroup.forEach(function(productS){
        if(productS.name.toLowerCase().indexOf(searchTerm.value.trim().toLowerCase()) !== -1 ){
          finalGroup.push(productS);
        }
      })
    }
    console.log(finalGroup);
    updateDisplay();
  }

  function updateDisplay(){
    while(main.firstChild){
      main.removeChild(main.firstChild);
    }

    if(!finalGroup.length){ // Si aucun résultat
      noResultText = document.createElement('p');
      noResultText.textContent = "No result found";
      main.appendChild(noResultText);
    } else {
      finalGroup.forEach(function(product){
        getBlob(product);
      });
    }

  }



  function getBlob(product){
    var url = 'images/' + product.image;
    var request = new XMLHttpRequest();
    request.open("GET", url);
    request.responseType = 'blob';

    request.onload = function(){
      if(request.status == 200 || request.readyState ==4){
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
}
