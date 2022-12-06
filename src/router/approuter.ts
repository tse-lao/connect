import { createRouter, createWebHistory } from "vue-router";

const approuter = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
        path: "/dashboard",
        name: "",
        component: () => import("../views/HomePage.vue"),
    }, 
    {
      path: "/",
      name: "",
      component: () => import("../views/HomePage.vue"),
    },
    {
      path: "/twitter",
      name: "twitter",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/Landing/Twitter.vue"),
    },
  ],
});

export default approuter;
