//Feature #1 In your project, display the current date and time using JavaScript: Tuesday 16:00
let currentDayTime = document.querySelector("div.current-day-time");
let getDate = new Date();
let daysWeek = [
  "Sunday",
  "Monday",
  "Thursday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let hours = getDate.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = getDate.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let dayWeek = daysWeek[getDate.getDay()];
currentDayTime.innerHTML = `${dayWeek} ${hours}:${minutes}`;

//Bonus Feature Display a fake temperature (i.e 17) in Celsius and add a link to convert it to Fahrenheit. When clicking on it, it should convert the temperature to Fahrenheit. When clicking on Celsius, it should convert it back to Celsius.
//.celsius,
//.slash,
//.fahrenheit {

function displayCelsius(event) {
  event.preventDefault();
  let displayCelsius = document.querySelector("h1");
  let celsius = displayCelsius.innerHTML;
  displayCelsius.innerHTML = Math.round(((celsius - 32) * 5) / 9);
}
let celsiusClick = document.querySelector("a.celsius");
celsiusClick.addEventListener("click", displayCelsius);

function displayFarenheit(event) {
  event.preventDefault();
  let displayFarenheit = document.querySelector("h1");
  let fahrenheit = displayFarenheit.innerHTML;
  displayFarenheit.innerHTML = Math.round((fahrenheit * 9) / 5 + 32);
}

let fahrenheitClick = document.querySelector("a.fahrenheit");
fahrenheitClick.addEventListener("click", displayFarenheit);

//Week 5 homework
let apiKey = `a3d275d0c62f37f06493e41c90246b63`;

//Current temprerature and location by default
function showWeather(response) {
  let currentTemp = Math.round(response.data.main.temp);
  let h1Replace = document.querySelector(`h1`);
  h1Replace.innerHTML = `${currentTemp}`;
  let currentLocation = response.data.name;
  let h2Replace = document.querySelector(`h2`);
  h2Replace.innerHTML = `${currentLocation}`;
  let currentSky = response.data.weather[0].main;
  let sky = document.querySelector(`div.current-weather`);
  sky.innerHTML = `${currentSky}`;
  let currentWindSpeed = response.data.wind.speed;
  let windSpeed = document.querySelector(`div.current-wind-speed`);
  windSpeed.innerHTML = `Wind speed: ${currentWindSpeed}`;
  let currentHumidity = response.data.main.humidity;
  let humidity = document.querySelector(`div.current-humidity`);
  humidity.innerHTML = `Humidity: ${currentHumidity}`;
  //Current weather img chainging - daytime
  let getDate = new Date();
  let imgHours = getDate.getHours();
  if (imgHours > 6 && imgHours < 20) {
    if (currentSky === `Clear`) {
      // /Veron-me/Weather-web/blob/main/img/cloudy_windy.png?raw=true
      document.getElementById("currentWeatherImg").src =
        "https://github.com/Veron-me/Weather-web/blob/main/img/sun.png?raw=true";
    } else if (currentSky === `Clouds`) {
      document.getElementById("currentWeatherImg").src =
        "https://github.com/Veron-me/Weather-web/blob/main/img/partly_cloudy.png?raw=true";
    } else if (currentSky === `Rain`) {
      document.getElementById(
        "currentWeatherImg"
      ).src = `https://github.com/Veron-me/Weather-web/blob/main/img/rain.png?raw=true`;
    } else {
      document.getElementById("currentWeatherImg").src = `...`;
    }
  } else {
    if (currentSky === "Clear") {
      document.getElementById(
        "currentWeatherImg"
      ).src = `https://github.com/Veron-me/Weather-web/blob/main/img/moon.png?raw=true`;
    } else if (currentSky === "Clouds") {
      document.getElementById(
        "currentWeatherImg"
      ).src = `https://github.com/Veron-me/Weather-web/blob/main/img/night_cloudy(2).png?raw=true`;
    } else if (currentSky === `Rain`) {
      document.getElementById(
        "currentWeatherImg"
      ).src = `https://github.com/Veron-me/Weather-web/blob/main/img/rain.png?raw=true`;
    } else {
      changeImg.src = `I have to find a picture((((`;
    }
  }
  //Time change. Not working!
  /*
  let searchedTimeZone = response.data.timezone;
  let searchedCodeCountry = response.data.sys.country;
  alert(`${searchedTimeZone}`);
  alert(`${getDate}`);
  let searchedTime = getDate.toLocaleString(`${searchedCodeCountry}`, {
    timeZone: `${searchedCodeCountry}`,
  });
  alert(`${searchedTime}`);*/
}

function currentPos(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(`${weatherUrl}`).then(showWeather);
}

navigator.geolocation.getCurrentPosition(currentPos);

//Button current location and weather
function currentPosTemp() {
  navigator.geolocation.getCurrentPosition(currentPos);
}

let buttonCurrLoc = document.querySelector("button");
buttonCurrLoc.addEventListener("click", currentPosTemp);

//Functions for searched city

function searchedCity(event) {
  event.preventDefault();
  let city = document.querySelector("h2.current-city");
  let inputedCity = document.querySelector("#city-input");
  city.innerHTML = `${inputedCity.value}`;
  let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${inputedCity.value}&units=metric&appid=${apiKey}`;
  axios.get(`${weatherUrl}`).then(showWeather);
}

//Button searched city
let inputCity = document.querySelector("#search-data");
inputCity.addEventListener("submit", searchedCity);
