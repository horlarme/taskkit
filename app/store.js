import Vue from 'vue'
import {getBoolean, setBoolean} from 'tns-core-modules/application-settings'
import Vuex from 'vuex'

Vue.use(Vuex)

const isFirstTimeKey = 'isFirstTimeStarting'

export default new Vuex.Store({
	state:{
		isAppNew: getBoolean(isFirstTimeKey, true)
	},
	mutations: {
		setAppIsNew(state, action){
			state.isAppNew = action
			setBoolean(isFirstTimeKey, action)
		}
	}
})