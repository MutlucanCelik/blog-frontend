import { createApp } from 'vue'
import App from '@/app/App.vue'
import router from '@/app/router'
import store from '@/app/store'
import CoreuiVue from '@coreui/vue'
import CIcon from '@coreui/icons-vue'
import { iconsSet as icons } from '@/assets/icons'
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'

const vuetify = createVuetify({
  components,
})

const app = createApp(App)
app.use(store)
app.use(vuetify)
app.use(router)
app.use(CoreuiVue)
app.provide('icons', icons)
app.component('CIcon', CIcon)


app.mount('#app')

