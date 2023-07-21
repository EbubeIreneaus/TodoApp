

import { createApp } from 'vue'
import App from './App.vue'
import Index from './components/Index.vue'

const app = createApp(App)
app.component("index",Index)
app.mount("#app")
