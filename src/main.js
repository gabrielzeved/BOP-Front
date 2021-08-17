import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './scss/global.scss'
import axios from 'axios'

axios.defaults.headers.post['Content-Type'] ='application/x-www-form-urlencoded';
createApp(App).use(router).mount('#app')