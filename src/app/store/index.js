import { createStore } from 'vuex'
import defaultImage from '@/assets/images/avatars/default_image.png';
import usersModule from './users/usersModule.js'
import categoriesModule from './categories/categoriesModule.js'
import articlesModule from './articles/articlesModule.js'
import settingsModele from './settings/settingsModule.js'

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
    setUser(state,user){
      user.image ? user.image = import.meta.env.VITE_BASE_URL + user.image.slice(1) : user.image = defaultImage;
      state.user = user
    }
  },
  getters:{
    isLogin(state){
      return state.user !== null
    }
  },
  modules: {
    usersModule,
    categoriesModule,
    articlesModule,
    settingsModele
  }
})
