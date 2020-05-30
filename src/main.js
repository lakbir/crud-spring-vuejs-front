import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'jquery/dist/jquery.min.js'
import 'bootstrap/dist/js/bootstrap.min.js'
import Vuelidate from 'vuelidate'
import VModal from 'vue-js-modal'
 



Vue.config.productionTip = false
Vue.use(Vuelidate)
Vue.use(VModal)
new Vue({
  router,
  render: function (h) { return h(App) }
}).$mount('#app')
