<!-- eslint-disable vue/no-v-text-v-html-on-component -->
<template>
  <header
    class="header v-toolbar v-app-bar v-toolbar v-toolbar--flat v-toolbar--density-default bg-grey-lighten-4 v-locale--is-ltr v-app-bar">

    <div class="logoSession" style="height: 72px;">
      <IconLogo class="logo" style="margin: 0; margin-left: 15px; margin-right: 10px;" /> {{ Global.WebAppTitle }}
      &nbsp;后台管理
    </div>

    <div style="margin-right: 30px;">
      <v-btn variant="outlined" prepend-icon="bi bi-house" color="#00BD7E" @click="router.push('/')">返回首页</v-btn>
    </div>
  </header>
  <nav class="v-navigation-drawer v-navigation-drawer--left v-navigation-drawer--floating v-navigation-drawer--active"
    style="left: 0px; z-index: 1004; transform: translateX(0%); position: fixed; height: calc(100vh - 72px); top: 72px; bottom: 44px; width: 256px;">

    <div class="v-navigation-drawer__content">
      <v-card class="mx-auto" width="256">
        <v-layout class="sitebar">
          <v-navigation-drawer permanent absolute>
            <v-list>
              <v-list-item prepend-avatar="https://z1.ax1x.com/2023/09/27/pPbZ1zV.png" :title="adminInfo.name"
                :subtitle="adminInfo.email">

              </v-list-item>
            </v-list>

            <v-divider></v-divider>

            <v-list :lines="false" density="compact" nav>
              <v-list-item v-for="(item, i) in items" :key="i" :value="item"
                :class="{ 'v-list-item--active': isActive(item.path) }" @click="handleClick(item.path)">
                <template v-slot:prepend>
                  <v-icon>
                    <i :class="item.icon"></i>
                  </v-icon>
                </template>

                <v-list-item-title v-text="item.text"></v-list-item-title>
              </v-list-item>
            </v-list>
          </v-navigation-drawer>

          <v-main style="height: 354px;"></v-main>
        </v-layout>
      </v-card>
    </div>
  </nav>
  <main class="v-main"
    style="--v-layout-left: 256px; --v-layout-right: 0px; --v-layout-top: 72px; --v-layout-bottom: 44px; height: calc(100vh - 72px);">
    <router-view />
  </main>
</template>

<script setup>
import { ref } from 'vue'
import Global from '@/AppGlobal.vue'
import IconLogo from '@/components/icons/IconLogo.vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import cookies from 'vue-cookies'
import { useMsgStore } from '@/stores/MsgStore'
const msg = useMsgStore()

const router = useRouter()

const items = [
  { text: '仪表盘', icon: 'bi bi-speedometer2', path: '/dashboard' },
  { text: '用户管理', icon: 'bi bi-person-lines-fill', path: '/users' },
  { text: '作品管理', icon: 'bi bi-book-half', path: '/works' },
  { text: '成绩管理', icon: 'bi bi-clipboard-data-fill', path: '/achievements'},
  { text: '系统设置', icon: 'bi bi-gear-wide-connected', path: '/settings' }
]

// 列表选中样式
const isActive = (path) => {
  return router.path === '/admin' + path;
}
// 跳转对应路由
const handleClick = (path) => {
  router.push('/admin' + path)
}

const adminInfo = ref('')

axios.get(Global.WebAPI_URL + '/user/info?token=' + cookies.get('Token'))
    .then(res => {
      if (res.data.code === 200) {
        adminInfo.value = res.data.data
      } else if (res.data.code === 401) {
        msg.setMsg('错误', '权限不足，拒绝访问')
        router.push('/login')
      } else {
        msg.setMsg('错误', '未知错误，请重试')
      }
    })
    .catch(() => {
      console.error('远程服务器连接失败，请联系管理员')
      msg.setMsg('错误', '远程服务器连接失败')
      router.push('/')
    })

</script>

<style>
.v-list-item-subtitle {
  line-height: 1.1rem;
}

.sitebar {
  height: calc(100vh - 72px);
}

.header {
  background-color: #212121 !important;
  color: #fff !important;
  z-index: 1008;
  transform: translateY(0%);
  position: fixed;
  left: 0px;
  width: calc((100% - 0px) - 0px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, .08);
  display: flex;
  flex-direction: row;
  align-items: center;
}

.logoSession {
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 72px;
  width: 100%;
  padding: 0 16px;
  box-sizing: border-box;
}

</style>