<template>
  <section>
    <div class=" relative w-screen h-screen bg-gray-200 ">
      <div class=" absolute left-0 right-0 top-10 mx-auto w-1/3 h-[500px] rounded-sm border border-gray-100 bg-white p-10">
        <header class=" w-full h-1/6 flex items-center pl-2 bg-sky-200 text-3xl mb-5">Sign In</header>
        <label for="" class=" text-lg block">Username<span class="text-red-500">*</span></label>
        <input id="usernameInput" type="text" class="border border-gray-200 h-10 w-full pl-2" 
              v-model="username" @blur="validateOnBlur()" @focus="inputFocus('usernameInput')" @input="inputChange">
        <p class=" h-4 text-red-500">{{ usernameError }}</p>
        <br>
        <label for="" class=" text-lg block">Password<span class="text-red-500">*</span></label>
        <input id="passwordInput" type="password" class="border border-gray-200 h-10 w-full pl-2" 
              v-model="password" @blur="validateOnBlur()" @focus="inputFocus('passwordInput')" @input="inputChange">
        <p class=" h-4 text-red-500">{{ passwordError }}</p>
        <br>
        <input type="checkbox" class=" mt-2 mr-2" id="rememberMe" v-model="isRememberMeCheck">
        <label for="rememberMe">Remember me</label>
        <div>
          <router-link to="/auth/signup" class=" text-sm text-sky-500 hover:underline hover:decoration-solid">
            Don't have account? Sign up here 
          </router-link>
        </div>

        <button @mousedown="signIn()" class=" flex justify-center items-center mt-7 py-1 px-3 bg-black rounded-md 
                                    text-xl text-white " ref="signInRef">Login</button>

      </div>
    </div>

  </section>

</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import {useRouter} from "vue-router"
import {useStore} from "vuex"
import { displayToast } from '/src/composables/DisplayToast';
import { login, spin } from '/src/composables/Fetch.js';

const store = useStore();
const router = useRouter();

const username = ref('');
const password = ref('');
const usernameError = ref('');
const passwordError = ref('');

// const returnValue = ref('');
const isRememberMeCheck = ref(false);
const signInRef = ref(null);

console.log(signInRef);

const inputChange = () => {
  if(username.value.length > 0) {
    usernameError.value = '';
  }
  if(password.value.length >= 6 && password.value.length <= 12) {
    passwordError.value = '';
  }
}

const inputFocus = (id) => {
  const inputElement = document.getElementById(id);
  inputElement.style.border = 'solid 1px black';
}

const validateOnBlur = () => {
  const usernameConditionBlank = username.value.length < 4 || password.value.length > 12;
  const usernameConditionContainWhiteSpace = /\s/.test(username.value);
  const passwordCondition = password.value.length < 6 || password.value.length > 12;

  if (usernameConditionBlank && passwordCondition) {
    setError('username', "Username can't be blank");
    setError('password', "Password must contains 6-12 characters");
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

  return true;
}

const errorElement = {
  username: usernameError,
  password: passwordError,
}

const setError = (ele, text) => {
  document.getElementById(`${ele}Input`).style.border = "solid 1px red";
  errorElement[ele].value = text;
}

const signIn = async () => {

  const validate = validateOnBlur();
  if(validate === true) {
    const data = {
      username: username.value,
      password: password.value,
    };
    const tmp = signInRef.value.innerHTML;

    try {
      console.log('remember me ', isRememberMeCheck.value);
      signInRef.value.disabled = true;
      signInRef.value.innerHTML = spin();
      const response = await login(isRememberMeCheck.value, data);

      localStorage.setItem('username' ,username.value);
      window.location.replace("http://localhost:8080/dashboard");
    } catch (error) {
      console.log(error);
      signInRef.value.disabled = false;
      signInRef.value.innerHTML = tmp;
      username.value = '';
      password.value = '';
      displayToast('Account not found, please input again', '#EC6A71');
    }
  }
  
};

</script>




