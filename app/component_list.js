import Vue from 'vue'
import {Category, CustomActionBar, CustomButton, CustomTextField, Task} from './components'
import Home from '~/components/pages/Home'
import StartScreen from '~/components/pages/StartScreen'

Vue.component('custom-action-bar', CustomActionBar)
Vue.component('category', Category)
Vue.component('task', Task)
Vue.component('home', Home)
Vue.component('custom-text-field', CustomTextField)
Vue.component('custom-button', CustomButton)
Vue.component('start-screen', StartScreen)
