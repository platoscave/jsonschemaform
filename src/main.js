import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en'
//import 'element-ui/lib/theme-chalk/index.css'
import 'element-theme-dark'

import VueHighlightJS from 'vue-highlight.js';

// Highlight.js languages (Only required languages)
import javascript from 'highlight.js/lib/languages/javascript';
import json from 'highlight.js/lib/languages/json';
import xml from 'highlight.js/lib/languages/xml';
import 'highlight.js/styles/vs2015.css';

// Defined galobaly due to their recusive nature
import SubForm from './components/controls/SubForm';
Vue.component('ar-sub-form', SubForm)

Vue.use( ElementUI, { locale })
/*
* Use Vue Highlight.js
*/
Vue.use(VueHighlightJS, {
	// Register only languages that you want
	languages: {
    javascript,
    json,
    xml
	}
});

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')