

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

$( "fieldset#cropRectangle label input" ).click(function() {
  resetCropRectangle();
  newCrop = $(this).parent().attr('data-crop');
  console.log(newCrop);
  $( ".ProductPhotoMask.Rectangle .ProductPhoto" ).addClass(newCrop);
});
$( "fieldset#cropSquare label input" ).click(function() {
  resetCropSquare();
  newCrop = $(this).parent().attr('data-crop');
  $( ".ProductPhotoMask.Square .ProductPhoto" ).addClass(newCrop);
});
$( "fieldset#cropCircle label input" ).click(function() {
  resetCropCircle();
  newCrop = $(this).parent().attr('data-crop');
  $( ".ProductPhotoMask.Circle .ProductPhoto" ).addClass(newCrop);
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

function applyCrops(x,y,z) {
  console.log(z);
  let zscale = z * 100 + "%";
  console.log(zscale);
  $('.Thumb').css("background-size", zscale)
}

function getCropRectangle(id) {
  for (x = 0; x < cropsList.rectangle.length; x++) {
    if (cropsList.rectangle[x].name == id ) {
      applyCrops(cropsList.rectangle[x].x, cropsList.rectangle[x].y, cropsList.rectangle[x].z);
    }
  }
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
      getCropRectangle(productsList[i].croperties.rectangle);
    }
  }
});

function displayProduct(productImg) {
  $( ".Thumb" ).css("background-image", "url(" + productImg + ")");
  //console.log(productImg);
}
