<template>
  <iframe ref="webFrame" class="workContent"></iframe>
  <div class="button_group">
    <v-btn icon="bi bi-vector-pen" @click="sheet = true" v-show="isShow"></v-btn>
  </div>
  <v-bottom-sheet v-model="sheet" inset>
    <v-card>
      <v-card-text class="text-right">
        <v-btn @click="openCodeDialog()" variant="outlined" style="margin-right: 10px;">
            查看源代码
          </v-btn>
          <v-btn @click="openStructureDialog()" variant="outlined" style="margin-right: 10px;">
            查看目录结构
          </v-btn>
        <v-btn @click="dialog = true" variant="outlined" style="margin-right: 10px;">
          评分细则
        </v-btn>
        <v-btn variant="text" @click="sheet = !sheet" icon="bi bi-x-circle"></v-btn>
      </v-card-text>

      <v-card width="auto" style="padding: 30px;">
        <p class="mar_p">内容</p>
        <v-slider v-model="slider0" thumb-label :min="0" :max="10"></v-slider>
        <p class="mar_p">结构</p>
        <v-slider v-model="slider1" thumb-label :min="0" :max="15"></v-slider>
        <p class="mar_p">页面规范</p>
        <v-slider v-model="slider2" thumb-label :min="0" :max="15"></v-slider>
        <p class="mar_p">层次</p>
        <v-slider v-model="slider3" thumb-label :min="0" :max="15"></v-slider>
        <p class="mar_p">额外内容</p>
        <v-slider v-model="slider4" thumb-label :min="0" :max="15"></v-slider>
        <p class="mar_p">主观评分</p>
        <v-slider v-model="slider5" thumb-label :min="0" :max="30"></v-slider>
        <v-card-text class="text-right">
          <span>总分：{{ formattedTotal }}</span>
          <v-btn variant="outlined" @click="submitScore(0)" style="margin-left: 10px;">提交评分</v-btn>
        </v-card-text>
        
      </v-card>

    </v-card>
  </v-bottom-sheet>

  <v-dialog v-model="dialog" width="700">
    <v-card title="评分细则">
      <v-card-text>
        <div>
          <p>本比赛评分采用综合评分法，总分为100分，具体规则如下：</p>
          <ul>
            <p>内容（10分）：</p>
            <li>内容健康、充实且积极向上，具有观赏性、普及性、艺术性、可读性，语言文字有特色；</li>
            <li>突出主题，全站点围绕一个主题及其周边内容进行建设；</li>
            <li>设计思路清晰，明确表达设计意图。</li>
            <p>结构（15分）：</p>
            <li>框架及表格结构清楚合理，页面内容清晰明了；</li>
            <li>布局新颖，有创意；</li>
            <li>文字清晰，背景恰当、美观，整体效果良好（字体大小、颜色搭配、动画等）。</li>
            <p>页面规范（15分）<span style="color: rgb(4, 219, 4);">请点击 目录结构 和 查看源代码 进行审阅</span>：</p>
            <li>文件命名规范，不使用拼音等；</li>
            <li>作品目录结构准确，明了，相应文件存放在相应目录；</li>
            <li>类名、ID名和变量名均有意义；</li>
            <li>资源文件不能使用中文、拼音等命名。</li>
            <p>层次（15分）：</p>
            <li>层次清楚、合理，各个页面返回逻辑合理；</li>
            <li>页面不少于3页；</li>
            <p>额外内容（15分）</p>
            <li>页面有动态轮播图、音乐、视频、动画交互等。</li>
            <p>主观评分（30分）：</p>
            <li>评委根据自己主观角度进行评分，评委需要对作品的不合理处、套作模板等情况进行判定扣分。</li>
          </ul>
        </div>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn text="关闭" @click="dialog = false"></v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <v-dialog v-model="dialog2" width="400">
    <v-card title="提示">
      <v-card-text>
        评分一旦提交将无法修改!
      </v-card-text>
      <v-card-actions>
        <v-checkbox label="不再提示" @click="showDialog()" v-model="showDia" class="dialog"></v-checkbox>
          <v-spacer></v-spacer>
        <v-btn text="返回" @click="dialog2 = false"></v-btn>
        <v-btn text="确定" @click="submitScore(1)"></v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <v-dialog v-model="dialog3" height="600">
    <div class="code-editor">
      <v-btn variant="outlined" @click="dialog3 = !sheet" icon="bi bi-x-circle" class="close_btn"></v-btn>
      <codemirror v-model:value="code" :options="options"/>
    </div>
  </v-dialog>

  <v-dialog v-model="dialog4" width="auto" >
      <v-card>
        <v-card-title>
          目录结构
        </v-card-title>
        <v-card-text>
          <pre>{{ folderStructure }}</pre>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="dialog4 = !dialog4">关闭</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import cookies from 'vue-cookies'
import axios from 'axios'
import Global from '../AppGlobal.vue'
import { useMsgStore } from '@/stores/MsgStore'
import Codemirror from 'codemirror-editor-vue3'

