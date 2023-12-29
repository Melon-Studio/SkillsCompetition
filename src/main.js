import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueCookies from "vue-cookies"
import { createPinia } from 'pinia'
import { zhHans } from 'vuetify/locale'


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
  locale: {
    locale: 'zhHans',
    messages: {zhHans}
  }
})


// 代码高亮
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css'

hljs.configure({
  ignoreUnescapedHTML: true
})


const app = createApp(App)
app.config.devtools = true
app.use(createPinia())
app.use(vuetify)
app.use(router)
app.use(VueCookies)
app.use(MakeitCaptcha)
app.directive('highlight', function (el) {
  let blocks = el.querySelectorAll('pre code')
  blocks.forEach((block) => {
    hljs.highlightBlock(block)
  });
})
app.mount('#app')

  