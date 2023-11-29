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
        pageName: '首页',
        isShow: true
      }
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
      meta: {
        pageName: '关于',
        isShow: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
      meta: {
        pageName: '登录',
        isShow: true
      }
    },
    {
      path: '/space',
      name: 'space',
      component: () => import('../views/SpaceView.vue'),
      meta: {
        pageName: '个人中心',
        isShow: true
      },
      children: [
        {
          path: 'workManagement',
          name: 'workManagement',
          component: () => import('../components/space/SpaceWork.vue'),
          meta: {
            pageName: '作品管理',
            isShow: true
          }
        },
        {
          path: 'account',
          name: 'account',
          component: () => import('../components/space/SpaceAccount.vue'),
          meta: {
            pageName: '账号安全',
            isShow: true
          }
        }
      ]
    },
    {
      path: '/initUser',
      name: 'initUser',
      component: () => import('../views/InitUserView.vue'),
      meta: {
        pageName: '设置密码',
        isShow: false
      }
    },
    {
      path: '/work/:orderId',
      name: 'work',
      meta: {
        pageName: '作品',
        isShow: true
      },
      component: () => import('../views/WorkView.vue'),
    },
    {
      path: '/:catchAll(.*)',
      name: '404',
      meta: {
        pageName: '404 页面丢失了',
        isShow: true
      },
      component: () => import('../views/404View.vue')
    },
    {
      path: '/upload',
      name: 'upload',
      meta: {
        pageName: '上传',
        isShow: true
      },
      component: () => import('../views/UploadView.vue')
    },
    {
      path: '/logout',
      name: 'logout',
      meta: {
        pageName: '退出登录',
        isShow: false
      },
      component: () => import('../views/LogoutView.vue')
    },
    {
      path: '/admin',
      name: 'admin',
      meta: {
        pageName: '后台管理',
        isShow: false
      },
      component: () => import('../views/admin/AdminView.vue'),
      children: [
        {
          path: 'dashboard',
          name: 'dashboard',
          component: () => import('../components/admin/AdminDashboard.vue'),
          meta: {
            pageName: '仪表盘',
            isShow: false
          },
        },
        {
          path: 'users',
          name: 'users',
          component: () => import('../components/admin/AdminUsers.vue'),
          meta: {
            pageName: '用户管理',
            isShow: false
          }
        },
        {
          path: 'works',
          name: 'works',
          component: () => import('../components/admin/AdminWork.vue'),
          meta: {
            pageName: '作品管理',
            isShow: false
          }
        },
        {
          path: 'achievements',
          name: 'achievements',
          component: () => import('../components/admin/AdminAchievements.vue'),
          meta: {
            pageName: '成绩管理',
            isShow: true
          }
        },
        {
          path: 'settings',
          name: 'settings',
          component: () => import('../components/admin/AdminSettings.vue'),
          meta: {
            pageName: '系统设置',
            isShow: false
          }
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.pageName + ' - ' + AppGlobal.WebAppTitle
  next()
})

export default router
