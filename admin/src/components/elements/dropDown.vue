<template>

    <ul class="dropdown-menu position-absolute position-relative shadow-lg"> 
        <li class="dropdown-item pointer trans3" v-for="Item in DropItems">
            <i v-show="Item.ShowIcon" :class="Item.Icon,Item.Color" class="s14 me-2 trans3"></i>
            <a class="fw-bold letter-p-05 s17 trans3" :class="Item.Color">{{ Item.Text }}</a>
        </li>
    </ul>
    
</template>

<script>
    export default {
        props: ['DropItems'],
        data() { return {

        }},
        methods: {

        },
        watch: {

        },
    }
</script> 

<style scoped>

.dropdown-menu {
    background-color: var(--Panel);
    border-bottom: 3px solid var(--Primary);
    border-top: 3px solid var(--Primary);
    border-radius: 10px;
    transform: translate(-0 , -31px)!important;
    right: 105%!important;
}
.dropstart .dropdown-menu .dropdown-item:hover {
    background-color: var(--Primary);
}
.dropdown-menu .dropdown-item:hover :nth-child(n+1) {
    color: white;
}
.dropdown-menu .dropdown-item:hover :first-child {
    padding-left: 5px;
}

</style> 