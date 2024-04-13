import { createStore } from 'vuex'
import usersModule from './users/usersModule.js'
import categoriesModule from './categories/categoriesModule.js'
import articlesModule from './articles/articlesModule.js'
import settingsModele from './settings/settingsModule.js'

export default createStore({
  state: {
    sidebarVisible: '',
    sidebarUnfoldable: false,
    theme: 'light',
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
  },
  modules: {
    users: usersModule,
    categories: categoriesModule,
    articles: articlesModule,
    settings : settingsModele
  }
})
