import { createApp } from 'vue'
import App from './App.vue'
import router from './router.js'
import store from 'stores'
import elementComponents from '@/common/elecomps.js'
import 'element-plus/theme-chalk/index.css'
import 'styles/ui.scss'

const app = createApp(App)

app.use(router)
app.use(store)
app.use(elementComponents)

app.mount('#app')
