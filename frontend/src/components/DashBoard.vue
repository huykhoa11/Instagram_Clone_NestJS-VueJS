<template>


    <div class="" v-if="isReady">
        <div role="status" class=" absolute left-0 right-0 top-0 bottom-0 flex flex-col justify-center items-center">
            <p class=" block text-4xl mb-2">Loading...</p>
            <svg class="inline mr-2 w-20 h-20 text-gray-200 animate-spin dark:text-gray-600 fill-pink-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
            </svg>
        </div>
    </div>
    <section v-else class=" bg-gray-50 pt-10">
        <!-- <div>
            <div>
                <form enctype="multipart/form-data" @submit.prevent="onSubmit" class="upload">
                    <input type="file" id="input-file" name="uploadFile" required multiple @change="loge">
                    <button>Submit</button>
                </form>
            </div>
            
            <div>
                <div v-for="file in testDropName" :key="file">
                    <img :src="require('./../assets/' + file.filename)" class=" h-36 w-48" alt="">
                </div>
            </div>
            <img :src="require('./../assets/' + imgName)" class=" h-36 w-48" alt="">
            <img src="./../assets/MVCmodel-c81010.jpg" class=" h-36 w-48" alt="">
        </div> -->

        
        <div class="w-screen flex justify-center mb-3">
            <div class=" border-double border-4 border-gray-200 p-3 w-1/2">
                <textarea v-model="inputTask" class=" outline-none mb-2 block bg-gray-50 w-full" placeholder="Hello, what r u thinking ?" maxlength="140"></textarea>
                <div>
                    
                    <p class=" text-sm p-1 text-gray-400 float-right">{{inputTask.length}}/140</p>
                </div>


                <!-- drag & drop images -->
                <div id="dropzone" ref="dropZoneElement" @drop.prevent="dropZoneElementDrop" class=" w-full h-28 mt-10 pt-2 border-t-2">
                    <p class="drop-zone__prompt text-gray-400">Drop file here or click to upload</p>
                    <input type="file" name="myFile" class=" hidden" id="dropzone-input" multiple>
                    <div class=" flex space-x-2">
                        <div v-for="file in previewDropFile" :key="file" class=" h-24 w-1/5 group relative">
                            <img :src="file.source" alt="Red dot" class=" h-full w-full group-hover:blur-sm peer relative" >
                            <div class="hidden peer-hover:flex peer-hover:flex-col hover:flex hover:flex-col justify-center items-center h-full w-full space-y-3 absolute text-[12px] top-0">
                                <i class="fa-solid fa-circle-xmark absolute top-0 right-0 text-lg
                                         text-zinc-50 text-opacity-50 hover:text-opacity-100 hover:cursor-pointer" @click="removeImage(file)"></i>
                                <p class=" bg-zinc-50 bg-opacity-50 flex justify-center items-center truncate w-1/2 cursor-default rounded-full">{{ file.name }}</p>
                                <p class=" bg-zinc-50 bg-opacity-50 flex justify-center items-center truncate w-1/2 cursor-default rounded-full">{{ Math.round(file.size/1024) }} KB</p>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- <button @click="onSubmit" class=" bg-red-500">Submit</button> -->
                <button @click="createTask()" ref="createTaskBtnRef" 
                        class=" text-sm p-1 float-right rounded-md text-blue-500 hover:bg-blue-500 hover:text-white duration-100">
                        Create Task
                </button>
            </div>
        </div>

        <div class=" relative mx-auto w-3/4 flex justify-around my-3 ">
            <ul class=" space-y-10 w-2/4">
                <li v-for="task in tasks" :key="task" class=" border border-gray-400 rounded-md bg-white">
                    <div class="">
                        <div class="px-2 flex justify-between items-center">
                            <div class=" flex items-center space-x-2">
                                <img :src="require('./../assets/' + task.user.avatar)" alt="" class=" w-8 h-8 rounded-full">
                                <div>
                                    <p class=" font-semibold text-pink-500">
                                        <router-link :to="'/user/' +task.user.id+ '?currentUserId=' +currentUser.id" 
                                                    class=" hover:underline hover:decoration-solid">
                                            {{ task.user.username }}
                                        </router-link>
                                    </p>
                                    <p class=" text-xs">{{ task.updatedAt.split('T')[0] }}</p>
                                </div>
                            </div>
                            <!-- <div @sendToDashboard="(fetchUserData) => {
                                currentUser = fetchUserData.user;  
                                users = fetchUserData.otherUsers;
                            }"> -->

                                <!-- <div v-if="currentUser.username === userOfTasks[task.id].username"> -->
                                <div v-if="currentUser.username === task.user.username">
                                    <i class="fa-solid fa-ellipsis pl-3 mr-3 inline-block hover:cursor-pointer group relative">
                                        <div class=" absolute -right-6 top-4 w-20 border border-gray-300 bg-white hidden group-hover:inline-block z-10">
                                            <div class=" text-xs text-blue-400 hover:bg-sky-200 hover:cursor-pointer pl-1 h-5" @click="changeIsEditStatus(task.id, 'edit')">Edit</div>
                                            <div class=" text-xs text-red-500 hover:bg-red-200 hover:cursor-pointer pl-1 h-5" @click="deleteTask(task.id)">Delete</div>
                                        </div>
                                    </i>
                                </div>
                            <!-- </div> -->
                        </div>
                        <hr>
                        
                        <!-- splide images -->
                        <Splide :options="{ rewind: true }" aria-label="Vue Splide Example" class=" w-full">
                            <SplideSlide v-for="image in task.images" :key="image" class=" w-full h-[360px]">
                                <img :src="require('./../assets/' + image.name)" alt="Sample 1" class=" w-full h-full">
                            </SplideSlide>
                        </Splide>

                        <!-- task content -->
                        <div class="flex h-20 relative" v-if="isEdit.find(ele => ele.taskId === task.id).status === true">
                            <textarea type="text" :id="'editInput' + task.id" :value="task.content" 
                                    class=" flex-1 pl-1 border border-gray-500" maxlength="140"></textarea>
                            <!-- <div class="" v-if="isEditting === false"> -->
                                <button @click="editTask(task.id)" class=" absolute bottom-1 right-20 min-w-[50px] rounded-md hover:bg-green-500 text-green-500 hover:text-white px-2">Save</button>
                                <button @click="changeIsEditStatus(task.id, 'cancel')" class=" absolute bottom-1 right-4 min-w-[50px] rounded-md hover:bg-slate-200 text-gray-500 px-2">Cancel</button>
                            <!-- </div> -->
                            <!-- <div class="" v-else>Loading...</div> -->
                        </div>
                        <p v-else class=" h-20 pl-2">{{ task.content }}</p>

                    </div>
                    <hr>
                    <ul class=" overflow-auto mt-2 h-28">
                        <li v-for="comment in task.comments" :key="comment" class="flex justify-between items-center px-1 pt-1 group hover:bg-gray-50">
                            <div class="text-sm flex items-center space-x-2">
                                <img :src="require('./../assets/' + comment.user.avatar)" alt="" class=" w-5 h-5 rounded-full">
                                <div>
                                    <!-- <span class=" font-semibold">{{ comment.user.username }}: </span> -->
                                    <router-link :to="'/user/' +comment.user.id+ '?currentUserId=' +currentUser.id" 
                                                    class=" font-semibold hover:underline hover:decoration-solid">
                                        {{ comment.user.username }}
                                    </router-link>
                                    {{comment.content}}  
                                    <span class=" text-[9px]">{{ timeAgoComment(comment) }}</span>
                                </div>
                            </div>
                            <i v-if="currentUser.id === comment.user.id" @click="deleteComment(comment.id, task)" class="fa-solid fa-x mr-4 text-xs hidden opacity-50 
                                hover:cursor-pointer hover:opacity-80 hover:text-red-500 group-hover:inline-block"></i>
                        </li>
                    </ul>
                    <div class="relative">
                        <button :class="[task.likes.find(ele=>ele.user.id===currentUser.id) === undefined ?  'text-gray-400' : 'text-blue-400 bg-sky-100'  ]" 
                                @click="likeClick(task)" 
                                class=" px-2 text-sm block border border-gray-200 hover:bg-slate-200 hover:cursor-pointer">
                                <i class="fa-sharp fa-solid fa-thumbs-up mr-2"></i>Like
                        </button>
                        <span class=" flex justify-center items-center text-white bg-blue-500
                                     h-4 w-4 text-[13px] rounded-full absolute left-14 -top-1">{{ task.likes.length }}</span>
                    </div>
                    <div class=" flex">
                        <input type="text" :id="'inputComment' + task.id" class=" flex-1 pl-1 border border-gray-200" placeholder="leave a comment" maxlength="50">
                        <button @click="addComment(task)" :id="'buttonComment' + task.id" 
                                class=" px-2 border border-gray-200 bg-pink-500 hover:bg-pink-400 text-gray-100">Send</button>
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
import { displayToast } from './../composables/DisplayToast.js'

