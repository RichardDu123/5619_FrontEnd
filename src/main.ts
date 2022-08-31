import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from '@/App.vue'
import router from '@/router'

// 全局样式
import '@less/global.less'

//mockjs
import '@/mock'

createApp(App)
  .use(createPinia()) // 启用 Pina
  .use(router)
  .mount('#app')
