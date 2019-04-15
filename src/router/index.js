import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
 * 本系统主要完成一下四个功能，并依此来列出了菜单
日常教室表现考核
日常宿舍表现考核
奖惩信息统计
周期性综合考核
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/MoralSystem',
    name: 'MoralSystem',
    hidden: true,
    children: [{
      path: 'MoralSystem',
      component: () => import('@/views/MoralSystem/index')
    }]
  },

  {
    path: '/DailyStatus',
    component: Layout,
    redirect: '/DailyStatus/classroom',
    name: 'Example',
    meta: { title: '日常考核', icon: 'example' },
    children: [
      {
        path: 'classroom',
        name: 'Classroom',
        component: () => import('@/views/classroom/index'),
        meta: { title: '日常教室表现考核', icon: 'table' }
      },
      {
        path: 'dormitory',
        name: 'Dormitory',
        component: () => import('@/views/dormitory/index'),
        meta: { title: '日常宿舍表现考核', icon: 'table' }
      }
    ]
  },

  {
    path: '/period',
    component: Layout,
    redirect: '/period/menu1',
    name: 'Period',
    meta: {
      title: '周期性考核',
      icon: 'nested'
    },
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/period/menu1/index'), // Parent router-view
        name: 'Menu1',
        meta: { title: 'Menu1' },
        children: [
          {
            path: 'menu1-1',
            component: () => import('@/views/period/menu1/menu1-1'),
            name: 'Menu1-1',
            meta: { title: 'Menu1-1' }
          },
          {
            path: 'menu1-2',
            component: () => import('@/views/period/menu1/menu1-2'),
            name: 'Menu1-2',
            meta: { title: 'Menu1-2' },
            children: [
              {
                path: 'menu1-2-1',
                component: () => import('@/views/period/menu1/menu1-2/menu1-2-1'),
                name: 'Menu1-2-1',
                meta: { title: 'Menu1-2-1' }
              },
              {
                path: 'menu1-2-2',
                component: () => import('@/views/period/menu1/menu1-2/menu1-2-2'),
                name: 'Menu1-2-2',
                meta: { title: 'Menu1-2-2' }
              }
            ]
          },
          {
            path: 'menu1-3',
            component: () => import('@/views/period/menu1/menu1-3'),
            name: 'Menu1-3',
            meta: { title: 'Menu1-3' }
          }
        ]
      },
      {
        path: 'menu2',
        component: () => import('@/views/period/menu2/index'),
        meta: { title: 'menu2' }
      }
    ]
  },

  {
    path: '/reward',
    component: Layout,
    children: [
      {
        path: 'reward',
        name: 'Reward',
        component: () => import('@/views/reward/index'),
        meta: { title: '奖惩信息统计', icon: 'nested' }
      }
    ]
  },

  {
    path: 'contact',
    component: Layout,
    children: [
      {
        path: 'http://localhost:9528/#/MoralSystem',
        meta: { title: '联系我们', icon: 'link' }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
