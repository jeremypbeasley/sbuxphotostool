

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

function getProducts() {
  $.getJSON('stuff.json', function(result) {
    var output = '<select><option>Select a product...</option>';
    $.each(result.items, function(i, items){
      output += '<option value="' + items.content + '">' + items.name + '</option>';
    });
    output += '</select>';
    document.getElementById("ProductSelector").innerHTML = output;
  });
};

function listProducts(sortedlist) {
  var output = '';
  $.each(sortedlist, function(i){
    output += '<li data-id="' + sortedlist[i].content + '">' + sortedlist[i].name + '</li>';
  });
  $(".PhotosList").html(output);
};

function sortProducts(array, key) {
  return array.sort(function(a, b) {
    var x = a[key]; var y = b[key];
    return ((x < y) ? -1 : ((x > y) ? 1 : 0));
  });
}

var productsListSorted = "";

function callProducts() {
  $.getJSON('http://app.dropmark.com/336137.json?key=638be65e149826ec8892&callback=?', function(result) {
    var productsList = result.items;
    productsListSorted = sortProducts(productsList, 'name');
    listProducts(productsListSorted);
    console.log(productsListSorted);
  });
}

callProducts();

// UPDATE PRODUCTS

$('body').on('click', '.PhotosList li', function (){
  var currentProduct = $(this).attr("data-id");
  displayProduct(currentProduct);
});

function displayProduct(productImg) {
  $( ".Thumb" ).css("background-image", "url(" + productImg + ")");
  console.log(productImg);
}
