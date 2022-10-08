<template>
  <section>
    <div class=" relative w-screen h-screen bg-gray-200 ">
      <div class=" absolute left-0 right-0 top-10 mx-auto w-1/3 h-[440px] rounded-sm border border-gray-100 bg-white p-10">
        <header class=" w-full h-1/6 flex items-center pl-2 bg-sky-200 text-3xl mb-5">Sign In</header>
        <label for="" class=" text-lg block">Username</label>
        <input type="text" class="border border-gray-200 h-10 w-full pl-2" v-model="username"><br><br>
        <label for="" class=" text-lg block">Password</label>
        <input type="password" class="border border-gray-200 h-10 w-full pl-2" v-model="password"><br>
        <input type="checkbox" class=" mt-2 mr-2" id="rememberMe" v-model="isRememberMeCheck">
        <label for="rememberMe">Remember me</label>
        <div>
          <router-link to="/auth/signup" class=" text-sm text-sky-500 hover:underline hover:decoration-solid">
            Don't have account? Sign up here 
          </router-link>
        </div>

        <button @click="signIn()" class=" block mt-7 py-1 px-3 bg-black rounded-md 
                                    text-xl text-white hover:text-zinc-600 hover:bg-slate-200" ref="signInRef">Login</button>

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
const router = useRouter();

const username = ref('');
const password = ref('');
const returnValue = ref('');
const isAuthenticated = ref(false);
const isRememberMeCheck = ref(false);
const signInRef = ref(null);

console.log(signInRef);

const signIn = async () => {
  console.log('inside signIn');
  const data = {
    username: username.value,
    password: password.value,
  };

  try {
    console.log('remember me ', isRememberMeCheck.value);
    signInRef.value.disabled = true;
    signInRef.value.classList.toggle('hover:text-zinc-600');
    signInRef.value.innerText = 'loading...';
    const response = await axios.post(`http://localhost:3000/auth/signin?rememberMe=${isRememberMeCheck.value}`, data, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      withCredentials: true,
    });
    returnValue.value = response.data;
    isAuthenticated.value = true;
    // store.dispatch('getCurrentUser', {username: username.value})
    localStorage.setItem('username' ,username.value);
    // router.push('/dashboard')
    window.location.replace("http://localhost:8080/dashboard");
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




