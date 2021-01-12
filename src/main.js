import Vue from 'vue';
import moment from 'moment';
import VueCurrencyFilter from 'vue-currency-filter';
import Datepicker from 'vuejs-datepicker';
import VueSweetalert2 from 'vue-sweetalert2'; 
import BootstrapVue from 'bootstrap-vue/dist/bootstrap-vue.esm';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { ClientTable } from 'vue-tables-2';
// css
import 'sweetalert2/dist/sweetalert2.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
// from file
import App from './App.vue';
import router from './router';
import { store } from './store';

// helper
import separator from './helper/separator';
import server from './helper/server'

Vue.prototype.url = "https://kumpulmodal-api.herokuapp.com/api/v1/web";
Vue.prototype.moment = moment;
Vue.prototype.separator = separator;
Vue.prototype.server = server;
Vue.config.productionTip = false;
Vue.use(VueSweetalert2);
Vue.use(BootstrapVue);
Vue.use(ClientTable);
Vue.use(VueCurrencyFilter, {
  symbol: 'Rp',
  thousandsSeparator: '.',
  fractionCount: 0,
  fractionSeparator: ',',
  symbolPosition: 'front',
  symbolSpacing: true
})
Vue.component('icons', FontAwesomeIcon);
Vue.component('Datepicker', Datepicker);

new Vue({
  router: router,
  store: store,
  render: h => h(App),
}).$mount('#app');
