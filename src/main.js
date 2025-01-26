import {createApp} from 'vue';
import AGC from './AGC.vue';
import router from './router';
import './style.css';

const app = createApp(AGC);

app.use(router);
app.mount('#agc');