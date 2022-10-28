import { store } from "@/store/index";
import { defaultConfig, plugin } from "@formkit/vue";
import { Buffer } from 'buffer';
import { createApp } from "vue";
import App from "./App.vue";
import "./assets/main.css";
import Landing from "./Landing.vue";
import router from "./router";

globalThis.Buffer = Buffer

//check for domain and change the APP.vue
const host = window.location.host;

const arr = host.split(".").slice(0, host.includes("localhost") ? -1 : -2);
if (arr.length > 0) {
  if (arr[0] === 'app'){
    const app = createApp(App)
    app.use(plugin, defaultConfig({ theme: 'genesis' }))
app.use(router);
app.use(store);

app.mount("#app");
  }

}else{
    const app = createApp(Landing);
    app.use(router);
    app.use(store);

    app.mount("#app");
}

