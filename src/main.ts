import { store } from "@/store/index";
import { defaultConfig, plugin } from "@formkit/vue";
import { Buffer } from 'buffer';
import { createPinia } from "pinia";
import { createApp } from "vue";

import Toast from "vue-toastification";

import App from "@/App.vue";
import '@/assets/base.css';
import Landing from "@/Landing.vue";
import VueGtag from "vue-gtag";
import "vue-toastification/dist/index.css";
import router from "./router";
import approuter from "./router/approuter";

globalThis.Buffer = Buffer

// lets add the appolo instances

//check for domain and change the APP.vue
const host = window.location.host;

const arr = host.split(".").slice(0, host.includes("localhost") ? -1 : -2);

if (arr.length > 0) {
  if (arr[0] === 'app'){
    const app = createApp(App)
    app.use(plugin, defaultConfig({ theme: 'genesis' }))
    app.use(router);
    app.use(createPinia());
    app.use(VueGtag, {
      config: { 
        id: "GTM-WL5F7TP",
      },
    }, router)
    app.use(store); 
    

    //here we want the dark theme


    app.use(Toast,{
      transition: "Vue-Toastification__fade",
      maxToasts: 1,
      newestOnTop: true,
      });
    app.mount("#app");
  }else{

    //here we want the light theme. 

    const app = createApp(Landing);
    app.use(router);
    app.use(approuter);
    app.use(VueGtag, {
      config: { 
        id: "GTM-WL5F7TP",
      },
    }, router)

    app.mount("#app");
  }

}else{
    const app = createApp(Landing);
    app.use(approuter);
    app.use(store);
    app.use(VueGtag, {
      config: { id: "GTM-WL5F7TP", }
    })

    app.mount("#app");
}

