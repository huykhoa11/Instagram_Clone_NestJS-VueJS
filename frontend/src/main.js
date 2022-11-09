import { createApp } from 'vue'
import App from './App.vue'
import router from './router/router'
import {store} from './store.js'
import { i18n } from './langs/languages'

createApp(App).use(i18n).use(store).use(router).mount('#app')
