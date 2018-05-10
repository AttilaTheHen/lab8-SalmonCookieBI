/* globals StoreData */

let airport = new StoreData('PDX Airport', 23, 65, 6.3);
let pioneer = new StoreData('Pioneer Square', 3, 24, 1.2);
let powells = new StoreData('Powells', 11, 38, 3.7);
let stjohns = new StoreData('St Johns', 20, 38, 2.3);
let waterfront = new StoreData('Waterfront', 2, 16, 4.6);

let storeArray = [airport, pioneer, powells, stjohns, waterfront];
// let hoursArray = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm'];

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function randomCustomers(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

let hourCookieTotal = 0;
let hourTotalRow = document.getElementById('table-foot');
let hourTotal = document.createElement('td');

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

        console.log('store', storeName);
        console.log('random customers', customers);

        storeCookieTotal += Math.round(cookiesToBake);
        storeTotal.textContent = storeCookieTotal;
        storeRow.appendChild(storeTotal);

        hourCookieTotal += Math.round(cookiesToBake);
        hourTotal.textContent = hourCookieTotal;
        hourTotalRow.appendChild(hourTotal);
    }
}
