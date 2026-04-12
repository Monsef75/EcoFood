<template>
    
    <div class="SuccessCard position-fixed" Id="SuccessCard">
        <div class="Container position-relative shadow-sm">
            <div class="iconContainer position-absolute f-center">
                <i class="fa-solid fa-check"></i>
            </div>
            <span class="c-white s18 fw-bold t-nowrap pe-2">{{ successCard.text }}</span>
            <i class="fa-solid fa-circle-xmark closeIcon c-light-white2 s20 trans3 pointer ms-auto" @click="hideSuccessCard"></i>
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
                card.classList.remove('active')
                setTimeout( () => {
                    if (!card.classList.contains('active')) {
                        card.firstElementChild.classList.remove('anim')
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
                        if (card.classList.contains('active')) {
                            card.firstElementChild.classList.remove('anim')
                        }
                        else card.classList.add('active')
                        
                        setTimeout( () => {
                            card.firstElementChild.classList.add('anim')
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
    &.active {
        opacity: 1;
        .anim {
            width: calc(100% + 1.5rem);
            --bg-toggle: hsl(96, 85%, 34%);
            --bg-circle: hsl(0, 0%, 96%);
            span {
                color: white;
            }
            .iconContainer {
                left: .5rem;
            }
            .closeIcon {
                display: unset;
            }
        }
    }

    z-index: 3;
    opacity: 0;
    left: 40px;
    top: 27px;
    transition: 1000ms ease-out;
    height: fit-content;
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
        .iconContainer {
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
        .closeIcon {
            display: none;
            &:hover {
                color: white;
            }
        }
    }
    
}

.RemoveAnim {
    span {
        display: none;
        opacity: 0;
        visibility: hidden;
    }
    .iconContainer {
        transform: scale(1.2);
    }
}

@media screen and (max-width: 576px) {
    .SuccessCard {
        left: 10px;
        bottom: 20px;
        .Container {
            height: 55px;
            span {
                font-size: 16px;
                text-wrap: wrap;
                line-height: 1.4;
            }
        }
    
        &.active {
            width: calc(100% - 20px);
            .anim {
                width: 100%;
                padding-right: 15px;
            }
        }
    }

}
    

</style>