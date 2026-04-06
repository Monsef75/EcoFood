<template>
    <div class="Close position-absolute zindex-p-1" style="right: 15px;" @click="CloseOrder">
        <i class="fa-solid fa-circle-xmark Close-Icon fs-4 c-light-white pointer trans3"></i>
    </div>
</template>

<script>
    export default {
        data() { return {

        }},
        methods: {
            CloseOrder() {
                this.$emit('SendEmit')
            }
        },
        watch: {

        },
    }
</script>

<style scoped>
.Close-Icon:hover {
    color: var(--Prim-Blue);
}

</style> 