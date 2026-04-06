<template>

    <aside class="SideBar h-100vh bc-c1 position-relative d-flex">

        <aside class="Content bc-dark-Blue2 bd-r-light-white position-relative shadow-lg trans3"
         :class="{'Responsive' : ResponsiveWidth}">

            <div class="Responsive-Arrow w-fit bc-prim-blue ms-auto mt-2 me-2 rounded-circle pointer trans3"
            :class="{'d-none' : ResponsiveArrow}" @click="ResponsiveWidth = true,ResponsiveArrow = false">
                <i class="fa-solid fa-angles-left s15 p-2 c-text trans3"></i>
            </div>
            <ul class="m-2 my-4">
                <li class="mb-1 pointer" v-for="(Page, Index) in Pages" @click="ShowPage( Index )">
                    <p class="px-3 py-2 d-flex align-items-center trans3" :class="{'Active' : Page.Active}" >
                        <i class="fa-solid me-4 s20" :class="Page.Icon"></i>
                        <span class="letter-p-1 s20 fw-bold flex-grow-1">{{ Page.Name }}</span>
                    </p>
                </li>
            </ul>

        </aside>
        <aside class="ResponsiveContent position-relative bc-dark-Blue2 rounded-3 pt-4 t-center pointer trans3"
         :class="{'d-none' : !ResponsiveWidth}" @click="ResponsiveWidth = false,ResponsiveArrow = false">
            <i class="fa-solid fa-bars fs-4 c-light-white2 trans3"></i>
        </aside>
        
    </aside>

</template>

<script>
    export default {
        data() { return {
            Pages: [
                {Name: 'Products',Icon: 'fa-cubes', Active: true },
                {Name: 'Users',     Icon: 'fa-user-group', Active: false },
            ], 
            ResponsiveWidth: false,
            ResponsiveArrow: true,

        }},
        methods: {
            ShowPage( Index ) {
                this.$emit('ShowPage', Index == 0 ? 'products' : 'users' )
                this.Pages.forEach( Page => Page.Active = false )
                this.Pages[Index].Active = true
            },
        },
        created() {
            window.innerWidth < 768 ? this.ResponsiveWidth = true : this.ResponsiveWidth = false
        },
    }
</script>

<style scoped lang="scss">

.SideBar {
    .Content {
        width: 250px;
        ul {
            li {
                p i {
                    width: 20px;
                }
                p:not(.Active) {
                    color: var(--Light-White2);
                }
                p:not(.Active):hover {
                    background-color: var(--Light-White3);
                    color: white;
                }
                p.Active {
                    background-color: var(--c4);
                    color: white;
                }
            }
        }
    }
}

@media screen and (max-width:768px) {
    .SideBar {
        width: 45px;
        .Content{
            position: absolute!important;
            left: 0;
            top: 2rem;
            width: 250px;
            z-index: 1;
            border: 3px solid var(--Prim-Blue);
        }
        .Responsive {
            transform: translateX(-100%);
        }
        .ResponsiveContent {
            width: 40px;
        }
        .ResponsiveContent:hover {
            width: 45px;
        }
        .ResponsiveContent:hover i ,
        .Responsive-Arrow:hover i {
            color: white;
        }
    }
}

</style>