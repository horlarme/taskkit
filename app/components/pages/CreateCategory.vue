<template>
    <page :actionBarHidden="true">
        <grid-layout>
            <grid-layout rows="auto, *">
                <custom-action-bar title="Create New Category" row="0" :back="true"
                                   :actionItems="getIcons"/>
                <scroll-view row="1">
                    <stack-layout>
                        <text-field padding="15 10" backgroundColor="#d3d3d3" borderTopLeftRadius="5"
                                    borderTopRightRadius="5" borderBottomColor="#00008b" margin="5 5 5 5" fontSize="14"
                                    v-model="name"
                                    hint="Category Name" keyboardType="text" returnKeyType="next"/>

                        <label text="Color" paddingTop="10" paddingLeft="5" fontSize="14"/>
                        <wrap-layout>
                            <label :text="(color === index ? '\uf00c' : '') + colorOption"
                                   v-for="(colorOption, index) in colors" :key="index"
                                   @tap="selectColor(index)"
                                   :backgroundColor="colorOption" padding="15 25" fontSize="16"
                                   color="white" margin="5" borderRadius="5" class="fas"/>
                        </wrap-layout>
                    </stack-layout>
                </scroll-view>
            </grid-layout>
        </grid-layout>
    </page>
</template>

<script>
    export default {
        data () {
            return {
                name: '',
                color: null,
                colors: [ 'blue', 'red', 'indigo', 'brown', 'magenta', 'crimson', 'yellow', 'purple', 'gray', 'green' ]
            }
        },
        computed: {
            getIcons () {
                return [
                    {
                        value: '\uf0c7',
                        callback: () => {
                            this.saveNewTask()
                        }
                    }
                ]
            }
        },
        methods: {
            saveNewTask () {
                if (this.name === '' || this.name === null) return alert('Enter a valid category name')

                const data = {
                    name: this.name,
                    color: this.colors[this.color]
                }

                this.$categories.createDocument(data)
                this.$root.$emit('database::change::categories')
                this.$navigateBack()
            },
            selectColor (index) {
                this.color = index
            }
        }
    }
</script>