// import splide
import { Splide, SplideSlide } from '@splidejs/vue-splide';
import '@splidejs/vue-splide/css';


const store = useStore();
const router = useRouter();

const isReady = ref(false);

const state = reactive({tasks: [], comments: [], likes: []});
const tasks = ref([]);
const currentUser = ref({});
const users = ref([]);

const inputTask = ref('');
const isEdit = ref([]);
const isEditting = ref(false);

// const commentsOfOneTask = ref(null);

const createTaskBtnRef = ref(null);

// test method
const uploadFile = ref(new FormData());       //For send data to backend
const previewDropFile = ref([]);  //For preview image on dropzone of frontend 

const dropZoneElement = ref(null);
const dropZoneElementDrop = (e) => {
    e.preventDefault();
    console.log(e.dataTransfer.files);

    // First time - remove the prompt
	if (dropZoneElement.value.querySelector(".drop-zone__prompt")) {
		dropZoneElement.value.querySelector(".drop-zone__prompt").remove();
	}

    if ((previewDropFile.value.length+e.dataTransfer.files.length) <= 5) {
        let formData = new FormData();
        
        for(let i=0; i<e.dataTransfer.files.length; i++ ) {
            console.log(e.dataTransfer.files[i]);
            let file = e.dataTransfer.files[i];
            uploadFile.value.append('image', file);

            if (file.type.startsWith("image/")) {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => {
                    const obj = {name: file.name, type: file.type, size: file.size, source: reader.result};
                    previewDropFile.value.push(obj);
                };
            }
            else {  //only image can drop in
                displayToast('Only images can be accepted !', '#EC6A71')
            }
            formData.append('image', file);
            // uploadFile.value.append('image', file);
        }
    } else {
        displayToast('Cant upload over 5 images', '#EC6A71');
    }

    console.log(dropZoneElement.value);
    console.log(previewDropFile.value);
    dropZoneElement.value.classList.remove("bg-gray-100");
    dropZoneElement.value.classList.remove("border-emerald-500");
}


