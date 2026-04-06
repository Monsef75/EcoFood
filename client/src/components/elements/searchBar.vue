<template>
    <div class="searchBar position-relative d-flex justify-content-center align-items-center">
        <div class="iconContainer f-center">
            <i class="fa-solid fa-magnifying-glass c-white s20"></i>
        </div>
        <input placeholder="search..." class="c-white s17 trans3 shadow-lg" name="text" type="text" autocomplete="on" >
    </div>
</template>

<script>
    export default {
        data() { return {

        }},
        methods: {

        },
        watch: {

        },
    }
</script> 

<style scoped lang="scss">

.searchBar {
    background-color: hsla(64, 89%, 34%, 0.4);;
    border-radius: 20px;
    input {
        border-top-right-radius: 20px;
        border-bottom-right-radius: 20px;
        padding: 10px;
        padding-right: 30px;
        width: 100%;
        height: 50px;
        padding-right: 40px;
        border-bottom: 2px solid transparent;
        &::placeholder {
            font-size: 18px;
            color: rgba(255, 255, 255, 0.6);
        }
        &:focus {
            border-bottom: 3px solid var(--c1);
            transition: all 300ms cubic-bezier(0, 0.110, 0.35, 2);
        }
    }
    .iconContainer {
        width: 70px;
        height: 50px;
    }
}


</style> 