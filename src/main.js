import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import plugins from './components/common/index'
import registryToast from './components/ToastCom/index'
import  FastClick  from  'fastclick'
// import './utils/rem'

FastClick.attach(document.body);

Vue.config.productionTip = false

Vue.prototype.$appName='myapp'

Vue.use(plugins)
Vue.use(registryToast)

new Vue({
  router,
  store,
  render: function (h) { return h(App) },
  beforeCreate(){
    console.log(this.$appName,this);
  },
}).$mount('#app')
