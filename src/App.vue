<template>
  <div class="v-application v-layout v-layout--full-height v-locale--is-ltr" id="inspire" style="z-index: 1000">
    <div class="v-application__wrap v-theme--dark">
      <header v-show="$route.meta.isShow"
        class="v-toolbar v-toolbar--flat v-toolbar--density-default rounded-sm v-locale--is-ltr v-app-bar" style="
          top: 0px;
          z-index: 1006;
          transform: translateY(0%);
          position: fixed;
          left: 0px;
          width: calc((100% - 0px) - 0px);
        ">
        <div class="v-toolbar__content" style="height: 64px">
          <div class="v-container v-locale--is-ltr d-flex align-center py-0">
            <div class="v-toolbar-title pl-0 v-app-bar-title leftTitle">
              <div class="logoA">
                <RouterLink to="/">
                  <IconLogo class="logo" style="margin: 0; margin-right: 10px;" /> {{ AppTitle }}
                </RouterLink>
              </div>
              <RouterLink class="jump" to="/"><span>首页</span></RouterLink>
              <RouterLink class="jump" to="/about"><span>关于</span></RouterLink>
            </div>
            <div class="flex-grow-1"></div>
            <div ref="right">
              <v-menu open-on-hover class="header-right">
                <template v-slot:activator="{ props }">
                  <div class="header-right">
                    <div v-if="user.getIsAdmin">
                      <a class="right-item" @click="navigateTo('/admin/dashboard')" style="cursor: pointer;">
                        <i class="bi bi-box-fill"></i>
                        <span>管理后台</span>
                      </a>
                    </div>
                    <div v-if="!user.getIsLogin">
                      <a class="right-item" @click="navigateTo('/login')">
                        <i class="bi bi-door-open-fill"></i>
                        <span>登录</span>
                      </a>
                    </div>

                    <div v-if="user.getIsLogin">
                      <a class="right-item" v-bind="props" style="cursor: default;" :title="user.getUsername">
                        <i class="bi bi-person-circle"></i>
                        <span style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width: 60px;">{{ user.getUsername }}</span>
                      </a>
                    </div>

                    <v-btn prepend-icon="bi bi-upload" variant="tonal" color="#00BD7E" @click="navigateTo('/upload')">上传作品</v-btn>
                  </div>

                </template>

                <v-list class="v-theme--dark">
                  <v-list-item v-for="(item, index) in items" :key="index" :value="index" @click="navigateTo(item.url)">
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </div>
          </div>
        </div>
      </header>
      <RouterView />
    </div>
  </div>
  <div class="text-center" v-if="isCookiesFalse()">
    <v-dialog v-model="dialogVisible" persistent width="600">
      <v-card class="v-theme--dark" title="我们的网站正在使用 Cookie"
        text="为了提供更好的体验，我们使用了 Cookie 技术，如：保持你的登录状态等，用于在你的设备上储存这些信息。这条弹窗是为了告知你我们使用 Cookie 的规则，以便你了解我们使用 Cookie 的目的。">
        <v-card-actions>
          <v-btn variant="outlined" block @click="setCookieTrue()"> 我知道了 </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
  <div>
    <v-snackbar v-model="msgControl.getShowSnackbar" vertical>
      <div class="text-subtitle-1 pb-2">{{ msgControl.getTitle }}</div>
      <p>{{ msgControl.getMsg }}</p>
    </v-snackbar>
  </div>
</template>

<script>
import IconLogo from './components/icons/IconLogo.vue'
import { RouterLink, RouterView } from 'vue-router'
import Global from './AppGlobal.vue'
import { useUserStore } from '@/stores/UserStore'
import { useMsgStore } from '@/stores/MsgStore'

export default {
  data() {
    return {
      AppTitle: Global.WebAppTitle,
      AppDiscription: Global.WebAppDescription,
      dialogVisible: false,
      items: [
        { title: '个人中心', url: '/space/my' },
        { title: '退出登录', url: '/logout' }
      ]
    }
  },
  components: {
    IconLogo,
    RouterLink,
    RouterView
  },
  created() {
    document.querySelector('meta[name="description"]').setAttribute('content', this.AppDiscription)

    // TEST
  },
  methods: {
    // Cookie 弹窗逻辑
    isCookiesFalse() {
      if (this.$cookies.get('isCookie') === false || this.$cookies.get('isCookie') === null) {
        this.dialogVisible = true
        return true
      }
    },
    setCookieTrue() {
      this.$cookies.set('isCookie', true, 60 * 60 * 24 * 9999)
      this.dialogVisible = false
    },
    // 登录导航逻辑
    navigateTo(url) {
      this.$router.push(url)
    },
  },
  setup() {
    console.log(`

//   _____ _    _ _ _                                                                     
//  /  ___| |  (_) | |                                                                    
//  \\\\.--.| | ___| | |___                                                                 
//   .--. \\ |/ / | | / __|                                                                
//  /\\__/ /   <| | | \\__ \\                                                                
//  \\____/|_|\\_\\_|_|_|___/                                                                               
//   _____                            _   _ _   _             
//  /  __ \\                          | | (_) | (_)            
//  | /  \\/ ___  _ __ ___  _ __   ___| |_ _| |_ _  ___  _ __  
//  | |    / _ \\| '_ ' _ \\| '_ \\ / _ \\ __| | __| |/ _ \\| '_ \\ 
//  | \\__/\\ (_) | | | | | | |_) |  __/ |_| | |_| | (_) | | | |
//   \\____/\\___/|_| |_| |_| .__/ \\___|\\__|_|\\__|_|\\___/|_| |_|
//                        | |                                 
//                        |_|                                 

Skills Competition V2.1 启动！
恭喜你发现这个隐藏小彩蛋，想加入我们 Melon-Studio 参与更多有趣项目的开发吗？
请访问 https://github.com/Melon-Studio/ 带上你的想法并申请加入组织
    `);


    const user = useUserStore()
    const msgControl = useMsgStore()

    user.setLoginMode()


    return {
      user,
      msgControl
    }
  }
}
</script>


<style scoped>

@keyframes jump-score {
    0% {
        transform: translateY(0);
    }

    50% {
        transform: translateY(-3px);
    }

    100% {
        transform: translateY(0);
    }
}

.v-main {
  background-color: #121212;
}

header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}

.logo {
  margin-right: 10px;
}

.logoA a {
  display: flex;
  align-items: center;
  color: white;
  font-size: 18px !important;
  margin-right: 20px !important;
  font-weight: 600;
}

.logoA a:hover {
  background-color: rgb(var(--v-theme-surface)) !important;
}

.leftTitle {
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 14px !important;
}

.leftTitle a {
  margin-right: 10px;
}

a {
  padding: 5px;
  min-width: 38px;
}

a:hover {
  border-radius: 5px;
  padding: 5px;
}

.jump:hover {
  animation: jump-score .3s;
}

.header-right {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin-right: 10px;
  align-items: center;
}

.right-item {
  display: flex;
  align-items: center;
  flex-direction: column;
  flex-shrink: 0;
  margin-right: 5px;
  min-width: 50px;
  text-align: center;
  font-size: 13px;
  width:65px;
}

.right-item i {
  font-size: 16px;
  margin-bottom: -2px;
}

.right-item span {
  margin-top: -2px;
  cursor: pointer;
}

.right-item:hover i {
  animation: jump-score .3s;
  cursor: pointer;
}

</style>
