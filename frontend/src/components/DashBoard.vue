<template>
    <div class="" v-if="tasks.length === 0 || comments.length === 0 || likes.length === 0 || countLikes.length === 0">
        <div role="status" class=" absolute left-0 right-0 top-0 bottom-0 flex flex-col justify-center items-center">
            <p class=" block text-4xl mb-2">Loading...</p>
            <svg class="inline mr-2 w-20 h-20 text-gray-200 animate-spin dark:text-gray-600 fill-pink-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
            </svg>
        </div>
    </div>
    <section v-else class=" bg-gray-50 h-screen pt-10">
        <button @click="loge()">click me</button>
        <div class="w-screen flex justify-center mb-3">
            <div class="border-double border-4 border-gray-200 p-3 w-1/2">
                <textarea v-model="inputTask" class=" outline-none mb-2 block bg-gray-50 w-full" placeholder="Hello, what r u thinking ?"></textarea>
                <button @click="createTask()" ref="createTaskBtnRef" 
                        class=" text-sm p-1 float-right rounded-sm text-blue-500 hover:bg-blue-500 hover:text-white">
                        Create Task
                </button>
            </div>
        </div>

        <div class=" relative mx-auto w-3/4 flex justify-around my-3 ">
            <ul class=" space-y-10 w-2/4">
                <li v-for="task in tasks" :key="task" class=" border border-gray-400 rounded-md bg-white">
                    <div class="">
                        <div class="px-2 flex justify-between items-center">

                            <p class=" font-semibold">{{ userOfTasks[task.id].username }}</p>
                            <!-- <div @sendToDashboard="(fetchUserData) => {
                                currentUser = fetchUserData.user;  
                                users = fetchUserData.otherUsers;
                            }"> -->

                                <div v-if="currentUser.username === userOfTasks[task.id].username">
                                    <i class="fa-solid fa-ellipsis pl-3 mr-3 inline-block hover:cursor-pointer group relative">
                                        <div class=" absolute -right-6 top-4 w-20 border border-gray-200 bg-white hidden group-hover:inline-block">
                                            <div class=" text-xs text-blue-400 hover:bg-sky-200 hover:cursor-pointer pl-1 py-1" @click="isEdit[task.id] = true">Edit</div>
                                            <div class=" text-xs text-red-500 hover:bg-red-200 hover:cursor-pointer pl-1 py-1" @click="deleteTask(task.id)">Delete</div>
                                        </div>
                                    </i>
                                </div>
                            <!-- </div> -->
                        </div>
                        <hr>
                        
                        <div class="flex" v-if="isEdit[task.id] === true">
                            <input type="text" :id="'editInput' + task.id" placeholder="edit task content" class=" flex-1 pl-1">
                            <div class="" v-if="isEditting === false">
                                <button @click="editTask(task.id)" class=" bg-green-500 text-white hover:bg-green-400 px-2">Save</button>
                                <button @click="isEdit[task.id] = false" class=" bg-slate-200 text-gray-500 hover:bg-slate-300 px-2">Cancel</button>
                            </div>
                            <div class="" v-else>Loading...</div>
                        </div>
                        <p v-else class=" pl-2">{{ task.content }}</p>

                    </div>
                    <hr>
                    <ul class=" overflow-auto ">
                        <li v-for="comment in comments[task.id]" :key="comment" class="flex justify-between items-center px-1 pt-1 group hover:bg-gray-50">
                            <p class="text-sm">{{comment.content}}</p>
                            <i @click="deleteComment(comment.id, task.id)" class="fa-solid fa-x mr-4 text-xs hidden opacity-50 
                                hover:cursor-pointer hover:opacity-80 hover:text-red-500 group-hover:inline-block"></i>
                        </li>
                    </ul>
                    <div class="relative">
                        <button :class="[likes[task.id] === '' ?  'text-gray-400' : 'text-blue-400 bg-sky-100'  ]" 
                                @click="likeClick(task.id)" 
                                class=" px-2 text-sm block border border-gray-200 hover:bg-slate-200 hover:cursor-pointer">
                                <i class="fa-sharp fa-solid fa-thumbs-up mr-2"></i>Like
                        </button>
                        <span class=" flex justify-center items-center text-white bg-blue-500
                                     h-4 w-4 text-[13px] rounded-full absolute left-14 -top-1">{{ countLikes[task.id] }}</span>
                    </div>
                    <div class=" flex">
                        <input type="text" :id="'inputComment' + task.id" class=" flex-1 pl-1 border border-gray-200" placeholder="add comment">
                        <button @click="addComment(task.id)" :id="'buttonComment' + task.id" 
                                class=" px-2 border border-gray-200 bg-indigo-500 hover:bg-indigo-400 text-gray-100">Comment</button>
                    </div>
                </li>
            </ul>

            <SuggestFriends :fetchUserData="{currentUser: currentUser, users: users}" />
        </div>
    </section>
</template>





<script setup>
import SuggestFriends from './SuggestFriends.vue';
import { reactive, ref, onMounted, computed  } from "vue";
import axios from "axios";
import { useStore } from 'vuex';
import {useRouter} from "vue-router"

const store = useStore();
const router = useRouter();

const state = reactive({tasks: [], comments: [], likes: []});
const tasks = ref([]);
const comments = ref([]);
const likes = ref([]);
const countLikes = ref([]);
const userOfTasks = ref([]);
const currentUser = ref({});
const users = ref([]);

const inputTask = ref('');
const isEdit = ref([]);
const isEditting = ref(false);

const commentsOfOneTask = ref(null);
const likeStatus = ref('text-gray-400')

const createTaskBtnRef = ref(null);

