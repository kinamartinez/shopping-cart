/**
 * Created by karina on 23/02/17.
 */
"use strict";
var source = $('#cart-template').html();
var template = Handlebars.compile(source);

// an array with all of our cart items
var cart = [];

var total = 0;

var updateCart = function () {
    // TODO: Write this function. In this function we render the page.
    // Meaning we make sure that all our cart items are displayed in the browser.
    // Remember to empty the "cart div" before you re-add all the item elements.
    $(".cart-list").empty();
    $(".total").empty();

    for (var i = 0; i < cart.length; i++) {
        var newHTML = template({name: cart[i].name, price: cart[i].price, parsedName: cart[i].parsedName, totalItemPrice: (cart[i].timesFound * cart[i].price)});
        $(".cart-list").append(newHTML);
    }
    $(".total").append(total);
}

var addItem = function (item) {
    // TODO: Write this function. Remember this function has nothing to do with display.
    // It simply is for adding an item to the cart array, no HTML involved - honest ;-)
    var newItem = { price: item.attr("data-price"), name: item.attr("data-name"), parsedName: item.attr("data-name") , timesFound: 0};
    var stringPrice = item.attr("data-price");
    var intPrice = parseInt(stringPrice);
    total += intPrice;
    var found = false;
    for (var i = 0; i < cart.length; i++) {
        if (cart[i].name == newItem.name) {
            found = true;
            cart[i].timesFound++;
            newItem.timesFound = cart[i].timesFound;
            newItem.parsedName = newItem.name + "(" + newItem.timesFound + ")";
            cart[i] = newItem;
            break;
        }
    }

    if (found == false) {
        newItem.timesFound = 1;
        cart.push(newItem);
    }
}

var clearCart = function () {
    // TODO: Write a function that clears the cart ;-)
    total= 0;
    cart = [];
    updateCart();
}

$('.view-cart').on('click', function () {
    // TODO: hide/show the shopping cart!
    $(".shopping-cart").fadeToggle();
})

// remove item from cart list
$(".cart-list").on("click", "i" ,function (event) {
    var itemText = $(this).parent().text();
    itemText = itemText.replace(/\s+/g, ''); // remove blank spaces in text
    for (var i = 0; i < cart.length; i++) {
        if (cart[i].parsedName == itemText) {
            if (cart[i].timesFound == 1) {
                total -= cart[i].price;
                cart.splice(i, 1);
            }
            else {
                total -= cart[i].price;
                cart[i].timesFound --;
                cart[i].parsedName = cart[i].name + "(" + cart[i].timesFound + ")";
            }
            updateCart();
        }
    }
})

$(document).on('click', ".add-to-cart", function () {
    // TODO: get the "item" object from the page
    var item = $(this).parents(".buybox").parents(".item");
    $(this).toggleClass("btn-primary btn-success");
    addItem(item);
    updateCart();
});

$('.clear-cart').on('click', function () {
    clearCart();
});

// update the cart as soon as the page loads!
updateCart();