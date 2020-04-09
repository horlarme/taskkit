<template>
    <grid-layout columns='auto, *, auto' paddingTop='24'
                 verticalAlignment='center'
                 androidElevation='3'
                 backgroundColor='white'>
        <stack-layout col='0' borderRadius='100' height='24' margin='16 32 16 16'
                      verticalAlignment="center" v-if="back" @tap="backAction">
            <label text.decode="&#xf053; Back" fontSize="20" class="fas"/>
        </stack-layout>
        <stack-layout col='1' verticalAlignment='center' marginTop="16" marginBottom="16">
            <label :text='title' fontSize='20' fontWeight='bold'
                   horizontalAlignment='left'/>
        </stack-layout>
        <stack-layout col='2' borderRadius='100' height='auto'
                      orientation="horizontal"
                      verticalAlignment="center" v-if="back">
            <label :text.decode="item.value"
                   fontSize="20" margin="16 16 16 24" class="fas"
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
            actionItems: {
                type: Array,
                default: null
            }
        },
        methods: {
            backAction () {
                try {
                    this.$navigateBack()
                } catch (e) {

                }
            }
        }
    }
</script>
