<template>
    <section class=" relative">
        <!-- <div v-if="currentUser"> -->
            <div class=" absolute left-0 right-0 mx-auto mt-32 w-1/2
                        border-double border-4 border-gray-500 bg-white drop-shadow-md
                        flex">
                        
                <!-- Menu -->
                <div class=" border-r border-gray-300 min-w-40 flex flex-col text-left">
                    <button @click="changeTab('EditBasicInfo')"
                            class="btnList font-bold border-l-2 border-black px-3 py-3">
                        Edit infomations
                    </button>
                    <button @click="changeTab('EditPassword')"
                            class="btnList hover:bg-gray-100 hover:border-l-2 hover:border-gray-400 px-3 py-3">
                        Change password
                    </button>
                    <input type="radio" ref="inputEditBasicInfoRef" 
                            v-model="currentTab" :value="EditBasicInfo" class=" hidden">
                    <input type="radio" ref="inputEditPasswordRef" 
                            v-model="currentTab" :value="EditPassword" class=" hidden">
                </div>

                <!-- Main -->
                <div class=" w-full pr-5">
                    <KeepAlive>
                        <component :is="currentTab" :key="currentTab"></component>
                    </KeepAlive>
                </div>
                
            </div>
        <!-- </div> -->
    </section>
</template>

<script setup>
import { onMounted, ref, shallowRef } from "vue";
import EditBasicInfo from './EditBasicInfo.vue'
import EditPassword from './EditPassword.vue'

const currentTab = shallowRef(EditBasicInfo);
const inputEditBasicInfoRef = ref(null);
const inputEditPasswordRef = ref(null);

const currentUser = ref(null);

const changeTab = (tab) => {
    const buttonsList = document.querySelectorAll('.btnList');
    buttonsList.forEach((btn) => {
        btn.classList.toggle('font-bold');
        btn.classList.toggle('border-l-2');
        btn.classList.toggle('border-black');
        btn.classList.toggle('hover:bg-gray-100');
        btn.classList.toggle('hover:border-l-2');
        btn.classList.toggle('hover:border-gray-400');
    })

    if(tab === 'EditBasicInfo') { inputEditBasicInfoRef.value.click(); }
    else                        { inputEditPasswordRef.value.click(); }
}

onMounted( async() => {
})

</script>
