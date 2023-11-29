<template>
    <v-layout class="rounded rounded-md">
        <v-main class="d-flex align-center justify-center" style="min-height: 300px">
            <v-form @submit.prevent="submit">
                <v-card title="设置密码" subtitle=" " text="" variant="tonal" style="width: 413px; padding: 15px">
                    <v-card-actions class="justify-center" style="flex-direction: column">
                        <v-text-field clearable label="密码" name="password" type="password" variant="solo-filled"
                            style="width: 380px" v-model="password.value.value"
                            :error-messages="password.errorMessage.value" :counter="18"></v-text-field>
                        <v-text-field clearable label="邮箱" name="email" variant="solo-filled" type="email"
                            style="width: 380px" v-model="email.value.value" :error-messages="email.errorMessage.value"
                            :counter="35"></v-text-field>
                        <div class="capt">
                            <v-text-field clearable label="验证码" name="capt" type="number" variant="solo-filled"
                                style="width: 250px" v-model="capt.value.value" :error-messages="capt.errorMessage.value"
                                :counter="4"></v-text-field>
                            <v-btn @click="emailIsCorrect" variant="tonal" :disabled="captDisable"
                                style="width: 120px; margin-left: 10px; height: 56px;">{{ captStatus }}</v-btn>
                            <v-dialog v-model="dialog" persistent width="500">
                                <v-card>
                                    <v-card-title>
                                        <span class="text-h5">人机验证</span>
                                    </v-card-title>
                                    <v-card-text>
                                        <v-container>
                                            <div class="mi-captchas">
                                                <mi-captcha themeColor="#41B883" image="./assets/captcha.jpg"
                                                    logo="./assets/vclogo.svg" borderColor="#00000000" :boxShadow=false
                                                    :boxShadowBlur="0" bgColor="#444444" :width="420" :height="40"
                                                    :radius="4" modalBoxShadowColor="#000000" :modalBoxShadowBlur="0"
                                                    @success="handleSuccess" ref="captcha" />
                                            </div>
                                        </v-container>
                                    </v-card-text>
                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn color="blue-darken-1" variant="text" @click="dialog = false">
                                            关闭
                                        </v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>
                        </div>
                        <v-btn :loading="loadding" variant="tonal" style="width: 200px" @click="submit">{{ loginText
                        }}</v-btn>
                    </v-card-actions>
                </v-card>
            </v-form>
        </v-main>
    </v-layout>
</template>

<script setup>
import axios from 'axios'
import Global from '../AppGlobal.vue'
import { useField, useForm } from 'vee-validate'
import { ref } from 'vue'
import cookies from 'vue-cookies'
import { useRouter } from 'vue-router'
import { useMsgStore } from '@/stores/MsgStore'
const router = useRouter()

const msgControl = useMsgStore()

// 数据校验
const { handleSubmit } = useForm({
    validationSchema: {
        email(value) {
            if (/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(value)) return true

            return '请输入正确邮箱格式'
        },
        password(value) {
            if (/^(?=.*\d)(?=.*[a-z-A-Z]).{6,18}$/.test(value) || /^\d{6,6}$/.test(value)) return true
            return '字母和数字的组合，可以使用特殊字符，6-18位之间'
        },
        capt(value) {
            if (/^[0-9]{6}$/.test(value)) return true
            return '请输入正确的验证码格式'
        }
    },
})
const capt = useField('capt')
const email = useField('email')
const password = useField('password')
const captcha = ref(null)
const loadding = ref(false)
const loginText = ref('确定')
const captStatus = ref('发送')
const captDisable = ref(false)
const dialog = ref(false)
const captchaSuccess = ref(false)
let key = null
let chaEmail = null

