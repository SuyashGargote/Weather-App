
const APIKEY = "f90657b62dba311c13f4d05680a021a5";
const submitbtn = document.getElementById("getWeatherBtn");

submitbtn.addEventListener("click" , async event => {
    event.preventDefault();
    const city = document.getElementById("cityName").value.toLowerCase();

    if(city){
        try{
            const weatherData = await getWeather(city);
            displayWeather(weatherData);
        }
        catch(error){
            console.error(error);
            displayError(error);
        }
    }
    
})
function displayWeather(data){ 

    const {name:city, 
           main: {temp, humidity}, 
           weather: [{description, id}]} = data;
  
    const nameDisplay = document.getElementById("displayCityName");
    nameDisplay.textContent = city;


    const tempDisplay = document.getElementById("displayTemp");
    tempDisplay.textContent = `${(temp - 273.15).toFixed(2)}°C`;


    const humid = document.getElementById("displayHumidity");
    humid.textContent = `Humidity: ${humidity}%`;


    const disc = document.getElementById("displayDescription");
    disc.textContent = description;
    
    const displaCard = document.getElementById("weatherInfoCard")
    displaCard.style.display = "block";
}
async function getWeather(city){
    const apiURL = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKEY}`

    const response = await fetch(apiURL);
    if(!response.ok){
        throw new Error("could not fetch data");
    }

    return await response.json(); 
    
}
function displayError(){
    const displaCard = document.getElementById("weatherInfoCard");
    window.alert("Enter a valid city");
    if (displaCard.style.display == "block"){
        displaCard.style.display = "none";  
    }
}
