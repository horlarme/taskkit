import Vue from 'vue'
import {Category, CustomActionBar, CustomButton, CustomTextField, Task} from './components'
import Home from '~/components/pages/Home'
import StartScreen from '~/components/pages/StartScreen'
import RadSideDrawer from 'nativescript-ui-sidedrawer/vue'
import Vuex from 'vuex'

Vue.component('custom-action-bar', CustomActionBar)
Vue.component('category', Category)
Vue.component('task', Task)
Vue.component('home', Home)
Vue.component('custom-text-field', CustomTextField)
Vue.component('custom-button', CustomButton)
Vue.component('start-screen', StartScreen)

Vue.use(RadSideDrawer)
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
