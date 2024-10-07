<template>
    <div class="container">
      <h1>All Books</h1>
      <!-- Display a loading message while data is being fetched -->
      <div v-if="!books && !error">Loading...</div>
  
      <!-- Display error message if there is any error -->
      <div v-if="error">
        <p>Error fetching book information: {{ error }}</p>
      </div>
  
      <!-- Display the books in JSON format if data is fetched successfully -->
      <pre v-if="books">{{ books }}</pre>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'GetAllBookAPI',
    data() {
      return {
        books: null, 
        error: null, 
      };
    },
    mounted() {
      this.getAllBooksAPI();
    },
    methods: {
      async getAllBooksAPI() {
        try {
          const response = await axios.get('https://countbooks-xftp3xohca-uc.a.run.app'); 
          this.books = response.data; 
          this.error = null; 
        } catch (error) {
          console.error('Error fetching books:', error);
          this.error = error.message || 'Failed to fetch books'; 
          this.books = null;
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .container {
    text-align: center;
    margin: 20px;
  }
  
  pre {
    text-align: left;
    background-color: #f4f4f4;
    padding: 15px;
    border-radius: 5px;
  }
  </style>
  