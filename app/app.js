import Vue from 'nativescript-vue'
import './component_list'
import {Couchbase} from 'nativescript-couchbase-plugin'
import {android, AndroidApplication} from 'tns-core-modules/application'
import StartScreen from '~/components/pages/StartScreen'
import Home from '~/components/pages/Home'
import Vuex from 'vuex'
import Store from './store'

Vue.use(Vuex)

Vue.registerElement('CheckBox', () => require('@nstudio/nativescript-checkbox').CheckBox,
    {
        model: {
            prop: 'checked',
            event: 'checkedChange'
        }
    }
)
Vue.registerElement('Fab', () => require('nativescript-floatingactionbutton').Fab)

Vue.prototype.$tasks = new Couchbase('tasks')
Vue.prototype.$categories = new Couchbase('categories')

Vue.prototype.$store = Store

Vue.config.silent = true
// Vue.config.silent = TNS_ENV === 'production'
let startComponent = StartScreen

const handleStart = (a) => {
    if (Store.state.isAppNew === false) {
        startComponent = Home
    }
}

android.on(AndroidApplication.activityCreatedEvent, handleStart)
android.on(AndroidApplication.activityResumedEvent, handleStart)

new Vue({
    store: Store,
    render: (createElement) => createElement('frame', [ createElement(startComponent) ])
}).$start()
