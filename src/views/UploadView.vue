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
              温馨提示：请详细阅读<code @click="dialog = true" style="cursor: pointer;">文件上传规范和作品规范</code>，避免页面无法显示，不必要的扣分等。作品上传成功
              后，请耐心等待系统基础评审，评审通过后，即可在首页查看。
            </p>
          </div>
        </div>
        <div class="v-col-md-2 v-col-12 aoboutRight">
          <div class="v-sheet rounded-lg" style="min-height: 268px; display: none;"></div>
        </div>
      </div>
    </div>
  </main>
  <v-row justify="center">
    <v-dialog v-model="dialog" width="800" persistent>
      <v-card>
        <v-card-title>
          <span class="text-h5">文件上传规范和作品规范</span>
        </v-card-title>
        <v-card-text>
          <p>
            请上传<code>zip格式</code>的压缩包，压缩包大小为<code>20MB</code>以内，请严格按照<code>作品上传规范</code>上传作品，作品规范是系统评定的基础得分项，如果不按照规范上传作品，将根据规范扣除部分基础得分。
          </p>
          <h3 id="作品上传规范">作品上传规范</h3>
          <p>本规则将通过系统路径规范检测，如果某些项的检测无法通过，将扣除一些分数，请知悉，请确保上传的作品符合以下基本规则：</p>
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
              <p>图片资源规范：作品引用的图片资源，单个图片的大小不得超过500kb，如果超过500kb请压缩后上传，或者上传到大型在线图床后使用链接引用（推荐）；</p>
            </li>
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
                <code>index.html</code>，存放在作品根目录下，为网页首个展示的页面，其他页面也同样存放在根目录下，名称可任意填写，但确保index.html中跳转要存在该页面的相对路径。
              </p>
              <p>上传的作品中不论是文件名称还是网页中的
                <code>class</code>、
                <code>id</code>，js脚本中的
                <code>const</code>、
                <code>let</code>、
                <code>var</code>定义的变量名，都需要符合开发者规范，使用其定义含义的英文名称，不可使用拼音等来定义；
              </p>
            </li>
            <li>
              <p>作品规范：为了比赛的公平性，上传的作品中不可出现自己的学号、班级、姓名等内容。</p>
            </li>
          </ul>
          <h3 class="main-heading">作品基础规范</h3>

          <p>本规则将通过系统html代码质量检测，如果某些项的检测无法通过，将扣除一些分数，请知悉，请确保上传的作品符合以下基本规则：</p>

          <ol>
            <li>
              所有HTML元素必须采用小写形式。
              <div>
                <pre v-highlight>
        <code class="language-html">
            &lt;!-- 正确示例 --&gt;
            &lt;div&gt;This is a div.&lt;/div&gt;
            &lt;!-- 错误示例 --&gt;
            &lt;Div&gt;This is not allowed.&lt;/Div&gt;
          </code>
          </pre>
              </div>
            </li>

            <li>
              必须关闭所有HTML元素。
              <div>
                <pre v-highlight>
        <code class="language-html">
            &lt;!-- 正确示例 --&gt;
            &lt;p&gt;This is a paragraph.&lt;/p&gt;
            &lt;!-- 错误示例 --&gt;
            &lt;p&gt;This is not allowed.
          </code>
        </pre>
              </div>
            </li>

            <li>
              必须关闭所有空的HTML元素。
              <div>
                <pre v-highlight>
        <code class="language-html">
            &lt;!-- 正确示例 --&gt;
            &lt;img src="image.jpg" alt="An example image"&gt;
            &lt;!-- 错误示例 --&gt;
            &lt;img src="image.jpg" alt="An example image"&gt;
          </code>
        </pre>
              </div>
            </li>

            <li>
              属性名必须使用小写字母。
              <div>
                <pre v-highlight>
        <code class="language-html">
            &lt;!-- 正确示例 --&gt;
            &lt;a href="https://www.example.com"&gt;Link&lt;/a&gt;
            &lt;!-- 错误示例 --&gt;
            &lt;a HREF="https://www.example.com"&gt;Link&lt;/a&gt;
        </code>
        </pre>
              </div>
            </li>

            <li>
              属性值必须使用引号括起来。
              <div>
                <pre v-highlight>
        <code class="language-html">
            &lt;!-- 正确示例 --&gt;
            &lt;input type="text" name="username"&gt;
            &lt;!-- 错误示例 --&gt;
            &lt;input type=text name=username&gt;
          </code>
        </pre>
              </div>
            </li>

            <li>
              图片必须包含 <code>alt</code> 属性，以提供对图像内容的描述。
              <div>
                <pre v-highlight>
        <code class="language-html">
            &lt;!-- 正确示例 --&gt;
            &lt;img src="image.jpg" alt="An example image"&gt;
            &lt;!-- 错误示例 --&gt;
            &lt;img src="image.jpg"&gt;
          </code>
        </pre>
              </div>
            </li>

            <li>
              在属性的等号前后不能添加空格。
              <div>
                <pre v-highlight>
        <code class="language-html">
            &lt;!-- 正确示例 --&gt;
            &lt;a href="https://www.example.com"&gt;Link&lt;/a&gt;
            &lt;!-- 错误示例 --&gt;
            &lt;a href = "https://www.example.com"&gt;Link&lt;/a&gt;
          </code>
        </pre>
              </div>
            </li>

            <li>
              避免使一行代码长度超过80个字符。
              <div>
                <pre v-highlight>
        <code class="language-html">
            &lt;!-- 正确示例 --&gt;
            &lt;p&gt;This is a long paragraph that should be wrapped.&lt;/p&gt;
            &lt;!-- 错误示例 --&gt;
            &lt;p&gt;This is a long paragraph that should not be wrapped and exceeds 80 characters.&lt;/p&gt;
          </code>
        </pre>
              </div>
            </li>

            <li>
              不得省略 <code>&lt;html&gt;</code> 和 <code>&lt;body&gt;</code> 标签。
              <div>
                <pre v-highlight>
        <code class="language-html">
            &lt;!-- 正确示例 --&gt;
            &lt;html&gt;
              &lt;body&gt;
              
              &lt;/body&gt;
            &lt;/html&gt;
            &lt;!-- 错误示例 --&gt;
            &lt;!-- 这里省略了html和body标签 --&gt;
          </code>
        </pre>
              </div>
            </li>

            <li>
              必须包含 <code>&lt;title&gt;</code> 元素，用于指定文档的标题。
              <div>
                <pre v-highlight>
        <code class="language-html">
            &lt;!-- 正确示例 --&gt;
            &lt;title&gt;Document Title&lt;/title&gt;
            &lt;!-- 错误示例 --&gt;
            &lt;head&gt;
              &lt;!-- 这里省略了title标签 --&gt;
            &lt;/head&gt;
          </code>
        </pre>
              </div>
            </li>

            <li>
              必须声明文档的编码格式。
              <div>
                <pre v-highlight>
        <code class="language-html">
            &lt;!-- 正确示例 --&gt;
            &lt;meta charset="UTF-8"&gt;
            &lt;!-- 错误示例 --&gt;
            &lt;meta&gt;
          </code>
        </pre>
              </div>
            </li>

            <li>
              在JavaScript脚本中，禁止使用 <code>var</code> 来声明变量。
              <div>
                <pre v-highlight>
        <code class="language-html">
            &lt;script&gt;
              // 正确示例
              let name = "John";
              const age = 30;
            &lt;/script&gt;
            &lt;script&gt;
              // 错误示例
              var name = "John";
            &lt;/script&gt;
          </code>
        </pre>
              </div>
            </li>

            <li>
              引用图片及其他外部资源时，必须使用小写字母命名文件。
              <div>
                <pre v-highlight>
          <code class="language-css">
            // 正确示例
            background-image: url('background.jpg');
            // 错误示例
            background-image: url('Background.JPG');
          </code>
        </pre>
              </div>
            </li>
          </ol>

          <p>请务必遵守以上规范，以确保作品的质量和一致性。</p>


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
  </v-row>
</template>

<script setup>
import UploadFile from '../components/upload/UploadFile.vue'
import { ref } from 'vue'

const dialog = ref(true)
const dialog2 = ref(false)

const uploadSuccess = (data) => {
  console.log(data)
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