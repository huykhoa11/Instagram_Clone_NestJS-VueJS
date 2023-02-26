<template>
  <section>
    <div class=" relative w-full h-screen bg-gray-200 ">
      <div class=" absolute left-0 right-0 top-20 mx-auto w-5/6 sm:w-[500px] rounded-lg bg-white overflow-hidden">
        <header class=" w-full h-20 pl-10 flex items-center bg-gradient-to-r from-fuchsia-600 to-pink-400 font-bold text-white text-4xl">Sign Up</header>
        
        <div class=" p-5 sm:p-10">
          <label for="" class=" text-md sm:text-lg block">Username<span class="text-red-500">*</span></label>
          <input id="usernameInput" type="text" spaceholfer=""
                            class="border border-gray-200 h-10 w-full pl-2 rounded-md drop-shadow-sm outline outline-none" 
                            v-model="username" @blur="validateOnBlur()" @focus="inputFocus('usernameInput')" @input="inputChange">
          <p class=" text-xs text-gray-400">(*) Username can't contain white space</p>
          <p class=" text-sm sm:text-md sm:h-4 text-red-500">{{ usernameError }}</p>
          <br>

          <label for="" class=" text-md sm:text-lg block">Password<span class="text-red-500">*</span></label>
          <input id="passwordInput" type="password" class="border border-gray-200 h-10 w-full pl-2 rounded-md drop-shadow-sm outline outline-none" 
                            v-model="password" @blur="validateOnBlur()" @focus="inputFocus('passwordInput')" @input="inputChange">
          <p class=" text-sm sm:text-md sm:h-4 text-red-500">{{ passwordError }}</p>
          <br>

          <label for="" class=" text-md sm:text-lg block">Confirm Password<span class="text-red-500">*</span></label>
          <input id="confirmPasswordInput" type="password" class="border border-gray-200 h-10 w-full pl-2 rounded-md drop-shadow-sm outline outline-none" 
                                v-model="confirmPassword" @blur="validateOnBlur()" @focus="inputFocus('confirmPasswordInput')" @input="inputChange">
          <p class=" text-sm sm:text-md sm:h-4 text-red-500">{{ confirmPasswordError }}</p>
          <br>
          <div>
            <router-link to="/auth/signin" class=" text-xs sm:text-sm text-sky-500 hover:underline hover:decoration-solid">
              Already have an account? Sign in 
            </router-link>
          </div>

          <button @click="signUp()" class=" mt-3 sm:mt-7 py-1 px-3 bg-black rounded-md 
                                      text-md sm:text-xl text-white hover:bg-gray-500" ref="signUpRef">User register</button>
        </div>

      </div>
    </div>

  </section>

</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import {useRouter} from "vue-router"
import {useStore} from "vuex"
import { register, spin } from '/src/composables/Fetch.js';

const backendURL = process.env.VUE_APP_BACKEND_URL;

const store = useStore();

const username = ref('');
const password = ref('');
const confirmPassword = ref('');
const usernameError = ref('');
const passwordError = ref('');
const confirmPasswordError = ref('');

const signUpRef = ref(null);

const router = useRouter();

const inputChange = () => {
  if(username.value.length >= 4 && username.value.length <= 12) {
    usernameError.value = '';
  }
  if(password.value.length >= 6 && password.value.length <= 12) {
    passwordError.value = '';
  }
  if(confirmPassword.value.length > 0) {
    confirmPasswordError.value = '';
  }
}


const inputFocus = (id) => {
  const inputElement = document.getElementById(id);
  inputElement.style.border = 'solid 1px black';
}

const validateOnBlur = () => {
  // const usernameInputElement = document.getElementById('usernameInput');
  // const passwordInputElement = document.getElementById('passwordInput');
  // const confirmPasswordInputElement = document.getElementById('confirmPasswordInput');

  const usernameConditionBlank = username.value.length < 4 || password.value.length > 12;
  const usernameConditionContainWhiteSpace = /\s/.test(username.value);
  const passwordCondition = password.value.length < 6 || password.value.length > 12;
  const confirmCondition  = confirmPassword.value === '' || confirmPassword.value !== password.value;  

  if (usernameConditionBlank && passwordCondition && confirmCondition) {
    setError('username', "Username can't be blank");
    setError('password', "Password must contains 6-12 characters");
    setError('confirmPassword', "Must match the previous entry");
    return false;
  }
  else if (usernameConditionContainWhiteSpace) {
    setError('username', "Username can't contain white space");
    return false;
  }
  else if(usernameConditionBlank) {
    setError('username', "Username can't be blank");
    return false;
  }
  if(passwordCondition) {
    setError('password', "Password must contains 6-12 characters");
    return false;
  }
  if(confirmCondition) {
    setError('confirmPassword', "Must match the previous entry");
    return false;
  }

  return true;
}

const errorElement = {
  username: usernameError,
  password: passwordError,
  confirmPassword: confirmPasswordError,
}

const setError = (ele, text) => {
  document.getElementById(`${ele}Input`).style.border = "solid 1px red";
  errorElement[ele].value = text;
}

const signUp = async () => {
  const validate = validateOnBlur();
  console.log('validateOnBlur', validate);
  if(validate === true) {
    const data = {
      username: username.value,
      password: password.value,
    };
    try {
      signUpRef.value.disabled = true;
      signUpRef.value.classList.toggle('hover:bg-gray-500');
      // signUpRef.value.innerText = spin('pink');
      signUpRef.value.innerText = 'User Registing...';
      const response = await register(data, backendURL);
      
      router.push('/auth/signin')
    } catch (error) {
      console.log(error);
      if (error.response.status === 409) {
        signUpRef.value.disabled = false;
        signUpRef.value.classList.toggle('hover:bg-gray-500');
        signUpRef.value.innerText = 'User register';

        // const usernameInputElement = document.getElementById('usernameInput');
        // usernameInputElement.style.border = "solid 1px red";
        // usernameError.value = "Sorry, username already taken";
        setError('username', "Sorry, username already taken")
      }
    } 
  }

};

</script>