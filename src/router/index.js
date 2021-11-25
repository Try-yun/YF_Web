import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/register', component: () => import('@/views/login/register'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index')
    }]
  },
  // 用户管理
  {
    path: '/property',
    component: Layout,
    redirect: '/property/property',
    name: 'Property',
    meta: { title: '我的资产', icon: 'nested' },
    children: [
      {
        path: 'property',
        name: 'MyProperty',
        component: () => import('@/views/dashboard/index'),
        meta: { title: '我的详情', icon: 'nested' }
      },
      {
        path: 'detail',
        name: 'MyDetail',
        component: () => import('@/views/property/detail'),
        meta: { title: '用户修改', icon: 'nested' },
        hidden: true
      }
    ]
  },

  {
    path: '/bill',
    component: Layout,
    redirect: '/bill/detail',
    name: 'Bill',
    meta: { title: '我的账单', icon: 'example' },
    children: [
      {
        path: 'detail',
        name: 'MyDetail',
        component: () => import('@/views/bill/detail'),
        meta: { title: '账单详情', icon: 'table' }
      },
      {
        path: 'create',
        name: 'BillCreate',
        component: () => import('@/views/bill/form'),
        meta: { title: '添加账单记录' },
        hidden: true
      },
      {
        path: 'edit/:id',
        name: 'BillEdit',
        component: () => import('@/views/bill/form'),
        meta: { title: '编辑账单记录' },
        hidden: true
      },
      {
        path: 'import',
        name: 'BillImport',
        component: () => import('@/views/bill/import'),
        meta: { title: '导入账单记录', icon: 'tree' }
      },
      {
        path: 'statistics',
        name: 'MyStatistics',
        component: () => import('@/views/bill/statistics'),
        meta: { title: '账单统计', icon: 'tree' }
      }
    ]
  },

  {
    path: '/fund',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Fund',
        component: () => import('@/views/fund/index'),
        meta: { title: '基金', icon: 'form' }
      }
    ]
  },

  {
    path: '/stock',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Stock',
        component: () => import('@/views/stock/index'),
        meta: { title: '股票', icon: 'form' }
      }
    ]
  },

  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        // path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        path: 'http://www.yunq.xyz:8008/',
        meta: { title: '友情链接', icon: 'link' }
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
