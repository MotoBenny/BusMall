'use strict';

/*
As a user, I would like to display three unique products by chance so that the viewers can pick a favorite.

Create a constructor function that creates an object associated with each product, and has the following properties:
Name of the product
File path of image
Times the image has been shown
number of clicks that image received

Create an algorithm that will randomly generate three unique product images from the images directory and display them side-by-side-by-side in the browser window.

For each of the three images, increment its property of times it has been shown by one.

Attach an event listener to the section of the HTML page where the images are going to be displayed.

Once the users ‘clicks’ a product, generate three new products for the user to pick from.

*/

// DOM references

let myContainer = document.getElementById('container');
let imgOne = document.getElementById('imgOne');
let imgTwo = document.getElementById('imgTwo');
let imgThree = document.getElementById('imgThree');
let resultsBtn = document.getElementById('show-results-btn');
let displayUl = document.getElementById('display-results-ul');

// products constructor

let votes = 5; // this will need to be changed to 25 before turning this is. 

let products = [];

function Product(name, fileExtension = 'jpg') {
  this.name = name;
  this.views = 0;
  this.clicks = 0;
  this.src = `img/${name}.${fileExtension}`;

  products.push(this);
}

new Product('bag');
new Product('banana');
new Product('bathroom');
new Product('boots');
new Product('breakfast');
new Product('bubblegum');
new Product('chair');
new Product('cthulhu');
new Product('dog-duck');
new Product('dragon');
new Product('pen');
new Product('pet-sweep');
new Product('scissors');
new Product('shark');
new Product('sweep','png');
new Product('tauntaun');
new Product('unicorn');
new Product('water-can');
new Product('wine-glass');

function getRandomIndex() {
  return Math.floor(math.random() * products.length);
}

function handleClick(event);





myContainer.addEventListener('click', handleClick);
