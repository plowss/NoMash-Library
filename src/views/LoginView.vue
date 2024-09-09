<template>
    <div class="login-container">
      <h1>Login</h1>
      <form @submit.prevent="handleLogin">
        <div class="mb-3">
          <label for="username" class="form-label">Username</label>
          <input 
            type="text" 
            id="username" 
            class="form-control" 
            v-model="username" 
            required
          />
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Password</label>
          <input 
            type="password" 
            id="password" 
            class="form-control" 
            v-model="password" 
            required
          />
        </div>
        <button type="submit" class="btn btn-primary">Login</button>
      </form>
      <div v-if="errorMessage" class="text-danger mt-3">{{ errorMessage }}</div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
import { useRouter } from 'vue-router';
  
  const router = useRouter();
  const username = ref('');
  const password = ref('');
  const errorMessage = ref('');
  
  const handleLogin = () => {
    // Example: Hardcoded credentials
    const validUsername = 'admin';
    const validPassword = 'password123';
  
    if (username.value === validUsername && password.value === validPassword) {
      // Save authentication state (this could be a global state, e.g., using Pinia, Vuex, or a simple global ref)
      localStorage.setItem('isAuthenticated', 'true');
      
      // Redirect to a protected route or home
      router.push('/');
    } else {
      errorMessage.value = 'Invalid username or password';
    }
  };
  </script>
  
  <style scoped>
  .login-container {
    max-width: 400px;
    margin: 100px auto;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  
  h1 {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .form-control {
    margin-bottom: 10px;
  }
  
  button {
    width: 100%;
  }
  </style>
  