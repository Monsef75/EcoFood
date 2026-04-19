<template>

        <main class="Content p-5">

            <div class="Switch d-flex gap-4 w-fit mx-auto mb-4">
                <button class="fw-bold letter-n-05 trans3" :class="{'active': signSwitch}" 
                 @click="reset(1)">SIGN IN</button >
                <button  class="fw-bold letter-n-05 trans3" :class="{'active': !signSwitch}" 
                 @click="reset(0)">SIGN UP</button >
            </div>
            <SocialButtons Sign="In" class="SocialButtons"/>
            <p class="s16 c-light-white2 mb-2">or use your Email</p>

            <section class="SignIn" v-if="signSwitch">
                <form class="Form">

                    <fieldset class="Fieldset mx-auto">

                        <div class="Field position-relative" style="margin-bottom: 25px;">
                            <input type="email" placeholder="Email" class="Field-Input c-white s18 letter-p-1 trans3" 
                            v-model="user.email" @input="emailValidation" required autofocus autocomplete/>

                            <ul v-show="errors.email || errors.server.length" class="Errors position-absolute c-red s15" style="left: 10px;bottom: -25px;">
                                <li v-show="errors.email" class="default">
                                    <i class="fa-solid fa-xmark me-1"></i>
                                    <span>{{ errors.email }}</span>
                                </li>
                                <li v-show="errors.server[0]" class="default">
                                    <i class="fa-solid fa-xmark me-1"></i>
                                    <span>{{ errors.server[0] }}</span>
                                </li>
                            </ul>
                            
                        </div>
                        <div class="Field position-relative" style="margin-bottom: 25px;">
                            <input class="Field-Input c-white s18 letter-p-1 trans3" placeholder="Password" style="padding-right: 30px;" 
                            :type="showPassword ? 'text' : 'password'" v-model="user.password" @input="passwordValidation"  required  autocomplete/>

                            <i class="fa-solid c-white position-absolute pointer trans2 s14" style="top: 10px;right: 7px;"
                            :class="showPassword ? 'fa-eye' : 'fa-eye-slash'" @click="showPassword = !showPassword"></i>

                            <ul v-show="errors.password || errors.server.length" class="Errors position-absolute c-red s15" style="left: 10px;bottom: -25px;">
                                <li v-show="errors.password" class="default">
                                    <i class="fa-solid fa-xmark me-1"></i>
                                    <span>{{ errors.password }}</span>
                                </li>
                                <li v-show="errors.server[1]" class="default">
                                    <i class="fa-solid fa-xmark me-1"></i>
                                    <span>{{ errors.server[1] }}</span>
                                </li>
                            </ul>

                        </div>

                    </fieldset>
                    <div class="Buttons d-flex align-items-center justify-content-between mt-3">

                        <button class="ButtonSpinner bc-prim-blue rd-10" style="width: 130px;height: 38px;" v-if="waiting">
                            <span class="Spinner"></span>
                        </button>
                        <button style="width: 130px;border: 1px solid var(--Light-White2);" type="submit" class="pointer py-2 rd-10 letter-p-05 w-400 s16 trans3" v-else
                        @click.prevent="SignIn" :class="signInValidation ? 'Inactive' : 'bc-bttn-linear'" :disabled="signInValidation">
                            SING IN
                        </button>
                        <input type="button" value="Forgot password?" class="s16 c-light-white bc-transparent letter-p-05 text-decoration-underline trans2" />

                    </div>
                    <div class="default d-block mx-auto c-red s13 w-fit mt-1" v-if="ServerError">
                        <i class="fa-solid fa-xmark me-1"></i>
                        <span>{{ ServerError }}</span>
                    </div>

                </form>
            </section>
            <section class="SignUp" v-else>
                <form class="firstPage Form">
                    <fieldset class="Fieldset mb-2 mx-auto">

                            <div class="Field position-relative" style="margin-bottom: 20px;">
                                <input type="text" placeholder="Full Name" class="Field-Input s16 letter-p-1 trans3" 
                                v-model="user.fullName" @input="fullNameValidation" required autocomplete/>

                                <ul v-show="errors.fullName" class="Errors position-absolute c-red s11" style="left: 0;bottom: -20px;">
                                    <li class="default t-nowrap s14">
                                        <i class="fa-solid fa-xmark me-1"></i>
                                        <span >{{ errors.fullName }}</span>
                                    </li>
                                </ul>

                            </div>
                            <div class="Field position-relative" style="margin-bottom: 20px;">
                                <input type="email" placeholder="Email" class="Field-Input s16 letter-p-1 trans3" 
                                v-model="user.email" @input="emailValidation" required autocomplete/>

                                <ul v-show="errors.email || errors.server.length" class="Errors position-absolute c-red s11" style="left: 0px;bottom: -20px;">
                                    <li v-show="errors.email" class="default s14">
                                        <i class="fa-solid fa-xmark me-1"></i>
                                        <span>{{ errors.email }}</span>
                                    </li>
                                    <li v-show="errors.server[0]" class="default t-nowrap s14">
                                        <i class="fa-solid fa-xmark me-1"></i>
                                        <span >{{ errors.server[0] }}</span>
                                    </li>
                                </ul>
                            </div>
                            <div class="Field position-relative" style="margin-bottom: 20px;">
                                <input placeholder="Password" class="Field-Input s16 letter-p-1 trans3" style="padding-right: 30px;" 
                                :type="ShowPassword ? 'text' : 'password'" v-model="user.password" @input="passwordValidation" required autocomplete/>

                                <i class="fa-solid c-white position-absolute pointer trans2 s14" style="top: 10px;right: 7px;"
                                :class="ShowPassword ? 'fa-eye' : 'fa-eye-slash'" @click="ShowPassword = !ShowPassword"></i>

                                <ul v-show="errors.password" class="Errors position-absolute c-red s11" style="left: 10px;bottom: -20px;">
                                    <li class="default s14">
                                        <i class="fa-solid fa-xmark me-1"></i>
                                        <span>{{ errors.password }}</span>
                                    </li>
                                </ul>
                        </div>

                    </fieldset>
                    
                    <button class="ButtonSpinner mx-auto bc-prim-blue rd-10" style="width: 130px;height: 38px;" v-if="waiting">
                        <span class="Spinner"></span>
                    </button>
                    <button type="submit" style="width: 130px;border: 1px solid var(--Light-White2);" class="py-2 mb-1 rd-10 letter-p-05 w-400 s16 d-block mx-auto pointer trans3" v-else
                        @click.prevent="SignUp" :class="signUpValidation ? 'Inactive' : 'bc-bttn-linear'" :disabled="signUpValidation"> 
                        Sign Up
                    </button>                        
                </form>
            </section>

        </main>

