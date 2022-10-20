<template>
    <section>
        <div v-if="currentUser" class=" space-y-4 py-5">
            <div class=" flex items-center space-x-5 ml-16">
                <img :src="require('./../../assets/' + currentUser.avatar)" alt="" class=" h-14 w-14">
                <div class="">
                    <p class=" text-lg font-semibold">{{ currentUser.username }}</p>
                    <input type="file" @change="inputChangeAvatar" class=" hidden" ref="changeAvatarInput">
                    <button @click="btnChangeAvatar()" class=" text-sm text-sky-500 hover:underline hover:decoration-solid">
                        Change avatar
                    </button>
                </div>
            </div>
            
            <div class=" flex items-center h-9">
                <div class=" min-w-32 text-right pr-4">Name</div>
                <input type="text" v-model="nameInput" class=" h-full pl-2 border-2 border-gray-200 flex-1 outline-none rounded-sm shadow-sm shadow-gray-500/50">
            </div>

            <div class=" flex items-center h-9">
                <div class=" min-w-32 text-right pr-4">Bio</div>
                <input type="text" v-model="bioInput" class=" h-full pl-2 border-2 border-gray-200 flex-1 outline-none rounded-sm shadow-sm shadow-gray-500/50">
            </div>

            <div class=" flex items-center h-9">
                <div class=" min-w-32 text-right pr-4">Email</div>
                <input type="text" v-model="emailInput" class=" h-full pl-2 border-2 border-gray-200 flex-1 outline-none rounded-sm shadow-sm shadow-gray-500/50">
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

            <button class=" ml-32 mt-10 px-2 py-1 text-white hover:bg-blue-400 rounded-sm
                            bg-blue-500 shadow-lg shadow-blue-500/50" @click="update">
                            Update
            </button>

        </div>
    </section>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import axios from "axios";
import { displayToast } from './../../composables/DisplayToast.js'

const successColor = '#5CB85C';
const dangerColor = '#EC6A71';

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
            displayToast('Save successfully', '#5CB85C');
            nameInput.value = '';
            bioInput.value = '';
            emailInput.value = '';
        }
    } catch (error) {
        displayToast('Save failed', '#EC6A71');
    }
}

onMounted( async() => {
    try {
        const response = await axios.get('http://localhost:3000/users/currentuser', {withCredentials: true});
        console.log(response.data);
        currentUser.value = response.data;
        console.log(currentUser.value);
    } catch (error) {
        console.log(error);
    }
})
</script>
