import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueCookies from "vue-cookies"
import Vuex from 'vuex'
import { createPinia } from 'pinia'


import './assets/main.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import '@mdi/font/css/materialdesignicons.css'


// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'


// MakeitCaptcha 
import MakeitCaptcha from 'makeit-captcha'
import 'makeit-captcha/dist/captcha.min.css'


// 创建 Vuex 实例
const store = new Vuex.Store({
  state: {
    isLoggedIn: false,
  },
  mutations: {
    setLoggedIn(state, value) {
      state.isLoggedIn = value;
    },
  },
});

// 创建 Vuetify 实例
const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'dark'
  },
  icons: {
    defaultSet: 'mdi',
  },
})


const app = createApp(App)
app.config.devtools = true
app.use(createPinia())
app.use(Vuex)
app.use(vuetify)
app.use(router)
app.use(VueCookies)
app.use(store)
app.use(MakeitCaptcha)
app.mount('#app')

  