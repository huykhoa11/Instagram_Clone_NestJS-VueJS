<template>
    <div v-if="user && relation !== null && followers !== null && following !== null" class="w-screen relative flex-row justify-center pt-16">
        <div class=" w-3/5 absolute left-0 right-0 mx-auto">
            <div class="flex justify-center items-center space-x-20">
                <!-- avatar -->
                <img :src="require('./../assets/' + user.avatar)" alt="" class=" h-36 w-36 border border-gray-100 rounded-full">

                <div class="">
                    <div class=" flex items-end h-10 space-x-5">
                        <h3 class=" text-4xl h-full font-thin">{{ user.username }}</h3>
                        <router-link v-if="user.id === currentUserId" to="/edit-current-user"
                                    class=" text-sm px-2 py-1 font-semibold border border-gray-300 rounded-sm hover:text-gray-300 hover:bg-black duration-100">
                            Edit user
                        </router-link>
                        <div v-else>
                            <button v-if="relation" id="followBtn"
                                    class="text-sm text-gray-700 px-2 py-1 font-semibold rounded-sm border border-gray-300" 
                                    @click="followEvent(currentUserId, user.id)">
                                Following
                            </button>
                            <button v-else id="followBtn"
                                    class="text-sm text-white px-2 py-1 font-semibold rounded-sm bg-blue-400"
                                    @click="followEvent(currentUserId, user.id)">
                                Follow
                            </button>
                        </div>
                    </div>

                    <div class=" flex space-x-10 mt-7">
                        <p> <span class=" font-semibold">{{ computed(() => user.tasks.length) }}</span> posts </p>
                        <p> <span class=" font-semibold">{{followers}}</span> followers</p>
                        <p> <span class=" font-semibold">{{following}}</span> following </p>
                    </div>

                    <div class=" mt-7">
                        <p class=" font-semibold">{{ user.name }}</p>
                        <p>{{ user.bio }}</p>
                    </div>
                </div>
            </div>


            <div class=" mt-7 pt-7 border-t-2 border-gray-200 grid grid-cols-3 gap-4">
                <div v-for="task in user.tasks" :key="task" class=" h-60 hover:cursor-pointer group" @click="open[`${task.id}`] = true">
                    <img :src="require('./../assets/' + task.images[0].name)" class=" w-full h-full" alt="" >
                    <div class=" relative hidden -top-full w-full h-full justify-center items-center
                         group-hover:bg-black group-hover:bg-opacity-40 group-hover:flex">
                        <div class=" flex space-x-10 text-white">
                            <p><i class="fa-solid fa-heart mr-2"></i>{{ computed(() => task.likes.length) }}</p>
                            <p><i class="fa-solid fa-comment mr-2"></i>{{ computed(() => task.comments.length) }}</p>
                        </div>
                    </div>

                    <Teleport to="body">
                        <div v-if="open[`${task.id}`]" class=" fixed top-0 left-0 h-screen w-screen">
                            <div class=" fixed top-0 left-0 h-screen w-screen bg-black bg-opacity-60 z-40" @click="open[`${task.id}`] = false">
                                <i class="fa-solid fa-x fixed right-5 top-5 text-lg text-white hover:cursor-pointer" @click="open[`${task.id}`] = false"></i>
                            </div>

                                <Task :passData="{task: task, open: open[`${task.id}`]}" 
                                        @sendFromTaskVue="(res) => {user.tasks = user.tasks.filter(item => item.id !== res.taskId); open[`${task.id}`] = res.open}"/>

                                <!-- <p>Hello from the modal!</p>-->

                        </div>
                    </Teleport>

                </div>
            </div>
        </div>
    </div>

    <div v-else>
        <div role="status" class=" absolute left-0 right-0 top-0 bottom-0 flex flex-col justify-center items-center">
            <p class=" block text-4xl mb-2">Loading...</p>
            <svg class="inline mr-2 w-20 h-20 text-gray-200 animate-spin dark:text-gray-600 fill-pink-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
            </svg>
        </div>
    </div>

    
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from "vue-router"
import axios from "axios";
import { displayToast, dangerColor, successColor } from './../composables/DisplayToast.js';
import { follow, deleteFollow, getRelation, spin } from './../composables/Fetch.js';
import Task from './Task.vue'

const router = useRouter();
const user = ref(null);
const currentUserId = ref(null);
const relation = ref(null);
const followers = ref(null);
const following = ref(null);
const open = ref({});

// console.log(router.currentRoute.value.params.id);

const followEvent = async(followerId, followingId) => {
    const followBtnElement = document.getElementById('followBtn');
    const tmp = followBtnElement.innerHTML;

    if(relation.value) {removeRelation(relation.value, followBtnElement);}
    else {addRelation(followerId, followingId, followBtnElement);}    
}

const removeRelation = async(relation, followBtnElement) => {
    console.log('in removeRelation');
    console.log(relation);
    followBtnElement.innerHTML = spin('gray');
    try {
        const response = await deleteFollow(relation.id);
        followBtnElement.innerHTML = 'Follow';
        followBtnElement.classList.remove('text-gray-700', 'border', 'border-gray-300');
        followBtnElement.classList.add('text-white', 'bg-blue-400');
    } catch (error) {
        followBtnElement.innerHTML = 'Following';
        displayToast('Error happend, cant unfollow user', dangerColor);
    }
}

const addRelation = async (followerId, followingId, followBtnElement) => {
    console.log('in addRelation');
    followBtnElement.innerHTML = spin('gray');
    try {
        const data = {followerId: followerId, followingId: followingId};
        const response = await follow(data);
        followBtnElement.innerHTML = 'Following';
        followBtnElement.classList.remove('text-white', 'bg-blue-400');
        followBtnElement.classList.add('text-gray-700', 'border', 'border-gray-300');
    } catch (error) {
        followBtnElement.innerHTML = 'Follow';
        displayToast("Error happend, can't follow user", dangerColor);
    }
}

onMounted( async() => {
    // const userId = parseInt(router.currentRoute.value.params.id);
    const userId = router.currentRoute.value.params.id;
    currentUserId.value = parseInt(router.currentRoute.value.query.currentUserId);

    try {
        let response = await axios.get('http://localhost:3000/users/' + userId, {withCredentials: true});
        user.value = response.data;
        user.value.tasks.forEach(element => {
            open.value[`${element.id}`] = false;
        });
        console.log(typeof user.value.id);
        console.log(typeof currentUserId.value);
        console.log('user.id', user.value.id, ' currentUserId', currentUserId.value);

        relation.value = await getRelation(currentUserId.value, userId);
        console.log(relation.value);

        response = await axios.get('http://localhost:3000/follows/user/' + userId, {withCredentials: true});
        const {numFollowers, numFollowing} = response.data;
        followers.value = numFollowers;
        following.value = numFollowing;

        // response = await 
    } catch (error) {
        console.log(error);
        if(error.response.status === 401) {
            router.push('/auth/signin');
            localStorage.removeItem('username');
        }
    }

})

</script>