const orderSummaryString = sessionStorage.getItem('orderSummary');
const priceListString = sessionStorage.getItem('priceList');
// convert string to array
const orderSummaryArray = JSON.parse(orderSummaryString);
const priceListArray = JSON.parse(priceListString);
// Convert the array of entries back to a map
const orderSummary = new Map(orderSummaryArray);
const priceMap = new Map(priceListArray);


let totalAmount = 0;
document.addEventListener('DOMContentLoaded',  () => {
    const orderSummaryDiv = document.getElementById('order-summary');
    const orderTotalDiv = document.getElementById('total-amount');
    
      // Display the order summary
      orderSummary.forEach((value, key) => {
        const itemDiv = document.createElement('div');
        itemDiv.innerHTML = `<strong>${key}</strong>&#x20B9 ${priceMap.get(key)} x ${value}`;
        const itemTotal = (parseFloat(priceMap.get(key)) * (value))
        totalAmount = totalAmount +  itemTotal
       
        
        orderSummaryDiv.appendChild(itemDiv);
      });
      orderTotalDiv.innerHTML = `Total: &#x20B9 ${totalAmount.toFixed(2)}`;
    
  });
  
