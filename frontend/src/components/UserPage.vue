<template>
    <section class="w-screen relative flex-row justify-center mt-10">
        <div class=" w-3/4 absolute left-0 right-0 mx-auto">
            <div class="flex justify-center items-center space-x-20">
                <!-- avatar -->
                <img src="https://picsum.photos/id/60/144/144" alt="" class=" h-36 w-36 rounded-full">

                <div class="">
                    <div class=" flex space-x-5">
                        <h3 class=" text-4xl font-thin">{{ user.username }}</h3>
                        <button class=" text-sm font-semibold px-2 border border-gray-300 rounded-sm">Edit profile</button>
                    </div>

                    <div class=" flex space-x-10 mt-7">
                        <p> <span class=" font-semibold">{{ lengthOfTasks }}</span> posts </p>
                        <p> 0 followers</p>
                        <p> 0 following </p>
                    </div>

                    <p class=" mt-7">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Est eveniet laboriosam placeat!<br>
                        Itaque praesentium asperiores error, repellendus maiores, cumque eum rerum reiciendis <br>
                        similique rem illo natus consequatur? 
                    </p>
                </div>
            </div>


            <div class=" mt-7 pt-7 border-t-2 border-gray-200">
                Hello
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from "vue-router"
import axios from "axios";

const router = useRouter();

const user = ref({});
const lengthOfTasks = ref(null);

// console.log(router.currentRoute.value.params.id);

onMounted( async() => {
    // const userId = parseInt(router.currentRoute.value.params.id);
    const userId = router.currentRoute.value.params.id;

    try {
        const response = await axios.get('http://localhost:3000/users/' + userId, {withCredentials: true});
        user.value = response.data;
        lengthOfTasks.value = user.value.tasks.length;
    } catch (error) {
        console.log(error);
    }

})

</script>