const loadAllProducts = async () => {
  //   console.log("click all products ");
  const url = "https://fakestoreapi.com/products";
  const res = await fetch(url);
  const data = await res.json();
  return data;
  console.log(data);
};

const allMenu = async () => {
  const data = await loadAllProducts();
  const menu = document.getElementById("all-menu");
  menu.textContent = "";
  const uniqueArray = [];

  data.forEach((product) => {
    if (uniqueArray.indexOf(product.category) === -1) {
      uniqueArray.push(product.category);
      const li = document.createElement("li");
      li.innerHTML = `
    <a>${product.category}</a>
    `;
      menu.appendChild(li);
    }
    // console.log(product.category);
    // const foundMenu = data.filter((product) => product.category);
    // console.log(foundMenu);
  });
};
allMenu();

// loadAllProducts();

// search-field
const searchField = document.getElementById("search-field");
searchField.addEventListener("keypress", async (e) => {
  // console.log(e.key);
  if (e.key === "Enter") {
    const searchValue = searchField.value;
    const allProducts = await loadAllProducts();
    // console.log(allProducts);
    const foundProducts = allProducts.filter((product) =>
      product.category.includes(searchValue)
    );
    const ProductShow = document.getElementById("products-show");
    ProductShow.textContent = "";

    foundProducts.forEach((foundProduct) => {
      console.log(foundProduct.rating.count);
      const { id, image, category, description, rating } = foundProduct;
      console.log(foundProduct);
      const displayDiv = document.createElement("div");
      displayDiv.innerHTML = `
      <div class="card  bg-base-100 shadow-xl">
      <figure><img class="h-40" src="${foundProduct.image}" alt="Shoes" /></figure>
      <div class="card-body">
        <h2 class="card-title">${foundProduct.category}</h2>
        <p>If a dog chews shoes whose shoes does he choose?</p>
        <div class="card-actions justify-end">
          
          <label for="my-modal-3" onclick= "productDatails('${rating.count}','${description}','${image}','${id}')" class="btn btn-primary modal-button">Products Details</label>
        </div>
      </div>
    </div>
      `;
      ProductShow.appendChild(displayDiv);
    });

    // console.log(foundProducts);
  }
});
// Product details display
const productDatails = async (rating, description, image, id) => {
  const productContainer = document.getElementById("products-datails");

  productContainer.innerHTML = `
              <img src="${image}" alt="">
              <h2>${rating}</h2>
              <p class="py-4">
              ${description}
              </p>
              <p>${rating}</p>
  `;
};
