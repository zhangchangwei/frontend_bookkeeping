import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

App.mpType = 'app'
Vue.prototype.globel_url = 'http://127.0.0.1:8087/book/';
Vue.prototype.user_info = {
	// userName:null,
	userId:null,
	nickName:null,
	face:null,
	openId:null
};

const app = new Vue({
    ...App
})
app.$mount()
