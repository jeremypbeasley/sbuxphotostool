

// CROPS

// var newCrop = "RectangleDefault";
// $( ".ProductPhoto" ).addClass(newCrop);

// check the Crop radio
//$(".Controller").find("[data-crop='" + newCrop + "']").children("input").attr('checked',true);


// SET DEFAULT CROPS

// $( ".ProductPhotoMask.Rectangle .ProductPhoto" ).addClass("RectangleDefault");
// $( ".ProductPhotoMask.Square .ProductPhoto" ).addClass("SquareDefault");
// $( ".ProductPhotoMask.Circle .ProductPhoto" ).addClass("CircleDefault");
//
// // RESET CROPS
//
// function resetCropRectangle() {
//   $( ".ProductPhotoMask.Rectangle .ProductPhoto" ).removeClass("RectangleDefault RectangleTight");
//   console.log("Rectangle Reset")
// };
// function resetCropSquare() {
//   $( ".ProductPhotoMask.Square .ProductPhoto" ).removeClass("SquareDefault SquareTight");
//   console.log("Square Reset")
// };
// function resetCropCircle() {
//   $( ".ProductPhotoMask.Circle .ProductPhoto" ).removeClass("CircleDefault CircleTightTop CircleTightCenter");
//   console.log("Circle Reset")
// };


// UPDATE CROPS

// $( "fieldset#cropRectangle label input" ).click(function() {
//   resetCropRectangle();
//   newCrop = $(this).parent().attr('data-crop');
//   console.log(newCrop);
//   $( ".ProductPhotoMask.Rectangle .ProductPhoto" ).addClass(newCrop);
// });
// $( "fieldset#cropSquare label input" ).click(function() {
//   resetCropSquare();
//   newCrop = $(this).parent().attr('data-crop');
//   $( ".ProductPhotoMask.Square .ProductPhoto" ).addClass(newCrop);
// });
// $( "fieldset#cropCircle label input" ).click(function() {
//   resetCropCircle();
//   newCrop = $(this).parent().attr('data-crop');
//   $( ".ProductPhotoMask.Circle .ProductPhoto" ).addClass(newCrop);
// });

// RENDER CROP SELECTORS

function renderCropSelectors(cropsList) {
  console.log("rendering crops");
  _.forEach(cropsList, function(value, key) {
    console.log(key);
    function makeSelectors(obj, prop) {
      for (x = 0; x < obj[prop].length; x++) {
        let output = "";
        $('.CropSelectorsContainer').append('<label class="control control--radio" data-crop="RectangleDefault">' + obj[prop][x].description + '<input type="radio" name="cropRectangle"><div class="control__indicator"></div></label>');
        $('').append(output);
      }
    }
    $('.CropSelectorsContainer').append('<fieldset id="">');
    $('.CropSelectorsContainer').append('<p>' + key + '</p>');
    makeSelectors(cropsList, key);
    $('.CropSelectorsContainer').append('</fieldset>');
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

function applyCrops(shape, x, y, z) {
  let zScale = z * 100;
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
          applyCrops(prop, obj[prop][x].x, obj[prop][x].y, obj[prop][x].z);
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