const loge = async (e) => {
    console.log(e.target.files[0]);
    console.log(e.target.files[1]);
    // const filesArr =  Array.from(files)

    let formData = new FormData();
    uploadFile.value = new FormData();
    for(let i=0; i<2; i++ ) {
        let file = e.target.files[i];
        formData.append('image', file);
        uploadFile.value.append('image', file);
    }
}

const onSubmit = async() => {
    try {
        console.log('onSubmit button click, processing....');
        const response = await axios.post('http://localhost:3000/tasks/upload', uploadFile.value, {
            headers: {
                // Accept: "application/json",
                "Content-Type": "multipart/form-data",
            },
            withCredentials: true,
        });
    } catch (error) {
        Toastify({
            text: "Some thing has occured in onSubmit function",
            duration: 3000,
            destination: "#",
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
                background: "#EC6A71",
            },
            onClick: function(){} // Callback after click
        }).showToast();
    }


    // document.getElementById('input-file').value = '';
    uploadFile.value = null;
    console.log(uploadFile.value);
    console.log('dmm');
}

const removeImage = (file) => {
    const index = previewDropFile.value.indexOf(file);
    previewDropFile.value.splice(index, 1);
}


// Times ago in comment
const timeAgoComment = (comment) => {
    const createdAt = parseInt(comment.createdAt) / (1000 * 3600 * 24);
    const now = Date.now() / (1000 * 3600 * 24);
    const diff = Math.floor(now - createdAt);
    if( diff === 0) {return 'Today'}
    else if( diff === 1) {return '1 day ago'}
    else if(diff > 30) { return 'over 30 days ago' }
    else {return `${diff} days ago` }
}

