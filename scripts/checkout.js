var total = localStorage.getItem('total-price');

document.getElementsByClassName().textContent = total;

var customerName = localStorage.getItem('customerName');
var customerEmail = localStorage.getItem('customerEmail');

document.querySelector('input[name="name"]').value = customerName;
document.querySelector('input[name="email"]').value = customerEmail;