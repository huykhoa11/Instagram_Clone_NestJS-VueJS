<template>
    <nav class="">
      <div v-if="currentUser" class=" fixed z-[100] w-full drop-shadow-md h-12 bg-white flex justify-around items-center">
        <div class="flex items-center space-x-5">
          <router-link to="/homepage" class=" text-pink-300 hover:text-white">
            <img src="./../assets/instagram.png" alt="" class=" w-8 h-8">
          </router-link>
          <div class=" flex items-center">
            <input type="text" name="q" placeholder="Search User" v-model="inputSearchUser"
                  class=" bg-gray-100 border border-gray-200 outline outline-none rounded-md pl-2">
            <button id="searchBtn" class=" -translate-x-6" @click="searchUserEvent"><i class="fa-solid fa-magnifying-glass"></i></button>
          </div>
        </div>
        <div class=" flex items-center space-x-4">
          <i class="fa-solid fa-house text-lg"></i>
          <i class="fa-regular fa-heart text-lg"></i>
          <div class=" group relative">
            <img :src="require('./../assets/' + currentUser.avatar)" alt="" class=" w-6 h-6 rounded-full">
            <div class=" hidden hover:flex group-hover:flex flex-col w-36 bg-white drop-shadow z-[200] absolute -right-2 top-8
                        before:absolute before:w-full before:h-5 before:-top-4">
              <div class=" flex p-2 hover:bg-gray-100 hover:cursor-pointer">
                <router-link :to="'/user/' +currentUser.id+ '?currentUserId=' +currentUser.id">
                  <i class="fa-regular fa-user mr-3"></i>My Page
                </router-link>
              </div>
              <div class=" flex p-2 hover:bg-gray-100 hover:cursor-pointer">
                <router-link to="/edit-current-user">
                  <i class="fa-solid fa-gear mr-3"></i>Edit user
                </router-link>
              </div><hr>
              <div id="signOutBtn" @click="signOut()" 
                      class=" text-pink-500 px-2 py-1 hover:text-gray-50 hover:bg-pink-300 cursor-pointer">
                Sign Out
              </div>
            </div>
          </div>
        </div>
        
      </div>

      <!-- <div v-else class=" fixed z-[100] w-full drop-shadow-md h-12 bg-white font-semibold flex justify-around items-center">
        <div class="">
          <p class=" text-pink-500">Let sign in ^^</p>
        </div>
        <div class="">
          <router-link to="/auth/signup" class=" text-pink-500 hover:text-white">Sign Up</router-link>
          <router-link to="/auth/signin" class=" text-pink-500 hover:text-white">Sign In</router-link>
        </div>
      </div> -->

        
    </nav>
    
</template>


<script setup>
import { useStore } from 'vuex';
import { useRouter } from "vue-router"
import { computed, onMounted, ref } from 'vue';
import { searchUserbyUsername, spin } from './../composables/Fetch.js';
import { displayToast, dangerColor, successColor } from './../composables/DisplayToast.js';
import axios from 'axios';

const router = useRouter();
const store = useStore();

const username = ref(null);
const currentUser = ref(null);

const inputSearchUser = ref('');

const searchUserEvent = async () => {
  const searchBtnElement = document.getElementById('searchBtn');
  const tmp = searchBtnElement.innerHTML; 
  searchBtnElement.innerHTML = spin('gray');
  try {
    const searchUserId = await searchUserbyUsername(inputSearchUser.value);
    window.location.replace(`http://localhost:8080/user/${searchUserId}?currentUserId=${currentUser.value.id}`);
  } catch (error) {
    console.log(error);
    searchBtnElement.innerHTML = tmp;
    displayToast(`User ${inputSearchUser.value} doesn't exist`, dangerColor);
  }
}

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

