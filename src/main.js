import Vue from 'vue';
import App from './App';
import store from './store';

Vue.config.devtools = true;

new Vue({
    el: '#app',
    store,
    render: h => h(App)
});
