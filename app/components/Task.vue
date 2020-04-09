<template>
    <stack-layout width='100%' borderLeftWidth='5'
                  :borderColor='category.color' backgroundColor='white'
                  padding='10 15 10 15' horizontalAlignment='stretch'
                  verticalAlignment='center'
                  orientation="horizontal">
        <stack-layout margin='0' padding='0'>
            <label :text='category.name' fontSize='14'
                   fontWeight='semibold' textTransform='uppercase'
                   color='blue' marginBottom='3'/>
            <label fontSize='18' color='#5B5A66' fontWeight='bold'
                   :text='task.title'/>
        </stack-layout>
        <stack-layout verticalAlignment='bottom'>
            <label text.decode='&#xf303;' fontSize='16' color='#B8B7BF'
                   class='fas'/>
        </stack-layout>
    </stack-layout>
</template>

<script>

    export default {
        props: {
            task: {
                type: Object
            }
        },
        mounted () {
            this.category = this.$database('categories').getDocument(this.task.categories)
        },
        data: function () {
            return {
                category: {
                    name: '',
                    color: 'white'
                }
            }
        }
    }
</script>
