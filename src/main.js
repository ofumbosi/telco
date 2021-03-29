import Vue from 'vue'
import './plugins/vuetify'
import './plugins/vuetify'
import App from './App.vue'
import Donut from 'vue-css-donut-chart';
import 'vue-css-donut-chart/dist/vcdonut.css';
import VueGauge from 'vue-gauge';
import VueFusionCharts from 'vue-fusioncharts';
import FusionCharts from 'fusioncharts';
import Charts from 'fusioncharts/fusioncharts.charts';
import VueCharts from 'vue-chartjs'
import {
  Bar,
  Line
} from 'vue-chartjs'

import router from './router'

Vue.use(Donut);
Vue.component('vue-gauge', VueGauge);

// register VueFusionCharts component
import Widgets from 'fusioncharts/fusioncharts.widgets';

// register VueFusionCharts component
Vue.use(VueFusionCharts, FusionCharts, Charts, Widgets);
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')