import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import AppGlobal from '../AppGlobal.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        pageName: '首页'
      }
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
      meta: {
        pageName: '关于'
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
      meta: {
        pageName: '登录'
      }
    },
    {
      path: '/space',
      name: 'space',
      component: () => import('../views/SpaceView.vue'),
      meta: {
        pageName: '个人中心'
      },
      children: [{
        path: 'my',
        name: 'my',
        component: () => import('../components/space/SpaceMy.vue'),
        meta: {
          pageName: '个人资料'
        }
      },
      {
        path: 'account',
        name: 'account',
        component: () => import('../components/space/SpaceAccount.vue'),
        meta: {
          pageName: '账号安全'
        }
      }]
    },
    {
      path: '/work',
      name: 'work',
      meta: {
        pageName: '作品'
      },
      component: () => import('../views/WorkView.vue'),
    },
    {
      path: '/:catchAll(.*)',
      name: '404',
      meta: {
        pageName: '404 页面丢失了'
      },
      component: () => import('../views/404View.vue')
    },
    {
      path: '/upload',
      name: 'upload',
      meta: {
        pageName: '上传'
      },
      component: () => import('../views/UploadView.vue')
    },
    {
      path: '/logout',
      name: 'logout',
      meta: {
        pageName: '退出登录'
      },
      component: () => import('../views/LogoutView.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.pageName + ' - ' + AppGlobal.WebAppTitle
  next()
})

export default router
