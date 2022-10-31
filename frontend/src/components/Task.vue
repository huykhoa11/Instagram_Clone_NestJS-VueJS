<template>
    <div class="fixed z-50 left-0 right-0 top-0 bottom-0 m-auto w-2/3 h-5/6 bg-white border border-gray-400 flex">
        <!-- splide images -->
        <!-- <Splide :options="{ rewind: true }" aria-label="Vue Splide Example" class=" w-fulll h-full">
                <SplideSlide v-for="image in Object.assign({}, passData.task.images)" :key="image.id" class=" w-full h-full border-2 border-red-500">
                    <img :src="require(`./../assets/${image.name}`)" alt="Sample 1" class=" w-full h-full object-cover">
                </SplideSlide>
        </Splide> -->

         <div class=" relative w-3/5 h-full">
            <div v-for="image in Object.assign({}, passData.task.images)" :key="image.id" class=" image w-full h-full">
                <img :src="require(`./../assets/${image.name}`)" alt="Sample 1" class=" w-full h-full">
            </div>

            <div v-if="passData.task.images.length > 1">

                <div id="prev" class=" absolute top-1/2 left-2 text-black font-bold w-7 h-7 flex items-center justify-center 
                                        -translate-y-1/2 cursor-pointer rounded-full bg-white bg-opacity-50">
                    <i class="fa-solid fa-angle-left"></i>
                </div>
                <div id="next" class=" absolute top-1/2 right-2 text-black font-bold w-7 h-7 flex items-center justify-center 
                                        -translate-y-1/2 cursor-pointer rounded-full bg-white bg-opacity-50">
                    <i class="fa-solid fa-angle-right"></i>
                </div>

                <div class=" absolute flex bottom-8 left-1/2 -translate-x-1/2 space-x-2">
                    <div v-for="image in Object.assign({}, passData.task.images)" :key="image.id" class=" ">
                        <div class="dot h-2 w-2 rounded-full bg-white bg-opacity-50"></div>
                    </div>
                </div>
            </div>

        </div> 


        <div class=" w-2/5 relative">
            <!-- {{ passData.task }} -->
            <!-- Header -->
            <div class=" flex justify-between items-center h-16 border-b-2 border-gray-100">
                <div class=" flex items-center space-x-3 ml-3">
                    <img :src="require('./../assets/' + passData.task.user.avatar)" alt="" class=" w-8 h-8 rounded-full border border-gray-50">
                    <p class=" font-semibold">
                        <router-link :to="'/user/' +passData.task.user.id+ '?currentUserId=' +currentUserId" 
                                    class=" hover:underline hover:decoration-solid">
                            {{ passData.task.user.username }}
                        </router-link>
                    </p>
                </div>

                <div v-if="userId === currentUserId" class=" flex items-center space-x-2 mr-2" id="EditOrDeleteFeature">
                    <div class=" hover:text-blue-500 hover:cursor-pointer" @click="isEdit = true" v-if="isEdit === false"><i class="fa-solid fa-pen-to-square"></i></div>
                    <div class=" hover:text-red-500 hover:cursor-pointer" @click="removeTask(passData.task.id)"><i class="fa-solid fa-trash"></i></div>
                </div>
            </div>

            <!-- Main content -->
            <div class=" mt-2 pl-3 h-4/5 border-b-2 border-gray-100">
                <!-- Task content -->
                <div v-if="isEdit === false" class=" flex items-center space-x-3">
                    <img :src="require('./../assets/' + passData.task.user.avatar)" alt="" class=" w-8 h-8 rounded-full border border-gray-50">
                    <p class="">
                        <router-link :to="'/user/' +passData.task.user.id+ '?currentUserId=' +currentUserId" 
                                    class=" font-semibold hover:underline hover:decoration-solid">
                            {{ passData.task.user.username }}
                        </router-link>
                        {{ passData.task.content }}
                    </p>
                </div>

                <div class="flex h-20 relative" v-else>
                    <textarea type="text" v-model="inputEditContent" 
                            class=" flex-1 pl-1 border border-gray-500 outline-none border-none" maxlength="140"></textarea>
                    <div id="EditFeature" class=" block">
                        <p class="absolute bottom-1 right-36 min-w-[50px] text-sm text-gray-200"> {{ inputEditContent.length }} /140</p>
                        <button @click="editTask(passData.task.id)" class=" absolute bottom-1 right-20 min-w-[50px] rounded-md hover:bg-green-500 text-green-500 hover:text-white px-2">Save</button>
                        <button @click="isEdit = false" class=" absolute bottom-1 right-4 min-w-[50px] rounded-md hover:bg-slate-200 text-gray-500 px-2">Cancel</button>
                    </div>
                </div>

                <!-- Task comments -->
                <ul v-if="isEdit === false" class=" overflow-auto mt-2 h-28">
                    <li v-for="comment in passData.task.comments" :key="comment" class="flex justify-between items-center px-1 pt-1 group hover:bg-gray-50">
                        <div class="text-sm flex items-center space-x-2">
                            <img :src="require('./../assets/' + comment.user.avatar)" alt="" class=" w-5 h-5 rounded-full">
                            <div>
                                <router-link :to="'/user/' +comment.user.id+ '?currentUserId=' +currentUser.id" 
                                                class=" font-semibold hover:underline hover:decoration-solid">
                                    {{ comment.user.username }}:
                                </router-link>
                                {{comment.content}}  
                                <span class=" text-[9px]">{{ timeAgoComment(comment) }}</span>
                            </div>
                        </div>
                        <i v-if="currentUserId === comment.user.id" @click="removeComment(comment.id)" class="fa-solid fa-x mr-4 text-xs hidden opacity-50 
                            hover:cursor-pointer hover:opacity-80 hover:text-red-500 group-hover:inline-block"></i>
                    </li>
                </ul>
            </div>

            <!-- Like button -->
            <div class=" relative flex justify-between px-3">
                <div class="">
                    <button id="btnLike"
                        :class="[passData.task.likes.find(ele=>ele.user.id===currentUserId) === undefined ?  'text-gray-400' : 'text-pink-400 bg-pink-100'  ]" 
                            @click="likeClick(passData.task)" 
                            class=" px-2 text-sm  hover:bg-slate-200 hover:cursor-pointer">
                            <i class="fa-sharp fa-solid fa-thumbs-up mr-2"></i>Like
                    </button>
                    <span class=" flex justify-center items-center text-white bg-pink-500
                                        h-4 w-4 text-[13px] rounded-full absolute left-16 -top-1">{{ passData.task.likes.length }}</span>
                </div>
                <p class=" text-xs text-gray-400">{{ passData.task.updatedAt.split('T')[0] }}</p>
            </div>

            <!-- Comment section -->
            <div class=" w-full flex absolute bottom-0 border-t-2 border-gray-200">
                <input type="text" :id="'inputComment' + passData.task.id"  placeholder="leave a comment" maxlength="50"
                        class=" h-9 outline-none flex-1 pl-3">
                <button @click="addComment(passData.task)" :id="'buttonComment' + passData.task.id"
                        class=" px-2 border border-gray-200 bg-pink-500 hover:bg-pink-400 text-gray-100">Send</button>
            </div>
        </div>

    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from "vue-router"
