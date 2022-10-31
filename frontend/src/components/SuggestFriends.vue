<template>
    <div class=" bg-white w-1/4 h-96 p-2 rounded-sm drop-shadow-md">
        <p class=" text-sm font-semibold text-gray-400">Suggest friends for you</p>
        <div v-if="fetchUserData.users === null" class="mt-2">
            <svg class="inline mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
            </svg>
        </div>
        <div v-else class=" mt-3">
            <ul class=" flex flex-col space-y-2">
                <li v-for="user in fetchUserData.users" :key="user" class=" flex justify-between items-center mx-3 text-semibold">
                    <div class=" flex space-x-2">
                        <img :src="require('./../assets/' + user.avatar)" alt="" class=" w-5 h-5 rounded-full">
                        <router-link :to="'/user/' +user.id+ '?currentUserId=' +fetchUserData.currentUser.id" 
                                        class=" font-semibold hover:text-gray-500">
                            {{ user.username }}
                        </router-link>
                    </div>
                    <button v-if="!getRelationStatus(fetchUserData.currentUser.id, user.id)" 
                    :id="'followBtn' + user.id" class="text-blue-400" 
                    @click="followEvent(fetchUserData.currentUser.id, user.id)">
                        Follow
                    </button>
                    <button v-else 
                    :id="'followBtn' + user.id" class="text-black" 
                    @click="followEvent(fetchUserData.currentUser.id, user.id)">
                        Following
                    </button>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from "axios";
import { displayToast, dangerColor, successColor } from '../composables/DisplayToast'
import { deleteFollow, getAllRelations, follow, spin } from '../composables/Fetch';

const emit = defineEmits(['sendToDashboard'])

const currentUserChild = ref({});
const usersChild = ref(null);
const relations = ref([]);

const props = defineProps({
    // currentUser: Object,
    // users: Object
    fetchUserData: Object
})

const followEvent = async(followerId, followingId) => {
    const followBtnElement = document.getElementById(`followBtn${followingId}`);
    const tmp = followBtnElement.innerHTML;

    const relation = relations.value.find(ele => ele.followerId === followerId && ele.followingId === followingId);
    if(relation) {removeRelation(relation, followBtnElement);}
    else {addRelation(followerId, followingId, followBtnElement);}    
}

const removeRelation = async(relation, followBtnElement) => {
    console.log('in removeRelation');
    followBtnElement.innerHTML = spin('gray');
    try {
        const response = await deleteFollow(relation.id);
        const indexOfElementNeedRemove = relations.value.indexOf(relation);
        console.log(indexOfElementNeedRemove);
        relations.value.splice(indexOfElementNeedRemove, 1);
        followBtnElement.innerHTML = 'Follow';
        followBtnElement.classList.remove('text-black');
        followBtnElement.classList.add('text-blue-400');
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
        relations.value.push(response);
        followBtnElement.innerHTML = 'Following';
        followBtnElement.classList.remove('text-blue-400');
        followBtnElement.classList.add('text-black');
    } catch (error) {
        followBtnElement.innerHTML = 'Follow';
        displayToast('Error happend, cant follow user', dangerColor);
    }
}


const getRelationStatus = (followerId, followingId) => {
    const relation = relations.value.find(ele => ele.followerId === followerId && ele.followingId === followingId);
    return relation;
}

onMounted( async() => {
    relations.value = await getAllRelations();
    console.log(relations.value);
})

</script>