// Tasks
const createTask = async() => {
    // uploadFile.value.append('content', inputTask.value)
    // for (const value of uploadFile.value) {
    //     console.log(value);
    // }
    if(previewDropFile.value.length === 0) {
        displayToast('Task must has image', '#EC6A71');
        console.log(previewDropFile.value);
    }
    else if(inputTask.value === '') {
        displayToast('Task muts has its content', '#EC6A71');
        console.log(previewDropFile.value);
    }
    else {
        try {
            const data = {content: inputTask.value};
            uploadFile.value.append('content', inputTask.value)
            const response = await axios
            .post('http://localhost:3000/tasks/upload', uploadFile.value, {
                headers: {
                    Accept: "application/json",
                    // "Content-Type": "application/json;charset=UTF-8",
                    "Content-Type": "multipart/form-data",
                },
                withCredentials: true,
            })
            uploadFile.value = new FormData();
            createTaskBtnRef.value.disabled = true;
            createTaskBtnRef.value.innerText = 'Loading...'
            inputTask.value = '';

            // const res = await axios.get('http://localhost:3000/tasks', {withCredentials: true});
            // tasks.value = res.data;

            tasks.value.push(response.data);
            console.log(tasks.value);
            isEdit.value.push({taskId: response.data.id, status: false});
            createTaskBtnRef.value.disabled = false;
            createTaskBtnRef.value.innerText = 'Create Task';
        } catch (error) {
            displayToast("Something went wrong! Please check again", "#EC6A71");
        }
    }

    
}

const getTasks = async() => {
    const response = await axios.get('http://localhost:3000/tasks', {withCredentials: true});
    tasks.value = response.data;
    // state.tasks = response.data;
}

const deleteTask = async (taskId) => {
    console.log(taskId);
    await axios.delete(`http://localhost:3000/tasks/${taskId}`, {withCredentials: true});
    tasks.value = tasks.value.filter(item => item.id !== taskId);
    console.log(tasks.value);
}

const editTask = async(taskId) => {
    try {
        isEditting.value = true;
        const editInputElement = document.getElementById(`editInput${taskId}`);
    
        const data = {content: editInputElement.value}
        await axios.patch(`http://localhost:3000/tasks/${taskId}`, data ,{withCredentials: true});
        const task = tasks.value.find(element => element.id === taskId);
        task.content = editInputElement.value;
        isEditting.value = false;
        isEdit.value.find(ele => ele.taskId === task.id).status = false;
        console.log(isEdit.value.find(ele => ele.taskId === task.id).status);
        editInputElement.value = '';
    } catch (error) {
        Toastify({
            text: "Task must has its content !",
            duration: 3000,
            destination: "#",
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
                background: "#EC6A71",
            },
            onClick: function(){} // Callback after click
        }).showToast();
    }
}

const changeIsEditStatus = (taskId, action) => {
    const isEditNeedModify = isEdit.value.find(ele => ele.taskId === taskId);
    isEditNeedModify.status = !isEditNeedModify.status;   
}


// Comments
const addComment = async(task) => {

    try {
        const inputCommentElement  = document.getElementById(`inputComment${task.id}`);
        const buttonCommentElement = document.getElementById(`buttonComment${task.id}`);
        console.log(inputCommentElement.value);
        const data = {content: inputCommentElement.value};
        
        const response = await axios
        .post(`http://localhost:3000/tasks/${task.id}/comments`, data, {
            headers: {
            Accept: "application/json",
            "Content-Type": "application/json;charset=UTF-8",
            },
            withCredentials: true,
        })
        
        buttonCommentElement.disabled = true;
        buttonCommentElement.classList.toggle('hover:bg-slate-100');
        buttonCommentElement.innerText = 'Loading...';
    
        inputCommentElement.value = '';
        buttonCommentElement.disabled = false;
        buttonCommentElement.innerText = 'Send';
        buttonCommentElement.classList.toggle('hover:bg-slate-100');
        task.comments.unshift(response.data)
    } catch (error) {
        displayToast('Comment must has its content!', '#EC6A71');
    }
}

const deleteComment = async(commentId, task) => {
    task.comments = task.comments.filter(item => item.id !== commentId);
    await axios.delete(`http://localhost:3000/tasks/comments/${commentId}`, {withCredentials: true});
    // arr = arr.filter(item => item !== value)
}

// const getCmtsFromOneTask = async(taskId) => {
//     const response = await axios.get(
//         `http://localhost:3000/tasks/${taskId}/comments`, 
//         {withCredentials: true}
//     );
//     commentsOfOneTask.value = response.data;
// }


