<template>
    

    <main>
        <section v-if="!isAddProductPage">
            <section class="head d-flex gap-2">
                <searchBar class="mb-3 flex-grow-1"/>
                <span class="iconWrapper f-center rounded-circle" @click="isAddProductPage = true;this.$emit('changeTitle','Add Your Prodcut')">
                    <i class="fa-solid fa-plus c-white s20"></i>
                </span>
            </section>
            
            <section class="category" v-for="category in categories">
                <div class="head c-white s20 fw-bold f-between">
                    <aside>
                        <i class="fa-solid fa-layer-group me-2"></i>
                        <span class="letter-p-05 w-700">{{ category.title }}</span>
                    </aside>
                    <aside>
                        <span class="letter-p-05 w-700">see all</span>
                    </aside>

                </div>
                <ul class="content d-flex flex-wrap gap-2 py-2 px-2 bc-light-white3">
                    <li class="" v-for="subCategory in category.subCategories" @click="filterProducts( category.title, subCategory.title )">
                        <div class="imgWrapper position-relative f-center mx-auto">
                            <img :src="subCategory.img" class="" style="width: 80px;">
                        </div>
                        <p class="s16 c-light-white t-center">{{ subCategory.title }}</p>
                    </li>
                </ul>
            </section>

            <section v-if="loading">
                <div class="Loader f-center" style="height: 254px;">
                    <span class="Spinner" ></span>
                </div>
            </section>
            <section v-else-if="offers.length == 0">
                <div class="f-center flex-column gap-2" style="height: 254px;">
                    <i class="fa-solid fa-circle-exclamation s30 c-light-white2"></i>
                    <span class="s18 c-light-white2 fw-bold">No Offers Found</span>
                    <span class="letter-p-05 w-700 s18 bc-bttn-linear2 px-4 rd-10 py-1 mt-2" @click="offers = allOffers">
                        <i class="fa-solid fa-arrow-rotate-left"></i> reset
                    </span>
                </div>
            </section>
            <section class="offers" v-else>
                <div class="head c-white s20 fw-bold f-between">
                    <aside>
                        <i class="fa-solid fa-tags me-2"></i>
                        <span class="letter-p-05 w-700">Live Offers</span>
                    </aside>
                    <aside v-if="offers.length != allOffers.length" @click="offers = allOffers">
                        <span class="letter-p-05 w-700 c-red">reset</span>
                    </aside>
                </div>
                <ul class="position-relative d-flex gap-3 mt-3 pb-2">
                    <li class="position-relative overflow-hidden" :style="{ backgroundImage: `url(${offer.img})` }" v-for="offer in offers">
                        <span class="px-2 c-white rd-10 s18 fw-bold">50%</span>
                        <span class="px-2 c-white rd-10">{{ offer.title }}</span>
                    </li>
                </ul>
            </section>

        </section>
        <section v-else>
            <div class="iconWrapper bc-c2 f-center rd-20 mb-3" style="width: 70px; height: 50px;" @click="isAddProductPage = false; this.$emit('changeTitle','Home')">
                <i class="fa-solid fa-circle-arrow-left c-white s25"></i>
            </div>
            <addProduct @backHome="GetProducts(true)"/>
        </section>
    </main>
    
</template>

<script>
    
    import searchBar from '@/components/elements/searchBar.vue';
    import addProduct from './addProduct.vue';
    import { mapActions } from 'vuex'

    export default {
    
        components: {searchBar,addProduct},
        data() { return {
            categories: [
                {
                    title : 'Food',
                    subCategories : [
                        { title: 'Traditionel Food', img: '/Imgs/clientUI/categories/food.png',},
                        { title: 'Fast Food', img: '/Imgs/clientUI/categories/fast-food.png',},
                    ],
                },
                {
                    title : 'Sweets',
                    subCategories : [
                        { title: 'Fruits & Veget', img: '/Imgs/clientUI/categories/fruits.png',},
                        { title: 'Bakery', img: '/Imgs/clientUI/categories/bread.png',},
                        { title: 'Patesries', img: '/Imgs/clientUI/categories/bakery.png',},
                    ],
                },
                {
                    title : 'Drinks',
                    subCategories 
                    : [
                        { title: 'Drinks & Juices', img: '/Imgs/clientUI/categories/drinks.png',},
                    ],
                },


            ],
            allOffers: [],
            offers: [],
            isAddProductPage: false,
            loading: true,
        }},
        methods: {
            GetProducts( afterAdding ) {
                this.loading = true
                if (afterAdding) {
                    this.offers = []
                    this.$emit('changeTitle','Home')
                    this.isAddProductPage = false
                }
                this.getProducts().then( res=> {
                    res.forEach( product => {
                        this.offers.push({ 
                            title: `${product.info.category} Offer`,
                            img: 'http://localhost:3000' + product.image,
                            info: product.info,
                        })
                    })
                    this.allOffers = this.offers
                    this.loading = false
                })
            },
            filterProducts( category, subCategory ) {
                this.offers = this.allOffers.filter(offer => 
                    offer.info.category == category && 
                    offer.info.subCategory == subCategory
                )
            },
            ...mapActions(['getProducts']),
        },
        computed: {
            
        },
        watch: {
            
        },
        mounted() {
            this.GetProducts()
        },
    }
    
</script>

<style scoped lang='scss'>
    
    .head {
        .iconWrapper {
            width: 50px;
            height: 50px;
            background-color: var(--Facebook);
        }
    }
    .category {
        ul li {       
            .imgWrapper {
                width: 100px;
                height: 100px;
                background-color: hsla(64, 89%, 34%, 0.3);
                border-radius: 50%;
            }
        }
        &:not(:last-of-type) {
            margin-bottom: 15px;
        }
    }
    .offers ul {
        overflow: auto;
        scroll-behavior: smooth;
        &::-webkit-scrollbar {
            height: 8px;
        }
        &::-webkit-scrollbar-thumb {
            background: #888;
            border-radius: 10px;
        }
        li {
            flex: 0 0 auto;
            width: 200px;
            height: 200px;
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            border: 5px solid hsla(64, 89%, 34%, 0.4);
            border-radius: 20px;
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
                    bottom: 5px;
                }
            }
        }
    }

</style>