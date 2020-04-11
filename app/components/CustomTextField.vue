<template>
    <text-field padding="15 10" backgroundColor="#d3d3d3"
                @textChange="emitChangeEvent"
                borderBottomColor="#00008b"
                borderBottomWidth="3"
                margin="5 5 5 5" fontSize="14"
                v-bind="$attrs"/>

</template>

<script>
    export default {
        props: {
            value: {
                type: String
            }
        },
        model: {
            prop: 'value',
            event: 'change'
        },
        methods: {
            emitChangeEvent ($event) {
                this.$emit('change', $event.value)
            }
        }
    }
</script>
