import Vue from 'vue'
import {isAndroid} from 'tns-core-modules/platform'
import {android} from 'tns-core-modules/application'

Vue.directive('startBarHeightSet', (el, bindings) => {
    const loaded = (eventData) => {
        if (isAndroid) {
            const statusResId = android.context.getResources().getIdentifier('status_bar_height', 'dimen', 'android')
            if (statusResId) {
                const statusBarHeight = android.context.getResources().getDimensionPixelSize(statusResId)
                // this.paddingTop = statusBarHeight - 10
                // eventData.object.paddingTop = statusBarHeight - 10
                bindings.value(statusBarHeight)
            }
        }
    }
    el.nativeView.on('loaded', loaded)
})
