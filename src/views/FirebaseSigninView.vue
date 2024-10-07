<template>
  <h1>Sign in</h1>
  <p><input type="text" placeholder="Email" v-model="email" /></p>
  <p><input type="password" placeholder="Password" v-model="password" /></p>
  <p>
    <button @click="signin" :disabled="loading">
      <span v-if="loading">Signing in...</span>
      <span v-else>Sign in via Firebase</span>
    </button>
  </p>
  <p v-if="errorMessage" style="color: red;">{{ errorMessage }}</p> <!-- Display errors to the user -->
</template>

<script setup>
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { ref } from "vue";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const errorMessage = ref(""); 
const loading = ref(false); // To prevent multiple requests
const router = useRouter();
const auth = getAuth();

const signin = () => {
  errorMessage.value = ""; 
  if (!email.value || !password.value) {
    errorMessage.value = "Please enter both email and password.";
    return;
  }

  loading.value = true; 
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then(() => {
      console.log("Firebase Sign-in Successful!");
      router.push("/"); 
      console.log(auth.currentUser); 
    })
    .catch((error) => {
      switch (error.code) {
        case "auth/user-not-found":
          errorMessage.value = "User not found. Please check your email.";
          break;
        case "auth/wrong-password":
          errorMessage.value = "Incorrect password. Please try again.";
          break;
        case "auth/invalid-email":
          errorMessage.value = "Invalid email format.";
          break;
        default:
          errorMessage.value = "Login failed. Please try again later.";
      }
      console.log(error.code); 
    })
    .finally(() => {
      loading.value = false; 
    });
};
</script>
