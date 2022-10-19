<template>
    <div v-if="user" class="w-screen relative flex-row justify-center mt-10">
        <div class=" w-2/3 absolute left-0 right-0 mx-auto">
            <div class="flex justify-center items-center space-x-20">
                <!-- avatar -->
                <img :src="require('./../assets/' + user.avatar)" alt="" class=" h-36 w-36 rounded-full">

                <div class="">
                    <div class=" flex items-center h-10 space-x-5">
                        <h3 class=" text-4xl h-full font-thin">{{ user.username }}</h3>
                        <router-link to="/edit-current-user"
                                    class=" text-sm px-2 py-1 font-semibold border border-gray-300 rounded-sm hover:text-gray-300 hover:bg-black duration-100">
                            Edit user
                        </router-link>
                        
                    </div>

                    <div class=" flex space-x-10 mt-7">
                        <p> <span class=" font-semibold">{{ computed(() => user.tasks.length) }}</span> posts </p>
                        <p> 0 followers</p>
                        <p> 0 following </p>
                    </div>

                    <div class=" mt-7">
                        <p class=" font-semibold">{{ user.name }}</p>
                        <p>{{ user.bio }}</p>
                    </div>
                </div>
            </div>


            <div class=" mt-7 pt-7 border-t-2 border-gray-200 grid grid-cols-3 gap-4">
                <div v-for="task in user.tasks" :key="task" class=" h-60 hover:cursor-pointer group">
                    <img :src="require('./../assets/' + task.images[0].name)" alt="" class=" w-full h-full">
                    <div class=" relative hidden -top-full w-full h-full justify-center items-center
                         group-hover:bg-black group-hover:bg-opacity-40 group-hover:flex">
                        <div class=" flex space-x-10 text-white">
                            <p><i class="fa-solid fa-heart mr-2"></i>{{ computed(() => task.likes.length) }}</p>
                            <p><i class="fa-solid fa-comment mr-2"></i>{{ computed(() => task.comments.length) }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from "vue-router"
import axios from "axios";

const router = useRouter();

const user = ref(null);
const lengthOfTasks = ref(null);
// const bigImagesOfTasks = ref([]);

// console.log(router.currentRoute.value.params.id);

onMounted( async() => {
    // const userId = parseInt(router.currentRoute.value.params.id);
    const userId = router.currentRoute.value.params.id;
    // console.log(router);

    try {
        const response = await axios.get('http://localhost:3000/users/' + userId, {withCredentials: true});
        user.value = response.data;
        lengthOfTasks.value = user.value.tasks.length;
        // console.log(user.value.tasks[0].images[0].name);
        // user.value.tasks.forEach(task => {
        //     console.log(task.images[0].name);
        //     bigImagesOfTasks.value.push(task.images[0].name);
        // });
    } catch (error) {
        console.log(error);
    }

})

</script>