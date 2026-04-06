<template>
    
    <main>
        <leaflet :stores="locations"/>

        <ul class="mt-3 gap-3">
            <li class="bc-light-white3 mb-2" v-for="store in stores">
                <img :src="store.img">
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
    
    export default {
    
        components: {leaflet},
        data() { return {
            stores: [
                { title: 'cafeteria El Salem',distance: '2.3km', img: '/Imgs/clientUI/stores/cafe1.jpg',},
                { title: 'home cooked hummus',distance: '1.5km', img: '/Imgs/clientUI/stores/tradFood1.jpg',},
                { title: 'half baked bread ',distance: '0.75km', img: '/Imgs/clientUI/stores/bread1.jpg',},
            ],
            locations : [
                { title: "Sahara Tea", coords: [35.875, 7.113], type: 'cafeteria' },
                { title: "Fresh Food Shop", coords: [35.878, 7.120], type: 'food' },
                { title: "Bakery El Baraka", coords: [35.872, 7.108], type: 'bakery' },
                { title: "Fast Food Express", coords: [35.870, 7.118], type: 'food' },
                { title: "Juice & Drinks", coords: [35.877, 7.105], type: 'cafeteria' },
            ],
        }},
        methods: {
            
        },
        computed: {
            
        },
        watch: {
            
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