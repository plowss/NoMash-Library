<template>
    <div class="container">
      <div class="header">
        <h1>WEATHER APP</h1>
        <div class="search-bar">
          <input
            type="text"
            v-model="city"
            placeholder="Enter city name (e.g., Clayton, AU)"
            class="search-input"
          />
          <button @click="searchByCity" class="search-button">Search</button>
        </div>
      </div>
  
      <!-- Main content area displaying the weather data -->
      <main>
        <!-- If there is weather data available, display the information -->
        <div v-if="weatherData">
          <!-- Display the location and country name -->
          <h2>
            {{ weatherData.name }}, {{ weatherData.sys.country }}
          </h2>
          <div>
            <!-- Display the weather icon using iconUrl computed property -->
            <img :src="iconUrl" alt="Weather Icon" />
            <!-- Display the temperature in Celsius -->
            <p>{{ temperature }} °C</p>
          </div>
          <!-- Display the description of the weather -->
          <span>{{ weatherData.weather[0].description }}</span>
        </div>
  
        <!-- If there's an error or no weather data available, show an error message -->
        <p v-if="error">{{ error }}</p>
      </main>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  const apikey = "2414a96d7fd7b590e8e743a8fcee3895";
  
  export default {
    name: "App",
    data() {
      return {
        city: "", // Holds the city input by the user
        weatherData: null, // Stores the weather data fetched from API
        error: null, // Error message in case the API call fails
      };
    },
    computed: {
      // Converts temperature from Kelvin to Celsius
      temperature() {
        return this.weatherData
          ? Math.floor(this.weatherData.main.temp - 273.15) // Fixed to 273.15 for Celsius conversion
          : null;
      },
      // Dynamically get the weather icon from OpenWeatherMap
      iconUrl() {
        return this.weatherData
          ? `http://openweathermap.org/img/w/${this.weatherData.weather[0].icon}.png`
          : null;
      },
    },
    methods: {
      // Fetches the weather data for the current location using geolocation
      async fetchCurrentLocationWeather() {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords;
            const url = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apikey}`;
            await this.fetchWeatherData(url);
          });
        } else {
          this.error = "Geolocation is not supported by this browser.";
        }
      },
      // Fetches weather data based on the provided URL
      async fetchWeatherData(url) {
        try {
          const response = await axios.get(url);
          this.weatherData = response.data;
          this.error = null; // Clear any previous error message
        } catch (error) {
          this.error = "Error fetching weather data. Please try again.";
          console.error("Error fetching weather data:", error);
        }
      },
      // Fetches weather data by city name entered by the user
      searchByCity() {
        if (this.city) {
          const url = `http://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${apikey}`;
          this.fetchWeatherData(url);
        } else {
          this.error = "Please enter a valid city name.";
        }
      },
    },
    mounted() {
      // Fetch weather data for current location when the app is mounted
      this.fetchCurrentLocationWeather();
    },
  };
  </script>
  
  <style scoped>
  /* Add some basic styling */
  .container {
    text-align: center;
    margin-top: 20px;
  }
  
  .search-bar {
    margin-bottom: 20px;
  }
  
  .search-input {
    padding: 10px;
    width: 200px;
  }
  
  .search-button {
    padding: 10px;
    margin-left: 10px;
  }
  
  img {
    width: 50px;
    height: 50px;
  }
  </style>
  