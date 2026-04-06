<template>

        <div style="background-color: var(--Prim-White);">
            <!-- margin-top: 60px; -->
            <router-view />
            <successCard />
            <networkCard/>
            <!-- <WarningCard/> -->
        </div>

</template>

<script>
    
    import successCard from './components/elements/successCard.vue';
    import networkCard from './components/elements/networkCard.vue';
    import { mapMutations } from 'vuex'
    import { Network } from '@capacitor/network'
    
    
    export default {
    
        components: { successCard, networkCard},
        data() { return {
        }},
        methods: {
            ...mapMutations(['stayLogged'])
        },
        created() {
            this.stayLogged()
        },
        async mounted() {
            // Check internet on app start
            const status = await Network.getStatus()
            this.$store.state.isOnline = status.connected
            console.log("Internet:", status.connected ? 'online' : 'offline')

            // Listen for changes
            Network.addListener("networkStatusChange", (status) => {
                this.$store.state.isOnline = status.connected
                console.log("Internet changed:", status.connected ? 'online' : 'offline')
            })
        },
    }
    
</script>

<style scoped lang='scss'>
    
</style>
