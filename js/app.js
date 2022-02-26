/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
'use strict';

let myContainer = document.getElementById('container');
let imgOne = document.getElementById('imgOne');
let imgTwo = document.getElementById('imgTwo');
let imgThree = document.getElementById('imgThree');
let ctx = document.getElementById('chart').getContext('2d');

// accessing any existing local storage

let localProducts = localStorage.getItem('products');

// step 4
let parsedProducts = JSON.parse(localProducts);

let votes = 25;

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

  let imgOneIndex = shownImages[0];
  let imgTwoIndex = shownImages[1];
  let imgThreeIndex = shownImages[2];

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
    // step 2 set in local storage
    localStorage.setItem('products', stringifiedProducts);
  }

}

function renderChart() {
  let productNames = [];
  let productViews = [];
  let productVotes = [];

  for (let i = 0; i < products.length; i++) {
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
