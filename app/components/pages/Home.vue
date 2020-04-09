<template>
    <page actionBarHidden='true' backgroundColor='#FFF'>
        <GridLayout rows='*'>
            <GridLayout row='0' rows='auto, *'>
                <custom-action-bar row='0' title='Tasks List'/>
                <TabView row='2' tabTextColor='black'>
                    <TabViewItem title="Category" textTransform="capitalize">
                        <scroll-view>
                            <wrap-layout width='100%'>
                                <category v-for="(category, index) in getTasksByCategories"
                                          :key='index' :category='category'
                                          v-if="category.tasks.length"/>
                            </wrap-layout>
                        </scroll-view>
                    </TabViewItem>
                    <TabViewItem title="Tasks" textTransform="capitalize">
                        <grid-layout backgroundColor='white'>
                            <list-view for='task in tasks'>
                                <v-template>
                                    <task :task='task'/>
                                </v-template>
                            </list-view>
                        </grid-layout>
                    </TabViewItem>
                </TabView>
            </GridLayout>
            <fab row='0' class="fab-button" @tap="gotoCreatePage" icon="res://plus_white"/>
        </GridLayout>
    </page>
</template>

<script>
    import {CreateTask} from '../index'

    export default {
        mounted () {
            this.fetchTasksAndCategories()
        },
        methods: {
            fetchTasksAndCategories () {
                this.tasks = this.$database().query()
                this.categories = this.$database('categories').query()
            },
            gotoCreatePage () {
                this.$navigateTo(CreateTask)
                    .then(this.fetchTasksAndCategories)
            }
        },
        data () {
            return {
                categories: [],
                tasks: []
            }
        },
        computed: {
            getTasksByCategories () {
                const categories = this.categories

                categories.map(category => {
                    category.tasks = this.$database().query({
                        where: [ { property: 'categories', comparison: 'equalTo', value: category.id } ],
                        limit: 5
                    })
                })

                return categories
            }
        }
    }
</script>

<style scoped lang="scss">
</style>
