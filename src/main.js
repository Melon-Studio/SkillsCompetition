import './assets/main.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import '@mdi/font/css/materialdesignicons.css'



import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueCookies from "vue-cookies"


// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { VBottomSheet } from 'vuetify/labs/VBottomSheet'

const vuetify = createVuetify({
  components,
  directives,
  VBottomSheet,
  theme: {
    defaultTheme: 'dark'
  },
  icons: {
    defaultSet: 'mdi',
  },
})

// MakeitCaptcha 
import MakeitCaptcha from 'makeit-captcha'
import 'makeit-captcha/dist/captcha.min.css'


createApp(App).use(vuetify).use(router).use(VueCookies).use(MakeitCaptcha).mount('#app')