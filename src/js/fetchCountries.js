import { notice } from '@pnotify/core';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';

const searcInput = document.querySelector(".searc-input");
const countriesList = document.querySelector(".country-list");


searcInput.addEventListener("input", _.debounce(() => {
    getCountries(searcInput.value).then((data) => {
        createMarkup(data);
    });
}, 500));


const getCountries = (name) => {
    return fetch(`https://restcountries.com/v3.1/name/${name}`).then((data) => {
        return data.json();
    });
};

const createMarkup = (arr) => {
    let html;

    countriesList.innerHTML = "";
    html = "";

    if(arr.length > 10){
        notice({
            text: 'Дайте більш детальний запит',
            type: 'info',    
            delay: 3000   
        });
    } else if(arr.length >= 2 && arr.length <= 10){
        html = arr.map((obj) => {
            return `<li>
                <h1>${obj.name.official}</h1>
            </li>`;
        }).join("");
    } else if(arr.length === 1){
        html = arr.map((obj) => {
            return `<li>
                <img src="${obj.flags.png}" alt="1">
                <h1>${obj.name.official}</h1>
                <span>${obj.capital}</span>
                <span>${obj.population}</span>
            </li>`;
        }).join("");
    }
 


    countriesList.innerHTML = html;
};