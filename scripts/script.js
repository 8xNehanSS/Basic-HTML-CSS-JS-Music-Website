//  Cart
let cartIcon = document.querySelector("#cart-icon");
let cart = document.querySelector(".cart");
let closeCart = document.querySelector("#close-cart");
// Open Cart
cartIcon.onclick = () => {
  cart.classList.add("active");
};
// Close Cart
closeCart.onclick = () => {
  cart.classList.remove("active");
};

// Cart Working 
if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

// Functions
function ready() {
  // To reomve items from the cart
  var reomveCartButtons = document.getElementsByClassName("remove-cart");
  console.log(reomveCartButtons);
  for (var i = 0; i < reomveCartButtons.length; i++) {
    var button = reomveCartButtons[i];
    button.addEventListener("click", removeItem);
  }
  // For the quantity changes
  var quantityInputs = document.getElementsByClassName("cart-quantity");
  for (var i = 0; i < quantityInputs.length; i++) {
    var input = quantityInputs[i];
    input.addEventListener("change", quantityChanged);
  }
  // for the function to add items to the cart
  var addCart = document.getElementsByClassName("add-cart");
  for (var i = 0; i < addCart.length; i++) {
    var button = addCart[i];
    button.addEventListener("click", addCartClicked);
  }
  // Buy Button Work
  document
    .getElementsByClassName("button-buy")[0]
    .addEventListener("click", buyButtonClicked);
}
// Function for buy button click
function buyButtonClicked() {

  var customerName = document.querySelector('input[name="name"]');
  var customerEmail = document.querySelector('input[name="email"]');

  alert("Your Order is placed");
  var cartContent = document.getElementsByClassName("cart-content")[0];

  localStorage.setItem('customerName', customerName.value);
  localStorage.setItem('customerEmail', customerEmail.value);

  // Redirects to checkout once buy button is
  window.location.href = 'checkout.html';

  totalUpdate();

  while(cartContent.hasChildNodes()){
    cartContent.removeChild(cartItems.firstChild)
}

}

// Function to remove items from the cart
function removeItem(event) {
  var buttonClicked = event.target;
  buttonClicked.parentElement.remove();
  totalUpdate();
}

// Function for changing quantity
function quantityChanged(event) {
  var input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  totalUpdate();
}
// Function to add to cart
function addCartClicked(event) {
  var button = event.target;
  var shopProducts = button.parentElement;
  var title = shopProducts.getElementsByClassName("album-title")[0].innerText;
  var price = shopProducts.getElementsByClassName("price")[0].innerText;
  var productImg = shopProducts.getElementsByClassName("album-img")[0].src;
  addProductToCart(title, price, productImg);
  totalUpdate();
}
function addProductToCart(title, price, productImg) {
  var cartShopBox = document.createElement("div");
  cartShopBox.classList.add("cart-slot");
  var cartItems = document.getElementsByClassName("cart-content")[0];
  var cartItemsNames = cartItems.getElementsByClassName("cart-product-title");
  for (var i = 0; i < cartItemsNames.length; i++) {
    if (cartItemsNames[i].innerText == title) {
      alert("This album has already been added to the cart");
      return;
    }
  }
  var cartBoxContent = `
                        <img src="${productImg}" alt="" class="cart-img">
                        <div class="detail-box">
                            <div class="cart-product-title">${title}</div>
                            <div class="cart-price">${price}</div>
                            <input type="number" value="1" class="cart-quantity">
                        </div>
                        <!-- Remove Cart -->
                        <i class='bx bxs-trash-alt remove-cart' ></i>`;
  cartShopBox.innerHTML = cartBoxContent;
  cartItems.append(cartShopBox);
  cartShopBox
    .getElementsByClassName("remove-cart")[0]
    .addEventListener("click", removeItem);
  cartShopBox
    .getElementsByClassName("cart-quantity")[0]
    .addEventListener("change", quantityChanged);
}

// Function for the total updating real time
function totalUpdate() {
  var cartContent = document.getElementsByClassName("cart-content")[0];
  var albumSlots = cartContent.getElementsByClassName("cart-slot");
  var total = 0;
  for (var i = 0; i < albumSlots.length; i++) {
    var cartBox = albumSlots[i];
    var priceElement = cartBox.getElementsByClassName("cart-price")[0];
    var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
    var price = parseFloat(priceElement.innerText.replace("$", ""));
    var quantity = quantityElement.value;
    total = total + price * quantity;
  }
  
  // Stores the total in local storage to recall in checkout 
  localStorage.setItem('total-price', '$' + total.toFixed(2));

  document.getElementsByClassName("total-price")[0].innerText = "$" + total;

}