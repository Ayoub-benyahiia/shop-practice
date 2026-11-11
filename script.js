
const urlproduct = 'http://localhost:3000/api/products'
const urlcategory = 'http://localhost:3000/api/categories'
const urlreservation = 'http://localhost:3000/api/reservations'

const searchInput = document.getElementById("search-input");

const productsContainer = document.getElementById("products-container");
const message = document.getElementById("message");
const productGrid = document.getElementById("products-grid");











async function getProducts() {
    message.textContent = "Chargement des produits..."
    try {
        const response = await fetch(urlproduct);

        if (!response.ok) {
            throw new Error("Error:" + response.status);
        }

        const products = await response.json();
        // console.log(products);
        message.textContent = ""
        setTimeout(()=> {displayProducts(products)},3000)
    }
    catch (error) {
        message.textContent = "Impossible de charger les produits. Veuillez réessayer."
        console.log(error.message)
    }

};
getProducts()

function displayProducts(products) {
    productGrid.innerHTML = ""
    if (products.length === 0) {
        return message.textContent = 'Aucun produit disponible pour le moment.'
    }

    products.forEach(product => {

        const card = document.createElement("div");

        card.innerHTML = `
        <a href="javascript:;"
                       class="mx-auto sm:mr-0 group cursor-pointer lg:mx-auto bg-white transition-all duration-500">
                       <div class="">
                           <img src= "http://localhost:3000${product.image}" alt="face cream image"
                               class="w-full aspect-square rounded-2xl object-cover">
                       </div>
                       <div class="mt-5">
                           <div class="flex items-center justify-between">
                               <h6
                                   class="font-semibold text-xl leading-8 text-black transition-all duration-500 group-hover:text-indigo-600">${product.name}</h6>
                               <h6 class="font-semibold text-xl leading-8 text-indigo-600">${product.price}</h6>
                           </div>
                           <p class="mt-2 font-normal text-sm leading-6 text-gray-500">${product.description}</p>
                           <p class="mt-2 font-normal text-sm leading-6 text-gray-500">${product.categoryName}</p>
                           <p class="mt-1 font-normal text-sm leading-6 text-gray-500">Stock: ${product.stock}</p>
                       </div>
                   </a>
`;

        productGrid.appendChild(card);
    });
};


function productSearch() {
    searchInput.addEventListener("input", function () {
        console.log(searchInput.value);
        fetch(`${urlproduct}?search=${searchInput.value}`)
            .then(response => response.json())
            .then(products => {
                if (products.length === 0) {
                    productGrid.innerHTML = "<p>Aucun résultat trouvé.</p>";
                }
                else {
                    displayProducts(products)
                }
            });
    });
};
productSearch()