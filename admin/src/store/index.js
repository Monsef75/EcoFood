import { createStore } from 'vuex'
import axios from 'axios'
import refTokonIntrcptr from '@/store/refTokonIntrcptr.js' 
import router from '@/router/index.js'
const END_POINT = import.meta.env.VITE_END_POINT // Exist also in refTokonIntrcptr
// import { io } from "socket.io-client"
// const socket = io(END_POINT)

const store = createStore({
    
    state: {
        // socket: socket,
        token: null,
        user: null,
        isLogged: false,
        refToken: null,
        successCard: {
            text: null,
            to: null,
        },
    },
    
    getters: {
        authorizationHeader: state => {
            return { headers: { Authorization: `Bearer ${state.token}` }}
        }
    },

    mutations: {
        setSuccessCard( state, info ) {
            state.successCard = {
                text: info.text,
                to: info.to ? info.to : null
            }
            // context.commit( 'setSuccessCard',{ text: 'Logged In Successfully', to: null}) 
        },
        setUser( state, user ) {
            state.user = user
            state.isLogged = true
            localStorage.setItem('User', JSON.stringify(user))
        },
        stayLogged( state ) {
            let user = JSON.parse(localStorage.getItem('User'))
            if ( user && user.token ) {
                state.userData = user
                state.isLogged = true
            }
        },
        loggOut( state ) {
            state.userData = { name: null, token: null }
            state.isLogged = false
            localStorage.removeItem('User')
            router.push('/')
        }
    },

    actions: {
        async refreshToken(context) {
            try {
                const res = await refTokonIntrcptr.post('/refreshToken', { refToken: context.state.userData.refToken })
                console.log('✅ refreshToken', res.data)
                context.state.token = res.data.token
                const newUser = { ...context.state.user, token: res.data.token }
                context.commit('setUser', newUser)
                return res.data.token
            } catch (err) {
                console.error('❌ Failed to refresh token', err)
                // context.commit('loggOut')
                throw err
            }
        },

        // Action without refTokonIntrcptr
        ActionName( context, user ) {
            return new Promise((resolve, reject) => {
                axios.get(END_POINT + `/Api` , )
                .then( res => {
                    console.log('Api Success', res.data)
                    resolve()
                })
                .catch( err => {
                    console.log('Api Failed', err)
                    reject()
                })
            })
        },
        getProducts( context ) {
            return new Promise((resolve, reject) => {
                axios.get(END_POINT + '/adminPanel/getProducts' )
                .then( res => {
                    console.log('Api Success', res.data)
                    resolve(res.data)
                })
                .catch( err => {
                    console.log('Api Failed', err)
                    reject()
                })
            })
        },
        deleteProduct( context,productId ) {
            return new Promise((resolve, reject) => {
                axios.delete(END_POINT + '/adminPanel/deleteProduct', { data: productId } )
                .then( res => {
                    console.log('Api Success', res.data)
                    resolve()
                })
                .catch( err => {
                    console.log('Api Failed', err)
                    reject()
                })
            })
        },

        setUsers( context ) {
            return new Promise((resolve, reject) => {
                axios.get(END_POINT + '/adminPanel/setUsers' )
                .then( res => {
                    console.log('Api Success', res.data)
                    resolve(res.data)
                })
                .catch( err => {
                    console.log('Api Failed', err)
                    reject()
                })
            })
        },
        deleteUser( context, userId ) {
            return new Promise((resolve, reject) => {
                axios.delete(END_POINT + '/adminPanel/deleteUser', { data: userId } )
                .then( res => {
                    console.log('Api Success', res.data)
                    resolve()
                })
                .catch( err => {
                    console.log('Api Failed', err)
                    reject()
                })
            })
        },
    },

    
})

export default store