<template>
    
    <article class="box f-center x-center bc-dark-blue2 px-4 py-2 rd-20" v-if="!$store.state.isOnline">
        <i class="fa-solid fa-triangle-exclamation c-red s20 me-3"></i>
        <span class="t-capital t-center t-nowrap c-light-white s17 w-700">You're Offline !</span>
    </article>
    <!-- Apk\src\assets\Imgs\Common\NoConnection.png -->
    
</template>

<script>
    
    export default {
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
    .box {
        position: fixed;
        top: 26px;
        // border: 5px solid var(--Light-White3);
        // border-top-color: var(--Light-Purple);
        // border-bottom-color: var(--Light-Purple);
        z-index: 3;
    }
</style>