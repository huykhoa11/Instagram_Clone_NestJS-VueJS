<template>
    <section>
        <div v-if="currentUser" class=" py-5">
            <div class=" flex items-center space-x-5 ml-3 md:ml-16">
                <img :src="require('./../../assets/' + currentUser.avatar)" alt="" class=" h-10 w-10 md:h-14 md:w-14 rounded-full">
                <div class=" flex flex-col">
                    <router-link :to="'/user/' +currentUser.id+ '?currentUserId=' +currentUser.id" 
                                class=" text-lg font-semibold hover:underline hover:decoration-solid">
                        {{ currentUser.username }}
                    </router-link>
                    <!-- <p class=" text-lg font-semibold">{{ currentUser.username }}</p> -->
                    <input type="file" @change="inputChangeAvatar" class=" hidden" ref="changeAvatarInput">
                    <button @click="btnChangeAvatar()" class=" text-sm text-sky-500 hover:underline hover:decoration-solid">
                        Change avatar
                    </button>
                </div>
            </div>
            
            <div class=" flex flex-col ml-3 h-12 md:flex-row md:items-center md:space-x-3 mt-4">
                <div class=" text-sm font-semibold md:text-md md:w-10">Name</div>
                <input type="text" v-model="nameInput" class=" h-full pl-2 py-1 border-2 border-gray-200 flex-1 outline-none rounded-sm shadow-sm shadow-gray-500/50">
            </div>

            <div class=" flex flex-col ml-3 h-12 md:flex-row md:items-center md:space-x-3 mt-8">
                <div class=" text-sm font-semibold md:text-md md:w-10">Bio</div>
                <textarea type="text" v-model="bioInput" class=" h-10 md:h-12 pl-2 py-1 border-2 border-gray-200 flex-1 outline-none rounded-sm shadow-sm shadow-gray-500/50"></textarea>
            </div>

            <div class=" flex flex-col ml-3 h-12 md:flex-row md:items-center md:space-x-3 mt-4">
                <div class=" text-sm font-semibold md:text-md md:w-10">Email</div>
                <input type="text" v-model="emailInput" class=" h-full pl-2 border-2 py-1 border-gray-200 flex-1 outline-none rounded-sm shadow-sm shadow-gray-500/50">
            </div>

            <!-- <div class=" flex items-center h-9">
                <div class=" min-w-32">Password</div>
                <input type="text" class=" h-full pl-2 border-2 border-gray-200 flex-1 outline-none shadow-sm shadow-gray-500/50"
                        placeholder="Leave blank if you don't want to change it">
            </div>

            <div class=" flex items-center h-9">
                <div class=" w-32">Password Confirmation</div>
                <input type="text" class=" h-full pl-2 border-2 border-gray-200 flex-1 outline-none shadow-sm shadow-gray-500/50">
            </div> -->
            <button class=" ml-3 mt-10 md:ml-16 px-2 py-1 text-white hover:bg-blue-400 rounded-sm
                            bg-blue-500 shadow-lg shadow-blue-500/50" @click="update">
                            Update
            </button>

        </div>
    </section>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import axios from "axios";
import { displayToast, dangerColor, successColor } from './../../composables/DisplayToast.js'

const currentUser = ref(null);
const nameInput = ref('');
const bioInput = ref('');
const emailInput = ref('');
const changeAvatarInput = ref(null);

const btnChangeAvatar = (e) => {
    changeAvatarInput.value.click();
}

const inputChangeAvatar = async (e) => {
    console.log(e.target.files[0].name);
    let formData = new FormData();
    formData.append('image', e.target.files[0]);
    try {        
        const response = await axios
                .patch('http://localhost:3000/users/change-avatar', formData, {
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "multipart/form-data",
                    },
                    withCredentials: true,
                });
        displayToast('New avatar uploaded successfully', successColor)
        currentUser.value = response.data;
    } catch (error) {
        displayToast('Upload failed', dangerColor);
    }
}

const update = async () => {
    const data = {name: nameInput.value, bio: bioInput.value, email: emailInput.value};
    try {
        const response = await axios
            .patch(`http://localhost:3000/users/${currentUser.value.id}`, data, {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json;charset=UTF-8",
                },
                withCredentials: true,
            });
        if(response.data) {
            displayToast('Save successfully', successColor);
        }
    } catch (error) {
        displayToast('Save failed', dangerColor);
    }
}

onMounted( async() => {
    try {
        const response = await axios.get('http://localhost:3000/users/currentuser', {withCredentials: true});
        console.log(response.data);
        currentUser.value = response.data;
        console.log(currentUser.value);
        nameInput.value = currentUser.value.name;
        bioInput.value = currentUser.value.bio;
        emailInput.value = currentUser.value.email;
    } catch (error) {
        console.log(error);
    }
})
</script>
