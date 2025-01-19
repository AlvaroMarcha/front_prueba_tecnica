import { createApp } from "vue";
import App from "./App.vue";

const app = createApp(App);

// Configuraciones globales de Vue 3
app.config.globalProperties.productionTip = false;

app.mount("#app");
