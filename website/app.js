const { response } = require("express");
let d = new Date();

/* Global Variables */
let baseURL = 'api.openweathermap.org/data/2.5/weather?zip='
let apiKey ='&appid=368fbbe4658dc3cb8369e650cf3b80cf'
// Create a new date instance dynamically with JS
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

document.getElementById('generate').addEventListener('click', generateDetails);

function generateDetails(e){
    const cityZip = document.getElementById('zip').value;
    const userFeelings = document.getElementById('feelings').value;

        getZipWeather(baseURL, cityZip, apiKey) 
        .then(function(data){
            console.log(data);

        postData('/add', {date:d, temp:data.list[0].main.temp, content: userFeelings})
        updateUI();
    })
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

const PostData = async function(url = '', data = {}){
    console.log(data);
    const res = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'applictaion/json'
        },
        body: JSON.stringify(data)
    });
    try{
        const nData = await response.json();
        return nData;
        console.log(nData);
    }
    catch(error){
        console.log("error", error);
    }
}


const updateUI = async function(){
    const req = await fetch('/all');
    try{
        const allData = await req.json();
        document.getElementById('date').innerHTML = `Date: ${allData[0].date}`;
        document.getElementById('temp').innerHTML = `Temperature: ${allData[0].temp}`;
        document.getElementById('content').innerHTML = `User feels ${allData[0].content}`;
    }
    catch(error){
        console.log('error', error);
    }
}
