// RENDER CROP SELECTORS

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

function renderCropSelectors(cropsList) {
  _.forEach(cropsList, function(value, key) {
    let output = '<fieldset id="selector_' + key + '"><p>' + capitalize(String(key)) + '</p>';
    for (x = 0; x < cropsList[key].length; x++) {
      output += '<label class="control control--radio">' + cropsList[key][x].description + '<input type="radio" name="selector_' + key + '" id="selector_' + key + '_' + cropsList[key][x].name + '"><div class="control__indicator"></div></label>';
    }
    $('.CropSelectorsContainer').append(output);
  });
}

// DISPLAY PRODUCTS

function listProducts(sortedlist) {
  var output = '';
  $.each(sortedlist, function(i){
    output += '<li data-id="' + sortedlist[i].id + '">' + sortedlist[i].name + '</li>';
  });
  $(".PhotosList").html(output);
};

function sortProducts(array, key) {
  return array.sort(function(a, b) {
    var x = a[key]; var y = b[key];
    return ((x < y) ? -1 : ((x > y) ? 1 : 0));
  });
}

function applyCrops(shape, name, x, y, z) {
  let zScale = z * 100;
  // reset all selectors
  $('fieldset#selector_' + shape + ' input').attr('checked',false);
  // apply crop to selector
  $('#selector_' + shape + '_' + name).attr('checked',true);
  if (shape == 'rectangle') {
    // make retangle crop
    $('.Thumb.' + shape).css("background-size", zScale + "%");
    $('.Thumb.' + shape).css("background-position-x", x + "%");
    $('.Thumb.' + shape).css("background-position-y", y + "%");
  }
  if (shape == 'square') {
    // make square crop
    let squareZScale = zScale * 1.78;
    $('.Thumb.' + shape).css("background-size", squareZScale + "%");
    $('.Thumb.' + shape).css("background-position-x", x + "%");
    $('.Thumb.' + shape).css("background-position-y", y + "%");
  }
  if (shape == 'circle') {
    // make circle crop
    let circleZScale = zScale * 1.78;
    $('.Thumb.' + shape).css("background-size", circleZScale + "%");
    $('.Thumb.' + shape).css("background-position-x", x + "%");
    $('.Thumb.' + shape).css("background-position-y", y + "%");
  }
}

function getItemCrops(crops) {
  //console.log(crops);
  _.forEach(crops, function(value, key) {
    function getShape(obj, prop) {
      for (x = 0; x < obj[prop].length; x++) {
        if (obj[prop][x].name == value ) {
          applyCrops(prop, obj[prop][x].name, obj[prop][x].x, obj[prop][x].y, obj[prop][x].z);
        }
      }
    }
    getShape(cropsList, key);
  });

}

var productsList;
var productsListSorted = "";
var cropsList;

function callProducts() {
  $.getJSON('mock.json', function(result) {
    productsList = result.items;
    productsListSorted = sortProducts(productsList, 'name');
    listProducts(productsListSorted);
    //console.log(productsListSorted);
  });
}

function callCrops() {
  $.getJSON('croperties.json', function(result) {
    cropsList = result;
    renderCropSelectors(cropsList);
  });
}

callProducts();
callCrops();

// CHOOSE AN IMAGE

$('body').on('click', '.PhotosList li', function (){
  let currentProductId = $(this).attr("data-id");
  for (i = 0; i < productsList.length; i++) {
    if (productsList[i].id == currentProductId) {
      displayProduct(productsList[i].image_url);
      //getCropRectangle(productsList[i].croperties.rectangle);
      getItemCrops(productsList[i].croperties);
    }
  }
});

function displayProduct(productImg) {
  $( ".Thumb" ).css("background-image", "url(" + productImg + ")");
  //console.log(productImg);
}
