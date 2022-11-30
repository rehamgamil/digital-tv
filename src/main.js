import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import locales from './locales'
import BootstrapVue3 from 'bootstrap-vue-3'
import globalComponents from './utils/globalComponents'

//#region Styles
// bootstrap
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'
// maz ui
import 'maz-ui/css/main.css'
// font awsome
import './assets/styles/all.min.css'
// main
import './assets/styles/main.scss'
//#endregion Styles

createApp(App)
  .use(store)
  .use(router)
  .use(locales)
  .use(BootstrapVue3)
  .use(globalComponents)
  .mount('#app')
