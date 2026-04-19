<template>
    
    <div class="Loader f-center" style="height: 70vh;" v-if="loading">
        <span class="Spinner" ></span>
    </div>
    <main v-else>
        <leaflet :stores="locations"/>

        <ul class="mt-3 gap-3">
            <li class="bc-light-white3 mb-2" v-for="store in products">
                <img :src="END_POINT + store.img">
                <div class="info flex-column f-between px-2 mt-2 c-white t-center">
                    <p class="s18">{{ store.title }}</p>
                    <p class="s16 fw-bold">{{ store.distance }}</p>
                    <span class="iconWrapper f-center my-3">
                        <i class="fa-solid fa-chevron-right"></i>
                    </span>
                </div>
            </li>
        </ul>
    </main>
    
</template>

<script>
    
    import leaflet from '@/components/elements/map.vue';
    import { mapActions } from 'vuex';

    export default {
    
        components: {leaflet},
        data() { return {
            END_POINT: import.meta.env.VITE_END_POINT,
            products: [],
            locations : [
                { title: "Sahara Tea", coords: [35.875, 7.113], type: 'cafeteria' },
                { title: "Fresh Food Shop", coords: [35.878, 7.120], type: 'food' },
                { title: "Bakery El Baraka", coords: [35.872, 7.108], type: 'bakery' },
                { title: "Fast Food Express", coords: [35.870, 7.118], type: 'food' },
                { title: "Juice & Drinks", coords: [35.877, 7.105], type: 'cafeteria' },
            ],
            loading: true,
        }},
        methods: {
            ...mapActions(['getProducts']),
        },
        computed: {
            
        },
        watch: {
            
        },
        mounted() {
            const distances = ['2.3km','1.5km','0.75km']
            this.getProducts().then( res=> {
                this.loading = false
                res = res.slice(0,3)
                res.forEach( (product,index)=> {
                    this.products.push({ 
                        title: product.info.name,
                        img: product.image,
                        distance: distances[index],
                    })
                })
                this.allOffers = this.offers
                this.loading = false
            })
        },
    }
    
</script>

<style scoped lang='scss'>
    ul {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
        gap: 15px;

	li {
		border-radius: 15px;
		img {
			width: 100%;
			height: auto;
			object-fit: cover;
		}
        .info {
            .iconWrapper {
                width: 40px;
                height: 40px;
                background-color: var(--Light-White2);
                border-radius: 50%;
            }
        }
	}
}
</style>