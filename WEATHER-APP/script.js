document.addEventListener("DOMContentLoaded", function () {
  const temperatureField = document.querySelector(".temp");
  const locationField = document.querySelector(".location");
  const conditionField = document.querySelector(".condition");
  const humidityField = document.querySelector(".humidity");
  const windField = document.querySelector(".wind");
  const pressureField = document.querySelector(".pressure");
  const iconField = document.querySelector(".icon");
  const forecastContainer = document.querySelector(".forecast-container");
  const searchField = document.getElementById("searchInput");
  const form = document.querySelector(".search_form");

  let target = "mumbai";

  const fetchResult = async (targetLocation) => {
    try {
      const url = `https://api.weatherapi.com/v1/forecast.json?key=9b3a90576e1d43c38e5170411251307&q=${targetLocation},india&days=5&aqi=yes&alerts=yes`;
      const res = await fetch(url);
      const data = await res.json();

      // Display current weather
      locationField.textContent = `${data.location.name}, ${data.location.region}`;
      temperatureField.textContent = `${data.current.temp_c} °C`;
      conditionField.textContent = data.current.condition.text;
      humidityField.textContent = `Humidity: ${data.current.humidity}%`;
      windField.textContent = `Wind: ${data.current.wind_kph} kph`;
      pressureField.textContent = `Pressure: ${data.current.pressure_mb} mb`;
      iconField.innerHTML = `<img src="${data.current.condition.icon}" alt="icon">`;

      // Display today's forecast
      const today = data.forecast.forecastday[0];
      forecastContainer.innerHTML = `
        <div class="forecast-day">
          <p><strong>${today.date}</strong></p>
          <img src="${today.day.condition.icon}" alt="icon">
          <p>${today.day.condition.text}</p>
          <p>Max: ${today.day.maxtemp_c}°C, Min: ${today.day.mintemp_c}°C</p>
          <p>Humidity: ${today.day.avghumidity}%</p>
        </div>
      `;
    } catch (error) {
      alert("Failed to fetch weather data. Please check your API key or internet connection.");
      console.error(error);
    }
  };

  // Form submission logic
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const target = searchField.value.trim();
    if (target) {
      fetchResult(target);
      searchField.value = "";
    } else {
      alert("Please enter a location.");
    }
  });

  // Initial load
  fetchResult(target);
});
