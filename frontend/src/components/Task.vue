<template>
    <div class="fixed z-50 left-0 right-0 top-0 bottom-0 m-auto w-1/2 h-5/6 bg-white border border-gray-400 flex">
        <!-- <div v-if="passData.currentUser" class="">
            <svg class="inline mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
            </svg>
        </div> -->
        <!-- <ul class=" ">
            <p>{{passData}}</p>
        </ul> -->

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

            <div id="prev" class=" absolute top-1/2 left-1 text-black font-bold w-7 h-7 flex items-center justify-center 
                                    -translate-y-1/2 cursor-pointer rounded-full bg-white bg-opacity-50">
                <i class="fa-solid fa-angle-left"></i>
            </div>
		    <div id="next" class=" absolute top-1/2 right-1 text-black font-bold w-7 h-7 flex items-center justify-center 
                                    -translate-y-1/2 cursor-pointer rounded-full bg-white bg-opacity-50">
                <i class="fa-solid fa-angle-right"></i>
            </div>

            <div class=" absolute flex bottom-8 left-1/2 -translate-x-1/2">
                <div v-for="image in Object.assign({}, passData.task.images)" :key="image.id" class=" ">
                    <div class="dot h-2 w-2 rounded-full bg-white bg-opacity-50"></div>
                </div>
            </div>

        </div> 


        <div class=" w-2/5 ">
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

            <div class=" mt-4">
                <div class=" flex items-center space-x-3 ml-3">
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
        </div>

    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from "vue-router"
import axios from "axios";

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

onMounted( async() => {
    userId.value = parseInt(router.currentRoute.value.params.id);
    currentUserId.value = parseInt(router.currentRoute.value.query.currentUserId);
    console.log(userId.value, currentUserId.value);


    const prev = document.getElementById('prev');
    const next = document.getElementById('next');
    const images = document.querySelectorAll('.image');
    const dots = document.querySelectorAll('.dot');

    const setInit = () => {
        for(let i=0; i<images.length; i++) {
            images[i].style.display = "none";
            console.log(images[i]);
        }
        images[0].style.display = 'block';
        dots[0].classList.add('bg-opacity-100');
    }
    setInit();

    const reserSlideIndex = () => {
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