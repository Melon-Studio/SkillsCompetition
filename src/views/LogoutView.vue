<script>
import axios from 'axios'
import Global from '../AppGlobal.vue'
import cookies from 'vue-cookies'
import { useUserStore } from '@/stores/UserStore'
import { useRouter } from 'vue-router'

export default {
    setup() {
        const router = useRouter()
        axios.post(Global.WebAPI_URL + '/user/logout', {}, {
            headers: {
                'X-Token': cookies.get('Token')
            },
        }).then(
            () => {
                cookies.set('Token', null)
                const userStore = useUserStore()
                userStore.setLoginMode()
                router.push('/')
            }
        )
    }
}

</script>