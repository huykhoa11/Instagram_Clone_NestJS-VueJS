<template>
  <section>
    <div class=" relative w-screen h-screen bg-gray-200 ">
      <div class=" absolute left-0 right-0 top-10 mx-auto w-1/3 h-[500px] rounded-sm border border-gray-100 bg-white p-10">
        <header class=" w-full h-1/6 flex items-center pl-2 bg-pink-200 text-3xl mb-5">Sign Up</header>
        <label for="" class=" text-lg block">Username</label>
        <input type="text" class="border border-gray-200 h-10 w-full pl-2" v-model="username"><br><br>
        <label for="" class=" text-lg block">Password</label>
        <input type="password" class="border border-gray-200 h-10 w-full pl-2" v-model="password"><br><br>
        <label for="" class=" text-lg block">Confirm Password</label>
        <input type="password" class="border border-gray-200 h-10 w-full pl-2" v-model="confirmPassword"><br>
        <div>
          <router-link to="/auth/signin" class=" text-sm text-sky-500 hover:underline hover:decoration-solid">
            Already have an account? Sign in 
          </router-link>
        </div>

        <button @click="signUp()" class=" mt-7 py-1 px-3 bg-black rounded-md 
                                    text-xl text-white hover:text-zinc-600 hover:bg-slate-200" ref="signUpRef">User register</button>

      </div>
    </div>
    <p>{{ returnUser }}</p>

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
const returnUser = ref('');
const router = useRouter();
const signUpRef = ref(null);

const validate = () => {
  if(username.value !== '' || password.value !== '' || confirmPassword.value !== '') {
    if(password.value === confirmPassword.value) {
      return true;
    } else {
      return false;
    }
  }
  else {
    return false;
  }
}

const signUp = async () => {
  if(validate() === false) {
    console.error('Input value is something wrong hehehe');
  }
  else {
    const data = {
      username: username.value,
      password: password.value,
    };
    try {
      signUpRef.value.disabled = true;
      signUpRef.value.classList.toggle('hover:bg-slate-200');
      signUpRef.value.innerText = 'loading...';
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
    } 
  }


};

</script>

