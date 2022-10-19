<template>
    <nav>
      <div v-if="currentUser" class="drop-shadow-sm h-14 bg-zinc-700 flex justify-between items-center font-semibold">
        <div class="flex space-x-3">
          <router-link to="/dashboard" class=" text-pink-300 hover:text-white">HOME</router-link>
          <p class=" text-pink-300">Hello {{ currentUser.username }}</p>
        </div>
        <div class="">
          <button id="signOutBtn" @click="signOut()" class=" text-pink-300 hover:text-gray-50 hover:bg-pink-300 cursor-pointer">Sign Out</button>
        </div>
        
      </div>

      <div v-else class="drop-shadow-sm bg-zinc-600 flex justify-between font-semibold">
        <div class="">
          <p class=" text-pink-500">Let sign in ^^</p>
        </div>
        <div class="">
          <router-link to="/auth/signup" class=" text-pink-500 hover:text-white">Sign Up</router-link>
          <router-link to="/auth/signin" class=" text-pink-500 hover:text-white">Sign In</router-link>
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

const username = ref(null);
const currentUser = ref(null);


const signOut = async () => {
  const signOutBtnElement = document.getElementById('signOutBtn');
  signOutBtnElement.disabled = true;
  signOutBtnElement.className = 'text-pink-500';
  signOutBtnElement.innerText =  'Signing out...'
  await axios.delete('http://localhost:3000/auth/signout', {withCredentials: true});
  localStorage.removeItem('username');
  // router.push('/auth/signin')
  username.value = '';
  window.location.replace("http://localhost:8080/auth/signin");

}

onMounted( async () => {
  try {
    const response = await axios.get('http://localhost:3000/users/currentuser', {withCredentials: true});
    currentUser.value = response.data;
    username.value = localStorage.getItem('username');
    console.log(username.value);
  } catch (error) {
    if(localStorage.getItem('username')) {
      localStorage.removeItem('username');
    }
  }

  
})


</script>

