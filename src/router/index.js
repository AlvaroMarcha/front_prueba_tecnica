import { createRouter, createWebHistory } from "vue-router";
import login from "@/views/loginView.vue";
import panel from "@/views/panelView.vue";

const routes=[
    {path:"/", name:"loginView", component:login },
    {path:"/panel", name:"panelView", component:panel}
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;