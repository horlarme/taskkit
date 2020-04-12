import Vue from 'nativescript-vue'
import './component_list'
import {Couchbase} from 'nativescript-couchbase-plugin'

Vue.registerElement('Fab', () => require('nativescript-floatingactionbutton').Fab)

Vue.prototype.$tasks = new Couchbase('tasks')
Vue.prototype.$categories = new Couchbase('categories')

Vue.config.silent = false

new Vue({
    template: `<frame><start-screen /></frame>`
}).$start()
