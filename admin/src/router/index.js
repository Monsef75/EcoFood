import { createRouter,createWebHistory } from 'vue-router'

import panel from '@/views/clientUI/panel.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'panel',
            component: panel
        },
    ]
})

export default router
