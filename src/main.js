import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Vue3Toasity from 'vue3-toastify'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
import { VueCookies } from 'vue-cookies'

const app = createApp(App)

app.use(router)
app.use(
    Vue3Toasity,
    {
        limit: 3,
        autoClose: 3000,
        position: toast.POSITION.BOTTOM_RIGHT,
    }
)
app.use(VueCookies)

app.mount('#app')
