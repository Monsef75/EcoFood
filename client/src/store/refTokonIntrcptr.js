import axios from 'axios'
import store from '@/store/index.js'
const END_POINT = import.meta.env.VITE_END_POINT

const api = axios.create({
    baseURL: END_POINT,
})

// 🔹 Attach access token before every request
api.interceptors.request.use(config => {
    const token = store.state.userData.token
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config
})

// 🔁 Handle expired token automatically
api.interceptors.response.use(
    // If the request succeeds first time, Ignore the refresh
    response => response,
    async error => {
        const originalRequest = error.config

        if (error.response?.status === 401 && !originalRequest._retry) {
            // So that we don't get an infinite loop of sending the request 
            originalRequest._retry = true
            try {

                const newToken = await store.dispatch('refreshToken')

                // Update the token with the new one
                originalRequest.headers.Authorization = `Bearer ${newToken}`

                // Retry the request
                return api(originalRequest)
            } catch (err) {

                console.error('❌ Refresh token failed, logging out...')
                // store.commit('loggOut')
                return Promise.reject(err)
            }
        }

        return Promise.reject(error)
    }
)


export default api
