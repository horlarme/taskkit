<template>
    <stack-layout width='50%' padding="0" @tap="viewTasks">
        <stack-layout :backgroundColor='category.color'
                      marginLeft="5" marginRight="5" marginTop="5" marginBottom="5"
                      paddingTop='10' paddingLeft='20' paddingBottom='10'
                      borderRadius='5' width='auto' androidElevation='7'>
            <label :text='category.name' fontSize='24' fontWeight='bold' color='white' padding='5 0 10 0'
                   borderBottomWidth='1' borderBottomColor='whitesmoke' marginBottom='15'/>
            <label text='Empty Task' textWrap='true' padding='5 10' color='white' 
                    v-if='!category.tasks.length'
                    textAlign='center' fontSize='20'/>
            <label :text='(i+1) + ". " + task.title' v-else padding='5 10' color='white' fontSize='16'
                   v-for="(task,i) in category.tasks" :key="i"/>
        </stack-layout>
    </stack-layout>
</template>

<script>
    import Category from './pages/Category'

    export default {
        props: {
            category: {
                type: Object,
                default: null
            }
        },
        methods: {
            viewTasks () {
                this.$navigateTo(Category, {
                    props: {
                        categoryId: this.category.id
                    }
                })
            }
        }
    }
</script>

<style>

</style>