// test current user
const loge = () => {
    console.log(currentUser.value);
    console.log((typeof currentUser.value));
    console.log(users.value);
    console.log((typeof users.value));
}


// Tasks
const createTask = async() => {

    createTaskBtnRef.value.disabled = true;
    createTaskBtnRef.value.innerText = 'Loading...'
    const data = {content: inputTask.value};
    
    const response = await axios
    .post('http://localhost:3000/tasks', data, {
        headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        },
        withCredentials: true,
    })
    inputTask.value = '';
    tasks.value.push(response.data);
    const responseDataId = response.data.id; 
    comments.value[responseDataId] = [];
    likes.value[responseDataId] = '';
    isEdit.value[responseDataId] = false;

    console.log(comments.value);
    console.log(likes.value);
    // getTasks();
    createTaskBtnRef.value.disabled = false;
    createTaskBtnRef.value.innerText = 'Create Task';
}

const getTasks = async() => {
    const response = await axios.get('http://localhost:3000/tasks', {withCredentials: true});
    tasks.value = response.data;
    // state.tasks = response.data;
}

const deleteTask = async (taskId) => {
    await axios.delete(`http://localhost:3000/tasks/${taskId}`, {withCredentials: true});
    tasks.value = tasks.value.filter(item => item.id !== taskId);
    console.log(tasks.value);
}

const editTask = async(taskId) => {
    isEditting.value = true;
    const editInputElement = document.getElementById(`editInput${taskId}`);
    const data = {content: editInputElement.value}
    await axios.patch(`http://localhost:3000/tasks/${taskId}`, data ,{withCredentials: true});
    const task = tasks.value.find(element => element.id === taskId);
    task.content = editInputElement.value;
    isEditting.value = false;
    isEdit.value[taskId] = false;
    editInputElement.value = '';
}


// Comments
const addComment = async(taskId) => {

    const inputCommentElement  = document.getElementById(`inputComment${taskId}`);
    const buttonCommentElement = document.getElementById(`buttonComment${taskId}`);
    console.log(inputCommentElement.value);
    buttonCommentElement.disabled = true;
    buttonCommentElement.classList.toggle('hover:bg-slate-100');
    buttonCommentElement.innerText = 'Loading...';

    const data = {content: inputCommentElement.value};
    
    const response = await axios
    .post(`http://localhost:3000/tasks/${taskId}/comments`, data, {
        headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        },
        withCredentials: true,
    })

    inputCommentElement.value = '';
    buttonCommentElement.disabled = false;
    buttonCommentElement.innerText = 'Add comment';
    buttonCommentElement.classList.toggle('hover:bg-slate-100');
    comments.value[taskId].push(response.data)
}

const deleteComment = async(commentId, taskId) => {
    comments.value[taskId] = comments.value[taskId].filter(item => item.id !== commentId);
    await axios.delete(`http://localhost:3000/tasks/comments/${commentId}`, {withCredentials: true});
    // arr = arr.filter(item => item !== value)
    console.log(comments.value[taskId]);

}

const getCmtsFromOneTask = async(taskId) => {
    const response = await axios.get(
        `http://localhost:3000/tasks/${taskId}/comments`, 
        {withCredentials: true}
    );
    commentsOfOneTask.value = response.data;
}


// Likes
const likeClick = async(taskId) => {

    if(likes.value[taskId].status === false || likes.value[taskId]  === '') {
        if(likes.value[taskId]  === '') {
           likes.value[taskId] = {};
        }

        likes.value[taskId].status  = true;
        countLikes.value[taskId] += 1;
        const data = {status: true};
        await axios.post(`http://localhost:3000/tasks/${taskId}/likes`, data, {
            headers: {
                Accept: "application/json",
            "Content-Type": "application/json;charset=UTF-8",
            },
            withCredentials: true,
        });
    }
    else if (likes.value[taskId].status  === true) {
        // const data = {status: false};
        // const index = likes.value.indexOf(taskId);
        // likes.value[taskId].status = false;
        // likes.value.splice(index, 1);
        likes.value[taskId] = '';
        countLikes.value[taskId] -= 1;
        await axios.delete(`http://localhost:3000/tasks/${taskId}/likes`, {
            headers: {
            Accept: "application/json",
            "Content-Type": "application/json;charset=UTF-8",
            },
            withCredentials: true,
        });
    }
}

onMounted( async() => {
    try {
        const fetchUser = await axios.get('http://localhost:3000/tasks/users', {withCredentials: true});
        const {user, otherUsers} = fetchUser.data;
        currentUser.value = user;  
        users.value = otherUsers;

        const response = await axios.get('http://localhost:3000/tasks', {withCredentials: true});
        console.log(response.data);
        tasks.value = response.data;

        tasks.value.forEach(async(ele) => {
            userOfTasks.value[ele.id] = ele.user;

            let response;
            response = await axios.get(
                `http://localhost:3000/tasks/${ele.id}/comments`, 
                {withCredentials: true}
            );
            comments.value[ele.id] = response.data;

            response = await axios.get(
                `http://localhost:3000/tasks/${ele.id}/likes`, 
                {withCredentials: true}
            );
            likes.value[ele.id] = response.data;
            isEdit.value[ele.id] = false;

            response = await axios.get(
                `http://localhost:3000/tasks/${ele.id}/countLikesOfTask`, 
                {withCredentials: true}
            );
            countLikes.value[ele.id] = response.data;
        })
    } catch (error) {
        console.log(error);
        router.push('/auth/signin');
        alert('Please sign in first ^^');
        
    }

    

    // console.log(tasks.value);
    // console.log(comments.value);
    // console.log(likes.value);
    // console.log(isEdit.value);
    // console.log(countLikes.value);
    
})

</script>