import { defaultConfig, plugin } from "@formkit/vue";
import { createApp } from "vue";
import App from "./App.vue";
import "./assets/main.css";
import router from "./router";

const app = createApp(App);
app.use(plugin, defaultConfig({ theme: 'genesis' }))
app.use(router);

app.mount("#app");
