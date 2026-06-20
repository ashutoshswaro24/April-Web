const headphones = [
{
    id: 1,
    name: "Sony WH-1000XM5",
    price: 24999,
    image: "https://images.pexels.com/photos/5382359/pexels-photo-5382359.jpeg"
},
{
    id: 2,
    name: "Boat Rockerz 550",
    price: 1999,
    image: "https://images.pexels.com/photos/30563921/pexels-photo-30563921.jpeg"
},
{
    id: 3,
    name: "JBL Tune 760NC",
    price: 5999,
    image: "https://images.pexels.com/photos/8597722/pexels-photo-8597722.jpeg"
},
{
    id: 4,
    name: "Noise Two Wireless",
    price: 2499,
    image: "https://images.pexels.com/photos/6863032/pexels-photo-6863032.jpeg"
},
{
    id: 5,
    name:"Bose Rockz",
    price:3999,
    image: "https://images.pexels.com/photos/17664053/pexels-photo-17664053.jpeg" 
},
{
    id:5,
    name:"Panasonic",
    price:4999,
    image:"https://images.pexels.com/photos/346642/pexels-photo-346642.jpeg"
}
];

const productsContainer = document.getElementById("products");
const searchInput = document.getElementById("search");
const darkBtn = document.getElementById("darkMode");

let cartCount = 0;

// Cart Counter Element
const cartDisplay = document.createElement("h3");
cartDisplay.style.textAlign = "center";
cartDisplay.innerText = "Cart Items: 0";
document.body.insertBefore(cartDisplay, productsContainer);

// Display Products
function displayProducts(productList){

    productsContainer.innerHTML = "";

    productList.forEach(product => {

        const card = document.createElement("div");

        card.classList.add("card");

        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>Price: ₹${product.price}</p>
            <button class="buy-btn" data-id="${product.id}">
                Buy Now
            </button>
        `;

        productsContainer.appendChild(card);
    });
}

// Initial Load
displayProducts(headphones);

// Search Products
searchInput.addEventListener("keyup", function(){

    const value = this.value.toLowerCase();

    const filteredProducts = headphones.filter(product =>
        product.name.toLowerCase().includes(value)
    );

    displayProducts(filteredProducts);
});

// Dark Mode
darkBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    if(document.body.classList.contains("dark")){
        darkBtn.innerText = "Light Mode";
    }
    else{
        darkBtn.innerText = "Dark Mode";
    }
});

// Event Delegation for Buy Buttons
productsContainer.addEventListener("click", function(event){

    if(event.target.classList.contains("buy-btn")){

        cartCount++;

        cartDisplay.innerText =
        `Cart Items: ${cartCount}`;

        event.target.innerText = "Added ✓";
        event.target.disabled = true;

        alert("Product Added To Cart");
    }
});

// Hero Button
document.getElementById("heroBtn")
.addEventListener("click", function(){

    cartCount++;

    cartDisplay.innerText =
    `Cart Items: ${cartCount}`;

    this.innerText = "Added To Cart ✓";
});