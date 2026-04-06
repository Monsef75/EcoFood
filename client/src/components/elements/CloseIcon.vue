<template>
    <div class="Close position-absolute flex-grow-1 zindex-p-1 pointer ">
        <i class="fa-solid fa-circle-xmark Close-Icon trans3" :class="IconColor ? 'c-light-text fs-4' : 'c-light-white2 fs-5'"></i>
    </div>
</template>

<script>
    export default {
        props:['IconColor'],
        data() { return {

        }},
        methods: {
        },
        watch: {
        },
    }
</script> 

<style scoped lang="scss">
.Close {
    right: 15px;
    top: 15px;
    i:hover {
        color: var(--Dark-Purple);
    }
}

</style> 