import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 导入依赖
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap';


// 总入口 安装完会引入 挂载在app元素上
createApp(App).use(store).use(router).mount('#app')
