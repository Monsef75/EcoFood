<template>
    
    <section v-if="loading">
        <div class="Loader f-center" style="height: 70vh;">
            <span class="Spinner" ></span>
        </div>
    </section>
    <main class="cart pb-4" v-else>
        <section class="content d-flex flex-column" style="min-height: 75vh;">

            <div class="switch d-flex gap-3 w-fit mx-auto mb-4 s25">
                <button class="px-5 py-1 trans3 rd-10 position-relative" :class="{'active': isCart}" 
                 @click="display( true )">
                    <i class="fa-solid fa-cart-shopping"></i>
                    <p class="position-absolute bc-red s18 f-center c-white rounded-circle" v-show="isCart">{{ purchases.length }}</p>
                </button >
                <button  class="px-5 py-1 trans3 rd-10 position-relative" :class="{'active': !isCart}" 
                 @click="display( false )">
                    <i class="fa-solid fa-truck-fast"></i>
                    <p class="position-absolute bc-red s18 f-center c-white rounded-circle" v-show="!isCart">{{ orders.length }}</p>
                </button >
            </div>

            <section class="Empty t-center mt-5 pt-5" v-if="empty">
                <i class="fa-solid fa-box-open c-light-white2 s50"></i>
                <p class="w-700 c-light-white2 mt-2 s25 n-spacing05">No {{ isCart ? 'Items On Cart' : 'Orders' }} Yet !</p>
            </section>
            
            <form class="d-flex flex-column gap-2" v-else-if="processing">

                <goBack @click="processing = false"/>
                <input type="text"   placeholder="Full Name" class="w-100 rounded-3 trans3 shadow-sm" v-model="info.fullName" required>
                <input type="text"   placeholder="State" class="w-100 rounded-3 trans3 shadow-sm" v-model="info.state" required>
                <input type="text"   placeholder="City" class="w-100 rounded-3 trans3 shadow-sm" v-model="info.city" required>
                <input type="number"   placeholder="Phone Number" class="w-100 rounded-3 trans3 shadow-sm" v-model="info.phone" required>

            </form>

            <ul class="items" v-else-if="isCart">
                <li class="item position-relative bc-light-white3 rd-10 d-flex align-items-center gap-3 mb-3" v-for="(purchase,index) in purchases" >
                    <div class="img" style="width: 80px; height: 80px;" :style="{ backgroundImage: `url(${purchase.img})` }"></div>
                    <div class="text">
                        <p class="c-white s18 fw-bold letter-p-05 mb-1">{{ purchase.name }}</p>
                        <p class="c-white s16 fw-bold letter-p-05">{{ purchase.price }}Da</p>
                    </div>
                    <i class="fa-solid fa-trash c-red s20 position-absolute" style="right: 20px;" @click="DeletePurchase( purchase.id )"></i>
                </li>
            </ul>

            <ul class="orders" v-else>
                <li class="bc-grey rd-20 p-3 position-relative mb-3" v-for="(order, index) in orders">

                    <div class="ButtonSpinner position-absolute" style="right: 20px; top: 15px;" v-if="order.waiting">
                        <span class="Spinner"></span>
                    </div> 
                    <i class="fa-solid fa-trash c-red position-absolute" style="right: 20px; top: 15px; font-size: 22px;" v-else
                    @click="DeleteOrder(order.id, index)"></i>

                    <h2 class="c-white t-center fw-bold">Order #{{ index + 1 }}</h2>
                    <div class="data d-flex mt-4">
                        <aside class="info d-flex flex-column gap-2">
                            <div class="position-relative" style="padding-top: 1.8rem;">
                                <input type="input" class="bc-transparent c-white pb-2 p-spacing05 s18"
                                    style="line-height: 1.1; width: 200px;" :value="order.info.fullName" readonly>
                                <span class="default position-absolute d-block c-c1 s16" style="top: 0;">Full Name</span>
                            </div>
                            <div class="position-relative" style="padding-top: 1.8rem;">
                                <input type="input" class="bc-transparent c-white pb-2 p-spacing05 s18"
                                    style="line-height: 1.1; width: 200px;" :value="order.info.phone" readonly>
                                <span class="default position-absolute d-block c-c1 s16" style="top: 0;">Phone Number</span>
                            </div>
                            <div class="position-relative" style="padding-top: 1.8rem;">
                                <input type="input" class="bc-transparent c-white pb-2 p-spacing05 s18"
                                    style="line-height: 1.1; width: 200px;" :value="order.info.state" readonly>
                                <span class="default position-absolute d-block c-c1 s16" style="top: 0;">State</span>
                            </div>
                            <div class="position-relative" style="padding-top: 1.8rem;">
                                <input type="input" class="bc-transparent c-white pb-2 p-spacing05 s18"
                                    style="line-height: 1.1; width: 200px;" :value="order.info.city" readonly>
                                <span class="default position-absolute d-block c-c1 s16" style="top: 0;">City</span>
                            </div>
                            <div class="position-relative" style="padding-top: 1.8rem;">
                                <input type="input" class="bc-transparent c-white pb-2 p-spacing05 s18"
                                    style="line-height: 1.1; width: 200px;" :value="order.products.reduce( (acc, product) => acc + product.info.price, 0 ) + ' DA'" readonly>
                                <span class="default position-absolute d-block c-c1 s16" style="top: 0;">Total</span>
                            </div>
                        </aside>
                        <aside class="products d-flex flex-column gap-2 overflow-auto" >
                            <h4 class="c-c1 t-center fw-bold mb-2">Products</h4>
                            <div class="img rd-10" style="width: 100px; height: 100px;" v-for="product in order.products" 
                            :style="{ backgroundImage: `url(${ 'http://localhost:3000' + product.image})` }"></div>
                        </aside>
                    </div>
                </li>
            </ul>

            <aside class="process mt-auto" v-show="purchases.length">
                <p class="c-white bc-c2 py-2 s20 px-4 f-between mb-2" v-if="!processing">
                    <span class="fw-bold">Total: </span>
                    <span class="fw-bold">{{ purchases.reduce( (acc, purchase) => acc + purchase.price, 0 ) }}Da</span>
                </p>

                <div class="ButtonSpinner bc-bttn-linear2 rd-10" style="height: 43px;" v-if="waiting">
                    <span class="Spinner"></span>
                </div> 
                <button type="submit" class="pointer py-2 rd-10 letter-p-05 w-400 s18 trans3 w-100 fw-bold" v-else
                :class="processing ? infoValid ? 'bc-bttn-linear2' : 'Inactive' : 'bc-bttn-linear2'" @click.prevent="processing ? AddOrder() : processing = true" >
                    {{ processing ? 'Place Order' : 'Process Order' }}
                </button>
            </aside>

        </section>
    </main>
    
