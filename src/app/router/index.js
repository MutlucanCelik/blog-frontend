import { createRouter, createWebHistory } from 'vue-router'
import AdminLayout from "@/app/views/admin/layout/AdminLayout.vue";
import Dashboard from "@/app/views/admin/pages/Dashboard.vue";
import User from "@/app/views/admin/pages/User.vue";
import Category from "@/app/views/admin/pages/Category.vue";
import Article from "@/app/views/admin/pages/Article.vue";
import Setting from "@/app/views/admin/pages/Setting.vue";
import Login from "@/app/views/admin/pages/Login.vue";
import Notfound from "@/app/views/Notfound.vue";

const routes = [
    {
        path:"/admin/login",
        name: "Login",
        component:Login
    },
   {
    path: '/admin',
    name: 'AdminLayout',
    component: AdminLayout,
     children: [
       {
         path:"",
         name: "Dashboard",
         component: Dashboard
       },
       {
         path:"/admin/users",
         name: "User",
         component: User
       },
       {
         path:"/admin/categories",
         name: "Category",
         component: Category
       },
       {
          path:"/admin/articles",
          name: "Article",
          component: Article
       },
       {
          path:"/admin/settings",
          name: "Setting",
          component: Setting
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

export default router
