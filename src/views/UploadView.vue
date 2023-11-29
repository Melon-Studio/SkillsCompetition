<template>
  <main class="v-main" style="
      --v-layout-left: 0px;
      --v-layout-right: 0px;
      --v-layout-top: 64px;
      --v-layout-bottom: 0px;
    ">
    <div class="v-container v-locale--is-ltr">
      <div class="v-row">
        <div class="v-col-md-2 v-col-12 aoboutLeft">
          <div class="v-sheet rounded-lg" style="min-height: 268px; display: none;"></div>
        </div>
        <div class="v-col-md-8 v-col-12">
          <div class="v-sheet rounded-lg" style="display: flex; flex-direction: column;">
            <h2 class="title">上传</h2>
            <div class="uploadMain">
              <UploadFile @uploadSuccess="uploadSuccess" />
            </div>
            <p class="content">
              提示：请详细阅读<code @click="dialog = true" style="cursor: pointer;">作品上传规范</code>，避免页面无法显示。不必要的扣分等。作品上传成功
              后，请耐心等待系统处理作品，处理完成后，即可在首页查看。
            </p>
          </div>
        </div>
      </div>
    </div>
  </main>
  <v-row justify="center">
    <v-dialog v-model="dialog" width="800" persistent>
      <v-card>
        <v-card-title>
          <span class="text-h5">作品上传规范</span>
        </v-card-title>
        <v-card-text>
          <p>
            请上传<code>zip格式</code>的压缩包，压缩包大小为<code>20MB</code>以内，请严格按照<code>作品上传规范</code>上传作品，如果不按照规范上传作品，将会影响页面的正常显示。
          </p>
          <h3 id="作品上传规范">作品上传规范</h3>
          <p>请确保上传的作品符合以下基本规则：</p>
          <ul>
            <li>路径规范：作品引用的所有资源（ js、css、图片等）都要使用相对路径引用，禁止使用绝对路径引用；</li>
          </ul>
          <pre v-highlight>
	<code class="language-sh">正确示例：
./css/style.css

错误示例:
D:/New Folder/work/css/style.css
</code>
</pre>
          <ul>
            <li>
              <p>资源路径规范：作品资源应该存放在对应的资源路径中，为此请按照以下目录结构规则存放对应资源文件：</p>
            </li>
          </ul>
          <pre v-highlight>
	<code class="language-sh">work(根目录)
 |css
   |style.css
   |style1.css
   |style2.css
   |...
 |js
   |index.js
   |index1.js
   |index2.js
   |...
 |images
   |background.jpg
   |sidebar_bg.jpg
   |qq_icon.png
   |wechat_icon.png
   |...
 |fonts
   |fangsong.ttf
   |ruiyihei.ttf
   |...
 |index.html
 |favicon.ico</code>
</pre>
          <p>请确保资源名称对应如图规范的路径规范，css样式文件存放在作品根目录下的css文件夹中，js脚本文件、images图片文件、fonts字体文件同样遵循以上规则，如有其他文件请存放在other文件夹，引用时使用
            <code>./other/...</code>来引用。
          </p>
          <ul>
            <li>
              <p>命名规范：作品网页文件命名应该为：
                <code>index.html</code>，存放在作品根目录下，为网页首个展示的页面，其他页面也同样存放在根目录下，名称可任意填写，但确保index.html中跳转要存在该页面的相对路径。其他任何资源，例如图片等资源
                不可使用中文、拼音等命名。
              </p>
              <p>上传的作品中不论是文件名称还是网页中的
                <code>class</code>、
                <code>id</code>，js脚本中的
                <code>const</code>、
                <code>let</code>、
                <code>var</code>定义的变量名，都需要符合开发者规范，使用其定义含义的英文名称，不可使用拼音等来定义；
              </p>
            </li>
          </ul>
          

          <p>请务必遵守以上规范，以确保作品的质量。</p>


        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn variant="outlined" @click="closePopup">
            我知道了
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialog2" persistent width="auto">
      <v-card>
        <v-card-title>
          <span>如果你认真读了，我就不会显示了！(▼へ▼メ)</span>
        </v-card-title>
        <v-card-actions>
          <v-btn variant="text" @click="reRead">
            关闭
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog width="500" v-model="dialog3">
      <v-card title="设置作品名称">
        <v-card-text>
          请为你上传的作品设置一个名称，例如：爱购物网
        </v-card-text>
        <v-text-field style="margin: 25px;" label="作品名称" variant="outlined" name="workName" v-model="workName"></v-text-field>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            text="提交"
            @click="submitWork()"
          ></v-btn>
        </v-card-actions>
      </v-card>
  </v-dialog>
  </v-row>
</template>

<script setup>
import UploadFile from '../components/upload/UploadFile.vue'
import { ref } from 'vue'
import axios from 'axios'
import Global from '@/AppGlobal.vue'
import cookies from 'vue-cookies'
import { useMsgStore } from '@/stores/MsgStore'

const msg = useMsgStore()

const dialog = ref(true)
const dialog2 = ref(false)
const dialog3 = ref(false)

const workName = ref()

const uploadSuccess = () => {
  dialog3.value = true
}

const timer = ref(null)
const readTime = ref(false);

function openPopup() {
  timer.value = setTimeout(() => {
    readTime.value = true
  }, 10000)
}
openPopup()

function closePopup() {
  if (!readTime.value) {
    dialog2.value = true
  } else {
    dialog.value = false
  }
}

function reRead() {
  dialog2.value = false
  readTime.value = false
  timer.value = null
  openPopup()
}



function submitWork() {
  const formData = new FormData()
  formData.append('name', workName.value)
  axios.post(Global.WebAPI_URL + '/work/addWorkInfo?token=' + cookies.get('Token'), formData,).then(res => {
    if (res.data.code === 200) {
      msg.setMsg('提示', '作品名称已添加，请前往首页查看')
      dialog3.value = false
    } else {
      msg.setMsg('错误', '发生错误，请重试')
    }
  })
}

</script>

<style>
.uploadMain {
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
}

.title {
  margin-top: 20px;
  margin-left: 20px;
}

.content {
  margin-bottom: 20px;
  margin-left: 20px;
  margin-right: 20px;
}

code {
  font-family: '微软雅黑';
  background-color: #2e2e2e;
  color: #00AC54;
  border-radius: 5px;
  padding: 3px;
  margin-left: 3px;
  margin-right: 3px;
}

.v-card-title {
  font-weight: 1200;
}

h3 {
  margin-top: 15px;
  margin-bottom: 10px;
  font-weight: 800;
}

ul,
ol {
  margin: 18px;
}

.v-card {
  width: 100%;
  /* height: 100%; */
  /* border-radius: 10px; */
  /* border: 1px solid #000; */
}

.v-card__text {
  padding: 0px;
}
</style>