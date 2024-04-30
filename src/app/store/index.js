import { createStore } from 'vuex'
import  httpBase from "../utils/http/http.js"
import defaultImage from '@/assets/images/avatars/default_image.png';
import usersModule from './users/usersModule.js'
import categoriesModule from './categories/categoriesModule.js'
import articlesModule from './articles/articlesModule.js'
import settingsModule from './settings/settingsModule.js'
import {appLocalStorage} from '@/app/utils/storage/storage.js';

export default createStore({
  state: {
    sidebarVisible: '',
    sidebarUnfoldable: false,
    theme: 'light',
    user:null,
  },
  mutations: {
    toggleSidebar(state) {
      state.sidebarVisible = !state.sidebarVisible
    },
    toggleUnfoldable(state) {
      state.sidebarUnfoldable = !state.sidebarUnfoldable
    },
    updateSidebarVisible(state, payload) {
      state.sidebarVisible = payload.value
    },
    setAdmin(state,user){
      user.image ? user.image = import.meta.env.VITE_BASE_URL + user.image.slice(1) : user.image = defaultImage;
      state.user = user
    }
  },
  actions:{
    async getAdmin({commit},userId){
      const response = await httpBase.get(`admin/users/${userId}`);
      commit('setAdmin',response.data.user)
    }
  },
  getters:{
    isLogin(){
      return appLocalStorage.getItem('id')
    }
  },
  modules: {
    usersModule,
    categoriesModule,
    articlesModule,
    settingsModule
  }
})
