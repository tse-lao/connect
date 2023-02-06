<template>
  <div>
    <Twitter />

    Let me see all your cookies and data.
    <button @click="readCookies">Read my cookies</button>
  </div>
</template>

<script lang="ts">
import Twitter from "./Twitter.vue";

export default {
  name: "CookiesView",
  data() {
    return {
      cookieData: [],
    };
  },
  methods: {
    async readCookies() {
      // The ID of the extension you want to check
      var extensionID = "ibieklgajbebghmkjhghbchodfoimkif";

      var navigator = window.navigator;
      console.log(navigator);
      console.log(window);
      // Get information about the extension
      let cookieStore= await window.cookieStore.getAllCookieStores()
       console.log(cookieStore);

      //atwindow.open("chrome-extension://ibieklgajbebghmkjhghbchodfoimkif")
    },
  },
  components: { Twitter },
};
</script>