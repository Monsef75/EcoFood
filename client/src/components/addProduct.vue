<template>
    
    <main>
        <div ref="divImg" class="img dash rd-10 mb-3 position-relative trans3 mx-auto shadow"
        :style="{'background-image': `url(${ img.content })`}" >
            <label for="Img-Primary" class="position-absolute h-100 w-100 pointer">
                <input ref="FilePrim" type="file" id="Img-Primary" class="position-absolute" v-on:change="updateImg">
                <span class="position-absolute fs-3 fw-bold c-light-text3 trans3">{{ img.text }}</span>
                <span class="position-absolute fs-3 fw-bold c-light-text3 trans3">{{ img.resolution }}</span>
            </label>
        </div>
        <form class="position-relative mb-3 d-flex flex-column gap-2">

            <input type="text"   placeholder="Product Name" class="w-100 rounded-3 trans3 shadow-sm" v-model="info.name" required>

            <div class="inputContainer category position-relative">
                <input ref="category" type="text" placeholder="Category" class="valid rounded-3 trans3 shadow-sm dropdown dropdown-toggle w-100" 
                v-model="info.category" data-bs-toggle="dropdown" readonly>
                <ul class="dropdown-menu w-100">
                    <li class="dropdown-item pointer fw-bold s16 trans3" v-for="category in categories" @click="updateCategory( category )">{{ category }}</li>
                </ul>
                <i class="fa-solid fa-chevron-down position-absolute c-white" style="top: 18px; right: 10px;"></i>
            </div>

            <div class="inputContainer subCategory position-relative">
                <input ref="subCategory" type="text" placeholder="Category" class="rounded-3 trans3 shadow-sm dropdown dropdown-toggle w-100" 
                v-model="info.subCategory" data-bs-toggle="dropdown" readonly>
                <ul class="dropdown-menu w-100">
                    <li class="dropdown-item pointer fw-bold s16 trans3" v-for="subCategory in subCategories[info.category]" @click="updateSubCategory( subCategory )">{{ subCategory }}</li>
                </ul>
                <i class="fa-solid fa-chevron-down position-absolute c-white" style="top: 18px; right: 10px;"></i>
            </div>

            <div class="inputContainer price position-relative">
                <input type="number" placeholder="Price" class="w-100 rounded-3 trans3 shadow-sm" v-model="info.price" :max="currentMaxPrice" required :disabled="!this.info.subCategory">
                <span class="c-white position-absolute" style="top: 18px; right: 10px;" v-if="this.info.subCategory">max = {{ currentMaxPrice }}<i class="s12">Da</i> </span>
            </div>

            <div class="location d-flex align-items-center gap-2 trans3 shadow-sm rounded-3" 
            :class="info.coords ? 'valid' : ''" @click="setLocation">
                <i class="fa-solid fa-location-crosshairs trans3 me-2 c-white"></i>
                <span class="Spinner" style="width: 25px; height: 25px; margin-left: 35%;" v-if="locationWaiting"></span>
                <span :class="location ? 'c-white' : 'c-light-white2'" v-else>{{ location ? location : 'Set Your Location'}}</span>
            </div>
        </form>
        <div class="warning d-flex align-items-center bc-light-grey px-3 py-2 rd-10 gap-3 c-white mb-3" >
            <!-- v-if="this.info.subCategory" {{ currentDurration }}-->
            <i class="fa-solid fa-circle-exclamation s25"></i>
            <p class="t-capital">
                Notice that Your product will be automatically deleted after 2 days.
            </p>
        </div>
        <div class="ButtonSpinner bc-bttn-linear rd-10" style="height: 50px;" v-if="waiting">
            <span class="Spinner"></span>
        </div> 
        <button style="height: 50px;" type="submit" class="w-100 pointer py-2 rd-10 letter-p-05 fw-bold s18 trans3"
        @click="AddProduct" v-else
        @click.prevent="SignIn" :class="!valid ? 'Inactive' : 'bc-bttn-linear'" :disabled="!valid">
            <i class="fa-solid fa-plus c-white s18 me-2" :class="valid ? 'c-white' : 'c-light-white2'"></i>
            Add Product
        </button>
    </main>
    
</template>

