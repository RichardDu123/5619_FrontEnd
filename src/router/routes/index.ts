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
    path: '/addPost',
    name: 'addPost',
    component: () => import('@views/new/posts/index.vue'),
  },
  {
    path: '/addPet',
    name: 'addPet',
    component: () => import('@views/new/pets/index.vue'),
  },
  {
    path: '/pets/:type',
    name: 'pets',
    component: () => import('@views/pets/index.vue'),
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('@views/search/index.vue'),
  },
  {
    path: '/post/:postId',
    name: 'post',
    component: () => import('@/components/postPage.vue'),
  },
  {
    path: '/friendList',
    name: 'friendList',
    component: () => import('@views/friends/friendList/index.vue'),
  },
  {
    path: '/friendRequest',
    name: 'friendRequest',
    component: () => import('@views/friends/friendRequest/index.vue'),
  },
  {
    path: '/user/:userId',
    name: 'user',
    component: () => import('@/views/user/index.vue'),
  },
  {
    path: '/pet/:petId',
    name: 'pet',
    component: () => import('@/components/petPage.vue'),
  },
]

export default routes
