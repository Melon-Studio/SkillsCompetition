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
      children:[{
        path: ':page',
        component: () => import('../components/work/WorkLoader.vue'),
      }]
    }
  ]
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.pageName + ' - ' + AppGlobal.WebAppTitle;
  next();
})

export default router
