<script>
import { toast } from 'vue3-toastify'
export default {
    data() {
      return {
        login_username: '',
        login_password: '',
        register_username: '',
        register_password1: '',
        register_password2: '',
        api_token: '',
        register_form_trigger: false,
      }
    },
    emits: ['authorized'],
    methods: {
        login_submit() {
            fetch(import.meta.env.VITE_APP_API_URL+'/api/auth/login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: this.login_username,
                    password: this.login_password,
                })
            })
            .then(resp => resp.json()
                .then(data => {
                    if(resp.status == 200) {
                        this.api_token = data.key
                        $cookies.set("apitoken", this.api_token)
                        toast('Login successful.', {
                            type: 'success'
                        });
                        this.$emit('authorized')
                    }
                    else if(resp.status == 400) {
                    toast('Incorrect username or password.', {
                        type: 'error'
                    });
                    }
                    else {
                    toast("Error code: "+resp.status, {
                        type: 'error'
                    });
                    }
                })
                .catch(error => console.log(error))
            )
        },
        register_submit() {
            fetch(import.meta.env.VITE_APP_API_URL+'/api/auth/registration/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: this.register_username,
                    password1: this.register_password1,
                    password2: this.register_password2,
                })
            })
            .then(resp => {
                    if(resp.status == 204) {
                        this.login_username = this.register_username
                        this.login_password = this.register_password1
                        this.login_submit()
                    }
                    else {
                        resp.json().then((data) => {
                            for (var key in data) {
                                toast(key.toUpperCase() +": "+data[key], {
                                type: 'error'
                                });
                            }
                        })
                    }
                })
                .catch(error => console.log(error))
        },
    }
}
</script>

<template>
    <div class="content-header row">
    </div>
    <div class="content-body">
        <section id="account-login" class="flexbox-container">    
            <div class="col-12 d-flex align-items-center justify-content-center">
                <!-- image -->
                <div class="col-xl-3 col-lg-4 col-md-5 col-sm-5 col-12 p-0 text-center d-none d-md-block">
                    <div class="border-grey border-lighten-3 m-0 box-shadow-0 card-account-left height-400">
                        <img src="/src/assets/app-assets/images/pages/account-login.png" class="card-account-img width-200" alt="card-account-img">
                    </div>
                </div>

                <!-- login form -->
                <div v-if="!register_form_trigger" class="col-xl-3 col-lg-4 col-md-5 col-sm-5 col-12 p-0">
                    <div class="card border-grey border-lighten-3 m-0 box-shadow-0 card-account-right height-400">                
                        <div class="card-content">                    
                            <div class="card-body p-3">
                                <p class="text-center h5 text-capitalize">Welcome to ScrapeAPI</p>
                                <p class="mb-3 text-center">Please enter your login details</p>
                                <form @submit.prevent="login_submit" class="form-horizontal form-signin">                            
                                    <fieldset class="form-label-group">
                                        <input v-model="login_username" type="text" class="form-control" id="user-name" placeholder="Your Username">
                                        <label for="user-name">Username</label>
                                    </fieldset>
                                    <fieldset class="form-label-group">
                                        <input v-model="login_password" type="password" class="form-control" id="user-password" placeholder="Enter Password">
                                        <label for="user-password">Password</label>
                                    </fieldset>
                                    <button type="submit" class="btn-gradient-primary btn-block my-2 mt-3">Sign In</button>
                                    <p class="text-center"><a href="#" @click="this.register_form_trigger = !this.register_form_trigger" class="card-link">Create account</a></p>
                                </form>
                            </div>                    
                        </div>
                    </div>
                </div> 

                <!-- Register form -->
                <div v-else class="col-xl-3 col-lg-4 col-md-5 col-sm-5 col-12 p-0">
                    <div class="card border-grey border-lighten-3 m-0 box-shadow-0 card-account-right height-400">                
                        <div class="card-content">                    
                            <div class="card-body p-3">
                                <p class="text-center h5 text-capitalize">Create new account</p>
                                <p class="mb-1 text-center">Please enter new account details</p>
                                <form @submit.prevent="register_submit" class="form-horizontal form-signin">                            
                                    <fieldset class="form-label-group">
                                        <input v-model="register_username" type="text" class="form-control" id="register-user-name" placeholder="Your Username">
                                        <label for="register-user-name">Username</label>
                                    </fieldset>
                                    <fieldset class="form-label-group">
                                        <input v-model="register_password1" type="password" class="form-control" id="register-user-password1" placeholder="Enter Password">
                                        <label for="register-user-password1">Password</label>
                                    </fieldset>
                                    <fieldset class="form-label-group">
                                        <input v-model="register_password2" type="password" class="form-control" id="register-user-password2" placeholder="Repeat Password">
                                        <label for="register-user-password2">Repeat password</label>
                                    </fieldset>
                                    <button type="submit" class="btn-gradient-primary btn-block my-2">Create account</button>
                                    <p class="text-center"><a href="#" @click="this.register_form_trigger = !this.register_form_trigger" class="card-link">Sign In</a></p>
                                </form>
                            </div>                    
                        </div>
                    </div>
                </div>
                       
            </div>    
        </section>
    </div>
</template>

<style scoped>
#account-login .card-account-left {
  background: -webkit-gradient(linear, left top, right top, from(#266db9), to(#153b71));
  background: -webkit-linear-gradient(left, #266db9, #153b71);
  background: -moz-linear-gradient(left, #266db9, #153b71);
  background: -o-linear-gradient(left, #266db9, #153b71);
  background: linear-gradient(90deg, #266db9, #153b71);
  border-radius: 5px 0 0 5px; }
  #account-login .card-account-left .card-account-img {
    position: relative;
    top: -webkit-calc(200px - 125px);
    top: -moz-calc(200px - 125px);
    top: calc(200px - 125px); }

#account-login .card-account-right {
  border-radius: 0 5px 5px 0; }

  #account-register .card-account-left {
  background: -webkit-gradient(linear, left top, right top, from(#266db9), to(#153b71));
  background: -webkit-linear-gradient(left, #266db9, #153b71);
  background: -moz-linear-gradient(left, #266db9, #153b71);
  background: -o-linear-gradient(left, #266db9, #153b71);
  background: linear-gradient(90deg, #266db9, #153b71);
  border-radius: 5px 0 0 5px; }
  #account-register .card-account-left .card-account-img {
    position: relative;
    top: -webkit-calc(200px - 125px);
    top: -moz-calc(200px - 125px);
    top: calc(200px - 125px); }

#account-register .card-account-right {
  border-radius: 0 5px 5px 0; }

</style>