const orderSummaryString = sessionStorage.getItem('orderSummary');
const priceListString = sessionStorage.getItem('priceList');

const orderSummaryArray = JSON.parse(orderSummaryString);
const priceListArray = JSON.parse(priceListString);
// Convert the array of entries back to a map
const orderSummary = new Map(orderSummaryArray);
const priceMap = new Map(priceListArray);