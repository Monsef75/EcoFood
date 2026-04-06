import { createRouter,createWebHistory } from 'vue-router'

import _interface from '@/views/Interface.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: '_interface',
            component: _interface
        },
    ]
})

export default router
