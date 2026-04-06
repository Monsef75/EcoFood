<template>
    <div class="my-4">
        <table class="table table-borderless bc-panel shadow-lg" style="border-color: rgba(255, 255, 255, 0.2);">

            <thead class="c-white bd-b-light-white fw-bold">
                <tr>
                    <th scope="col" v-for="th in THead">{{ th }}</th>
                </tr>
            </thead>
            <tbody class="">
                <slot name="Slot"></slot>
            </tbody>

        </table>
    </div>
</template>

<script>
    export default {
        props:['THead'],
        data() { return {

        }},
        methods: {

        },
        watch: {

        },
    }
</script>

<style scoped lang="scss">

table {
    color: white;
    tr {
        vertical-align: middle;
        th {
            text-align: center;
        }
    }

    .dropdown:hover,
    .dropdown:focus {
        color: var(--Prim-Blue);
    }
    .dropdown-toggle:empty::after {
        margin-left: 5px;
    }
    .dropdown-menu {
        transform: translate(0px, 25px)!important;
    }
}

</style> 