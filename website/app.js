/* Global Variables */
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey ='&appid=368fbbe4658dc3cb8369e650cf3b80cf&units=imperial';
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth() + 1) + '/'+ d.getDate()+'/'+ d.getFullYear();
//collect data when generate button is clicked
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
//function to update the UI with the data from the API
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

//Function to grap data from API, and send it to server
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


//function to update the web page with the data (weather, user input)
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