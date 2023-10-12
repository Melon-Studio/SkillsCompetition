import axios from "axios"
import Global from "../AppGlobal.vue"

const api = axios.create({
    baseURL: Global.WebAPI_URL,
    timeout: Global.APITimeout,
})

export default api