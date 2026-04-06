<template>
    
    <div class="SuccessCard position-fixed" Id="SuccessCard">
        <div class="Container position-relative shadow-sm">
            <div class="Circle position-absolute f-center">
                <i class="fa-solid fa-check"></i>
            </div>
            <span class="c-white s18 fw-bold t-nowrap pe-2">{{ successCard.text }}</span>
            <i class="fa-solid fa-circle-xmark Close-Icon c-light-white2 fs-6 trans3 pointer" @click="hideSuccessCard"></i>

        </div>
    </div>
    
</template>

<script>
    
    import { mapState  } from 'vuex'
    
    export default {
        components: {},
        data() { return {
            
        }},
        methods: {
            hideSuccessCard() {
                const card = document.getElementById('SuccessCard')
                card.classList.remove('ParentAnim')
                setTimeout( () => {
                    if (!card.classList.contains('ParentAnim')) {
                        card.firstElementChild.classList.remove('ChildAnim')
                    }
                } , 3000 )
            },
        },
        computed: {
            ...mapState(['successCard',]), 
        },
        watch: {
            successCard: {
                handler( info ) {
                    if (info) {
                        const card = document.getElementById('SuccessCard')
                        if (card.classList.contains('ParentAnim')) {
                            card.firstElementChild.classList.remove('ChildAnim')
                        }
                        else card.classList.add('ParentAnim')
                        
                        setTimeout( () => {
                            card.firstElementChild.classList.add('ChildAnim')
                        } , 1000 )
                        // setTimeout( () => {
                        //     card.classList.add('RemoveAnim')
                        //     card.classList.remove('ParentAnim')
                        //     card.firstElementChild.classList.remove('ChildAnim')
                        // } , 3000 )
                        if (info.to) this.$router.push(info.to)
                    }
                },deep: true
            },
        },
    }
    
</script>

<style scoped lang='scss'>
    
.SuccessCard {
    z-index: 3;
    opacity: 0;
    left: 40px;
    top: 27px;
    transition: 1000ms ease-out;
    .Container {
        --bg-toggle: hsl(0, 0%, 96%);
        --bg-circle: hsl(96, 85%, 34%);;
        height: 33px;
        width: 0;
        background-color: var(--bg-toggle);
        border-radius: 4rem;
        display: flex;
        align-items: center;
        transition: 300ms;
        span {
            color: transparent;
            transition: color .6s ease-in;
            padding-left: 70px;
        }
        .Circle {
            width: 45px;
            height: 45px;
            background-color: var(--bg-circle);
            border-radius: 50%;
            transition: background-color 1000ms;
            box-shadow: 0 1rem 3rem rgba(0, 0, 0, .8);
            transition: .3s;
            i {
                color: var(--bg-toggle);
            }
        }
        .Close-Icon{
            display: none;
            &:hover {
                color: white;
            }
        }
    }
    
}
.ParentAnim {
    opacity: 1;
    .ChildAnim {
        width: calc(100% + 1.5rem);
        --bg-toggle: hsl(96, 85%, 34%);
        --bg-circle: hsl(0, 0%, 96%);
        span {
            color: white;
        }
        .Circle {
            left: .5rem;
        }
        .Close-Icon{
            display: unset;
        }
    }
}
.RemoveAnim {
    span {
        display: none;
        opacity: 0;
        visibility: hidden;
    }
    .Circle {
        transform: scale(1.2);
    }
}

@media screen and (max-width: 576px) {
    .SuccessCard {
        left: 20px;
        bottom: 20px;
        .Container {
            height: 55px;
            span {
                font-size: 16px;
                text-wrap: wrap;
                line-height: 1.4;
            }
        }
    }
    .ParentAnim .ChildAnim {
        width: calc(100% - 10px);
        padding-right: 10px;
    }
}
    

</style>