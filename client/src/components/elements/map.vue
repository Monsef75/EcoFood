<template>
    <div id="map" class="rd-5"></div>
</template>


<script setup>
    
    import foodIconImg from "/Imgs/clientUI/map/red.png"
    import cafeIconImg from "/Imgs/clientUI/map/green.png"
    import bakeryIconImg from "/Imgs/clientUI/map/blue.png"

    import { onMounted } from "vue"
    import Leaflet from "leaflet"
    import 'leaflet/dist/leaflet.css'

    const foodIcon = Leaflet.icon({
        iconUrl: foodIconImg,
        iconSize: [50, 50],
        iconAnchor: [25, 50],
        popupAnchor: [0, -50]
    })

    const cafeIcon = Leaflet.icon({
        iconUrl: cafeIconImg,
        iconSize: [50, 50],
        iconAnchor: [25, 50],
        popupAnchor: [0, -50]
    })

    const bakeryIcon = Leaflet.icon({
        iconUrl: bakeryIconImg,
        iconSize: [50, 50],
        iconAnchor: [25, 50],
        popupAnchor: [0, -50]
    })

    const getIcon = (type) => {
        switch (type) {
            case "food": return foodIcon
            case "cafeteria": return cafeIcon
            case "bakery": return bakeryIcon
            default: return foodIcon
        }
    }
    
    const props = defineProps({
        stores: {
            type: Array,
            required: true
        }
    })
    onMounted(() => {

        const map = Leaflet.map("map", {attributionControl: false, zoomControl: false,}).setView([35.875, 7.113], 13)
        Leaflet.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map)

        props.stores.forEach(store => {
            Leaflet.marker(store.coords, {
                icon: getIcon(store.type)
            })
            .addTo(map)
            .bindPopup(`<b>${store.title}</b>`)
        })

    })
    
</script>


<style scoped lang='scss'>
    #map {
        height: 250px;
    }
</style>