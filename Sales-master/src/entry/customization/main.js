import Vue from 'vue'
import iView from 'iview'
import Main from './Main.vue'
import router from '@/router/customization'
import store from '@/store/store'
import '@/api/'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/style.css'
import 'iview/dist/styles/iview.css'

Vue.use(ElementUI)
Vue.use(iView)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(Main)
}).$mount('#app')
