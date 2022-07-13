import { createApp } from 'vue'
import App from './App.vue'
import {useStoreQuestions} from './store/index'

const app = createApp(App);
app.use(useStoreQuestions)
app.mount('#app')
