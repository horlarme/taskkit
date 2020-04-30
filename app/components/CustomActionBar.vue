<template>
    <grid-layout columns='auto, *, auto' verticalAlignment='center'
                 v-start-bar-height-set="height => this.paddingTop = (height-10)"
                 :paddingTop="paddingTop"
                 androidElevation='3' color="white" :backgroundColor='backgroundColor'>
        <stack-layout col='0' v-if="menu" padding="0 16 0 18"
                      verticalAlignment="center" @tap="openDrawer">
            <label text.decode="&#xf0c9;" fontSize="24" class="fas"/>
        </stack-layout>
        <stack-layout col='0' padding="0 16 0 16"
                      verticalAlignment="center" v-if="back" @tap="backAction">
            <label text.decode="&#xf053; Back" fontSize="20" fontWeight="500" class="fas"/>
        </stack-layout>
        <stack-layout col='1' verticalAlignment='center' marginTop="16" marginBottom="16" marginLeft="16">
            <label :text='title' fontSize='24' fontWeight='500'
                   horizontalAlignment='left'/>
        </stack-layout>
        <stack-layout col='2' height='auto'
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
            menu: {
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
            openDrawer () {
                this.$root.$emit('drawer', 'open')
            },
            backAction () {
                try {
                    this.$navigateBack()
                } catch (e) {
                }
            }
        },
        data () {
            return {
                paddingTop: 24
            }
        }
    }
</script>
