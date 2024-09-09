<template>
    <div class="container mt-5">
      <div class="row">
        <div class="col-md-8 offset-md-2">
          <h1 class="text-center">🗄️ W5. Library Registration Form</h1>
          <p class="text-center">
            Let's build some more advanced features into our form.
          </p>
          <form @submit.prevent="submitForm">
            <div class="row mb-3">
              <div class="col-md-6 col-sm-6">
                <label for="username" class="form-label">Username</label>
                <input
                  type="text"
                  class="form-control"
                  id="username"
                  @blur="() => validateName(true)"
                  @input="() => validateName(false)"
                  v-model="formData.username"
                />
                <div v-if="errors.username" class="text-danger">{{ errors.username }}</div>
              </div>
  
              <div class="col-md-6 col-sm-6">
                <label for="gender" class="form-label">Gender</label>
                <select class="form-select" id="gender" v-model="formData.gender" required>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
  
            <div class="row mb-3">
              <div class="col-md-6 col-sm-6">
                <label for="password" class="form-label">Password</label>
                <input
                  type="password"
                  class="form-control"
                  id="password"
                  @blur="() => validatePassword(true)"
                  @input="() => validatePassword(false)"
                  v-model="formData.password"
                />
                <div v-if="errors.password" class="text-danger">{{ errors.password }}</div>
              </div>
  
              <div class="col-md-6 col-sm-6">
                <label for="confirmPassword" class="form-label">Confirm password</label>
                <input
                  type="password"
                  class="form-control"
                  id="confirmPassword"
                  @blur="() => validateConfirmPassword(true)"
                  @input="() => validateConfirmPassword(false)"
                  v-model="formData.confirmPassword"
                />
                <div v-if="errors.confirmPassword" class="text-danger">{{ errors.confirmPassword }}</div>
              </div>
            </div>
  
            <div class="row mb-3">
              <div class="col-md-6 col-sm-6">
                <div class="form-check">
                  <input
                    type="checkbox"
                    class="form-check-input"
                    id="isAustralian"
                    v-model="formData.isAustralian"
                  />
                  <label class="form-check-label" for="isAustralian">Australian Resident?</label>
                </div>
              </div>
            </div>
  
            <div class="mb-3">
              <label for="reason" class="form-label">Reason for joining</label>
              <textarea
                class="form-control"
                id="reason"
                rows="3"
                v-model="formData.reason"
                @input="validateReason"
              ></textarea>
              <div v-if="errors.reason" class="text-success">{{ errors.reason }}</div>
            </div>
  
            <div class="text-center">
              <button type="submit" class="btn btn-primary me-2">Submit</button>
              <button type="button" class="btn btn-secondary" @click="clearForm">Clear</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  
    <div class="row mt-5">
      <h4>This is a Primevue Datatable.</h4>
      <DataTable :value="submittedCards" tableStyle="min-width: 50rem">
        <Column field="username" header="Username"></Column>
        <Column field="password" header="Password"></Column>
        <Column field="isAustralian" header="Australian Resident"></Column>
        <Column field="gender" header="Gender"></Column>
        <Column field="reason" header="Reason"></Column>
      </DataTable>
    </div>
  
    <div class="row mt-5" v-if="submittedCards.length">
      <div class="d-flex flex-wrap justify-content-start">
        <div
          v-for="(card, index) in submittedCards"
          :key="index"
          class="card m-2"
          style="width: 18rem"
        >
          <div class="card-header">User Information</div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">Username: {{ card.username }}</li>
            <li class="list-group-item">Password: {{ card.password }}</li>
            <li class="list-group-item">
              Australian Resident: {{ card.isAustralian ? 'Yes' : 'No' }}
            </li>
            <li class="list-group-item">Gender: {{ card.gender }}</li>
            <li class="list-group-item">Reason: {{ card.reason }}</li>
          </ul>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import Column from 'primevue/column';
import DataTable from 'primevue/datatable';
import { ref } from 'vue';
  
  const formData = ref({
    username: '',
    password: '',
    confirmPassword: '',
    isAustralian: false,
    reason: '',
    gender: ''
  });
  
  const submittedCards = ref([]);
  
  const errors = ref({
    username: null,
    password: null,
    confirmPassword: null,
    reason: null
  });
  
  const clearForm = () => {
    formData.value = {
      username: '',
      password: '',
      confirmPassword: '',
      isAustralian: false,
      reason: '',
      gender: ''
    };
  };
  
  const validateName = (blur) => {
    if (formData.value.username.length < 3) {
      if (blur) errors.value.username = 'Name must be at least 3 characters';
    } else {
      errors.value.username = null;
    }
  };
  
  const validatePassword = (blur) => {
    const password = formData.value.password;
    const minLength = 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  
    if (password.length < minLength) {
      if (blur) errors.value.password = `Password must be at least ${minLength} characters long.`;
    } else if (!hasUppercase) {
      if (blur) errors.value.password = 'Password must contain at least one uppercase letter.';
    } else if (!hasLowercase) {
      if (blur) errors.value.password = 'Password must contain at least one lowercase letter.';
    } else if (!hasNumber) {
      if (blur) errors.value.password = 'Password must contain at least one number.';
    } else if (!hasSpecialChar) {
      if (blur) errors.value.password = 'Password must contain at least one special character.';
    } else {
      errors.value.password = null;
    }
  };
  
  const validateConfirmPassword = (blur) => {
    if (formData.value.confirmPassword !== formData.value.password) {
      if (blur) errors.value.confirmPassword = 'Passwords do not match.';
    } else {
      errors.value.confirmPassword = null;
    }
  };
  
  const validateReason = () => {
    if (formData.value.reason.toLowerCase().includes('friend')) {
      errors.value.reason = 'Great to have a friend';
    } else {
      errors.value.reason = null;
    }
  };
  
  const submitForm = () => {
    validateName(true);
    validatePassword(true);
    validateConfirmPassword(true);
    validateReason();
  
    if (
      !errors.value.username &&
      !errors.value.password &&
      !errors.value.confirmPassword
    ) {
      submittedCards.value.push({ ...formData.value });
      clearForm();
    }
  };
  </script>
  
  <style scoped>
  .container {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    max-width: 80vw;
    margin: 0 auto;
    padding: 20px;
    border-radius: 10px;
  }
  
  .card {
    border: 1px solid #ccc;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .card-header {
    background-color: #275fda;
    color: white;
    padding: 10px;
    border-radius: 10px 10px 0 0;
  }
  
  .list-group-item {
    padding: 10px;
  }
  
  h1 {
    font-size: 2.5rem;
    font-weight: bold;
    color: #2c3e50;
    margin-bottom: 1rem;
  }
  
  p {
    font-size: 1.2rem;
    color: #6c757d;
  }
  
  button {
    width: 100px;
  }
  </style>
  