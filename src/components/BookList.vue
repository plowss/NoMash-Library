<template>
    <div>
      <h1>Books with ISBN > 1000</h1>
      <ul>
        <li v-for="book in books" :key="book.id">
          {{ book.name }} - ISBN: {{ book.isbn }}
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import { collection, getDocs, limit, orderBy, query, where } from 'firebase/firestore';
import { onMounted, ref } from 'vue';
import db from '../firebase/init.js';
  
  export default {
    setup() {
      const books = ref([]);
  
      const fetchBooks = async () => {
        try {
          // First query: Fetch books where ISBN is greater than 1000, ordered by ISBN, limit to 10 books
          const q1 = query(
            collection(db, 'books'), 
            where('isbn', '>', 1000), 
            orderBy('isbn', 'asc'), 
            limit(10)
          );
          
          const querySnapshot1 = await getDocs(q1);
          const booksArray = [];
          
          querySnapshot1.forEach((doc) => {
            booksArray.push({ id: doc.id, ...doc.data() });
          });
  
          // Assign the final books array
          books.value = booksArray;
          
        } catch (error) {
          console.error('Error fetching books: ', error);
        }
      };
  
      onMounted(() => {
        fetchBooks();
      });
  
      return {
        books,
      };
    },
  };
  </script>
  