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

// Reference to your menu items in Firebase
const menuRef = collection(database, 'restaurants/TPEtLDsrVi3dxxyAtuhL/menu');

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
    items.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'grid-item';
        itemDiv.innerHTML = `<strong>${item["item_name"]}</strong><br>$${item.price.toFixed(2)}`;
        menuDiv.appendChild(itemDiv);
    });
}


document.addEventListener('DOMContentLoaded', async () => {
    const menuItems = await fetchMenuItems();
    displayMenu(menuItems);
});

