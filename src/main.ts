import { store } from "@/store/index";
import { defaultConfig, plugin } from "@formkit/vue";
import { Buffer } from 'buffer';
import { createApp } from "vue";
import App from "./App.vue";
import "./assets/main.css";
import router from "./router";
globalThis.Buffer = Buffer

const app = createApp(App);
app.use(plugin, defaultConfig({ theme: 'genesis' }))
app.use(router);
app.use(store);

app.mount("#app");
