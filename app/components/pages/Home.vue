<template>
    <page actionBarHidden='true' backgroundColor='#FFF'>
        <GridLayout rows='auto, *'>
            <custom-action-bar  row='0'/>
            <TabView row='2' tabTextColor='black'>
                <TabViewItem title="Category" textTransform="capitalize">
                        <list-view for='category in categories' seperatorColor='transparent'>
                            <v-template>
                                <task :category='category' />
                            </v-template>
                        </list-view>
                </TabViewItem>
                <TabViewItem title="Category" textTransform="capitalize">
                    <scroll-view>
                        <wrap-layout width='100%'>
                            <category v-for="(category, index) in categories" 
                                :key='index' :category='category' />
                        </wrap-layout>
                    </scroll-view>
                </TabViewItem>
                <TabViewItem title="Tasks" textTransform="capitalize">
                    <grid-layout backgroundColor='yellow'>
                        <list-view for='category in categories'>
                            <v-template>
                                <task :category='category' />
                            </v-template>
                        </list-view>
                    </grid-layout>
                </TabViewItem>
            </TabView>

        </GridLayout>
    </page>
</template>

<script>
    export default {
        data() {
            return {
                categories: [
                    {
                        name: 'The first category',
                        color: 'red',
                    },
                    {
                        name: 'The first category',
                        color: '#D45444',
                    },
                    {
                        name: 'The first category',
                        color: '#5990EE',
                    },
                    {
                        name: 'The first category',
                        color: '#5990EE',
                    },
                    {
                        name: 'The first category',
                        color: '#60E5C7',
                    },
                    {
                        name: 'The first category',
                        color: '#5990EE',
                    },
                    {
                        name: 'The first category',
                        color: '#5990EE',
                    },
                    {
                        name: 'The first category',
                        color: '#D45444',
                    },
                    {
                        name: 'The first category',
                        color: '#5990EE',
                    },
                    {
                        name: 'The first category',
                        color: '#BEEA91',
                    },
                    {
                        name: 'The first category',
                        color: '#BEEA91',
                    },
                    {
                        name: 'The first category',
                        color: '#5990EE',
                    }
                ]
            }
        }
    }
</script>

<style scoped lang="scss">
</style>
