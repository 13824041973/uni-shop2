import Vue from 'vue'
import App from './App'

// 封装网络请求-----------------------------
import {
	$http
} from '@escook/request-miniprogram'
// 请求挂载到 uni 身上，方便全局使用
uni.$http = $http
// 公共Url
$http.baseUrl = 'https://api-ugo-web.itheima.net'
// 设置请求前后时做的一些事情
$http.beforeRequest = function(options) {
	uni.showLoading({
		title: '数据加载中...',
	})
}
$http.afterRequest = function(options) {
	uni.hideLoading()
}


//封装 uni.showToast------------------------
uni.$showMsg=function(title="数据加载失败！",duration=1500){
	uni.showToast({
		title,
		duration,
		icon:'none'
	})
}


// 关闭提示
Vue.config.productionTip = false



App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
