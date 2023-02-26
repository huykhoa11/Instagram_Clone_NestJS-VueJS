<template>
  <section>
    <div class=" relative w-screen h-screen bg-gray-200 ">
      <div class=" absolute left-0 right-0 top-20 sm:top-16 mx-auto w-5/6 sm:w-[500px] rounded-md bg-white overflow-hidden">
        <header class=" w-full h-20 pl-10 flex items-center bg-gradient-to-r from-blue-600 to-sky-400 text-white font-bold text-4xl">Sign In</header>
        
        <div class=" p-5 sm:p-10">
          <label for="" class=" text-md sm:text-lg block">Username<span class="text-red-500">*</span></label>
          <input id="usernameInput" type="text" class="border border-gray-200 h-10 w-full pl-2 rounded-md drop-shadow-sm outline outline-none" 
                v-model="username" @blur="validateOnBlur()" @focus="inputFocus('usernameInput')" @input="inputChange">
          <p class=" text-sm sm:text-md sm:h-4 text-red-500">{{ usernameError }}</p>
          <br>
          <label for="" class=" text-md sm:text-lg block">Password<span class="text-red-500">*</span></label>
          <input id="passwordInput" type="password" class="border border-gray-200 h-10 w-full pl-2 rounded-md drop-shadow-sm outline outline-none" 
                v-model="password" @blur="validateOnBlur()" @focus="inputFocus('passwordInput')" @input="inputChange">
          <p class=" text-sm sm:text-md sm:h-4 text-red-500">{{ passwordError }}</p>
          <br>
          <input type="checkbox" class=" mt-2 mr-2 text-sm sm:text-md" id="rememberMe" v-model="isRememberMeCheck">
          <label for="rememberMe">Remember me</label>
          <div>
            <router-link to="/auth/signup" class=" text-xs sm:text-sm text-sky-500 hover:underline hover:decoration-solid">
              Don't have account? Sign up here 
            </router-link>
          </div>

          <button @mousedown="signIn()" class=" mt-3 sm:mt-7 flex justify-center items-center py-1 px-3 bg-black rounded-md 
                                      text-md sm:text-xl text-white hover:bg-gray-500 " ref="signInRef">Login</button>

        </div>
        
      </div>
    </div>

  </section>

</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import {useRouter} from "vue-router"
import {useStore} from "vuex"
import { displayToast, dangerColor, successColor } from '/src/composables/DisplayToast';
import { frontendURL, backendURL, login, spin } from '/src/composables/Fetch.js';

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
      signInRef.value.innerHTML = spin('pink');
      const response = await login(isRememberMeCheck.value, data);

      localStorage.setItem('username' ,username.value);
      window.location.replace(`${frontendURL}/homepage`);
    } catch (error) {
      console.log(error);
      signInRef.value.disabled = false;
      signInRef.value.innerHTML = tmp;
      username.value = '';
      password.value = '';
      displayToast('Account not found, please input again', dangerColor);
    }
  }
  
};

onMounted( async() => {
  if(localStorage.getItem('username')) {
    if (confirm('User is already signed in. Do you want to sign out first?')) {
      // sign out
      localStorage.removeItem('username');
    } else {
      // redirect to homepage
      router.push('/homepage');
      // window.location.replace("http://localhost:8080/homepage");
    }
  }
})

</script>




