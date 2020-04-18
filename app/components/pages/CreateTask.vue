<template>
    <page :actionBarHidden="true" @navigatedTo="fetchCategories">
        <grid-layout>
            <grid-layout rows="auto, *" backgroundColor="white">
                <custom-action-bar title="Create New Task" row="0" :back="true"/>
                <grid-layout rows="*, auto" row="1" height="100%">
                    <stack-layout row="0" padding="10">
                        <custom-text-field v-model="title" hint="Task Title"/>
                        <label text="Category" padding="20 5 15"
                               fontSize="18" fontWeight="bold"/>
                        <wrap-layout>
                            <label :text="`${selectedCategory === index ?'\uf00c' : ''}${category.name}` "
                                   v-for="(category, index) in categories" :key="index"
                                   :backgroundColor="category.color" padding="15 25" fontSize="16"
                                   @tap="selectedCategory = index"
                                   color="white" margin="5" borderRadius="5" class="fas"/>
                            <label :text="'\uf067'" padding="15 18" fontSize="18" margin="5"
                                   @tap="createNewCategory"
                                   class="fas c-bg-blue c-white"
                                   borderRadius="100"/>
                        </wrap-layout>

                    </stack-layout>
                    <custom-button row="1" :text="'\uf0c7 Add Task'" @tap="saveNewTask"/>
                </grid-layout>
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
        methods: {
            saveNewTask () {
                if (this.selectedCategory === null) return alert('Select a category')
                if (!this.title || this.title === '') return alert('Enter a valid task title')
                this.$tasks.createDocument({
                    categories: this.categories[this.selectedCategory].id,
                    title: this.title,
                    created_at: Date.now(),
                    completed: false
                })
                this.$root.$emit('database::change::tasks')
                this.$navigateBack()
            },
            createNewCategory () {
                this.$navigateTo(CreateCategory)
            },
            fetchCategories () {
                this.categories = this.$categories.query()
            }
        }
    }
</script>
