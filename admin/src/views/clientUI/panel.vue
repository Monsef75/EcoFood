<template>

    <main >
        <head style="height: 55px;" class="f-between px-4">
            <img style="width: 50px;" src="/imgs/clientUI/logo.png" alt="">
            <p class="c-white fw-bold n-spacing1 s20">Admin Panel</p>
        </head>
        <section class="d-flex" v-if="signIn">
            <sideBar @ShowPage="(page) => currentPage = page"/>
            <component class="Component flex-grow-1" :is="ShowPage"></component>
        </section>
        <section class="signForm f-center" v-else>
            <form class="mx-auto" style="width: 300px;">
                <h3 class="c-white fw-bold n-spacing1 mb-4 pb-2">Logn In</h3>
                <div class="Field position-relative" style="margin-bottom: 25px;">
                    <input type="text" placeholder="User Name" value="admin" class="Field-Input c-white s18 letter-p-1 trans3" 
                    required autofocus autocomplete/>
                </div>
                <div class="Field position-relative" style="margin-bottom: 40px;">
                    <input class="Field-Input c-white s18 letter-p-1 trans3" value="admin" placeholder="Password" style="padding-right: 30px;" 
                    :type="showPassword ? 'text' : 'password'" required  autocomplete/>

                    <i class="fa-solid c-white position-absolute pointer trans2 s14" style="top: 10px;right: 7px;"
                    :class="showPassword ? 'fa-eye' : 'fa-eye-slash'" @click="showPassword = !showPassword"></i>

                </div>
                <button style="width: 180px;border: 1px solid var(--Light-White3);" type="submit" class="d-block mx-auto bc-bttn-linear pointer py-2 p-spacing05 w-600 s16 trans3"
                @click.prevent="signIn = true">
                    Sign In
                </button>
            </form>
        </section>
    </main>
</template>

<script>

    import sideBar from '@/components/clientUI/sideBar.vue'
    import products from './products.vue'
    import users from './users.vue';

    export default {
        components: {sideBar,products,users},            
        data() { return {
            currentPage: 'products',
            signIn: false,
            showPassword: false,
        } },
        computed: {
            ShowPage() {
                return this.currentPage
            },
        },
    }

</script>

<style lang="scss">

head {
    background-color: #3f3e3e;
}
.Component {
    min-height: calc(100vh - 55px);
}
.signForm {
    background-color: var(--c1);
    min-height: calc(100vh - 55px);
    form {
        .Field-Input {
            width: 100%;
            border-bottom: 1px solid var(--Light-White3);
            padding: 6px 20px 6px 6px;
            color: white;
            &:focus, &:valid {
                border-bottom-color: var(--c4);
            }
        }
        input::placeholder, .Location, .upload{
            font-size: 16px;
            font-weight: 500;
            letter-spacing: 0.1rem;
            color: var(--Light-White2);
        }
        .Buttons {
            .ButtonSpinner {
                height: 40px;
                width: 155px;
            }
        }
    }
}

@media screen and (max-width: 768px) {
    .Component {
        flex-basis: calc(100% - 45px)!important;
    }
}

</style>