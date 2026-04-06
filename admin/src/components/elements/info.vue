<template>

        <div class="Info mt-4 d-flex justify-content-between align-items-center">
            <div class="Text">
                <p class="c-light-white fs-6 letter-p-05">
                    {{ Info.Name }} : (<span>{{ Info.Value }}</span>)
                </p>
            </div>
            <div class="SearchBar" v-if="ShowSearch">
                <svg class="Icon pointer trans3" aria-hidden="true" viewBox="0 0 24 24">
                    <g>
                        <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
                    </g>
                </svg>
                <input class="bc-panel c-white rd-10 ps-5 w-100 trans3"  placeholder='Search...' type="search" />
            </div>
        </div>
    
</template>

<script>
    export default {
        props: ['Info','ShowSearch'],
        data() { return {

        }},
        methods: {

        },
        watch: {

        },
    }
</script> 

<style scoped lang="scss">

.SearchBar {
    display: flex;
    align-items: center;
    position: relative;
    .Icon {
        position: absolute;
        left: 1rem;
        width: 25px;
        height: 25px;
        fill: var(--Light-Grey);
    }
    .Icon:hover {
        fill: var(--Text);
    }
    input {
        height: 40px;
        border: 2px solid var(--Light-Panel);
    }
    input:focus {
        border-color: var(--Primary);
    }
    input::placeholder {
        color: var(--Light-Grey);
    }
}

</style> 