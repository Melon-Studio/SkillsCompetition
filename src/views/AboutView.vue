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
              Skills Competition 是为技能大赛选手作品提交而设计并编写的系统，本系统使用前后端分离模式进行设计开发，
              最初第一版系统没有采用前后端分离，没有后台管理功能，仅作为选手作品提交系统使用，后来为了方便管理，增加了
              后台管理功能，并将其前后端分离，以方便以后扩展其他功能。
            </p>
          <p>
            本站点前端由 Vue.js 强力驱动，UI样式由 Vuetify 强力驱动，由 AbuLan 独立开发，源代码托管于 GitHub，
            点击图标可前往 GitHub 仓库查看。 
            <a href="https://github.com/Melon-Studio/SkillsCompetition" target="_blank">
              <i class="bi bi-github"></i></a>
          </p>
          <p>
            欢迎各位同学下载源代码研究，如遇到任何问题，欢迎在 GitHub 仓库提交 Issue，或通过邮箱联系我。
            xiaofan6@foxmail.com
          </p>
          <p>
            本程序前端使用到的技术栈有：
              Vue.js(Vue3)、Vuetify、Piano、Axios、Vue-Router、Eslint、Prettier、vue-cookies
          </p>
          <p>
            本程序后端使用到的技术栈有：
              SpringBoot、MySQL、Redis
          </p>
          <p>
            SpringBoot 依赖：基础Web框架、默认测试依赖、MySQL-Connector、MyBaitis-plus、Freemarker、Lombok、
            Redis、JWT、FastJson2
          </p>
          <p>
            本程序部署技术栈有：
              Linux、Nginx、Tomcat
          </p>
          <p>
            开发工具：Visual Studio Code(前端开发)、IntelliJ IDEA(后端开发)、GitHub Desktop(推送本地代码)、
            GitHub(远代码托管平台)、ApiPost(API测试)、Navicat Premium(数据库管理)、RedisInsiht-V2(Redis管理)
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
export default {
data() {
  return {
    
  }
}
}
</script>

<style>
.card-content p {
  padding: 0.625rem 1rem;
}
</style>
