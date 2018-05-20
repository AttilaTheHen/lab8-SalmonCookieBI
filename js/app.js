'use strict';
/* globals StoreData airport, pioneer, powells, stjohns, waterfront */
/* exported addNewStore */

let storeArray = [airport, pioneer, powells, stjohns, waterfront];

let hourTotalArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let hourFooterTotal = document.getElementById('table-foot');
let grandCookieTotal = 0;

let newStoreLocation = document.getElementById('store-location');
let newStoreMin = document.getElementById('min-customers');
let newStoreMax = document.getElementById('max-customers');
let newStoreAvg = document.getElementById('avg-cookie');

let grandTotal;
let hourCell;

function addNewStore() {
    while(hourFooterTotal.firstChild) {
        hourFooterTotal.removeChild(hourFooterTotal.firstChild);
    }

    grandCookieTotal = 0;

    let hourlyLabel = document.createElement('td');
    hourlyLabel.textContent = 'Hourly Totals for All Locations';
    hourFooterTotal.appendChild(hourlyLabel);

    let locationName = newStoreLocation.value;
    let minCustomers = parseInt(newStoreMin.value);
    let maxCustomers = parseInt(newStoreMax.value);
    let storeAvg = parseFloat(newStoreAvg.value);

    newStoreLocation.value = '';
    newStoreMin.value = '';
    newStoreMax.value = '';
    newStoreAvg.value = '';
    
    let newStore = new StoreData(locationName, minCustomers, maxCustomers, storeAvg);

    // start of repetition
    let newStoreCookieTotal = 0;
    let newStoreTotal = document.createElement('td');

    let tableBody = document.getElementById('table-body');
    let storeRow = document.createElement('tr');
    tableBody.appendChild(storeRow);

    let storeName = newStore.storeLocation;
    let storeNameCell = document.createElement('td');
    storeNameCell.textContent = storeName;
    storeRow.appendChild(storeNameCell);

    for(let j = 0; j < 14; j++) {
        let customers = randomCustomers(newStore.min, newStore.max);
        let cookiesToBake = customers * newStore.avg;
        let storeCell = document.createElement('td');

        storeCell.textContent = Math.round(cookiesToBake);
        storeRow.appendChild(storeCell);

        newStoreCookieTotal += Math.round(cookiesToBake);
        newStoreTotal.textContent = newStoreCookieTotal;
        storeRow.appendChild(newStoreTotal);

        hourTotalArray[j] += (Math.round(cookiesToBake));
    }

    for(let l = 0; l < hourTotalArray.length; l++) {

        let hourCell = document.createElement('td');
        hourCell.textContent = hourTotalArray[l];
        // if()
        hourFooterTotal.appendChild(hourCell);
    
        grandCookieTotal += hourTotalArray[l];
    }
    
    let grandTotal = document.createElement('td');
    grandTotal.textContent = grandCookieTotal;
    hourFooterTotal.appendChild(grandTotal);
    // end of repetition
}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function randomCustomers(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function populateTableBody() {
    for(let i = 0; i < storeArray.length; i++) {
        let storeCookieTotal = 0;
        let storeTotal = document.createElement('td');
        
        let tableBody = document.getElementById('table-body');
        let storeRow = document.createElement('tr');
        tableBody.appendChild(storeRow);
    
        let storeName = storeArray[i].storeLocation;
        let storeNameCell = document.createElement('td');
        storeNameCell.textContent = storeName;
        storeRow.appendChild(storeNameCell);
        
        for(let j = 0; j < 14; j++) {
            let customers = randomCustomers(storeArray[i].min, storeArray[i].max);
            let cookiesToBake = customers * storeArray[i].avg;
            let storeCell = document.createElement('td');
    
            storeCell.textContent = Math.round(cookiesToBake);
            storeRow.appendChild(storeCell);
    
            storeCookieTotal += Math.round(cookiesToBake);
            storeTotal.textContent = storeCookieTotal;
            storeRow.appendChild(storeTotal);
    
            hourTotalArray[j] += (Math.round(cookiesToBake));
        }
    }

    for(let k = 0; k < hourTotalArray.length; k++) {
        hourCell = document.createElement('td');
        hourCell.textContent = hourTotalArray[k];
        hourFooterTotal.appendChild(hourCell);
    
        grandCookieTotal += hourTotalArray[k];
    }
    
    grandTotal = document.createElement('td');
    grandTotal.textContent = grandCookieTotal;
    hourFooterTotal.appendChild(grandTotal);
}

populateTableBody();

const newStoreButton = document.getElementById('submit-data');
newStoreButton.addEventListener('submit', addNewStore);