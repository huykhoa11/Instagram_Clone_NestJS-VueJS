<template>
    <div class="fixed z-50 left-0 right-0 top-0 bottom-0 m-auto w-2/3 h-5/6 bg-white border border-gray-400 flex">

        <!-- splide images -->
        <!-- <Splide :options="{ rewind: true }" aria-label="Vue Splide Example" class=" w-fulll h-full">
                <SplideSlide v-for="image in Object.assign({}, passData.task.images)" :key="image.id" class=" w-full h-full border-2 border-red-500">
                    <img :src="require(`./../assets/${image.name}`)" alt="Sample 1" class=" w-full h-full object-cover">
                </SplideSlide>
        </Splide> -->

         <div class=" relative w-3/5 h-full bg-yellow-400">
            <div v-for="image in Object.assign({}, passData.task.images)" :key="image.id" class=" image w-full h-full bg-blue-400">
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
            <div class=" flex items-center h-16 border border-b-gray-100">
                <div class=" flex items-center space-x-3 ml-3">
                    <img :src="require('./../assets/' + passData.task.user.avatar)" alt="" class=" w-8 h-8 rounded-full border border-gray-50">
                    <p class=" font-semibold">
                        <router-link :to="'/user/' +passData.task.user.id+ '?currentUserId=' +currentUserId" 
                                    class=" hover:underline hover:decoration-solid">
                            {{ passData.task.user.username }}
                        </router-link>
                    </p>
                    <button v-if="userId !== currentUserId" class="text-blue-400 font-semibold">Follow</button>
                </div>
            </div>

            <div class=" mt-4 h-4/5 border border-green-400">
                <div class=" flex items-center space-x-3 ml-3 border border-red-400">
                    <img :src="require('./../assets/' + passData.task.user.avatar)" alt="" class=" w-8 h-8 rounded-full border border-gray-50">
                    <p class="">
                        <router-link :to="'/user/' +passData.task.user.id+ '?currentUserId=' +currentUserId" 
                                    class=" font-semibold hover:underline hover:decoration-solid">
                            {{ passData.task.user.username }}
                        </router-link>
                        {{ passData.task.content }}
                    </p>
                </div>

                
            </div>

            <div class=" relative flex justify-between px-3">
                <div class="">
                    <button :class="[passData.task.likes.find(ele=>ele.user.id===currentUserId) === undefined ?  'text-gray-400' : 'text-blue-400 bg-sky-100'  ]" 
                            @click="likeClick(task)" 
                            class=" px-2 text-sm  hover:bg-slate-200 hover:cursor-pointer">
                            <i class="fa-sharp fa-solid fa-thumbs-up mr-2"></i>Like
                    </button>
                    <span class=" flex justify-center items-center text-white bg-blue-500
                                        h-4 w-4 text-[13px] rounded-full absolute left-16 -top-1">{{ passData.task.likes.length }}</span>
                </div>
                <p class=" text-xs text-gray-400">{{ passData.task.updatedAt.split('T')[0] }}</p>
            </div>

            <div class=" flex absolute bottom-0 w-full">
                <input type="text" :id="'inputComment' + passData.task.id"  placeholder="leave a comment" maxlength="50"
                        class=" h-9 outline-none flex-1 pl-3 border border-t-gray-200">
                <button @click="addComment(task)" :id="'buttonComment' + passData.task.id" 
                        class=" px-2 border border-gray-200 bg-pink-500 hover:bg-pink-400 text-gray-100">Send</button>
            </div>
        </div>

    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from "vue-router"
import axios from "axios";
import { displayToast } from './../composables/DisplayToast.js'

// import splide
import { Splide, SplideSlide } from '@splidejs/vue-splide';
import '@splidejs/vue-splide/css';

// const emit = defineEmits(['sendToDashboard'])

const router = useRouter();

const users = ref([]);
const currentUser = ref({});

const userId = ref(null);
const currentUserId = ref(null);

const slideIndex = ref(0);

const props = defineProps({
    passData: Object
});

const likeClick = async(task) => {

    const isLiked = props.passData.task.likes.find(ele=>ele.user.id===currentUserId.value) !== undefined;
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
    console.log(props.passData);

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
            // console.log(images[i]);
        }
        images[0].style.display = 'block';
        dots[0].classList.add('bg-opacity-100');
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
    
    prev.addEventListener('click', ()=>{
        slideIndex.value -= 1;
        resetSlideIndex();
        console.log(slideIndex.value+1);
        showSlide();
    })

    next.addEventListener('click', ()=>{
        slideIndex.value += 1;
        resetSlideIndex();
        console.log(slideIndex.value+1);
        showSlide();
    })
})



</script>