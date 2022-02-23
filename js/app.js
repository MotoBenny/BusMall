/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
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

// allow the user to input how many clicks the user should get.

let myContainer = document.getElementById('container');
let imgOne = document.getElementById('imgOne');
let imgTwo = document.getElementById('imgTwo');
let imgThree = document.getElementById('imgThree');
let ctx = document.getElementById('chart').getContext('2d');

// accessing any existing local storage

let localProducts = localStorage.getItem('products');
console.log('localProducts equals: ', localProducts);

// step 4
let parsedProducts = JSON.parse(localProducts);
console.log('parsedProducts equals: ', parsedProducts);
//return parsedProducts;

let votes = 25; // this will need to be changed to a default of 25 if not changed by the user. CHANGE TO 25 BEFORE FINAL COMMIT FOR LAB

let products = [];

// Local storage step 5 check for local storage and use it, or instantiate product objects
if (parsedProducts) {
  products = parsedProducts;
} else {
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
}

function Product(name, fileExtension = 'jpg') {
  this.name = name;
  this.views = 0;
  this.clicks = 0;
  this.src = `img/${name}.${fileExtension}`;

  products.push(this);
}

function getRandomIndex() {
  return Math.floor(Math.random() * products.length);
}
let previousRound = [];
function renderImages() {
  let shownImages = [];

  while (shownImages.length < 3) {
    let randomIndex = getRandomIndex();
    while (!shownImages.includes(randomIndex) && !previousRound.includes(randomIndex)) {
      shownImages.push(randomIndex);
    }
  }

  console.log(shownImages);
  let imgOneIndex = shownImages[0];
  let imgTwoIndex = shownImages[1];
  let imgThreeIndex = shownImages[2];

  console.log(`votes in render images:  ${votes}`);
  imgOne.src = products[imgOneIndex].src;
  imgOne.alt = products[imgOneIndex].name;
  products[imgOneIndex].views++;

  imgTwo.src = products[imgTwoIndex].src;
  imgTwo.alt = products[imgTwoIndex].name;
  products[imgTwoIndex].views++;

  imgThree.src = products[imgThreeIndex].src;
  imgThree.alt = products[imgThreeIndex].name;
  products[imgThreeIndex].views++;

  previousRound = shownImages;
}
renderImages(); // initial image call to populate page

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
    renderChart();

    // LOCAL STORAGE BEGINS
    // step 1 get data ready to store
    let stringifiedProducts = JSON.stringify(products);
    console.log('stringifiedProducts equals: ', stringifiedProducts);
    // step 2 set in local storage
    localStorage.setItem('products', stringifiedProducts);
    // step 3 (below DOM references): access data out of local storage


  }

}




function renderChart() {

  let productNames = [];
  let productViews = [];
  let productVotes = [];

  for (let i = 0; i < products.length; i++) { // fills arrays with values from objects
    productNames.push(products[i].name);
    productViews.push(products[i].views);
    productVotes.push(products[i].clicks);
  }

  console.log(productNames);
  console.log(productViews);
  console.log(productVotes);

  let chartObject = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: productNames,
      datasets: [{
        label: '# of views',
        data: productViews,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      },
      {
        label: '# of Clicks',
        data: productVotes,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}


myContainer.addEventListener('click', handleClick);

