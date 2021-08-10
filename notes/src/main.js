import { createApp } from 'vue'
import App from './App.vue'
import './index.css'

import axios from 'axios'
import VueAxios from 'vue-axios'

const app = createApp(App)
app.use(VueAxios, axios)

createApp(App).mount('#app')





