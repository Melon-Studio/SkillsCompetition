<template>
  <v-layout class="rounded rounded-md">
    <v-main class="d-flex align-center justify-center" style="min-height: 300px">
      <v-form @submit.prevent="submit">
        <v-card title="登录" subtitle=" " text="" variant="tonal" style="width: 413px; padding: 15px">
          <v-card-actions class="justify-center" style="flex-direction: column">
            <v-text-field clearable label="学号" name="sid" variant="solo-filled" type="number" style="width: 380px"
              v-model="sid.value.value" :error-messages="sid.errorMessage.value" :counter="10"></v-text-field>

            <v-text-field clearable label="密码" name="password" type="password" variant="solo-filled" style="width: 380px"
              v-model="password.value.value" :error-messages="password.errorMessage.value" :counter="18"></v-text-field>

            <div class="mi-captchas">
              <mi-captcha themeColor="#41B883" image="./assets/captcha.jpg" logo="./assets/vclogo.svg"
                borderColor="#00000000" :boxShadow=false :boxShadowBlur="0" bgColor="#444444" :width="380" :height="40"
                :radius="4" modalBoxShadowColor="#000000" :modalBoxShadowBlur="0" @success="handleSuccess" ref="captcha" />
            </div>

            <div style="display: flex; flex-direction: row;height: 40px; margin-bottom: 40px;">

              <v-checkbox label="我同意" v-model="check.value.value" :error-messages="check.errorMessage.value" value="1"
                type="checkbox"></v-checkbox>

              <div class="text-center agreement">
                <v-dialog v-model="dialog" activator="parent" persistent width="auto">
                  <template v-slot:activator="{ props }">
                    <v-btn variant="plain" v-bind="props">《用户协议与隐私政策》</v-btn>
                  </template>
                  <v-card style="width: 600px">
                    <v-card-text>
                      <h2>用户协议与隐私政策</h2>
                      <p></p>
                      <p>
                        如果你使用本网站，将默认同意《用户协议与隐私政策》，本网站无权将你的个人隐私信息分享至第三方；
                        本网站储存的密码会经过加密后储存，管理员将无权登录你的个人账号；本网站提供的服务免费，本网站无义务
                        对你上传的网页进行备份，如果丢失，本网站概不负任何责任；本网站有权审查你的网页内容，如果出现违反《
                        中华人民共和国宪法》及其他法律法规和地方性法律法规，本网站将有权在不进行通知的情况下删除你上传的
                        网页。如有不完善，将在修改时通过邮箱或者网页醒目处提醒。
                      </p>
                      <p></p>
                      <p>
                        为了提供更好的体验，我们使用了 Cookie
                        技术，如：保持你的登录状态等，用于在你的设备上储存这些信息。
                        以便你了解我们使用 Cookie 的目的。本网站不会使用 Cookie
                        技术来存储用户的使用记录，只会储存用户登 录凭证和一些不涉及隐私的信息。
                      </p>
                      <p></p>
                      <p>
                        注销账号：如果你想注销本网站的你的个人账号，请联系管理员，联系方式请访问“关于”页面。
                      </p>
                      <p></p>
                      <p>网站管理员</p>
                      <p>2023.9.10</p>
                    </v-card-text>
                    <v-card-actions>
                      <v-btn variant="tonal" block @click="dialog = false">我了解</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </div>
            </div>
            <v-btn :loading="loadding" variant="tonal" style="width: 200px" @click="submit"><i
                class="bi bi-door-closed-fill"></i>{{ loginText }}</v-btn>
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
import { ref } from 'vue';
import cookies from 'vue-cookies'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/UserStore'
import { useMsgStore } from '@/stores/MsgStore'
const router = useRouter()

const msgControl = useMsgStore()

// 数据校验
const { handleSubmit, handleReset } = useForm({
  validationSchema: {
    sid(value) {
      if (/^\d{10,10}$/.test(value)) return true

      return '学号必须是10位数字'
    },
    password(value) {
      if (/^(?=.*\d)(?=.*[a-z-A-Z]).{6,18}$/.test(value) || /^\d{6,6}$/.test(value)) return true
      return '字母和数字的组合，可以使用特殊字符，6-18位之间'
    },
    check(value) {
      if (value === '1') return true
      return '必须同意'
    },
  },
})
const sid = useField('sid')
const password = useField('password')
const check = useField('check')
const dialog = ref(false)
const captcha = ref(null)
const loadding = ref(false)
const loginText = ref('登录')

const submit = handleSubmit(values => {
  // 人机验证
  if (captchaSuccess.value === false) {
    msgControl.setMsg('提示', '请完成人机验证')
    return
  }
  const postData = {
    sid: values.sid,
    password: values.password
  }
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  const userStore = useUserStore()
  // 登录
  loadding.value = true
  axios.post(Global.WebAPI_URL + '/user/login', postData, config)
    .then(res => {
      if (res.data.code === 200) {
        const token = res.data.data.token
        cookies.set('Token', token, 60 * 60 * 24 * 10)
        userStore.setLoginMode()
        loadding.value = false
        loginText.value = '登录成功'
        if (res.data.data.needInitUser === true) {
          setTimeout(() => {
            router.push('/initUser')
          }, 2000)
        } else {
          setTimeout(() => {
            router.push('/')
          }, 2000)
        }
      } else if (res.data.code === 400) {
        msgControl.setMsg('提示', '学号或密码错误，请重新输入')
        handleReset()
        captcha.value.reset(false)
        captchaSuccess.value = false
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

const captchaSuccess = ref(false)

function handleSuccess() {
  captchaSuccess.value = true
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
</style>