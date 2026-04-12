<template>

    <section v-if="loading">
        <div class="Loader f-center" style="height: 70vh;">
            <span class="Spinner" ></span>
        </div>
    </section>
    <section class="Favorites pb-4" v-else>

        <div class="Empty t-center mt-5 pt-5" v-if="empty">
            <i class="fa-solid fa-heart-circle-exclamation c-light-white2 s50"></i>
            <p class="w-700 c-light-white2 mt-2 s25 n-spacing05">No Favorites Yet !</p>
        </div>
    
        <div class="Favorite position-relative bc-light-white3 rd-10 d-flex align-items-center gap-3 mb-3" v-for="(favorite,index) in favorites" v-else>
            <div class="img" style="width: 80px; height: 80px;" :style="{ backgroundImage: `url(${favorite.img})` }"></div>
            <div class="text">
                <p class="c-white s18 fw-bold letter-p-05 mb-1">{{ favorite.name }}</p>
                <p class="c-light-white s16 fw-bold letter-p-05">
                    {{ favorite.disc }}
                    <i class="fa-solid fa-star"></i>
                </p>
            </div>
            <div class="ButtonSpinner position-absolute" style="right: 20px; top: 27px;" v-if="favorite.waiting">
                <span class="Spinner"></span>
            </div> 
            <i class="fa-solid fa-trash c-red s20 position-absolute" style="right: 20px;" 
            @click="DeleteFavorite( favorite.id,index )" v-else></i>
        </div>
    </section>
    
</template>

<script>

    import { mapActions } from 'vuex';
    
    export default {
    
        components: {},
        data() { return {
            loading: true,
            empty: false,
            favorites: [],
            waiting: false,

        }},
        methods: {
            DeleteFavorite( productId,index ) {
                this.favorites[index].waiting = true
                this.deleteFavorite({ productId: productId }).then( res => {
                    this.favorites = this.favorites.filter( favorite => favorite.id != productId )
                    if (this.favorites.length == 0) this.empty = true
                }).catch( ()=> { this.favorites[index].waiting = false })
            },
            ...mapActions(['getFavorites','deleteFavorite']),
        },
        computed: {
            
        },
        created() {
            this.getFavorites().then( res=> {
                if (res.length == 0) this.empty = true
                else { 
                    
                    res.forEach( product => {
                        const name = product.info.name.length > 10
                        ? product.info.name.slice(0, 8) + '...'
                        : product.info.name
                        this.favorites.push({
                            id: product._id,
                            name: product.info.subCategory + ' : ' + name,
                            img: 'http://localhost:3000' + product.image,
                            disc: product.info.price + 'Da | 4.5',
                            waiting: false,
                        })
                    })
                }
                this.loading = false
            })
        },
    }
    
</script>

<style scoped lang='scss'>

    .Favorites {
        .Favorite {
            .img {
                border-top-left-radius: 10px;
                border-bottom-left-radius: 10px;
                background-size: cover;
                background-position: center;
                background-repeat: no-repeat;
            }
        }
    }
    
</style>