<template>
    
    <ul class="d-flex gap-3">
        <li class=" flex-grow-1 t-center c-white py-4 shadow" :style="{backgroundColor: box.color}" v-for="box in boxes">
            <i class="fa-solid s30" :class="box.icon"></i>
            <p class="fw-bold s20 p-spacing1">{{ box.title }}</p>
            <h2 class="fw-bold mt-3">{{ box.data }}</h2>
        </li>
    </ul>
    
</template>

<script>
    
    
    
    export default {
        props: ['boxes'],
        components: {},
        data() { return {
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
    
</style>