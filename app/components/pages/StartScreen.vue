<template>
    <page actionBarHidden='true' backgroundColor='#FFF'>
        <grid-layout width="100%" height="100%" rows="*, auto">
            <grid-layout row="0" rows="*, auto">
                <tab-view row="0" height="100%"
                          width="100%" @loaded="tabViewLoaded"
                          :selectedIndex="selectedIndex"
                          @selectedIndexChanged="changeIndex">
                    <tab-view-item>
                        <grid-layout>
                            <stack-layout width="100%"
                                          verticalAlignment="center"
                                          horizontalAlignment="center"
                                          androidElevation="0" height="100%">
                                <stack-layout class="p-0 m-15">
                                    <image src="res://illustration_01" stretch="aspectFit"/>
                                </stack-layout>
                                <stack-layout class="p-8 m-15 text-capitalize text-center">
                                    <label text="Create tasks and organise them efficiently the way you want"
                                           textWrap="true"
                                           class="font-weight-bold" fontSize="22"/>
                                </stack-layout>
                            </stack-layout>
                        </grid-layout>
                    </tab-view-item>
                    <tab-view-item>
                        <grid-layout>
                            <stack-layout width="100%"
                                          verticalAlignment="center"
                                          horizontalAlignment="center"
                                          androidElevation="0" height="100%">
                                <stack-layout class="p-0 m-15">
                                    <image src="res://illustration_02" stretch="aspectFit"/>
                                </stack-layout>
                                <stack-layout class="p-8 m-15 text-capitalize text-center">
                                    <label text="Create tasks and organise them efficiently the way you want"
                                           textWrap="true"
                                           class="font-weight-bold" fontSize="22"/>
                                </stack-layout>
                            </stack-layout>
                        </grid-layout>
                    </tab-view-item>
                    <tab-view-item>
                        <grid-layout>
                            <stack-layout width="100%"
                                          verticalAlignment="center"
                                          horizontalAlignment="center"
                                          androidElevation="0" height="100%">
                                <stack-layout class="p-0 m-15">
                                    <image src="res://illustration_03" stretch="aspectFit"/>
                                </stack-layout>
                                <stack-layout class="p-8 m-15 text-capitalize text-center">
                                    <label text="Create tasks and organise them efficiently the way you want"
                                           textWrap="true"
                                           class="font-weight-bold" fontSize="22"/>
                                </stack-layout>
                            </stack-layout>
                        </grid-layout>
                    </tab-view-item>
                </tab-view>
                <stack-layout verticalAlignment="center" orientation="horizontal" horizontalAlignment="center"
                              width="100%" marginTop="5" marginBottom="30" row="1">
                    <stack-layout :backgroundColor="(selectedIndex == i) ? '#009B89' : '#CCEBE7'"
                                  width="8" height="8"
                                  borderRadius="100" class="m-2"
                                  v-for="i in [0,1,2]" :key="i"/>
                </stack-layout>
            </grid-layout>
            <stack-layout row="1">
                <custom-button :title="selectedIndex === 2 ? 'Start' : 'Next'" @tap="next"/>
            </stack-layout>
        </grid-layout>
    </page>
</template>

<script>
    import Home from './Home'
    import * as settings from '@nativescript/core/application-settings'

    export default {
        created () {
            this.isNewApp = settings.getBoolean('isFirstTimeStarting', true)
        },
        mounted () {
            if (!this.isNewApp) this.proceedToHomePage()
        },
        data () {
            return {
                isNewApp: true,
                selectedIndex: 0
            }
        },
        methods: {
            next () {
                if (this.selectedIndex === 2) return this.proceedToHomePage()
                this.selectedIndex = this.selectedIndex + 1
            },
            tabViewLoaded (event) {
                if (event.object.android) {
                    event.object.android.removeViewAt(1)
                } else {
                    event.object.ios.tabBar.hidden = true
                }
            },
            changeIndex (event) {
                this.selectedIndex = event.newIndex
            },
            proceedToHomePage () {
                return this.$navigateTo(Home, {
                    clearHistory: true
                })
            }
        }
    }
</script>
