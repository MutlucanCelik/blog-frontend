import { createRouter, createWebHistory } from 'vue-router'
import store from '../store';

import FrontLayout from "@/app/views/front/layout/FrontLayout.vue";
import Home from "@/app/views/front/pages/Home.vue";

import AdminLayout from "@/app/views/admin/layout/AdminLayout.vue";
import Dashboard from "@/app/views/admin/pages/Dashboard.vue";
import User from "@/app/views/admin/pages/User.vue";
import Category from "@/app/views/admin/pages/Category.vue";
import Article from "@/app/views/admin/pages/article/Article.vue";
import ArticleDetail from "@/app/views/admin/pages/article/ArticleDetail.vue";
import Setting from "@/app/views/admin/pages/Setting.vue";
import Login from "@/app/views/admin/pages/Login.vue";
import Notfound from "@/app/views/Notfound.vue";
import { computed } from 'vue';


const routes = [
  {
      path:"/admin/login",
      name: "Login",
      component:Login
  },
  {
    path:'',
    name:"FrontLayout",
    component:FrontLayout,
    children:[
      {
        path:'',
        name: "Home",
        component:Home
      }
    ]
  },
   {
    path: '/admin',
    name: 'AdminLayout',
    component: AdminLayout,
    meta: {
      requiresAuth: true
    },
     children: [
       {
         path:"",
         name: "Dashboard",
         component: Dashboard,
       },
       {
         path:"users",
         name: "User",
         component: User,
       },
       {
         path:"categories",
         name: "Category",
         component: Category,
       },
       {
          path:"articles",
          name: "Article",
          component: Article,
       },
       {
        path:"article-detail/:articleId",
        name: "ArticleDetail",
        component: ArticleDetail,
        props: true
       },
       {
          path:"settings",
          name: "Setting",
          component: Setting,
       },
     ]
   },
   {
    path:'/:catchAll(.*)',
    name:'Notfound',
    component:Notfound
   }
  
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  let requiresAuth = to.matched.some((x) => x.meta.requiresAuth);
  let isLogin = computed(() =>store.getters.isLogin);

  if (requiresAuth && !isLogin) {
    next({ name: "Login" });
  }else {
    next();
  }
});

export default router
