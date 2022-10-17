<template>
    <section class=" relative">
        <div v-if="currentUser">
            <div class=" absolute left-0 right-0 mx-auto mt-32 px-10 py-5 w-1/2 space-y-6
                        border-double border-4 border-gray-500 bg-slate-50 drop-shadow-md">
                <div class=" flex items-center space-x-5">
                    <img :src="require('./../../assets/' + currentUser.avatar)" alt="" class=" h-16 w-16">
                    <p class=" text-lg font-semibold">{{ currentUser.username }}</p>
                </div>
                
                <div class=" flex items-center h-9">
                    <p class=" min-w-32">Name</p>
                    <input type="text" class=" h-full pl-2 border-2 border-gray-200 flex-1 outline-none shadow-sm shadow-gray-500/50">
                </div>

                <div class=" flex items-center h-9">
                    <div class=" min-w-32">Bio</div>
                    <input type="text" class=" h-full pl-2 border-2 border-gray-200 flex-1 outline-none shadow-sm shadow-gray-500/50">
                </div>

                <div class=" flex items-center h-9">
                    <div class=" min-w-32">Email</div>
                    <input type="text" class=" h-full pl-2 border-2 border-gray-200 flex-1 outline-none shadow-sm shadow-gray-500/50">
                </div>

                <div class=" flex items-center h-9">
                    <div class=" min-w-32">Password</div>
                    <input type="text" class=" h-full pl-2 border-2 border-gray-200 flex-1 outline-none shadow-sm shadow-gray-500/50"
                            placeholder="Leave blank if you don't want to change it">
                </div>

                <div class=" flex items-center h-9">
                    <div class=" w-32">Password Confirmation</div>
                    <input type="text" class=" h-full pl-2 border-2 border-gray-200 flex-1 outline-none shadow-sm shadow-gray-500/50">
                </div>

                <button class=" ml-32 px-2 py-1 text-white hover:bg-blue-400 rounded-sm
                             bg-blue-500 shadow-lg shadow-blue-500/50" @click="update">
                             Update
                </button>
            </div>

        </div>
    </section>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import axios from "axios";

const currentUser = ref(null);

const update = () => {

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
