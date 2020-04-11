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
                            <wrap-layout width='100%'>
                                <stack-layout v-for="(category, index) in getTasksByCategories" :key='index'>
                                    <category :category='category'/>
                                </stack-layout>
                            </wrap-layout>
                        </scroll-view>
                    </tab-view-item>
                    <TabViewItem title="Task List">
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
        async mounted () {
            await this.fetchTasksAndCategories()
            this.$root.$on([ 'database::change::tasks', 'database::change::categories' ], async (changes) => {
                await this.fetchTasksAndCategories()
            })
        },
        methods: {
            async fetchTasksAndCategories () {
                new Promise((resolve) => {
                    console.log('fetch task and categories called')
                    this.tasks = this.$tasks.query()
                    this.categories = this.$categories.query()
                })
            },
            gotoCreatePage () {
                this.$navigateTo(CreateTask)
            }
        },
        data () {
            return {
                categories: [],
                tasks: [],
                title: 'Tasks List'
            }
        },
        computed: {
            getTasksByCategories () {
                const categories = this.categories

                categories.map(category => {
                    category.tasks = this.$tasks.query({
                        where: [ { property: 'categories', comparison: 'equalTo', value: category.id } ],
                        limit: 5
                    })
                })

                return categories
            }
        }
    }
</script>
