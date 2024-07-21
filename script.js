import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBo40cRy16_ihG26qGP8eS-yC-IogF5CJA",
    authDomain: "food-order-via-qr.firebaseapp.com",
    projectId: "food-order-via-qr",
    storageBucket: "food-order-via-qr.appspot.com",
    messagingSenderId: "379962427721",
    appId: "1:379962427721:web:16df1b9d87b6c4a01e7298",
    measurementId: "G-JDSZTEBKC2"
};
// Initialize Firebase
initializeApp(firebaseConfig);
const database = getFirestore();
var getValue = JSON.parse(sessionStorage.getItem('jsData'))


// Reference to your menu items in Firebase
const menuRef = collection(database, 'restaurants/'+getValue.restId+'/menu');

document.getElementById('restaurant-name').textContent = getValue.restName
async function fetchMenuItems() {
    const arr = [];
    const snapshot = await getDocs(menuRef);
    snapshot.docs.forEach((doc) => {
        arr.push({ ...doc.data() });
    });
    return arr;
}

function displayMenu(items) {
    const menuDiv = document.getElementById('menu');
    items.forEach((item, index) => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'grid-item';
        itemDiv.id = 'grid-item-id'
        itemDiv.innerHTML = `<strong>${item["item_name"]}</strong>
        <p>&#x20B9 ${item.price.toFixed(2)}</p>
        <div class="quantity-controls">
        <button class="quantity-btn decrease" data-index="${index}" data-name="${item["item_name"]}" data-price="${item.price}">-</button>
        <span class="quantity" id="quantity-${index}">0</span>
        <button class="quantity-btn increase" data-index="${index}" data-name="${item["item_name"]}" data-price="${item.price}">+</button>
      </div>`;
        menuDiv.appendChild(itemDiv);
        
    });
    attachEventListeners();
}

function attachEventListeners() {
    const increaseButtons = document.querySelectorAll('.increase');
    const decreaseButtons = document.querySelectorAll('.decrease');
  
    increaseButtons.forEach(button => {
        button.addEventListener('click', handleIncrease);
    });
  
    decreaseButtons.forEach(button => {
      button.addEventListener('click', handleDecrease);
    });
  }

  var itemQuantitySelected = new Map();
  var priceMap = new Map();
  
  function handleIncrease(event) {
    const index = event.target.getAttribute('data-index');
    const quantitySpan = document.getElementById(`quantity-${index}`);
    const itemName = event.target.getAttribute('data-name');
    const itemPrice = event.target.getAttribute('data-price');
    let quantity = parseInt(quantitySpan.textContent, 10);
    quantity += 1;
    quantitySpan.textContent = quantity;
    if(!priceMap.has(itemName)){
        priceMap.set(itemName , itemPrice)
    }
    if(itemQuantitySelected.has(itemName)){
        itemQuantitySelected.set(itemName , quantity)

    }else{
        itemQuantitySelected.set(itemName, 1)
    }
    
    
  }
  
  function handleDecrease(event) {
    const index = event.target.getAttribute('data-index');
    const quantitySpan = document.getElementById(`quantity-${index}`);
    const itemName = event.target.getAttribute('data-name');
    const itemPrice = event.target.getAttribute('data-price');
    let quantity = parseInt(quantitySpan.textContent, 10);
    if (quantity > 0) {
      quantity -= 1;
      itemQuantitySelected.set(itemName , quantity)
    }

    if(quantity == 0){
        priceMap.delete(itemName)
        itemQuantitySelected.delete(itemName)
    }
    
    quantitySpan.textContent = quantity;
   
  }

  document.getElementById('order-button').onclick = () =>{
    if(itemQuantitySelected.size != 0){
      

      
        sessionStorage.setItem('orderSummary', JSON.stringify(Array.from(itemQuantitySelected.entries())));
        sessionStorage.setItem('priceList', JSON.stringify(Array.from(priceMap.entries())));
        
        location.href = "PlaceOrder.html"
        
    }
  }


  
document.addEventListener('DOMContentLoaded', async () => {
    const menuItems = await fetchMenuItems();
    displayMenu(menuItems);
});

