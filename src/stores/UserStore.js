import { defineStore } from "pinia"
import cookies from 'vue-cookies'
import axios from 'axios'
import Global from '../AppGlobal.vue'
import { useMsgStore } from '@/stores/MsgStore'

export const useUserStore = defineStore('user', {
    state: () => ({
        username: '登录',
        isLogin: false,
        isAdmin: false
    }),
    getters: {
        getUsername: (state) => state.username,
        getIsLogin: (state) => state.isLogin,
        getIsAdmin: (state) => state.isAdmin
    },
    actions: {
        setLoginMode() {
            if (cookies.get('Token') !== null) {
                axios.get(Global.WebAPI_URL + '/user/info?token=' + cookies.get('Token'))
                    .then(res => {
                        if (res.data.code === 200) {
                            const username = res.data.data.name
                            this.username = username
                            this.isLogin = true
                            this.isAdmin = res.data.data.usertype === 2 ? true : false
                        } else if (res.data.code === 401) {
                            this.setClearMode()
                        } else {
                            this.setClearMode()
                            useMsgStore.setMsg(res.data.message)
                        }
                    })
                    .catch(() => {
                        console.error('远程服务器连接失败，请联系管理员')
                        const msg = useMsgStore()
                        msg.setMsg('错误','远程服务器连接失败')
                    })
            }
        },
        setClearMode() {
            cookies.set('Token', null)
            this.username = '登录'
            this.isLogin = false
            this.isAdmin = false
        }
    }
})