const submit = handleSubmit(() => {
    // 人机验证
    if (captchaSuccess.value === false) {
        msgControl.setMsg('提示', '请验证邮箱')
        return
    }
    // 登录
    loadding.value = true
    axios.get(Global.WebAPI_URL + '/user/verifyEmail?token='+cookies.get('Token')+'&key='+key+'&captchaCode='+capt.value.value+'&password='+password.value.value+'&email='+ chaEmail)
        .then(res => {
            if (res.data.code === 200) {
                msgControl.setMsg('提示', '设置密码成功，请重新登录')
                router.push('/login')
                loadding.value = false
                captchaSuccess.value = false
            } else if (res.data.code === 405) {
                msgControl.setMsg('提示', '验证码错误，请重试')
                loadding.value = false
            } else {
                msgControl.setMsg('提示', '未知错误，请重试')
                captchaSuccess.value = false
                loadding.value = false
            }
        }).catch(() => {
            msgControl.setMsg('错误', '连接远程服务器失败')
            captchaSuccess.value = false
            loadding.value = false
        })
})

function emailIsCorrect() {
    if (/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(email.value.value)) {
        dialog.value = true
        return true
    } else {
        msgControl.setMsg('提示', '请检查邮箱格式')
    }
}

function handleSuccess() {
    captchaSuccess.value = true
    dialog.value = false
    let time = 60
    captDisable.value = true

    axios.get(Global.WebAPI_URL + '/user/sendVerifyCode?token='+cookies.get('Token')+'&email='+email.value.value)
        .then(res => {
            if (res.data.code === 200) {
                key = res.data.data.key
                msgControl.setMsg('提示', '验证码已发送，请注意查收')
                chaEmail = email.value.value
            } else if (res.data.code === 401) {
                msgControl.setMsg('提示', '非法操作，无权访问')
            } else if (res.data.code === 406) {
                msgControl.setMsg('提示', '当前邮箱已被其他账号绑定，请更换邮箱再试')
            } else {
                msgControl.setMsg('提示', '未知错误，请重试')
                captchaSuccess.value = false
            }
        }).catch(() => {
            msgControl.setMsg('错误', '连接远程服务器失败')
            captchaSuccess.value = false
        })

    const timer = setInterval(function () {
        captStatus.value = time + 's'
        if (time > 0) {
            time--
        }
        if (time === 0) {
            clearInterval(timer)
            captStatus.value = '重新发送'
            captchaSuccess.value = false
            captDisable.value = false
            time = 60
        }
    }, 1000)
}
</script>

<style>
.mi-captcha-radar-logo {
    display: none !important;
}

.mi-captcha-modal-copyright-text {
    display: none !important;
}

.mi-captcha-radar-dot {
    background: var(--mi-theme, #f6ca9d);
    -webkit-animation: 1s infinite mi-anim-wait;
    animation: 1s infinite mi-anim-wait;
    -webkit-transform: scale(0.5);
    -ms-transform: scale(0.5);
    transform: scale(0.5);
}

.agreement {
    margin-top: 0.6rem;
    margin-bottom: 2rem;
    color: hsla(160, 100%, 37%, 1);
}

.mi-captcha-modal-content {
    border: #121212 2px solid !important;
}

.mi-captcha-modal-arrow-in {
    border-color: transparent rgb(21, 21, 21) transparent transparent !important;
}

.mi-captcha-modal-arrow-out {
    border-color: transparent rgb(21, 21, 21) transparent transparent !important;
}

.mi-captcha-modal-slider-track-tip {
    user-select: none;
}

.mi-captcha-modal-result .mi-captcha-modal-result-error {
    user-select: none;
}

.mi-captcha-message-content {
    border: #121212 2px solid !important;
    background: #212121 !important;
    border-radius: 5px;
}

/* Chrome */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
}

/* FireFox */
input[type="number"] {
    -moz-appearance: textfield;
}

.v-checkbox .v-input__control {
    height: 35px;
}

.v-input {
    margin-bottom: 5px;
}

.capt {
    display: flex;
    flex-direction: row;
}
</style>