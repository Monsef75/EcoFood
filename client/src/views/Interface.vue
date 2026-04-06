<template>

    <main class="SignForm bc-dark-blue2" style="min-height: 100vh;" v-if="!$store.state.isLogged">

        <img src="\src\assets\Imgs\clientUI\logo.png" style="width: 200px;" class=" d-block mx-auto pointer pt-4" 
        @click="$router.push('/')">

        <sign />

    </main>

    <main class="interface bgShadow pt-4 pb-5" :style="{'width': responsive > 576 ? '576px' : 'unset'}" v-else>

        <h1 class="header position-relative bc-c1 c-white s25 w-800 t-center letter-p-05 py-2 mb-4">{{ headerSelected }}</h1>

        <component :is="currentPage" @changeTitle="(val)=> pages.custHeaders[0] = val" class="mx-4 position-relative"/>

        <ul class="quickAccess d-flex px-5 bc-c1" style="padding: 15px;"  :style="{'width': responsive > 576 ? '576px' : '100%'}"
        :class="!role == 'customer' ? 'justify-content-between' : 'justify-content-around'">
            <li v-for="icon in icons" class="pointer" :class="{'active': icon.pageIndex == currentPageIndex}" @click="currentPageIndex = icon.pageIndex">
                <i v-if="icon.name" :class="`fa-solid s20 c-light-white2 trans3 ${icon.name}`"></i>
            </li>
        </ul>
    </main>

</template>

<script>

    import { markRaw } from 'vue'
    import sign from '@/components/signForm.vue'
    import settings from '@/components/settings.vue'
    import categories from '@/components/categories.vue'
    import favorites from '@/components/favorites.vue'
    import stores from '@/components/nearbyStores.vue'
    import cart from '@/components/cart.vue'
    
    export default {
        components: {sign},
        data() { return {
            responsive: window.innerWidth,
            pages: {
                customer: [markRaw(categories),markRaw(favorites),markRaw(stores),markRaw(cart),markRaw(settings)],
                custHeaders: ['Home','Favorites','Nearby Stores','Shopping Cart','Settings'],
            },
            currentPageIndex: 0,

        }},
        methods: {
            displayAddProductPage() {

            }
        },
        computed: {
            role() {
                return this.$store.state.user.role
            },

            icons() {
                return [
                    { pageIndex: 4, name: 'fa-bars'},
                    { pageIndex: 1, name: 'fa-heart'},
                    { pageIndex: 0, name: 'fa-home'},
                    { pageIndex: 2, name: 'fa-location-dot'},
                    { pageIndex: 3, name: 'fa-store'}
                ]
            },

            fixedClass() {
                return { name: 'fa-house', indexPlace: 2 }
            },

            currentPage() {
                return this.pages[this.role][this.currentPageIndex]
            },

            headerSelected() {
                return this.pages.custHeaders[this.currentPageIndex]
            }
        },

        mounted() {
            this.emitter.on('navigateToOrders', () => {                 // from Home
                this.currentPageIndex = 2
            })
        },
    }
</script>


<style scoped lang='scss'>
    
    main {
        margin: 0 auto;
        &.interface {
            min-height: 100vh;
            background-size: cover;
            background-image: url('/src/assets/Imgs/clientUI/backGorund.jpg');
            padding-bottom: 80px !important;
        }
        .quickAccess {
            position: fixed;
            bottom: 0;
            border-top-left-radius: 100px;
            border-top-right-radius: 100px;
            z-index: 999;
            .active i {
                transform: translateY(-3px);
                color: white;
                scale: 1.1;
            }
        }
    }

</style>