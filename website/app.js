const baseUrl = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&appid=92d02806586c8aae6674c4153a421d90&units=imperial';
const today = new Date();
const theDate = today.getMonth() + '.' + today.getDate() + '.' + today.getFullYear();
// Selecting Generate Button
const button = document.getElementById('generate');
// Initiating 'Click' listener
button.addEventListener('click', initiate);

function initiate() {
    const feeling = document.getElementById('feelings').value;
    const zipCode = document.getElementById('zip').value;
    getWeatherData(baseUrl, zipCode, apiKey)
        .then(function (data) {
            postData('/addAll', { date: theDate, feeling: feeling, temp: data.main.temp })
        })
        .then(function () {
            updateUI();
        });
}
//Fetch Data from OpenWeatherMap
const getWeatherData = async (url, zip, key) => {
    const response = await fetch(`${url}${zip}${key}`);
    try {
        const data = await response.json();
        return data;
    } catch (error) {
        console.log('!error', error)
    }
}
// add a POST route that adds incoming data to projectData
const postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    try {
        const newData = await response.json();
        console.log(newData);
        return newData;
    } catch (error) {
        console.error('!!error', error);
    }
}
// Update UI
const updateUI = async () => {
    const request = await fetch('/updated');
    try {
        const allData = await request.json();
        document.getElementById('date').innerHTML = 'Date: ' + allData[allData.length - 1].date;
        document.getElementById('temp').innerHTML = 'Temperature: ' + allData[allData.length - 1].temp + '°F';
        document.getElementById('content').innerHTML = 'Feeling: ' + allData[allData.length - 1].feeling;
    } catch (error) {
        console.error('!!!error', error);
    }
}















