import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/dashboard",
      name: "",
      component: () => import("../views/DashboardView.vue"),
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/settings",
      name: "settings",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/SettingsView.vue"),
    },
    {
      path: "/contracts",
      name: "contracts",
      component: () => import("../views/ContractsView.vue"),
    },
    {
      path: '/contract/:id',
      name: 'ContractDetail',
      component: () => import("../views/ContractDetailView.vue")
    },
    {
      path: '/files',
      name: 'FilesView',
      component: () => import("../views/FilesView.vue")
    },
    {
      path: "/bounties",
      name: "Bounties",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/BountiesView.vue"),
    },
    {
      path: "/bounties/:address",
      name: "BountyDetails",
      component: () => import("../views/BountyDetailsView.vue")
    }, 
    {
      path: "/",
      name: "Airdrop", 
      component: () => import("../views/AirdropView.vue"),
    },
  ],
});

export default router;
