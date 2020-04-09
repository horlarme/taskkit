import Vue from 'nativescript-vue'
import Home from './components/pages/Home'
import './component_list'
import {Couchbase} from 'nativescript-couchbase-plugin'

Vue.registerElement('Fab', () => require('nativescript-floatingactionbutton').Fab)

Vue.prototype.$database = (document = 'tasks') => new Couchbase(document)
Vue.config.silent = TNS_ENV === 'production'

new Vue({
    template: `<frame><Home /></frame>`,
    components: {
        Home
    }
}).$start()