import axios from "axios";
import { displayToast, dangerColor, successColor } from './../composables/DisplayToast.js';
import { addLike, deleteLike, spin, createComment, deleteComment, saveEditTask, deleteTask, timeAgoComment } from './../composables/Fetch.js';

// import splide
import { Splide, SplideSlide } from '@splidejs/vue-splide';
import '@splidejs/vue-splide/css';

const router = useRouter();

const users = ref([]);
const currentUser = ref({});

const userId = ref(null);
const currentUserId = ref(null);
const isEdit = ref(false);
const inputEditContent = ref('');

const slideIndex = ref(0);

const props = defineProps({
    passData: Object
});
const emit = defineEmits(['sendFromTaskVue']);

const likeClick = async(task) => {

    const isLiked = props.passData.task.likes.find(ele=>ele.user.id===currentUserId.value) !== undefined;
    if(isLiked === false) {
        const btnLikeElement = document.getElementById('btnLike');
        btnLikeElement.disabled = true;
        btnLikeElement.innerHTML = spin();
        btnLikeElement.classList.remove('hover:bg-slate-200', 'hover:cursor-pointer');
        
        const newLike = await addLike(task.id);

        btnLikeElement.disabled = false;
        btnLikeElement.innerHTML = `<i class="fa-sharp fa-solid fa-thumbs-up mr-2"></i>Like`;
        btnLikeElement.classList.add('hover:bg-slate-200', 'hover:cursor-pointer');

        props.passData.task.likes.unshift(newLike);
        // emit('sendFromTaskVue', props.passData.task);

        // props.passData.task.user.likes.push({id: newLike.id, status: newLike.status});  //for changing color of like button
    }
    else {

        deleteLike(task.id);
        const likeNeedRemove = props.passData.task.likes.find(ele => ele.user.id === currentUserId.value);
        const indexOfLikeNeedRemove = task.likes.indexOf(likeNeedRemove);
        props.passData.task.likes.splice(indexOfLikeNeedRemove, 1);
        // emit('sendFromTaskVue', props.passData.task);
        // props.passData.task.user.likes.pop(); //for changing color of like button
    }
}

