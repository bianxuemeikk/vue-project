import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'

//挂载Vuex
Vue.use(Vuex)

const state = {
	//存放的键值对就是所要管理的状态
	name:'helloVueX',
	count:1,
	age:10,
  skin:'skinOne'
}
const mutations = {
	//es6语法，等同edit:funcion(){...}
	edit(state,payload){
		state.name = 'jack';
		console.log(payload);
	},
	add(state){
		state.count++;
	}
}

//创建VueX对象
const store = new Vuex.Store({
    state,
	mutations,
	getters,
	actions
})

export default store
