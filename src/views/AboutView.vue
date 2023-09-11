<template>
<main
    class="v-main"
    style="
      --v-layout-left: 0px;
      --v-layout-right: 0px;
      --v-layout-top: 64px;
      --v-layout-bottom: 0px;
    "
  >
    <div class="v-container v-locale--is-ltr">
      <div class="v-row">
        <div class="v-col-md-2 v-col-12 aoboutLeft">
          <div class="v-sheet rounded-lg" style="min-height: 268px; display: none;"></div>
        </div>
        <div class="v-col-md-8 v-col-12">
          <div class="v-sheet rounded-lg" style="min-height: 70vh; height: auto;">
            <v-card 
            class="card-content v-theme--dark"
            title="关于本站" 
            >
          <p>
            本站点前端由 Vue.js 强力驱动，UI样式由 Vuetify 强力驱动，由 AbuLan 独立开发，源代码托管于 GitHub，
            点击图标可前往 GitHub 仓库查看。 <a href="#"><i class="bi bi-github"></i></a>
          </p>
          <p>
            欢迎各位同学下载源代码研究，如遇到任何问题，欢迎在 GitHub 仓库提交 Issue，或通过邮箱联系我。<a href="mailto:xiaofan6@foxmail.com">xiaofan6@foxmail.com</a>
          </p>
          <p>
            本程序前端技术栈有：
              Vue.js(Vue3)、Vuetify、Vuex、Axios、Vue-Router、Eslint、Prettier、vue-cookies
          </p>
          <p>
            本程序后端技术栈有：
              Node.js(Express)、.Net Core、MySQL
          </p>
          <p>
            本程序部署技术栈有：
              Linux、Nginx
          </p>
          <p>
            本程序使用开源协议：
              GPL-3.0
          </p>
          </v-card>
          </div>
        </div>
        <div class="v-col-md-2 v-col-12 aoboutRight">
          <div class="v-sheet rounded-lg" style="min-height: 268px; display: none;"></div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
const name = '关于'
export default {
data() {
  return {
    name
  }
}
}
</script>

<style>
.card-content p {
  padding: 0.625rem 1rem;
}
</style>
