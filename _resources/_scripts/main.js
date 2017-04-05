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

// PREVIEW ANOTHER CROP

$('body').off().on('click', '.CropSelectorsContainer label', function (){
  // get shape name
  let shape = $(this).find('input').attr('name').substr(9, this.length);
  // get crop name
  let name = $(this).find('input').attr('id').substr(9 + shape.length + 1, this.length);
  // get croperties for this crop
  let croperties = _.filter(cropsList[shape], { 'name': name });
  // apply the crop to preview
  applyCrops(shape, name, croperties[0].x, croperties[0].y, croperties[0].z);
});

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
  // reset all selectors
  $('fieldset#selector_' + shape + ' input').attr('checked',false);
  // apply crop to selector
  $('#selector_' + shape + '_' + name).attr('checked',true);
  if (shape == 'rectangle') {
    // make retangle crop
    $('#photo_' + shape).css({transform: 'scale(' + z + ')'});
  }
  if (shape == 'square') {
    // make square crop
    let adjustedZ = z * 1.78;
    let adjustedY = y - 28;
    let adjustedX = x - 50;
    $('#photo_' + shape).css({transform: 'scale(' + adjustedZ + ')'});
    $('#photo_' + shape).css("top", adjustedY + "%");
    $('#photo_' + shape).css("left", adjustedX + "%");
  }
  if (shape == 'circle') {
    // make circle crop
    let adjustedZ = z * 1.78;
    let adjustedY = y - 28;
    let adjustedX = x - 50;
    $('#photo_' + shape).css({transform: 'scale(' + adjustedZ + ')'});
    $('#photo_' + shape).css("top", adjustedY + "%");
    $('#photo_' + shape).css("left", adjustedX + "%");
  }
}

function getItemCrops(crops) {
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
  $.getJSON('/api/products', function(result) {
    productsList = result.items;
    productsListSorted = sortProducts(productsList, 'name');
    listProducts(productsListSorted);
  });
}

function callCrops() {
  $.getJSON('api/croperties', function(result) {
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
      getItemCrops(productsList[i].croperties);
    }
  }
});

function displayProduct(productImg) {
  $(".ProductPhoto").css("background-image", "url(" + productImg + ")");
}
