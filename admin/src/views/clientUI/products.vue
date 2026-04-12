<template>

    <main class="Clothes px-4 bc-c3 overflow-hidden">

        <head_ Title="Products" />
        
        <div class="Loader f-center" style="height: 50vh;" v-if="loading">
            <span class="spinner" ></span>
        </div>

        <div class="EmptyPage f-center gap-5" v-else-if="empty">
            <img style="width: 300px; opacity: 0.5;" src="/imgs/clientUI/Docs.png" alt="">
            <div>
                <p class="c-light-white3 fw-bold lh-sm letter-p-1" style="font-size: 40px;">
                    There Are No Products Right Now !
                </p>
            </div>
        </div>

        <div v-else>

            <boxes :boxes="boxes"/>
            <span class="SpinnerLoader position-fixed mt-5" style="width: 48px; height: 48px;"  v-if="BoxesLoading" ></span>
            <tableSlot :THead="THead" #Slot v-else >

                <tr class="trans3" v-for="(product,Index) in Products">
                    <th scope="row">{{ Index + 1 }}</th>
                    <th><div class="img" style="width: 45px;height: 45px;border-radius: 5px;" :style="{backgroundImage: `url(${END_POINT + product.image})`}"></div></th>
                    <!-- <img :src="END_POINT + product.image" > -->
                    <th>{{ product.name }}</th>
                    <th>{{ product.category }}</th>
                    <th>{{ product.price }} <i class="s11">Dz</i> </th>
                    <th>{{ product.addedBy }}</th>
                    <th>{{ product.createdAt }}</th>
                    <th class="position-relative">
                        <div class="buttonSpinner" v-if="product.waiting">
                            <span class="spinner" style="width: 20px; height: 20px;"></span>
                        </div> 
                        <button class="trans3 c-light-red w-700" @click="DeleteProduct(product.id, Index)" v-else>Delete</button>
                    </th>
                </tr>
                
            </tableSlot>
            

        </div>
    
    </main>
    

</template>

<script>

    import head_ from '@/components/elements/title.vue'
    import tableSlot from '@/components/elements/table.vue'
    import boxes from '@/components/elements/boxes.vue'
    import { mapActions } from 'vuex'

    export default {
        components: {head_,tableSlot,boxes},
        data() { return {
            END_POINT: import.meta.env.VITE_END_POINT,
            boxes: [
                { icon: 'fa-cubes', title: 'All Products', color: '#1877F2', data: null,},
                { icon: 'fa-arrow-down-wide-short', title: 'Added This Month', color: '#FE2C55', data: null,},
                { icon: 'fa-arrow-down-wide-short', title: 'Added This Week', color: '#fbad50', data: null,},                
            ],
            THead: [
                "#","Product Image","Name","Category","Price","Owner","Added At","Process"
            ],
            Products: [],

            loading: true,
            empty: false,
        }},
        methods: {
            DeleteProduct( productId, index ) {
                this.Products[index].waiting = true
                this.deleteProduct({ id: productId }).then( ()=> {
                    this.Products.splice( index,1 )
                    this.boxes.forEach( box => box.data -= 1 )
                    if (this.Products.length == 0) this.empty = true
                }).catch( ()=> { this.Products[index].waiting = false })
            },
            ...mapActions(['getProducts', 'deleteProduct']),
        },
        watch: {
            'ScndInfo.Value'(Val) {
                if ( Val == 0 ) {
                    this.NoProperties = true
                }
            },
        },
        created() {
            this.getProducts().then( res => {
                if ( res.productsNbr == 0 ) this.empty = true
                else {
                    res.products.forEach( product => product.waiting = false )
                    this.Products = res.products
                    this.boxes.forEach( box => box.data = res.productsNbr )
                }
                this.loading = false
            })
        },
    }
</script>

<style scoped lang="scss">

.img {
    background-size: cover;
    background-position: center;
}

tr {
    color: var(--Light-White2);
    vertical-align: middle;
    th {
        text-align: center;
        button {
            &:hover {
                color: red;
            }
        }
    }
}
tr:nth-of-type(2n+1) {
    background-color: hsla(0, 0%, 27%, 0.6);
}
tr:not(.Loader):hover {
    color: var(--Light-white);
}
tr.Loader {
    .Image {
        width: 50px;
        height: 50px;
        border-radius: 5px;
        margin: 0 auto;
    }
    .Text {
        width: 90%;
        height: 15px;
        border-radius: 10px;
    }
    span {
        background: linear-gradient(
            100deg,
            rgba(255, 255, 255, 0) 40%,
            rgba(255, 255, 255, .5) 50%,
            rgba(255, 255, 255, 0) 60%
        ) var(--Light-white);
        background-size: 200% 100%;
        background-position-x: 180%;
        animation: 1.5s .06s Loader ease-in-out infinite;
    }
    @keyframes Loader {
        to {
            background-position-x: -20%;
        }
    }
}

</style> 