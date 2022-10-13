<template>
  <section>
    <div class=" relative w-screen h-screen bg-gray-200 ">
      <div class=" absolute left-0 right-0 top-10 mx-auto w-1/3 h-[600px] rounded-sm border border-gray-100 bg-white p-10">
        <header class=" w-full h-1/6 flex items-center pl-2 bg-pink-200 text-3xl mb-5">Sign Up</header>
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

        <label for="" class=" text-lg block">Confirm Password<span class="text-red-500">*</span></label>
        <input id="confirmPasswordInput" type="password" class="border border-gray-200 h-10 w-full pl-2" 
                              v-model="confirmPassword" @blur="validateOnBlur()" @focus="inputFocus('confirmPasswordInput')" @input="inputChange">
        <p class=" h-4 text-red-500">{{ confirmPasswordError }}</p>
        <br>
        <div>
          <router-link to="/auth/signin" class=" text-sm text-sky-500 hover:underline hover:decoration-solid">
            Already have an account? Sign in 
          </router-link>
        </div>

        <button @click="signUp()" class=" mt-7 py-1 px-3 bg-black rounded-md 
                                    text-xl text-white hover:bg-gray-500" ref="signUpRef">User register</button>

      </div>
    </div>

  </section>

</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import {useRouter} from "vue-router"
import {useStore} from "vuex"

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
  if(username.value.length > 0) {
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
  const usernameInputElement = document.getElementById('usernameInput');
  const passwordInputElement = document.getElementById('passwordInput');
  const confirmPasswordInputElement = document.getElementById('confirmPasswordInput');


  const usernameCondition = username.value === '';
  const passwordCondition = password.value.length < 6 || password.value.length > 12;
  const confirmCondition  = confirmPassword.value === '' || confirmPassword.value !== password.value;  

  if (usernameCondition && passwordCondition && confirmCondition) {
    usernameInputElement.style.border = "solid 1px red";
    usernameError.value = "Username can't be blank";

    passwordInputElement.style.border = "solid 1px red";
    passwordError.value = "Password must contains 6-12 characters";

    confirmPasswordInputElement.style.border = "solid 1px red";
    confirmPasswordError.value = "Must match the previous entry";
  }
  else if(usernameCondition) {
    usernameInputElement.style.border = "solid 1px red";
    usernameError.value = "Username can't be blank";
  } 
  else if(passwordCondition) {
    passwordInputElement.style.border = "solid 1px red";
    passwordError.value = "Password must contains 6-12 characters";
  }
  else if(confirmCondition) {
    confirmPasswordInputElement.style.border = "solid 1px red";
    confirmPasswordError.value = "Must match the previous entry";
  }
  else {
    return true;
  }
}

const signUp = async () => {
  const validate = validateOnBlur();
  if(validate === true) {
    const data = {
      username: username.value,
      password: password.value,
    };
    try {
      signUpRef.value.disabled = true;
      signUpRef.value.classList.toggle('hover:bg-gray-500');
      signUpRef.value.innerText = 'Signing up...';
      const response = await axios.post('http://localhost:3000/auth/signup', data, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        withCredentials: true,
      });
      returnUser.value = response.data;
      console.log(returnUser.value);
      router.push('/auth/signin')
    } catch (error) {
      console.log(error);
      if (error.response.status === 409) {
        signUpRef.value.disabled = false;
        signUpRef.value.classList.toggle('hover:bg-gray-500');
        signUpRef.value.innerText = 'User register';

        const usernameInputElement = document.getElementById('usernameInput');
        usernameInputElement.style.border = "solid 1px red";
        usernameError.value = "Sorry, username already taken";
      }
    } 
  }


};

</script>

