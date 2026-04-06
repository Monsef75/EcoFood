<template>

    <div class="Title bc-c1 py-3 px-5 my-5 d-flex justify-content-between align-items-center rounded-pill shadow-lg">

        <h3 class="c-white letter-n-05 fw-bold p-1 t-center" >{{ Title }}</h3>
        <div class="dropstart" v-show="Types">
            <label for="Input" class="pointer dropdown-toggle" data-bs-toggle="dropdown" >
                <i class="fa-solid fa-chevron-left c-secondary trans3 me-2"></i>
                <input type="submit" id="Input" class=" fs-5 fw-bolder bc-transparent c-secondary trans3" v-model="SelectedType"/>
            </label>
            <ul class="dropdown-menu shadow-lg" >
                <li class="dropdown-item pointer trans3" v-for="Type in Types" :key="Type" @click="TypeSelected(Type)">
                    <a class="c-light-white fw-bold letter-p-05 s17 trans3" >{{ Type }}</a>
                </li>
            </ul>
        </div>
        
    </div>
    
</template>

<script>
    export default {
        props:['Title','Types'],
        data() { return {
            SelectedType: this.Types ? this.Types[0] : null,
        }},
        methods: {
            TypeSelected( Value ) {
                this.SelectedType = Value
                this.$emit( 'TypeSelected', Value )
            }
        },
    }
</script>

<style scoped>

.Title {
    border-bottom: 5px solid var(--c4);
}

.dropstart label:hover :where(i,input) {
    color: var(--Primary);
} 
.dropstart .dropdown-menu {
    background-color: var(--c1);
    border-bottom: 3px solid var(--c4);
    border-top: 3px solid var(--c4);
    border-radius: 10px;
    transform: translate(-0 , -31px)!important;
    right: 105%!important;
}
.dropstart .dropdown-toggle::before {
    display: none;
}
.dropstart .dropdown-menu .dropdown-item:hover {
    background-color: var(--Primary);
}
.dropstart .dropdown-menu .dropdown-item:hover a {
    color: var(--Text);
    padding-left: 5px;
}

</style>