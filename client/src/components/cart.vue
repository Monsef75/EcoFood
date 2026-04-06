<template>
    
    <main class="cart pb-4">
        
        <div class="content d-flex flex-column justify-content-between" style="min-height: 75vh;">

            <section class="Empty t-center mt-5 pt-4" v-if="empty">
                <img src="\src\assets\Imgs\Common\DocScope.png" alt="" style="width: 90px; opacity: .5;">
                <p class="s20 c-white w-700 c-light-white2 mt-3">No Favorites Yet !</p>
            </section>
            
            <aside class="items" v-else>
                <div class="item position-relative bc-light-white3 rd-10 d-flex align-items-center gap-3 mb-3" v-for="(favorite,index) in favorites" >
                    <img :src="favorite.img" style="width: 80px;" alt="">
                    <div class="text">
                        <p class="c-white s18 fw-bold letter-p-05 mb-1">{{ favorite.name }}</p>
                        <p class="c-white s16 fw-bold letter-p-05">{{ favorite.disc }}</p>
                    </div>
                    <i class="fa-solid fa-trash c-red s20 position-absolute" style="right: 20px;" @click="favorites.splice( index,1)"></i>
                </div>
            </aside>

            <aside class="process">
                <p class="c-white bc-c2 py-2 s20 px-4 f-between mb-2">
                    <span class="fw-bold">Total: </span>
                    <span class="fw-bold">52Da</span>
                </p>
                <button type="submit" class="bc-bttn-linear2 pointer py-2 rd-10 letter-p-05 w-400 s18 trans3 w-100 fw-bold" @click.prevent="" >
                    Process Order
                </button>
            </aside>

        </div>
    </main>
    
</template>

<script>
    import Food from '@/assets/Imgs/clientUI/categories/offer-1.jpg'
    import Fresh from '@/assets/Imgs/clientUI/categories/offer-2.jpg'
    
    export default {
    
        components: {},
        data() { return {

            empty: false,
            favorites: [
                { name: 'Fast Food Pizza', disc: '23 Da', img: Food, },    
                { name: 'Fast Food Chicken', disc: '29 Da', img: Fresh, },  
            ],

        }},
        methods: {
            
        },
        computed: {
            
        },
        watch: {
            'favorites.length'(val) {
                if (!val) this.empty = true
            }
        },
    }
    
</script>

<style scoped lang='scss'>

    .cart {
        .item {
            img {
                border-top-left-radius: 10px;
                border-bottom-left-radius: 10px;
            }
        }
    }
    
</style>