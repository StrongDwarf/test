import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/**
 * 测试路径
 * http://localhost:8080/customization.html#/
 */

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/analyze'
    },
    {
      path: '/customizaion',
      name: 'customizaion',
      component: () => import('@/entry/customization/views/Configuration.vue')
    },
    {
      path: '/analyze',
      name: 'analyze',
      component: () => import('@/entry/customization/views/FormEcharts.vue')
    },
    {
      path: '/entering',
      component: () => import('@/entry/customization/views/EnteringReceipt.vue')
    }
  ]
})