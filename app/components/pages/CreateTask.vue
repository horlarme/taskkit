<template>
    <page :actionBarHidden="true">
        <grid-layout>
            <grid-layout rows="auto, *">
                <custom-action-bar title="Create New Task" row="0" :back="true"
                                   :actionItems="getIcons"/>
                <scroll-view row="1">
                    <stack-layout>
                        <text-field padding="15 10" backgroundColor="#d3d3d3" borderTopLeftRadius="5"
                                    v-model="title"
                                    borderTopRightRadius="5" borderBottomColor="#00008b" margin="5 5 5 5" fontSize="14"
                                    hint="Task Title" keyboardType="text" returnKeyType="next"/>

                        <label text="Category" paddingTop="10" paddingLeft="5" fontSize="14"/>
                        <wrap-layout>
                            <label :text="`${selectedCategory === index ?'\uf00c' : ''}${category.name}` "
                                   v-for="(category, index) in categories" :key="index"
                                   :backgroundColor="category.color" padding="15 25" fontSize="16"
                                   @tap="selectedCategory = index"
                                   color="white" margin="5" borderRadius="5" class="fas"/>
                            <label :text="'\uf067'" padding="15 25" fontSize="18" color="blue" margin="5"
                                   @tap="createNewCategory"
                                   borderColor="blue" borderWidth="1" borderRadius="5" class="fas"/>
                        </wrap-layout>
                        <label text="Date" paddingTop="10" paddingLeft="5" fontSize="14"/>
                        <date-picker :minDate="Date.now()"/>
                        <label text="Time" paddingTop="10" paddingLeft="5" fontSize="14"/>
                        <time-picker :minDate="Date.now()"/>
                    </stack-layout>
                </scroll-view>
            </grid-layout>
        </grid-layout>
    </page>
</template>

<script>
    import CreateCategory from './CreateCategory'

    export default {
        data () {
            return {
                title: '',
                categories: [],
                selectedCategory: null
            }
        },
        mounted () {
            this.fetchCategories()
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
                if (!this.selectedCategory) alert('Select a category')
                if (!this.title || this.title === '') alert('Enter a valid task title')

                console.log({
                    categories: this.categories[this.selectedCategory].id,
                    title: this.title
                })
                const id = this.$database().createDocument({
                    categories: this.categories[this.selectedCategory].id,
                    title: this.title
                })
                console.log(`newest task ${id}`)
                this.$navigateBack()
            },
            createNewCategory () {
                this.$navigateTo(CreateCategory)
                    .then(() => {
                        this.fetchCategories()
                    })
            },
            fetchCategories () {
                this.categories = this.$database().query({
                    from: 'categories'
                })
            }
        }
    }
</script>
