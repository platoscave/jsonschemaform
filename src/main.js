import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en'
//import 'element-ui/lib/theme-chalk/index.css'
import 'element-theme-dark'
//import JsonSchemaForm from './components/JsonSchemaForm';
//import TiptapWrapper from './components/TiptapWrapper';

import VueHighlightJS from 'vue-highlight.js';

// Highlight.js languages (Only required languages)
//import xml from 'highlight.js/lib/languages/xml';
import javascript from 'highlight.js/lib/languages/javascript';
import json from 'highlight.js/lib/languages/json';
import xml from 'highlight.js/lib/languages/xml';
import 'highlight.js/styles/vs2015.css';


//Vue.component('json-schema-form', JsonSchemaForm);
//Vue.component('tiptap-wrapper', TiptapWrapper);

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