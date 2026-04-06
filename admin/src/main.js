import './assets/framework.css'
import './assets/main.scss'
import './assets/normalize/normalize.css'
import './assets/icons 6.4.0/css/all.min.css'

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import  './assets/normalize/normalize-Bootstrap.css'

import { createApp } from 'vue'

import App from '@/App.vue'
import router from '@/router/index.js'
import store from '@/store/index.js'
import mitt from 'mitt'

const app = createApp(App)
, emitter = mitt()

app.config.globalProperties.emitter = emitter
app.use(router)
app.use(store)
app.mount('#app')
