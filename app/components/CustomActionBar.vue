<template>
    <grid-layout columns='auto, *, auto' verticalAlignment='center' id="custom_action_bar" :paddingTop="paddingTop"
                 androidElevation='3' color="white" :backgroundColor='backgroundColor'
                 @loaded="loaded">
        <stack-layout col='0' borderRadius='100' padding="0 16 0 16"
                      verticalAlignment="center" v-if="back" @tap="backAction">
            <label text.decode="&#xf053; Back" fontSize="19" class="fas"/>
        </stack-layout>
        <stack-layout col='1' verticalAlignment='center' marginTop="16" marginBottom="16" marginLeft="16">
            <label :text='title' fontSize='20' fontWeight='bold'
                   horizontalAlignment='left'/>
        </stack-layout>
        <stack-layout col='2' borderRadius='100' height='auto'
                      orientation="horizontal"
                      verticalAlignment="center" v-if="back">
            <label :text.decode="item.value"
                   fontSize="20" padding="16 16 16 24" class="fas"
                   v-for="(item, index) in actionItems"
                   @tap="() => {
                       if(item.callback) item.callback()
                   }"
                   :key="index"/>
        </stack-layout>
    </grid-layout>
</template>

<script>
    import {isAndroid} from 'tns-core-modules/platform'
    import {android} from 'tns-core-modules/application'

    export default {
        props: {
            title: {
                type: String,
                default: null
            },
            back: {
                type: Boolean,
                default: false
            },
            actionItems: {
                type: Array,
                default: null
            },
            backgroundColor: {
                type: String,
                default: 'blue',
                required: false
            }
        },
        methods: {
            backAction () {
                try {
                    this.$navigateBack()
                } catch (e) {

                }
            },
            loaded (eventData) {
                if (isAndroid) {
                    const statusResId = android.context.getResources().getIdentifier('status_bar_height', 'dimen', 'android')
                    if (statusResId) {
                        const statusBarHeight = android.context.getResources().getDimensionPixelSize(statusResId)
                        this.paddingTop = statusBarHeight - 10
                        // actionBar.setPadding(actionBar.getPaddingLeft(), statusBarHeight, actionBar.getPaddingRight(), actionBar.getPaddingBottom())
                    }
                }
            }
        },
        data: function () {
            return {
                paddingTop: 24
            }
        }
    }
</script>
