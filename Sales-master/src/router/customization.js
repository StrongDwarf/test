import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/customizaion'
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
    }
  ]
})
