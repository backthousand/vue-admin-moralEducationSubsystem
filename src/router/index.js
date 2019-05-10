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
    name: 'Period',
    meta: {
      title: '周期性考核',
      icon: 'nested'
    },
    children: [
      {
        path: 'education',
        component: () => import('@/views/period/education/index'), // Parent router-view
        name: 'Education',
        meta: { title: '本学期德育情况', icon: 'example' }
      },
      {
        path: 'honor',
        name: 'Honor',
        component: () => import('@/views/period/honor/index'),
        meta: { title: '荣誉统计', icon: 'example' }
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
    path: '/user',
    component: Layout,
    redirect: '/user/index',
    name: 'user',
    children: [
      {
        path: 'user',
        name: 'User',
        component: () => import('@/views/user/index'),
        meta: { title: '用户管理', icon: 'nested' }
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
