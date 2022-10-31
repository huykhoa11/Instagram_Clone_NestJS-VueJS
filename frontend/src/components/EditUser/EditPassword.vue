<template>
    <section>
        <div v-if="currentUser" class=" space-y-4 py-5">
            <div class=" flex items-center space-x-5 ml-16">
                <img :src="require('./../../assets/' + currentUser.avatar)" alt="" class=" h-14 w-14 rounded-full">
                <p class=" text-lg font-semibold">{{ currentUser.username }}</p>
            </div>

            <div class=" flex items-center h-9">
                <div class=" min-w-32 text-right pr-4">Old password</div>
                <input type="password" v-model="oldPassword" class=" h-full pl-2 border-2 border-gray-200 flex-1 outline-none shadow-sm shadow-gray-500/50">
            </div>

            <div class=" flex items-center h-9">
                <div class=" min-w-32 text-right pr-4">New password</div>
                <input type="password" v-model="newPassword" class=" h-full pl-2 border-2 border-gray-200 flex-1 outline-none shadow-sm shadow-gray-500/50">
            </div>

            <div class=" flex items-center h-9">
                <div class=" w-32 text-right pr-4">Password Confirmation</div>
                <input type="password" v-model="confirmNewPassword" class=" h-full pl-2 border-2 border-gray-200 flex-1 outline-none shadow-sm shadow-gray-500/50">
            </div>

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
import { displayToast, dangerColor, successColor } from './../../composables/DisplayToast.js';

const currentUser = ref(null);

const oldPassword = ref('');
const newPassword = ref('');
const confirmNewPassword = ref('');

const update = async () => {
    if(newPassword.value === confirmNewPassword.value) {
        const data = {password: newPassword.value};
        try {
            const response = await axios
                .patch(`http://localhost:3000/users/edit-password/${currentUser.value.id}`, data, {
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json;charset=UTF-8",
                    },
                    withCredentials: true,
                });
            if(response.data) {
                displayToast('Save new password successfully', successColor);
                oldPassword.value = '';
                newPassword.value = '';
                confirmNewPassword.value = '';
            }
        } catch (error) {
            displayToast('Wrong input current password', dangerColor);
        }
    }
    else {
        displayToast('Confirm password entry is not match', dangerColor)
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