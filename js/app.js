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
new Product('sweep', 'png');
new Product('tauntaun');
new Product('unicorn');
new Product('water-can');
new Product('wine-glass');

function getRandomIndex() {
  return Math.floor(Math.random() * products.length);
}

function renderImages() {
  let imgOneIndex = getRandomIndex();
  let imgTwoIndex = getRandomIndex();
  let imgThreeIndex = getRandomIndex();

  // build logic here to ensure none of these 3 values match

  imgOne.src = products[imgOneIndex].src;
  imgOne.alt = products[imgOneIndex].name;
  products[imgOneIndex].views++;

  imgTwo.src = products[imgTwoIndex].src;
  imgTwo.alt = products[imgTwoIndex].name;
  products[imgTwoIndex].views++;

  imgThree.src = products[imgThreeIndex].src;
  imgThree.alt = products[imgThreeIndex].name;
  products[imgThreeIndex].views++;
}
renderImages();

function handleClick(event) {
  votes--;
  let imgClicked = event.target.alt;

  for (let i = 0; i < products.length; i++) {
    if (imgClicked === products[i].name) {
      products[i].clicks++;
    }
  }
  renderImages();

  if (votes === 0) {
    myContainer.removeEventListener('click', handleClick);
  }
}

function handleResults() {
  for (let i = 0; i < products.length; i++){
    let li = document.createElement('li');
    li.textContent = `${products[i]} was viewed ${products[i].views}times, And won the product vote ${products[i].clicks} times`;
    displayUl.appendChild(li);
  }
}



myContainer.addEventListener('click', handleClick);

resultsBtn.addEventListener('click', handleResults);
