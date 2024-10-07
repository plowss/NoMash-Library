<template>
    <div>
      <h1>Add a New Book</h1>
      <form @submit.prevent="submitBook">
        <div>
          <label for="name">Name:</label>
          <input type="text" v-model="name" id="name" required />
        </div>
        <button type="submit">Add Book</button>
      </form>
    </div>
  </template>
  
  <script>
  import { addDoc, collection } from 'firebase/firestore';
import { ref } from 'vue';
import db from '../firebase/init.js';
  
  export default {
    setup() {
      const name = ref(''); 
  
      const submitBook = async () => {
        try {
          await addDoc(collection(db, 'books'), {
            name: name.value, 
          });
  
          name.value = ''; 
          alert('Book added successfully!');
        } catch (error) {
          console.error('Error adding book:', error);
        }
      };
  
      return {
        name,
        submitBook,
      };
    },
  };
  </script>
  