</template>

<script>

    import { mapActions } from 'vuex';
    import goBack from './elements/goBack.vue';
    import { formatDate } from '@/utils/index.js'

    export default {
    
        components: {goBack},
        data() { return {
            loading: true,
            empty: false,
            isCart: true,
            processing: false,

            purchases: [],

            info: {
                fullName: null,
                state: null,
                city: null,
                phone: null,
            },
            infoValid: false,

            orders: [],
            waiting: false,
        }},
        methods: {
            GetPurchases() {
                this.getPurchases().then( res=> {
                    if (res.length == 0) this.empty = true
                    else {
                        res.forEach( product => {
                            const name = product.info.name.length > 10
                            ? product.info.name.slice(0, 8) + '...'
                            : product.info.name
                            this.purchases.push({
                                id: product._id,
                                addedBy: product.addedBy.id,
                                name: product.info.subCategory + ' : ' + name,
                                img: 'http://localhost:3000' + product.image,
                                price: product.info.price,
                                waiting: false,
                            })
                        })
                    }
                    this.loading = false
                })
            },
            DeletePurchase( productId ) {
                this.deletePurchase({ productId: productId }).then( res => {
                    this.purchases = this.purchases.filter( favorite => favorite.id != productId )
                    if (this.purchases.length == 0) this.empty = true
                })
            },
            AddOrder() {
                const order = {
                    buyerInfo: this.info,
                    products: this.purchases.map(purchase => ({
                        productId: purchase.id,
                        addedBy: purchase.addedBy
                    })),
                    createdAt: formatDate(new Date())
                }
                this.waiting = true
                this.addOrder({ order }).then( ()=> { 
                    this.waiting = false 
                    this.processing = false
                    this.purchases = []
                    this.empty = true
                })
            },
            display( isCart ) {
                this.loading = true 
                this.empty = false
                this.processing = false
                this.purchases = []
                this.orders = []
                if ( isCart & !this.isCart ) {
                    this.isCart = isCart
                    this.GetPurchases()
                }
                else if ( !isCart & this.isCart ){
                    this.isCart = isCart
                    this.getOrders().then( res=> {
                        if (res.length == 0) this.empty = true
                        else {
                            res.forEach( order => {
                                this.orders.push({
                                    id: order._id,
                                    info: order.buyerInfo,
                                    products: order.products,
                                    createdAt: order.createdAt,
                                    waiting: false,
                                })
                            })
                        }
                        this.loading = false
                    })
                }
            },
            DeleteOrder( orderId, index ) {
                this.orders[index].waiting = true
                this.deleteOrder({ id: orderId }).then( ()=> {
                    this.orders.splice(index, 1)
                    if (this.orders.length == 0) this.empty = true
                })
            },
            ...mapActions(['getPurchases','deletePurchase','addOrder','getOrders','deleteOrder']),
        },
        computed: {
            
        },
        watch: {
            info: {
                handler( Vals ) {
                    for (const Val in Vals) {
                        if (!Vals[Val]) {
                            return this.infoValid = false
                        }
                    }
                    return this.infoValid = true
                },
                deep: true,
            },
        },
        created() {
            this.GetPurchases()
        },
    }
    
</script>

<style scoped lang='scss'>

    .cart {
        .switch {
            button {
                background-color: var(--c2);
                color: var(--Light-White2);
                &.active {
                    color: white;
                }
                p {
                    width: 20px;
                    height: 20px;
                    right: 17px;
                    top: 3px;
                }
            }

        }
        .item {
            .img {
                border-top-left-radius: 10px;
                border-bottom-left-radius: 10px;
            }
        }
        .img {
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
        }
        .orders {
            li .products {
                height: 318px;
                scroll-behavior: smooth;
                .img {
                    flex: 0 0 auto;
                }
            }
        }
    }
    form {
        input {
            background-color: var(--Light-White3);
            padding: 1rem;
            letter-spacing: 0.5px;
            font-size: 16px;
            font-weight: 700;
            color: white;
            &::placeholder {
                color: var(--Light-White2);
            }
            &:valid {
                background-color: rgba(255, 255, 255, 0.4);
            }
        }
    }
    
</style>