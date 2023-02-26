<template>
  <section>
    <div class=" flex justify-around">
      <div class=" w-1/3 h-96 border border-stone-700">
        <header class=" w-full h-1/6 bg-sky-200 text-3xl mb-5">Sign Up</header>
        <label for="">Username</label>
        <input type="text" class="border border-black" v-model="username"><br><br>
        <label for="">Password</label>
        <input type="password" class="border border-black" v-model="password"><br>
        <button @click="signUp()" class="border border-black bg-slate-300 hover:bg-slate-200">Sign Up</button>
      </div>

      <div class=" w-1/3 h-96 border border-stone-700">
        <header class=" w-full h-1/6 bg-sky-200 text-3xl mb-5">Sign In</header>
        <label for="">Username</label>
        <input type="text" class="border border-black" v-model="username"><br><br>
        <label for="">Password</label>
        <input type="password" class="border border-black" v-model="password"><br>
        <button @click="signIn()" class="border border-black bg-slate-300 hover:bg-slate-200" ref="signInRef">Sign In</button>

      </div>

    </div>

    <p>{{ returnValue }}</p>

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
const returnValue = ref('');
const isAuthenticated = ref(false);
const router = useRouter();
const signInRef = ref(null);
const signUpRef = ref(null);

const backendURL = process.env.BACKEND_URL;

const signUp = async () => {
  const data = {
    username: username,
    password: password,
  };

  axios
  .post(`${backendURL}/auth/signup`, data, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    },
    withCredentials: true,
  })
  .then(({data}) => {
    returnValue.value = data;
    console.log(data);
  });
};

console.log(signInRef);

const signIn = async () => {
  console.log('inside signIn');
  const data = {
    username: username.value,
    password: password.value,
  };

  try {
    signInRef.value.disabled = true;
    signInRef.value.classList.toggle('hover:bg-slate-200');
    signInRef.value.innerText = 'loading...';
    const response = await axios.post(`${backendURL}/auth/signin`, data, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      withCredentials: true,
    });
    returnValue.value = response.data;
    isAuthenticated.value = true;
    store.dispatch('getCurrentUser', {username: username.value})
    router.push('/dashboard')
    console.log(returnValue.value);
  } catch (error) {
    console.log(error);
  }


  // try {
  //   const response = await fetch('http://localhost:3000/auth/signin', {
  //     method: "POST",
  //     headers: {'Content-Type': 'application/json',},
  //     body: JSON.stringify(data),
  //   })
  //   returnValue.value = await response.json();
  // } catch (error) {
  //   console.log(error);
  // }



  
};

</script>




