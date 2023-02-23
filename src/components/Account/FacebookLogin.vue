<template>
  <div v-if="!loading">
    <button @click="logFB">Login</button>
    <div id="status">{{ status }}</div>
  </div>
</template>
<script lang="ts">
import "https://connect.facebook.net/en_US/sdk.js";

export default {
  name: "FacebookLogin",
  data(){
    return {
       status: "", 
       loading: true,
    }
  },
  methods: {
    async logFB() {
      await this.loadFacebookSDK(document, "script", "facebook-jssdk");
      await this.initFacebook();
      const globalThis = this;

      FB.login(function (response) {
        if (response.authResponse) {
          this.status = "Welcome! Fetching your information.... "
          FB.api("/me", function (response) {
            this.status = "Good to see you, " + response.name + ".";
          });
        } else {
          this.status = "User cancelled login or did not fully authorize.";
        }
      });
    },

    async checkLoginState() {
      // Called when a person is finished with the Login Button.
      FB.getLoginStatus(function (response) {
        // See the onlogin handler
        globalThis.statusChangeCallback(response);
      });
    },

    statusChangeCallback(response:any){
      // Called with the results from FB.getLoginStatus().
      console.log(response); // The current login status of the person.
      if (response.status === "connected") {
        // Logged into your webpage and Facebook.
        this.status = "Already connected..."
        testAPI();
      } else {
        // Not logged into your webpage or we are unable to tell.
        this.status ="Please log " + "into this webpage.";
      }
    },
    async initFacebook() {
      const appId = "955000518747597";
      window.fbAsyncInit = function () {
        window.FB.init({
          appId: appId,
          cookie: true,
          xfbml: true,
          version: "v16.0",
        });
        FB.AppEvents.logPageView();
      };
    },
    async loadFacebookSDK(d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    },
  },
  mounted() {
    
    this.loadFacebookSDK(document, "script", "facebook-jssdk");
    this.initFacebook();
    this.status = "Initialized facebook... please login to procceed!"
    const globalThis = this;
    this.loading = false;
  },
  
};
</script>
