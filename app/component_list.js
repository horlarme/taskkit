import Vue from 'vue'
import {Category, CustomActionBar, CustomTextField, Task} from './components'
import Home from '~/components/pages/Home'

Vue.component('custom-action-bar', CustomActionBar)
Vue.component('category', Category)
Vue.component('task', Task)
Vue.component('home', Home)
Vue.component('custom-text-field', CustomTextField)
