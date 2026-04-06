<template>

    <div class="Social-Buttons d-flex flex-column gap-2 px-2 mx-auto my-3">
        <button class="Button w-100 gap-4 rounded-3 d-flex justify-content-start align-items-center trans3" style="background-color: #ea4335cc;">
            <i class="fa-brands fa-google c-dark-blue2 trans3" style="width: 1rem;"></i>
            <span class="c-white w-600"> <span>Sign {{ Sign }}</span> With Google</span>
        </button>
        <button class="Button w-100 gap-4 rounded-3 d-flex justify-content-start align-items-center trans3" style="background-color: #1877F2cc;"
         @click="FbSign">
            <i class="fab fa-facebook-f c-dark-blue2 trans3" style="width: 1rem;"></i>
            <span class="c-white w-600"> <span>Sign {{ Sign }}</span> With Facebook</span>
        </button>
    </div>
    
</template>

<script>

    export default {
        props:['Sign'],
        data() { return {

        }},
        methods: {
            // FbSign() {
            //     FB.login(function(response) {
            //         if (response.authResponse) {
            //             // User is logged in and granted permissions
            //             FB.api('/me', { fields: 'id,name,email' }, function(response) {
            //                 // Handle user data (response.id, response.name, response.email)
            //                 console.log('Facebook user info:', response)
            //             })
            //         } 
            //         else {
            //             // User canceled login or didn't grant permissions
            //             console.log('Facebook login cancelled.')
            //         }
            //     }, { scope: 'email' })
            // }
        },
        watch: {

        },
    }
</script> 

<style scoped lang="scss">

.Social-Buttons {
    button {
        padding: 10px 25px;
    }
    button:last-of-type:hover {
        background-color: #1877F2;
    }
    button:first-of-type:hover {
        background-color: #ea4335;
    }
    button:hover i {
        color: white;
    }
}

// @media screen and (max-width: 992px) {
//     .Social-Buttons {
//         a {
//             padding: 10px 20px;
//             gap: 1rem!important;
//         }
//     }
// }
@media screen and (max-width: 768px) {
    .Social-Buttons {
        padding: 0 !important;
        button {
            span span {
                display: none;
            }
        }
    }
}


</style>