import type { RouteRecordRaw } from 'vue-router'

/**
 * 路由配置
 * @description 所有路由都在这里集中管理
 */
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/home',
    component: () => import('@/views/layout/index.vue'),
    children: [
      {
        path: 'home',
        name: 'home',
        component: () => import('@/views/home/index.vue'),
      },
      {
        path: 'my',
        name: 'my',
        component: () => import('@/views/my/index.vue'),
      },
      {
        path: 'friends',
        name: 'friends',
        component: () => import('@/views/friends/index.vue'),
      },
      {
        path: 'new',
        name: 'new',
        component: () => import('@/views/new/index.vue'),
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@views/auth/index.vue'),
  },
  {
    path: '/log',
    name: 'log',
    component: () => import('@views/auth/index.vue'),
  },
  /**
   * 子路由示例
   */
  // {
  //   path: '/foo',
  //   name: 'foo',
  //   component: () =>
  //     import(/* webpackChunkName: "foo" */ '@cp/TransferStation.vue'),
  //   meta: {
  //     title: 'Foo',
  //   },
  //   redirect: {
  //     name: 'bar',
  //   },
  //   children: [
  //     {
  //       path: 'bar',
  //       name: 'bar',
  //       component: () =>
  //         import(/* webpackChunkName: "bar" */ '@views/foo/bar.vue'),
  //       meta: {
  //         title: 'Bar',
  //       },
  //     },
  //   ],
  // },
]

export default routes
