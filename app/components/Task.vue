<template>
    <stack-layout width='100%' borderLeftWidth='5' :borderColor='category.color' backgroundColor='white' padding='10 15 10 15'>
        <stack-layout margin='0' padding='0'>
            <label :text='category.name' fontSize='14' fontWeight='semibold' textTransform='uppercase' :color='category.color' marginBottom='3'/>
            <label fontSize='18' color='#5B5A66' fontWeight='bold'  text='This is what I have to be doing for the rest of my life' />
        </stack-layout>
        <stack-layout>
            <label text='0xf303' class='fas' />
        </stack-layout>
  </stack-layout>
</template>

<script>
export default {
    props: {
        category: {
            type: Object
        }
    }
}
</script>

<style>

</style>