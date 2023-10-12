import { defineStore } from "pinia"

export const useMsgStore = defineStore('msg', {
    state: () => ({
        title: '',
        msg: '',
        showSnackbar: false

    }),
    getters: {
        getTitle: (state) => state.title,
        getMsg: (state) => state.msg,
        getShowSnackbar: (state) => state.showSnackbar
    },
    actions: {
        setMsg(title, msg) {
            this.title = title
            this.msg = msg
            this.showSnackbar = true
            // 5s 后关闭 Snackbar
            setTimeout(() => {
                this.showSnackbar = false
            }, 5000)
        }
    }
})