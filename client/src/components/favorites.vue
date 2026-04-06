<template>
    
    <section class="Favorites pb-4">

        <div class="Empty t-center mt-5 pt-4" v-if="empty">
            <img src="\src\assets\Imgs\Common\DocScope.png" alt="" style="width: 90px; opacity: .5;">
            <p class="s20 c-white w-700 c-light-white2 mt-3">No Favorites Yet !</p>
        </div>
    
        <div class="Favorite position-relative bc-light-white3 rd-10 d-flex align-items-center gap-3 mb-3" v-for="(favorite,index) in favorites" v-else>
            <img :src="favorite.img" style="width: 80px;" alt="">
            <div class="text">
                <p class="c-white s18 fw-bold letter-p-05 mb-1">{{ favorite.name }}</p>
                <p class="c-light-white s16 fw-bold letter-p-05">
                    {{ favorite.disc }}
                    <i class="fa-solid fa-star"></i>
                </p>
            </div>
            <i class="fa-solid fa-trash c-red s20 position-absolute" style="right: 20px;" @click="favorites.splice( index,1)"></i>
        </div>
    </section>
    
</template>

<script>
    import Food from '@/assets/Imgs/clientUI/categories/offer-1.jpg'
    import Fresh from '@/assets/Imgs/clientUI/categories/offer-2.jpg'
    
    export default {
    
        components: {},
        data() { return {

            empty: false,
            favorites: [
                { name: 'Fast Food Pizza', disc: '23 Da | 4.5', img: Food, },    
                { name: 'Fast Food Chicken', disc: '29 Da | 3.9', img: Fresh, },  
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

    .Favorites {
        .Favorite {
            img {
                border-top-left-radius: 10px;
                border-bottom-left-radius: 10px;
            }
        }
    }
    
</style>