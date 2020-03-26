import Vue from "nativescript-vue";
import Home from './components/pages/Home'
import './component_list'

new Vue({

    template: `
        <Frame>
            <Home />
        </Frame>`,
    components: {
        Home
    }
}).$start();
