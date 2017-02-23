/**
 * Created by karina on 23/02/17.
 */
"use strict";
var products = [];

var updateProducts = function () {
    $(".products").empty();
    var source = $('#templateProducts').html();
    var template = Handlebars.compile(source);
    for (var i = 0; i < products.length; i++) {
        var newHTML = template(products[i]);
        $('.products').append(newHTML);
    }
};

$(".NewProduct-form").keypress(function (event) {
    if (event.which === 13) {
        var name = $("#product-name").val();
        var price = $("#product-price").val();
        var image = $("#product-image").val();
        var goodURL = validationURL();
        if (goodURL) {
            addProduct(name, price, image);
        }
        updateProducts();
    }
});

var addProduct = function (name, price, image) {
    products.push({
        name: name,
        price: price,
        image: image

    })
};

function validationURL() {
    var imageURL = $("#product-image").val();
    var www = false;
    var com = false;
    var http = false;

    for (var i = 0; i < imageURL.length; i++) {
        if (imageURL[i] === "w" && imageURL[i + 1] === "w" && imageURL[i + 2] === "w") {
            www = true
        }
        if (imageURL[i] === "c" && imageURL[i + 1] === "o" && imageURL[i + 2] === "m") {
            com = true
        }
        if (imageURL[i] === "h" && imageURL[i + 1] === "t" && imageURL[i + 2] === "t" && imageURL[i + 3] === "p") {
            http = true
        }
    }
    if (!www && !com && !http) {
        alert("please re enter a valid URL!");
        return false;
    }
    else {
        return true;
    }
}