<script>
    
    import { formatDate, getLocation } from '@/utils/index.js'
    import { mapActions } from 'vuex'
    
    export default {
    
        components: {},
        data() { return {
            categories : ['Food','Sweets','Drinks',],
            subCategories : {
                Food: ['Traditionel Food','Fast Food'],
                Sweets: ['Fruits & Veget','Bakery','Patesries'],
                Drinks: ['Drinks & Juices',],
            },
            productControll: {
                'Traditionel Food': { price: 300, duration: 2 },
                'Fast Food': { price: 250, duration: 2 },
                'Fruits & Veget': { price: 200, duration: 2 },
                'Bakery': { price: 50, duration: 2 },
                'Patesries': { price: 100, duration: 2 },
                'Drinks & Juices': { price: 80, duration: 2 },
            },

            img: {
                content: null,
                file: null,
                text: "Browser Image",
                resolution: "500x500",
            },
            info: {
                name: null,
                category: 'Food',
                subCategory: '',
                price: null,
                coords: null,
            },
            location: null,
            infoValid : false,

            management: [],
            waiting: false,
            locationWaiting: false,
        }},
        methods: {
            updateCategory( category ) {
                this.info.category = category
                this.$refs.category.classList.add('valid')
                this.info.subCategory = null
                this.$refs.subCategory.classList.remove('valid')
            },
            updateSubCategory( subCategory ) {
                this.info.subCategory = subCategory
                this.$refs.subCategory.classList.add('valid')
            },
            updateImg( event ) {
                this.img.file = event.target.files[0]
                const Reader = new FileReader()
                Reader.readAsDataURL(this.img.file)
                Reader.onload = (event) => {
                    this.img.content = event.target.result
                }
                this.img.text = "Change Image"
                this.$refs.divImg.classList.remove('dash')
            },
            setLocation() {
                this.locationWaiting = true
                getLocation().then( async coords => {
                    this.info.coords = coords
                    const res = await fetch(
                        `https://nominatim.openstreetmap.org/reverse?lat=${coords[0]}&lon=${coords[1]}&format=json`
                    );
                    const data = await res.json();
                    this.location = data.address.state + ', ' + data.address.city + ', ' + data.address.road
                    this.locationWaiting = false
                })
            },

            AddProduct() {
                this.waiting = true
                const form = new FormData()
                , product = { 
                    info: this.info,
                    addedBy: {
                        id: this.$store.state.user.id,
                        fullName: this.$store.state.user.fullName,
                    },
                    createdAt: formatDate(new Date())
                }
                form.append('product', JSON.stringify(product))
                form.append('img', this.img.file)

                this.addProduct( form ).then( ()=> {
                    this.waiting = false
                    this.$emit('backHome')
                })
            },
            ...mapActions(['addProduct']),
        },
        computed: {
            currentMaxPrice() {
                if (this.info.subCategory) return this.productControll[this.info.subCategory].price
                else return null
            },
            currentDurration() {
                return this.productControll[this.info.subCategory].duration
            },
            valid() {
                return this.infoValid &&
                this.img.file
            },
        },
        watch: {
            info: {
                handler( Vals ) {
                    for (const Val in Vals) {
                        if (!Vals[Val]) {
                            return this.infoValid = false
                        }
                    }
                    return this.infoValid = true
                },
                deep: true,
            },
            'info.price'(val) {
                const max = this.currentMaxPrice;
                if (max && val > max) {
                    this.info.price = max;
                }
            }
        },
    }
    
</script>

<style scoped lang='scss'>
    .img  {
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
        height: 300px;
        width: 100%;
        background-color: var(--Light-White3);
        input {
            visibility: hidden;
            width: 5px;
        }
        
        label {
            color: white;
            span:first-of-type {
            top: 50%;
            left: 50%;
            transform: translate( -50% , -50% );
            white-space: nowrap;
            }
            span:last-of-type {
                top: 60%;
                left: 50%;
                transform: translate( -50% , -60% );
            }
        }
        &.dash {
            border: 2px dashed var(--Light-White);
        }
    }
    form {
        input {
            color: white;
        }
        input, .location {
            background-color: var(--Light-White3);
            padding: 1rem;
            letter-spacing: 0.5px;
            font-size: 16px;
            font-weight: 700;
            &::placeholder {
                color: var(--Light-White2);
            }
            &:valid, &.valid {
                background-color: rgba(255, 255, 255, 0.4);
                color: white;
            }
        }
        .dropdown-menu {
            .dropdown-item:hover {
                background-color: var(--c2);
            }
        }
    }
</style>