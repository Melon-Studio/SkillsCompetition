import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueCookies from "vue-cookies"
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
app.use(vuetify)
app.use(router)
app.use(VueCookies)
app.use(MakeitCaptcha)
app.mount('#app')

  