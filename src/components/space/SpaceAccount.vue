<template>
    <div class="container">
        <h2><i class="bi bi-shield-shaded i"></i>账号安全</h2>
        <v-form class="form">
            <p class="label">修改密码</p>
            <v-text-field clearable label="旧密码" variant="solo-filled" v-model="oldPassword"></v-text-field>
            <v-text-field clearable label="新密码" variant="solo-filled" v-model="newPassword"></v-text-field>
            <v-btn block variant="tonal" @click="sendVerify()">提交</v-btn>
        </v-form>
    </div>
    <v-dialog width="500" v-model="dialog" persistent>
        <v-card title="验证邮箱">
            <v-card-text>
                <div style="display: flex; flex-direction: row;">
                    <v-text-field clearable label="验证码" name="capt" type="number" variant="solo-filled" style="width: 250px"
                        :counter="6" v-model="code"></v-text-field>
                    <v-btn @click="emailIsCorrect" variant="tonal" :disabled="captDisable"
                        style="width: 120px; margin-left: 10px; height: 56px;">{{ captStatus }}</v-btn>
                </div>

                <div class="mi-captchas">
                    <mi-captcha themeColor="#41B883" image="../../assets/captcha.jpg" logo="../../assets/vclogo.svg"
                        borderColor="#00000000" :boxShadow=false :boxShadowBlur="0" bgColor="#444444" :width="452"
                        :height="40" :radius="4" modalBoxShadowColor="#000000" :modalBoxShadowBlur="0"
                        @success="handleSuccess" ref="captcha" />
                </div>
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn variant="outlined" text="关闭" @click="dialog = false"></v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import Global from '../../AppGlobal.vue'
import cookies from 'vue-cookies'
import { useMsgStore } from '@/stores/MsgStore'

const msg = useMsgStore()

const dialog = ref(false)
const captchaSuccess = ref(false)
const captStatus = ref('发送验证码')
const oldPassword = ref()
const newPassword = ref()
const captDisable = ref(false)
const code = ref()

function handleSuccess() {
    captchaSuccess.value = true
}

let isVerify = false
const key = ref()
const sendVerify = () => {
    if (!isVerify) {
        dialog.value = true
        return
    }

    axios.post(Global.WebAPI_URL + '/user/changePassword?token=' + cookies.get('Token') + '&oldPassword=' + oldPassword.value + '&newPassword=' + newPassword.value + '&captchaCode=' + code.value + '&key=' + key.value)
        .then(res => {
            if (res.data.code === 200) {
                msg.setMsg('提示', '密码修改成功')
                cookies.remove('Token')
                window.location.reload()
            } else if (res.data.code === 424) {
                msg.setMsg('提示', '旧密码错误，请重试')
            } else if (res.data.code === 401) {
                msg.setMsg('错误', '非法操作，没有权限')
            }
        })

}

const emailIsCorrect = () => {
    if (captchaSuccess.value === false) {
        msg.setMsg('提示', '请完成滑块验证后再试')
        return
    }
    let time = 60
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
    axios.get(Global.WebAPI_URL + '/user/sendVerifyCodes?token=' + cookies.get('Token'))
        .then(res => {
            if (res.data.code === 200) {
                msg.setMsg('提示', '发送成功，请注意查收')
                key.value = res.data.data.key
                isVerify = true
            } else if (res.data.code === 401) {
                msg.setMsg('错误', '非法操作，权限不足')
            }
        }).catch(() => {
            msg.setMsg('错误', '未知错误，请联系管理员')
        })
}

</script>

<style>
h2 {
    margin-bottom: 15px;
}

.container {
    padding: 0.625rem 1rem;
}

.label {
    margin-bottom: 10px;
}

.i {
    margin-right: 5px;
}

.v-text-field {
    margin-bottom: 10px;
}

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
</style>