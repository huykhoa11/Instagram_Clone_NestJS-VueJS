<template>
    <nav>
      <div class="drop-shadow-sm bg-zinc-600 flex justify-between font-bold" v-if="username === 'andrey' ">
        <div class="">
          <p class=" text-pink-500">Hello {{ username }}</p>
        </div>
        <div class="">
          <button id="signOutBtn" @click="signOut()" class=" text-pink-500 hover:text-gray-50 hover:bg-pink-500 cursor-pointer">Sign Out</button>
        </div>
        
      </div>

      <div class="drop-shadow-sm bg-zinc-600 flex justify-between font-bold" v-else>
        <div class="">
          <p class=" text-pink-500">Let sign in ^^</p>
        </div>
        <div class="">
          <router-link to="/auth/signup" class=" text-pink-500 hover:text-gray-50 hover:bg-pink-500">Sign Up</router-link>
          <router-link to="/auth/signin" class=" text-pink-500 hover:text-gray-50 hover:bg-pink-500">Sign In</router-link>
        </div>
      </div>

        
    </nav>
    
</template>


<script setup>
import { useStore } from 'vuex';
import { useRouter } from "vue-router"
import { computed, onMounted, ref } from 'vue';
import axios from 'axios';

const router = useRouter();
const store = useStore();

const username = ref('');


const signOut = async () => {
  const signOutBtnElement = document.getElementById('signOutBtn');
  signOutBtnElement.disabled = true;
  signOutBtnElement.className = 'text-pink-500';
  signOutBtnElement.innerText =  'Loading..'
  await axios.delete('http://localhost:3000/auth/signout', {withCredentials: true});
  localStorage.removeItem('username');
  // router.push('/auth/signin')
  window.location.replace("http://localhost:8080/auth/signin");

}

onMounted( () => {
  username.value = localStorage.getItem('username');
})


</script>

