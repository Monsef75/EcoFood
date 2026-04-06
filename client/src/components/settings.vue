<template>
    
    <section class="Settings">

        <header class="d-flex align-items-center gap-4 bc-light-white3 py-3 px-4 m-3 rd-10">
            <img src="\src\assets\Imgs\Common\User.png" style="width: 70px;" alt="">
            <div class="text c-white">
                <p class="w-700 s20 letter-n-05">{{ $store.state.user.fullName }}</p>
                <p class="s15 c-light-white2 letter-p-05">{{ $store.state.user.role }}</p>
            </div>
        </header>

        <div class="bc-light-white3 px-4 rd-10 m-3">
            <button class="Setting c-white s20 py-3 w-100" v-for="set in settings" style="text-align: start;" @click="setting(set.name)">
                <i class="fa-solid" :class="set.icon" style="width: 35px;"></i>
                {{ set.title }}
            </button>
        </div>

    </section>
    
</template>

<script>

    import { mapMutations } from 'vuex';
    
    export default {
    
        components: {},
        data() { return {
            settings : [
                { name: 'lang', title: 'Language', icon: 'fa-language'},
                { name: 'pass', title: 'Change Password', icon: 'fa-unlock-keyhole'},
                { name: 'out', title: 'Sign Out', icon: 'fa-right-from-bracket'},
                { name: 'del', title: 'Delete Account', icon: 'fa-user-slash'},
            ],
        }},
        methods: {
            setting(name) {
                if (name == 'out') this.loggOut()
            },
            ...mapMutations(['loggOut'])
        },
        computed: {
            
        },
        watch: {
            
        },
    }
    
</script>

<style scoped lang='scss'>
    
    .Settings {
        header {
            img {
                border-radius: 50%;
                outline: 3px solid var(--Light-White2);
                outline-offset: 4px;
            }
        }
        .Setting:not(:last-of-type) {
            border-bottom: 1px solid var(--Light-White2);
        }
        .Setting:focus {
            color: var(--Light-Purple);
        }
    }

</style>