// Likes
const likeClick = async(task) => {

    const isLiked = task.likes.find(ele=>ele.user.id===currentUser.value.id) !== undefined;
    // const isLiked = task.user.likes.length !== 0; 
    if(isLiked === false) {

        const data = {status: true};
        const response = await axios.post(`http://localhost:3000/tasks/${task.id}/likes`, data, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json;charset=UTF-8",
            },
            withCredentials: true,
        });

        const newLike = response.data;
        task.likes.unshift(newLike);
        task.user.likes.push({id: newLike.id, status: newLike.status});  //for changing color of like button
    }
    else {

        await axios.delete(`http://localhost:3000/tasks/${task.id}/likes`, {
            headers: {
                Accept: "application/json",
            "Content-Type": "application/json;charset=UTF-8",
            },
            withCredentials: true,
        });

        const likeNeedRemove = task.likes.find(ele => ele.user.id === currentUser.value.id);
        const indexOfLikeNeedRemove = task.likes.indexOf(likeNeedRemove);
        task.likes.splice(indexOfLikeNeedRemove, 1);
        task.user.likes.pop(); //for changing color of like button

    }
}

onMounted( async() => {
    // Dropzone.options.myDropzone = {
    //     // Configuration options go here
    //     paramName: "file", // The name that will be used to transfer the file
    //     maxFilesize: 2, // MB
    //     accept: function(file, done) {
    //     if (file.name == "justinbieber.jpg") {
    //         done("Naha, you don't.");
    //     }
    //     else { done(); }
    //     }
    // };

    try {
        // const fetchUser = await axios.get('http://localhost:3000/tasks/users', {withCredentials: true});
        // const fetchUser = await axios.get('http://localhost:3000/users', {withCredentials: true});
        const fetchUser = await axios.get('http://localhost:3000/users/currentuser-and-otherusers', {withCredentials: true});
        const {user, otherUsers} = fetchUser.data;
        console.log(fetchUser.data);
        currentUser.value = user;  
        users.value = otherUsers;

        const response = await axios.get('http://localhost:3000/tasks', {withCredentials: true});
        console.log(response.data);
        tasks.value = response.data;

        if(tasks.value.length !== 0) {
            tasks.value.forEach(async(ele) => {
                isEdit.value.push({taskId: ele.id, status: false});

                // userOfTasks.value[ele.id] = ele.user;

                // comments.value[ele.id] = ele.comments;
    
                // let response;
                // response = await axios.get(
                //     `http://localhost:3000/tasks/${ele.id}/comments`, 
                //     {withCredentials: true}
                // );
                // comments.value[ele.id] = response.data;
    
                // response = await axios.get(
                //     `http://localhost:3000/tasks/${ele.id}/likes`, 
                //     {withCredentials: true}
                // );
                // likes.value[ele.id] = response.data;
                // isEdit.value[ele.id] = false;
    
                // response = await axios.get(
                //     `http://localhost:3000/tasks/${ele.id}/countLikesOfTask`, 
                //     {withCredentials: true}
                // );
                // countLikes.value[ele.id] = response.data;

            })
        }
    } catch (error) {
        console.log(error);
        router.push('/auth/signin');
        localStorage.removeItem('username');        
    }

    
    isReady.value = false;
    // if(tasks.length === 0 || comments.length === 0 || likes.length === 0 || countLikes.length === 0) {
    // }
    // console.log(tasks.value);
    // console.log(comments.value);
    // console.log(likes.value);
    // console.log(isEdit.value);
    // console.log(countLikes.value);
    


    const dropZoneElement = document.getElementById('dropzone');
    const inputElement = document.getElementById('dropzone-input');

    dropZoneElement.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZoneElement.classList.add("bg-gray-100");
        dropZoneElement.classList.add('border-emerald-500');    
    })

    dropZoneElement.addEventListener('dragleave', (e)=>{
        dropZoneElement.classList.remove("bg-gray-100");
        dropZoneElement.classList.remove('border-emerald-500');
    });

    dropZoneElement.addEventListener('dragend', (e)=>{
        dropZoneElement.classList.remove("bg-gray-100");
        dropZoneElement.classList.remove('border-emerald-500');
    });

})

</script>


<style scoped>
/* @import 'https://unpkg.com/dropzone@5/dist/min/dropzone.min.css'; */
</style>