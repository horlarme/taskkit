<template>
    <label :text="title"
           androidElevation="3"
           @tap="$emit('tap')"
           class="fas c-bg-blue c-white p-16 p-y-20 text-center font-weight-bold text-uppercase"
           fontSize="16"/>
</template>

<script>
    export default {
        props: {
            title: String
        }
    }
</script>
