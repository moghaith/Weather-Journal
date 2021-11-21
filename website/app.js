/*const { response } = require("express");*/


/* Global Variables */
let baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
let apiKey ='&appid=368fbbe4658dc3cb8369e650cf3b80cf';
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

document.getElementById('generate').addEventListener('click', generateDetails);
const postData = async function(url = '', data = {}){
    console.log(data);
    const res = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    try{
        const nData = await res.json();
        return nData;
    }
    catch(error){
        console.log("error", error);
    }
}

function generateDetails(e){
    e.preventDefault();
    const cityZip = document.getElementById('zip').value;
    const userFeelings = document.getElementById('feelings').value;

        getZipWeather(baseURL, cityZip, apiKey) 
        .then(function(data){
            console.log(data);
            console.log({date:newDate, temp:data.main.temp, content: userFeelings});
        postData('/add', {date:newDate, temp:data.main.temp, content: userFeelings});
        }).then(function(){
            updateUI();
    });
};


const getZipWeather = async function(baseURL, zip, key){
    const res = await fetch(baseURL+zip+key)
    try{
        const data = await res.json();
        return data;
    }
    catch(error){
        console.log('error',error);
    }
}




const updateUI = async function(){
    const req = await fetch('/all');
    try{
        let allData = await req.json();
        console.log(allData);
        document.getElementById('date').innerHTML = `Date: ${allData.date}`;
        document.getElementById('temp').innerHTML = `Temperature: ${allData.temp}`;
        document.getElementById('content').innerHTML = `User feels ${allData.content}`;
        return allData;
    }
    catch(error){
        console.log('error', error);
    }
}
console.log(getZipWeather);