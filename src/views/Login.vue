<template>
  <div class="container-login">
    <img src="/km-dash/assets/images/Group 244@2x.png" id="side-image" class="image-login" alt="...">
    <div class="form-login">
      <div class="w-100 text-center">
        <img src="/km-dash/assets/images/Group 245.png" class="img-login-logo">
        <div>
          <span class="login-subject d-block">
            Welcome back! Please login to your account.
          </span>
          <form class="mt-4">
            <div class="floating-group mt-5">
              <label for="email" class="floating-label">Email</label>
              <input v-model="email" type="email" id="email" autocomplete="off">
            </div>
            <div class="floating-group mt-4">
              <label for="password" class="floating-label">Password</label>
              <input v-model="password" type="password" id="password">
            </div>
            <div class="mt-4">
              <button @click.prevent="auth()" type="submit" class="button">Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import JQuery from "jquery";
  var $ = JQuery;
  export default {
    beforeCreate: async function() {
      if(typeof await this.$store.dispatch("getCookie") !== "undefined" && await this.$store.dispatch("getCookie") === "admin@kumpulmodal.com") {
        this.$router.push({ path: "/dashboard" });
      }
    },
    data: function() {
      return {
        email: "",
        password: ""
      }
    },
    methods: {
      auth: async function() {
        const Toast = this.$swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          onOpen: (toast) => {
            toast.addEventListener('mouseenter', this.$swal.stopTimer)
            toast.addEventListener('mouseleave', this.$swal.resumeTimer)
          }
        });
        if(this.email.length === 0) {
          Toast.fire({ 
            type: "error", title: "Email tidak valid" 
          });
        } else if(this.password.length === 0) {
          Toast.fire({ 
            type: "error", title: "Password tidak valid!" 
          });
        } else {
          if(this.email !== "admin@kumpulmodal.com") {
            Toast.fire({ 
              type: "error", title: "Email tidak valid" 
            });
          } else if(this.password !== "kumpulmodal") {
            Toast.fire({ 
              type: "error", title: "Password tidak valid!" 
            });
          } else {
            Toast.fire({ 
              type: "success", title: "Login Berhasil" 
            });
            await this.$store.dispatch("setCookie", this.email);
            setTimeout(() => {
              this.$router.push({ path: '/dashboard' })
            }, 2000);
          }
        }
      }
    },
    mounted: function() {
      this.$nextTick(function() {
        $(document).ready(function() {
          $('#side-image').css('height', $(window).height());
          $('#email').val().toString().length > 0 ? $("label[for='email']").addClass('on') : $("label[for='email']").removeClass('on');
          $('#password').val().toString().length > 0 ? $("label[for='password']").addClass('on') : $("label[for='email']").removeClass('on');
          $('#email').focus(function() {
            $("label[for='email']").addClass('on');
            $('#email').blur(function() {
              if($('#email').val().toString().length > 0) {
                return false;
              } else {
                $("label[for='email']").removeClass('on');
              }
            })
          });
          $('#password').focus(function() {
            $("label[for='password']").addClass('on');
            $('#password').blur(function() {
              if($('#password').val().toString().length > 0) {
                return true;
              } else {
                $("label[for='password']").removeClass('on');
              }
            })
          });
        });
      })
    }
  }
</script>
<style>

</style>