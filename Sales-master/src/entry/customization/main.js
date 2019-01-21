import Vue from 'vue'
import Main from './Main.vue'
import router from '@/router/customization'
import store from '@/store/store'
import '@/api/'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/style.css'

Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(Main)
}).$mount('#app')
