import { defineStore } from "pinia"
import cookies from 'vue-cookies'
import axios from 'axios'
import Global from '../AppGlobal.vue'

export const useUserStore = defineStore('user', {
    state: () => ({
        username: '登录',
        isLogin: false
    }),
    getters: {
        getUsername: (state) => state.username,
        getIsLogin: (state) => state.isLogin
    },
    actions: {
        setLoginMode() {
            if (cookies.get('Token') !== null) {
                axios.get(Global.WebAPI_URL + '/user/info?token=' + cookies.get('Token')).then(res => {
                    if (res.data.code === 200) {
                      const username = res.data.data.name
                      this.username = username
                      this.isLogin = true
                    } else if (res.data.code === 401) {
                      cookies.set('Token', null)
                      this.username = '登录'
                      this.isLogin = false
                    }
                  })
            }
        }
    }
})