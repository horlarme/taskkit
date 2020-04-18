<template>
    <page actionBarHidden='true' backgroundColor='#FFF'>
        <GridLayout rows='*'>
            <GridLayout row='0' rows='auto, *'>
                <custom-action-bar row='0' :title='title'/>
                <TabView row='2' tabTextColor='#f5f5f5'
                         tabBackgroundColor="blue"
                         selectedTabTextColor="white">
                    <tab-view-item title="Task Categories">
                        <scroll-view>

                            <stack-layout verticalAlignment="center" v-if='loading' height="100%" width="100%"
                                          horizontalAlignment="center">
                                <label text="Please wait... Loading updated tasks list..." fontSize="16"
                                       class="text-center"/>
                            </stack-layout>
                            <wrap-layout width='100%' v-else-if="categories.length">
                                <stack-layout v-for="(category, index) in categories" :key='index'>
                                    <category :category='category'/>
                                </stack-layout>
                            </wrap-layout>
                            <stack-layout verticalAlignment="center" height="100%" width="100%"
                                          horizontalAlignment="center" v-else>
                                <label text="Create a new category using the floating button." fontSize="16"
                                       class="text-center"/>
                            </stack-layout>
                        </scroll-view>
                    </tab-view-item>
                    <TabViewItem title="Task List">
                        <grid-layout backgroundColor='white'>
                            <list-view for='task in tasks'>
                                <v-template>
                                    <task :task='task' @updateTasks='fetchTasksAndCategories'/>
                                </v-template>
                            </list-view>
                        </grid-layout>
                    </TabViewItem>
                </TabView>
            </GridLayout>
            <fab row='0' class="fab-button" @tap="gotoCreatePage" icon="res://plus_icon"/>
        </GridLayout>
    </page>
</template>

<script>
    import CreateTask from './CreateTask'

    export default {
        mounted(){
            this.$store.commit('setAppIsNew', false)
            this.fetchTasksAndCategories()
            this.$root.$on('database::change::tasks', this.fetchTasksAndCategories)
        },
        methods: {
            async fetchTasksAndCategories () {
                this.loading = true
                new Promise(() => {
                    this.tasks = this.$tasks.query({
                        order: [ { property: 'created_at', direction: 'asc' } ]
                    })

                    const categories = this.$categories.query()
                    categories.map(category => {
                        category.tasks = this.$tasks.query({
                            where: [
                                {
                                    property: 'categories', comparison: 'equalTo', value: category.id
                                }],
                            limit: 5
                        })
                    })

                    this.categories = categories
                    resolve(true)
                })
                this.loading = false
            },
            gotoCreatePage () {
                this.$navigateTo(CreateTask)
            }
        },
        data () {
            return {
                categories: [],
                tasks: [],
                loading: true,
                title: 'Tasks List'
            }
        }
    }
</script>
