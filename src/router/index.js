import Vue from "vue";
import VueRouter from "vue-router";
import Posts from "../views/Posts.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "posts",
    component: Posts,
  },

  {
    path: "/new-post",
    name: "new-post",
    component: () => import("../views/NewPost.vue"),
  },

  {
    path: "/posts/:id",
    name: "post-comments",
    component: () => import("../views/PostComments.vue"),
  },

  {
    path: "/view/:id", 
    name: "view-post",
    component: () => import("../views/ViewPost.vue"),
  },

  {
    path: "/update/:id", 
    name: "update-post",
    component: () => import("../views/UpdatePost.vue"),
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
