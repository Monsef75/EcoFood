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
        refToken: null,
        user: {
            id: null,
            fullName: null,
            email: null,
            role: null,
        },
        isLogged: false,
        isOnline: true,
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
        setUser( state, data ) {
            state.user = data.user
            state.token = data.token
            state.refToken = data.refToken
            state.isLogged = true
            localStorage.setItem('user', JSON.stringify(data))
        },
        stayLogged( state ) {
            let data = JSON.parse(localStorage.getItem('user'))
            if ( data ) {
                state.user = data.user
                state.token = data.token
                state.refToken = data.refToken
                state.isLogged = true
            }
        },
        loggOut( state ) {
            state.user = {
                id: null,
                fullName: null,
                email: null,
                phone: null,
                role: null,
            }
            state.token = null
            state.refToken = null
            state.isLogged = false
            localStorage.removeItem('user')
            console.log('Logged Out')
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

        signUp( context, user ) {
            return new Promise((resolve, reject) => {
                axios.post(END_POINT + `/signUp`, user )
                .then( res => {
                    console.log('Logged In', res.data)
                    context.commit('setUser', res.data)
                    context.commit( 'setSuccessCard',{ text: 'Signed Up Successfully', to: null}) 
                    resolve()
                })
                .catch( err => {
                    console.log('Sign Up Failed', err)
                    reject(err.response.data)
                })
            })
        },
        signIn( context, user ) {
            return new Promise((resolve, reject) => {
                axios.get(END_POINT + `/signIn`, { params: user } )
                .then( res => {
                    console.log('Logged In', res.data)
                    context.commit('setUser', res.data)
                    context.commit( 'setSuccessCard',{ text: 'Logn In Successfully', to: null}) 
                    resolve()
                })
                .catch( async err => {
                    console.log('Logged In Failed', err)
                    reject(err.response.data)
                })
            })
        },

        addProduct( context, product ) {
            return new Promise((resolve, reject) => {
                axios.post(END_POINT + `/addProduct`, product )
                .then( res => {
                    context.commit( 'setSuccessCard',{ text: 'Your Product Added Successfully', to: null}) 
                    console.log('Product Added', res.data)
                    resolve()
                })
                .catch( err => {
                    console.log('Adding Product Failed', err)
                    reject()
                })
            })
        },
        getProducts( context ) {
            return new Promise((resolve, reject) => {
                axios.get(END_POINT + `/getProducts`)
                .then( res => {
                    console.log('Products :', res.data)
                    resolve(res.data)
                })
                .catch( err => {
                    console.log('getting Orders Failed', err)
                    reject()
                })
            })
        },

        addFavorite( context, data ) {
            data.userId = context.state.user.id
            return new Promise((resolve, reject) => {
                axios.post(END_POINT + `/addFavorite`, data )
                .then( res => {
                    context.commit( 'setSuccessCard',{ text: res.data.message, to: null}) 
                    console.log('Product Added', res.data.result ? res.data.result : null)
                    resolve()
                })
                .catch( err => {
                    console.log('Adding Product Failed', err)
                    reject()
                })
            })
        },
        getFavorites( context ) {
            return new Promise((resolve, reject) => {
                axios.get(END_POINT + `/getFavorites`, { params: { userId: context.state.user.id }})
                .then( res => {
                    console.log('Favorites :', res.data)
                    resolve(res.data)
                })
                .catch( err => {
                    console.log('getting Favorites Failed', err)
                    reject()
                })
            })
        },
        deleteFavorite( context, data ) {
            data.userId = context.state.user.id
            return new Promise((resolve, reject) => {
                axios.delete(END_POINT + `/deleteFavorite`, { data: data })
                .then( res => {
                    context.commit( 'setSuccessCard',{ text: 'Product Removed Successfully', to: null}) 
                    console.log('Product Removed', res.data)
                    resolve()
                })
                .catch( err => {
                    console.log('Removing Product Failed', err)
                    reject()
                })
            })
        },

        addPurchase( context, data ) {
            data.userId = context.state.user.id
            return new Promise((resolve, reject) => {
                axios.post(END_POINT + `/addPurchase`, data )
                .then( res => {
                    context.commit( 'setSuccessCard',{ text: res.data.message, to: null}) 
                    console.log('Product Added', res.data.result ? res.data.result : null)
                    resolve()
                })
                .catch( err => {
                    console.log('Adding Product Failed', err)
                    reject()
                })
            })
        },
        getPurchases( context ) {
            return new Promise((resolve, reject) => {
                axios.get(END_POINT + `/getPurchases`, { params: { userId: context.state.user.id }})
                .then( res => {
                    console.log('Purchases :', res.data)
                    resolve(res.data)
                })
                .catch( err => {
                    console.log('getting Purchases Failed', err)
                    reject()
                })
            })
        },
        deletePurchase( context, data ) {
            data.userId = context.state.user.id
            return new Promise((resolve, reject) => {
                axios.delete(END_POINT + `/deletePurchase`, { data: data })
                .then( res => {
                    context.commit( 'setSuccessCard',{ text: 'Product Removed Successfully', to: null}) 
                    console.log('Product Removed', res.data)
                    resolve()
                })
                .catch( err => {
                    console.log('Removing Product Failed', err)
                    reject()
                })
            })
        },

        addOrder( context, data ) {
            data.userId = context.state.user.id
            return new Promise((resolve, reject) => {
                axios.post(END_POINT + `/addOrder`, data )
                .then( res => {
                    context.commit( 'setSuccessCard',{ text: 'Your Order Created Successfully, Wait for Phone Cotnact', to: null}) 
                    console.log('order created', res.data)
                    resolve()
                })
                .catch( err => {
                    console.log('creating order Failed', err)
                    reject()
                })
            })
        },
        getOrders( context ) {
            return new Promise((resolve, reject) => {
                axios.get(END_POINT + `/getOrders`, { params: { userId: context.state.user.id }})
                .then( res => {
                    console.log('orders :', res.data)
                    resolve(res.data)
                })
                .catch( err => {
                    console.log('getting orders Failed', err)
                    reject()
                })
            })
        },
        deleteOrder( context, orderId ) {
            return new Promise((resolve, reject) => {
                axios.delete(END_POINT + `/deleteOrder`, { data: orderId })
                .then( res => {
                    context.commit( 'setSuccessCard',{ text: 'Order Removed Successfully', to: null}) 
                    console.log('Order Removed', res.data)
                    resolve()
                })
                .catch( err => {
                    console.log('Removing Order Failed', err)
                    reject()
                })
            })
        },

        // Action with refTokonIntrcptr
        ActionName( context, user ) {
            return new Promise( async (resolve, reject) => {
                try {
                    const res = await refTokonIntrcptr.get('/Api')
                    console.log('Api Success', res.data)
                    resolve()
                } catch (err) {
                    console.error('Api Failed', err)
                    throw err
                }
            })
        },
    },
    
})

export default store