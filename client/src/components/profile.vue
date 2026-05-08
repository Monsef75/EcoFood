<template>
    
    <main class="Settings position-relative">

        <section class="bc-light-white3 px-4 rd-10 mb-3">
            <button class="Setting c-white s20 py-3" style="text-align: start;" @click="setting()">
                <i class="fa-solid fa-right-from-bracket" style="width: 35px;"></i>
                Sign Out
            </button>
        </section>

        <section class="d-flex align-items-center gap-4 bc-light-white3 py-3 px-4 rd-10">
            <img src="\src\assets\Imgs\Common\User.png" style="width: 70px;" alt="">
            <div class="text c-white">
                <p class="w-700 s20 letter-n-05">{{ $store.state.user.fullName }}</p>
                <p class="s15 c-light-white2 letter-p-05">{{ $store.state.user.role }}</p>
            </div>
        </section>

        <section>
            <section v-if="loading">
                <div class="Loader f-center" style="height: 254px;">
                    <span class="Spinner" ></span>
                </div>
            </section>
            <div v-else-if="products.length == 0">
                <div class="f-center flex-column gap-2" style="height: 254px;">
                    <i class="fa-brands fa-bilibili s40 c-light-white"></i>
                    <span class="s20 c-light-white2 fw-bold n-spacing05">You didn't added any product</span>
                </div>
            </div>
            <ul class="d-flex flex-wrap justify-content-center gap-3 my-3" v-else>
                <p class="position-relative w-100 c-white fw-bold s18 t-center n-spacing05 f-center">My Products</p>
                <li class="product position-relative f-center" :style="{ backgroundImage: `url(${END_POINT + product.img})` }"
                :class="{'deleted': !product.active}" v-for="product in products">
                    <i class="fa-solid fa-ban c-light-white2 s50 zindex-p-1" v-show="!product.active"></i>
                </li>
            </ul>
        </section>

    </main>
    
</template>

<script>

    import { mapMutations,mapActions } from 'vuex';
    
    export default {
    
        components: {},
        data() { return {
            END_POINT: import.meta.env.VITE_END_POINT,
            products: [],
            loading: true,
            // settings : [
            //     { name: 'lang', title: 'Language', icon: 'fa-language'},
            //     { name: 'pass', title: 'Change Password', icon: 'fa-unlock-keyhole'},
            //     { name: 'out', title: 'Sign Out', icon: 'fa-right-from-bracket'},
            //     { name: 'del', title: 'Delete Account', icon: 'fa-user-slash'},
            // ],
        }},
        methods: {
            setting() {
                // if (name == 'out') this.loggOut()
                this.loggOut()
            },
            ...mapMutations(['loggOut']),
            ...mapActions(['getProducts']),
        },
        computed: {
            
        },
        watch: {
            
        },
        created() {
            this.getProducts( true ).then( res=> {
                res.forEach( product => {
                    this.products.push({
                        id: product._id,
                        title: `${product.info.category} Offer`,
                        img: product.image,
                        info: product.info,
                        active: product.active,
                        waiting: false,
                    })
                })
                this.loading = false
            })
        }
    }
    
</script>

<style scoped lang='scss'>
    ul {
        li {
            width: 150px;
            height: 150px;
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            border: 5px solid hsl(60, 2%, 24%);
            border-radius: 50%;
            overflow: hidden;
            position: relative;
            span {
                position: absolute;
                &:first-of-type {
                    background-color: var(--Red);
                    left: 10px;
                    top: 5px;
                }
                &:last-of-type {
                    background-color: var(--c2);
                    right: 10px;
                }
            }
            &.deleted::after {
                content: '';
                position: absolute;
                inset: 0;
                background-color: rgba(0, 0, 0, 0.6);
            }

            &.deleted {
                filter: grayscale(40%);
                opacity: 0.9;
            }
        }
        p {
            gap: 15px;
        }
        p::before,
        p::after {
            content: '';
            flex: 1;
            height: 2px;
            background-color: var(--Light-White2);
        }
    }
    
    .Settings {
        header {
            img {
                border-radius: 50%;
                outline: 3px solid var(--Light-White2);
                outline-offset: 4px;
            }
        }
        .Setting:not(:last-of-type) {
            border-bottom: 1px solid var(--Light-White2);
        }
        .Setting:focus {
            color: var(--Light-Purple);
        }
    }

</style>