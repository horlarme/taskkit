<template>
    <stack-layout width='50%' padding='5'>
        <stack-layout :backgroundColor='category.color' paddingTop='10' paddingLeft='20' paddingBottom='10'
                      borderRadius='15' width='100%' androidElevation='1'>
            <label :text='category.name' fontSize='24' fontWeight='bold' color='white' padding='5 0 10 0'
                   borderBottomWidth='1' borderBottomColor='whitesmoke' marginBottom='15'/>
            <label :text='task.title' padding='5 10' color='white' fontSize='16'
                   v-for="(task,i) in category.tasks" :key="i"/>
        </stack-layout>
    </stack-layout>
</template>

<script>
    export default {
        props: {
            category: {
                type: Object,
                default: null
            }
        }
    }
</script>

<style>

</style>
