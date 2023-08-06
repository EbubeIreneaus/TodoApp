
import '@fortawesome/fontawesome-free/css/all.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { createApp } from 'vue'
import App from './App.vue'
import Index from './components/Index.vue'
import newItem from './components/newItem.vue'
import Edit from './components/Edit.vue'
import 'animate.css/animate.min.css'

const app = createApp(App)
app.component("index",Index)
app.component("new-item",newItem)
app.component("edit",Edit)
app.mount("#app")