</template>

<script>

    import SocialButtons from './elements/socialButtons.vue';
    import Map from '@/components/elements/map.vue'
    import { formatDate } from '@/utils/index.js'
    import { mapActions } from 'vuex'
    
    export default {
        components: {SocialButtons, Map},
        data() { return {
            signSwitch: true,
            showPassword: false,
            currentTypeIndex: 0,
            user: {
                fullName: null,
                email: null,
                password: null,
            },
            ShowPassword: false,
        
            errors: {
                // "Email & fullName is Allready Used missing"
                fullName: null,
                email: null,
                password: null,

                server: [],
            },
            
            ServerError: '',
            waiting: false,
            Values: null,
        }},
        methods: {
            SignIn() {
                this.waiting = true
                this.signIn({ email: this.user.email, password: this.user.password }).then( ()=> this.waiting = false )
                .catch( err => {
                    this.errors.server = err
                    this.waiting = false
                })
            },
            SignUp() {
                this.waiting = true
                const form = new FormData()
                
                let user = { 
                    fullName: this.user.fullName,
                    email: this.user.email,
                    password: this.user.password,
                    createdAt: formatDate(new Date())
                }
                form.append('user', JSON.stringify(user))

                this.signUp( form ).then( ()=> { this.waiting = false })                
                .catch( err => {
                    this.errors.server = err
                    this.waiting = false
                })
            },
            reset(isSignIn) {
                if (isSignIn) this.signSwitch = true
                else this.signSwitch = false
                
                for (const key in this.user) {
                    this.user[key] = null                
                }
                for (const key in this.errors) {
                    if (key == 'server') this.errors[key] = []
                    else this.errors[key] = null
                }
            },

            fullNameValidation() {
                this.errors.fullName = null // reset

                if (this.user.fullName.trim().length == 0) {
                    this.errors.fullName = 'This field is empty'
                    return  // stop further checks & display only 1 error
                }

                if (this.user.fullName.length < 5) {
                    this.errors.fullName = 'Must contain at least 5 letters'
                    return
                }

                if (this.user.fullName.length > 15) {
                    this.errors.fullName = 'Must contain at most 15 letters'
                    return
                }

                if (!/^[A-Za-z]+(?: [A-Za-z]+)*$/.test(this.user.fullName)) {
                    this.errors.fullName = 'Must contain only Letters'
                    return
                }
            },
            emailValidation() {
                this.errors.server = []
                this.errors.email = null // reset

                if (this.user.email.trim().length == 0) {
                    this.errors.email = 'This field is empty'
                    return
                }

                if (!/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(this.user.email)) {
                    this.errors.email = 'Email is invalid'
                    return
                }
            },
            passwordValidation() {
                this.errors.server = []
                this.errors.password = null // reset

                if (this.user.password.trim().length === 0) {
                    this.errors.password = 'This field is empty'
                    return
                }

                if (this.user.password.length < 6) {
                    this.errors.password = 'Must contain at least 6 characters'
                    return
                }
            },
            ...mapActions(['signUp','signIn']),
        },
        computed: {
            signUpValidation() {
                if (!this.user.fullName || !this.user.email || !this.user.password) return true

                return ( // If any field has errors → form invalid
                    this.errors.fullName || this.errors.email || this.errors.password                    
                )
            },
            signInValidation() {
                if (!this.user.email || !this.user.password) return true

                return (
                    this.errors.email || this.errors.password
                )
            },
        },
    }
    
</script> 

<style scoped lang="scss">

    .Content{
        .Switch {
            button {
                border-bottom: 3px solid var(--Light-White2);
                color: var(--Light-White2);
                font-size: 22px;
                &.active {
                    border-bottom-color: var(--c1);
                    color: white;
                }
            }

        }
        .Form {
            .Fieldset .Field{
                .Field-Input {
                    width: 100%;
                    border-bottom: 1px solid var(--Light-White3);
                    padding: 6px 20px 6px 6px;
                    color: white;
                    &:focus {
                        border-bottom-color: var(--c1);
                    }
                }
                input::placeholder, .Location, .upload{
                    font-size: 16px;
                    font-weight: 500;
                    letter-spacing: 0.1rem;
                    color: var(--Light-White2);
                }
            }
            .Buttons {
                .ButtonSpinner {
                    height: 40px;
                    width: 155px;
                }
            }
        }
    }

</style> 