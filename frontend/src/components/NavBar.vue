<template>
    <nav class=" w-full">
      <div v-if="currentUser" class=" fixed z-[100] w-full drop-shadow-md h-12 bg-white flex justify-around items-center">
        <div class="flex items-center space-x-2 sm:space-x-5 ">
          <router-link to="/homepage" class=" text-pink-300 hover:text-white ">
            <img src="./../assets/instagram.png" alt="" class=" w-6 h-6 sm:w-8 sm:h-8 sm:rounded-md">
          </router-link>
          <div class=" flex items-center">
            <input type="text" name="q" :placeholder="$t('Search User')" v-model="inputSearchUser" @keyup.enter="searchUserEvent"
                  class=" bg-gray-100 border border-gray-200 outline outline-none rounded-md pl-2">
            <button id="searchBtn" class=" -translate-x-6" @click="searchUserEvent"><i class="fa-solid fa-magnifying-glass"></i></button>
          </div>
        </div>
        <!-- <img class=" w-8 h-5 " src="https://upload.wikimedia.org/wikipedia/en/thumb/a/ae/Flag_of_the_United_Kingdom.svg/640px-Flag_of_the_United_Kingdom.svg.png" alt=""> -->
        <div class=" flex items-center space-x-4">
          <i class="fa-solid fa-house text-lg hidden sm:inline-block"></i>
          <i class="fa-solid fa-heart text-lg hidden sm:inline-block"></i>
          <select v-model="$i18n.locale" class="w-28">
            <option v-for="locale in $i18n.availableLocales" :key="`locale-${locale}`" :value="locale">
              <div class=" flex items-center space-x-2"> 
                {{getLocale(locale)}} 
                <!-- <img :src="getLocaleImg(locale)" alt="locale" class=" w-5 h-5"> -->
              </div>
            </option>
          </select>
          <div class=" group relative">
            <img :src="require('./../assets/' + currentUser.avatar)" alt="" class=" w-6 h-6 rounded-full">
            <div class=" hidden hover:flex group-hover:flex flex-col w-36 bg-white drop-shadow z-[200] absolute -right-2 top-8
                        before:absolute before:w-full before:h-5 before:-top-4">
              <div class=" flex p-2 hover:bg-gray-100 hover:cursor-pointer">
                <router-link to="/homepage">
                  <i class="fa-solid fa-house mr-3"></i>{{ $t("Navbar/Home page") }}
                </router-link>
              </div>
              <div class=" flex p-2 hover:bg-gray-100 hover:cursor-pointer">
                <router-link :to="'/user/' +currentUser.id+ '?currentUserId=' +currentUser.id">
                  <i class="fa-solid fa-user mr-3"></i>{{ $t("Navbar/My page") }}
                </router-link>
              </div>
              <div class=" flex p-2 hover:bg-gray-100 hover:cursor-pointer">
                <router-link to="/edit-current-user">
                  <i class="fa-solid fa-gear mr-3"></i>{{ $t("Navbar/Edit user") }}
                </router-link>
              </div><hr>
              <div id="signOutBtn" @click="signOut()" 
                      class=" text-pink-500 px-2 py-1 hover:text-gray-50 hover:bg-pink-300 cursor-pointer">
                {{ $t("Navbar/Log out") }}
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
import { i18n } from './../langs/languages';
import axios from 'axios';

const router = useRouter();
const store = useStore();

const username = ref(null);
const currentUser = ref(null);

const inputSearchUser = ref('');

const getLocale = (locale) => {
  if(locale === 'en') {return 'English (EN)'} //https://icons8.com/icon/ShNNs7i8tXQF/great-britain
  else if(locale === 'ja') {return '日本語 (JA)'}
}

const getLocaleImg = (locale) => {
  if(locale === 'en') {
    return 'https://upload.wikimedia.org/wikipedia/en/thumb/a/ae/Flag_of_the_United_Kingdom.svg/640px-Flag_of_the_United_Kingdom.svg.png'
  }
  else if(locale === 'ja') {
    return 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Flag_of_Japan_%281870%E2%80%931999%29.svg/220px-Flag_of_Japan_%281870%E2%80%931999%29.svg.png'
  }
}

const searchUserEvent = async () => {
  console.log('inside search event');
  const searchBtnElement = document.getElementById('searchBtn');
  const tmp = searchBtnElement.innerHTML; 
  searchBtnElement.innerHTML = spin('gray');
  try {
    console.log(inputSearchUser.value);
    const searchUserId = await searchUserbyUsername(inputSearchUser.value);
    console.log(searchUserId);
    window.location.replace(`http://localhost:8080/user/${searchUserId}?currentUserId=${currentUser.value.id}`);
    inputSearchUser.value = '';
    searchBtnElement.innerHTML = tmp;
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
  router.push("/auth/signin");

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
    router.push('/auth/signin');
  }

  
})


</script>

