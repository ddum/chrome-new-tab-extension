import { createPinia } from 'pinia'
import { createApp } from 'vue'

import App from './App.vue'
import './assets/base.css'

import 'floating-vue/dist/style.css'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.mount('#app')