const addComment = async(task) => {
    try {
        const inputCommentElement  = document.getElementById(`inputComment${task.id}`);
        const buttonCommentElement = document.getElementById(`buttonComment${task.id}`);
        console.log(inputCommentElement.value);
        const data = {content: inputCommentElement.value};
        
        buttonCommentElement.disabled = true;
        buttonCommentElement.classList.toggle('hover:bg-pink-400');
        buttonCommentElement.innerHTML = spin();

        const newCmt = await createComment(task.id, data); 
    
        inputCommentElement.value = '';
        buttonCommentElement.disabled = false;
        buttonCommentElement.innerHTML = 'Send';
        buttonCommentElement.classList.toggle('hover:bg-pink-400');
        props.passData.task.comments.unshift(newCmt)
    } catch (error) {
        displayToast('Comment must has its content!', dangerColor);
    }
}

const removeComment = async(commentId) => {
    props.passData.task.comments = props.passData.task.comments.filter(item => item.id !== commentId);
    await deleteComment(commentId);
}

const editTask = async(taskId) => {
    try {
        const EditFeatureElement = document.getElementById('EditFeature');
        const tmp = EditFeatureElement.innerHTML;
        EditFeatureElement.innerHTML = spin();

        const data = {content: inputEditContent.value};
        const newUpdateTask = await saveEditTask(taskId, data);
        
        console.log(newUpdateTask);
        EditFeatureElement.innerHTML = tmp;
        isEdit.value = false;
        props.passData.task.content = inputEditContent.value;
        props.passData.task.updatedAt = newUpdateTask.updatedAt;
        displayToast('Edit task succesfully', successColor);
    } catch (error) {
        displayToast("Task must has its content !", dangerColor);
    }
    
}

const removeTask = async(taskId) => {
    const EditOrDeleteFeatureElement = document.getElementById('EditOrDeleteFeature');
    const tmp = EditOrDeleteFeatureElement.innerHTML;
    EditOrDeleteFeatureElement.innerHTML = spin();

    await deleteTask(taskId);
    console.log('delete done')

    EditOrDeleteFeatureElement.innerHTML = tmp;
    emit('sendFromTaskVue', {taskId: taskId, open: false});

}

onMounted( async() => {
    console.log(props.passData);
    inputEditContent.value = props.passData.task.content;

    userId.value = parseInt(router.currentRoute.value.params.id);
    currentUserId.value = parseInt(router.currentRoute.value.query.currentUserId);
    console.log(userId.value, currentUserId.value);

    const prev = document.getElementById('prev');
    const next = document.getElementById('next');
    const images = document.querySelectorAll('.image');
    const dots = document.querySelectorAll('.dot');

    (() => {
        for(let i=0; i<images.length; i++) {
            images[i].style.display = "none";
        }
        images[0].style.display = 'block';
        if(dots.length > 0) {
            dots[0].classList.add('bg-opacity-100');
        }
    })();

    const resetSlideIndex = () => {
        if(slideIndex.value < 0) {
            slideIndex.value = images.length -1;
        }
        else if(slideIndex.value > images.length-1) {
            slideIndex.value = 0;
        }
    }

    const showSlide = () => {
        for(let i=0; i<images.length; i++) {
            images[i].style.display = "none";
        }
        images[slideIndex.value].style.display = "block";

        for(let i=0; i<dots.length; i++) {
            dots[i].classList.remove("bg-opacity-100");
        }
        dots[slideIndex.value].classList.add("bg-opacity-100");
    }
    
    if(prev) {
        prev.addEventListener('click', ()=>{
            slideIndex.value -= 1;
            resetSlideIndex();
            showSlide();
        })
    }

    if(next) {
        next.addEventListener('click', ()=>{
            slideIndex.value += 1;
            resetSlideIndex();

            showSlide();
        })
    }
})



</script>