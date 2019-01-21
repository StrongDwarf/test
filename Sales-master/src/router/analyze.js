import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/analyze'
    },
    {
      path: '/analyze',
      name: 'analyze',
      component: () => import('@/entry/customization/views/FormEcharts.vue')
    }
  ]
})
