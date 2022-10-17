<template>
    <section class=" relative">
        <!-- <div v-if="currentUser"> -->
            <div class=" absolute left-0 right-0 mx-auto mt-32 px-10 py-5 w-1/2 space-y-6
                        border-double border-4 border-gray-500 bg-slate-50 drop-shadow-md
                        flex">
                        
                <!-- Menu -->
                <div class=" border-r-2 border-black p-3 flex flex-col">
                    <button class="" @click="currentTab = 'EditBasicInfo'">Edit infomations</button>
                    <button class="" @click="currentTab = 'EditPassword'">Change password</button>
                </div>

                <!-- Main -->
                <KeepAlive>
                    <component :is="currentTab"></component>
                </KeepAlive>
                
            </div>
        <!-- </div> -->
    </section>
</template>

<script setup>
import { onMounted, ref } from "vue";
import EditBasicInfo from './EditBasicInfo.vue'
import EditPassword from './EditPassword.vue'

const currentTab = ref(EditBasicInfo);

const currentUser = ref(null);

onMounted( async() => {
    // try {
    //     const response = await axios.get('http://localhost:3000/users/currentuser', {withCredentials: true});
    //     console.log(response.data);
    //     currentUser.value = response.data;
    //     console.log(currentUser.value);
    // } catch (error) {
    //     console.log(error);
    // }
})

</script>
