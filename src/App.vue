<template>
  <div class="v-application v-layout v-layout--full-height v-locale--is-ltr" id="inspire" style="z-index: 1000">
    <div class="v-application__wrap v-theme--dark">
      <header class="v-toolbar v-toolbar--flat v-toolbar--density-default rounded-sm v-locale--is-ltr v-app-bar" style="
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
              <RouterLink to="/">首页</RouterLink>
              <RouterLink to="/about">关于</RouterLink>
            </div>
            <div class="flex-grow-1"></div>
            <div ref="right">
              <v-menu open-on-hover>
                <template v-slot:activator="{ props }">
                  <a v-bind="props" @click="navigateTo('/login')"> {{ user.getUsername }} </a>
                </template>

                <v-list v-if="user.getIsLogin" class="v-theme--dark">
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
        text="为了提供更好的体验，我们使用了 Cookie 技术，如：保持你的登录状态等，用于在你的设备上储存这些信息。这条弹窗是为你而设的，以便你了解我们使用 Cookie 的目的。">
        <v-card-actions>
          <v-btn variant="outlined" block @click="setCookieTrue()"> 我知道了 </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
  <div>
    <v-snackbar v-model="snackbar" vertical>
      <div class="text-subtitle-1 pb-2">通知</div>

      <p>{{ snackBarContent }}</p>

      <template v-slot:actions>
        <v-btn color="indigo" variant="text" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import IconLogo from './components/icons/IconLogo.vue'
import { RouterLink, RouterView } from 'vue-router'
import Global from './AppGlobal.vue'
import { useUserStore } from '@/stores/UserStore'

export default {
  data() {
    return {
      AppTitle: Global.WebAppTitle,
      AppDiscription: Global.WebAppDescription,
      dialogVisible: false,
      items: [
        { title: '个人中心', url: '/space/my' },
        { title: '退出登录', url: '/logout' }
      ],
      snackbar: false,
      snackBarContent: ''
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
      this.$cookies.set('isCookie', true, 60 * 60 * 24 * 10)
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
请访问 https://github.com/Melon-Studio/
    `);


    const user = useUserStore()
    user.setLoginMode()
    
    return {
      user
    }
  }
}
</script>


<style scoped>
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
</style>