import 'codemirror/mode/htmlmixed/htmlmixed'
import 'codemirror/addon/display/autorefresh'
import 'codemirror/theme/dracula.css'

const msg = useMsgStore()
const route = useRoute()
const router = useRouter()
const sheet = ref(false)
const dialog = ref(false)
const dialog2 = ref(false)
const dialog3 = ref(false)
const dialog4 = ref(false)
const showDia = ref(false)
const isShow = ref(false)

const slider0 = ref(0)
const slider1 = ref(0)
const slider2 = ref(0)
const slider3 = ref(0)
const slider4 = ref(0)
const slider5 = ref(0)

const sliders = [slider0, slider1, slider2, slider3, slider4, slider5]

const code = ref('')
const options = ref({
  autorefresh: true,
  smartIndent: true,
  tabSize: 4,
  mode: 'htmlmixed',
  line: true,
  highlightDifferences: true,
  autofocus: false,
  indentUnit: 2,
  readOnly: true,
  showCursorWhenSelecting: true,
  firstLineNumber: 1,
  matchBrackets: true,
})

const folderStructure = ref('')

const openCodeDialog = () => {
  if (code.value === '') {
    axios.get(Global.WebAPI_URL + '/work/getWorkCode?token=' + cookies.get('Token') + '&sid=' + orderId).then(res => {
      console.log(res);
      if (res.data.code === 200) {
        code.value = res.data.data.html
        dialog3.value = true
      } else if (res.data.code === 421) {
        msg.setMsg('提示', '权限不足')
      }
    }).catch(() => {
      sheet.value = false
      dialog2.value = false
      msg.setMsg('错误', '未知错误，请联系管理员')
    })
  } else {
    dialog3.value = true
  }
}

const openStructureDialog = () => {
  if (folderStructure.value === '') {
    axios.get(Global.WebAPI_URL + '/work/getFolderHierarchy?token=' + cookies.get('Token') + '&sid=' + orderId).then(res => {
      console.log(res);
      if (res.data.code === 200) {
        folderStructure.value = res.data.data.structure
        dialog4.value = true
      } else if (res.data.code === 421) {
        msg.setMsg('提示', '权限不足')
      }
    }).catch(() => {
      sheet.value = false
      dialog2.value = false
      msg.setMsg('错误', '未知错误，请联系管理员')
    })
  } else {
    dialog4.value = true
  }
}

const total = computed(() => {
  return sliders.reduce((acc, slider) => acc + Number(slider.value), 0)
})

const formattedTotal = computed(() => {
  const value = total.value;
  if (value === 0) {
    return '00.00';
  } else {
    return value.toFixed(2);
  }
});

let orderId = route.params.orderId

onMounted(() => {
  const iframe = document.querySelector('.workContent')
  axios.get(Global.WebAPI_URL + '/work/' + orderId)
    .then(res => {
      if (res.data.code === 200) {
        iframe.src = res.data.data.path
      } else if (res.data.code === 404) {
        msg.setMsg('错误', '请求的页面不存在')
        router.push({ path: '/404' })
      }
    })
})

const showDialog = () => {
  
}

const submitScore = data => {
  if (data === 0 && cookies.get('scoreDialog') === null) {
    dialog2.value = true
    return
  }

  if (data === 1) {
    if (showDia.value) {
      cookies.set('scoreDialog', false, 60 * 60 * 24 * 9999)
    } else {
      cookies.remove('scoreDialog')
    }
  }

  axios.post(Global.WebAPI_URL + '/score/rate?token=' + cookies.get('Token') + '&score=' + formattedTotal.value + '&sid=' + orderId).then(res => {
    if (res.data.code === 200) {
      sheet.value = false
      dialog2.value = false
      msg.setMsg('提示', '评分成功')
    } else if (res.data.code === 421) {
      sheet.value = false
      dialog2.value = false
      msg.setMsg('提示', '已对该作品评过分，禁止重复评分')
    }
  }).catch(() => {
    sheet.value = false
    dialog2.value = false
    msg.setMsg('错误', '未知错误，请联系管理员')
  })
}

axios.get(Global.WebAPI_URL + '/user/info?token=' + cookies.get('Token'))
  .then(res => {
    if (res.data.code === 200) {
    if(res.data.data.usertype > 0) isShow.value = true
  }
})
</script>

<style>
.workContent {
  margin-top: 64px;
  widows: 100%;
  height: 100%;
  border: 0;
}

.button_group {
  position: fixed;
  bottom: 20px;
  right: 20px;
}

.mar_p {
  margin-left: 8px;
}

.dialog .v-input__details {
  display: none;
}

.code-editor {
  height: 600px;
  widows: 800px;
  border: 1px solid #ccc;
  position: relative;
}

.close_btn {
  position: absolute;
  top: 20px;
  right: 25px;
  z-index: 9999;
}
</style>