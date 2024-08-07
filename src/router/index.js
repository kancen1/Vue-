import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
// 引入页面
import UserListView from '@/views/UserListView.vue'
import UserProfileView from '@/views/UserProfileView.vue'
import LoginView from '@/views/LoginView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import RegisterView from '@/views/RegisterView.vue'

const routes = [
  // 首页
  {
    path: '/myspace/',
    name: 'home',
    component: HomeView
  },
  // 用户列表
  {
    path: '/myspace/userlist/',
    name: 'userlist',
    component: UserListView
  },
  // 用户动态
  {
    // :表示后面是参数
    path: '/myspace/userprofile/:userId/',
    name: 'userprofile',
    component: UserProfileView
  },
  // 用户登入
  {
    path: '/myspace/login/',
    name: 'login',
    component: LoginView
  },
  // 用户注册
  {
    path: '/myspace/register/',
    name: 'register',
    component: RegisterView
  },
  // 404
  {
    path: '/myspace/404/',
    name: '404',
    component: NotFoundView
  },
  {
    // 正则表达式匹配上面没找到的 .是任意字符 *任意长度
    path: '/myspace/:catchAll(.*)',
    // 404就重定向到404
    redirect: '/myspace/404/',
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
