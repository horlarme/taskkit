<template>
    <page actionBarHidden="true">
        <GridLayout rows='*'>
            <grid-layout height="100%" width="100%" rows="auto, *">
                <custom-action-bar row="0" :title="category.name"
                                   :back="true" :backgroundColor="category.color"/>
                <scroll-view row="1">
                    <stack-layout>
                        <task v-for="(task, index) in tasks"
                              :key="index" :task="task"
                              @updateTasks="getTasks"
                              :category="category"/>
                    </stack-layout>
                </scroll-view>
            </grid-layout>

            <fab row='0' class="fab-button" :backgroundColor='category.color' @tap="gotoCreatePage" icon="res://plus_icon"/>
        </GridLayout>
    </page>
</template>

<script>
    import CreateTask from './CreateTask'

    export default {
        props: {
            categoryId: String
        },
        mounted () {
            this.category = this.$categories.getDocument(this.categoryId)
            this.getTasks(true)
        },
        data () {
            return {
                tasks: {},
                category: {}
            }
        },
        methods: {
            gotoCreatePage () {
                this.$navigateTo(CreateTask)
            },
            getTasks (order = false) {
                let _order = []
                if (order) {
                    _order.push({ direction: 'desc', property: 'completed_at' })
                }
                console.log(_order)
                this.tasks = this.$tasks.query({
                    order: _order,
                    where: [ { value: this.categoryId, comparison: 'equalTo', property: 'categories' } ]
                })
            }
        }
    }
</script>
