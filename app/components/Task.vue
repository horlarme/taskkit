<template>
    <flexbox-layout width='100%' borderLeftWidth='5' alignItems="center"
                    :borderColor='category$.color' backgroundColor='white'
                    padding='10 0 10 15' horizontalAlignment='stretch'
                    verticalAlignment='center'
                    orientation="horizontal">
        <stack-layout margin='0' padding='0' flexGrow="1">
            <label :text='category$.name' fontSize='14'
                    @tap='gotoCategory'
                   fontWeight='semibold' textTransform='uppercase'
                   color='blue' marginBottom='3'/>
            <flexbox-layout margin='0' padding='0' alignItems="center"
                            @doubleTap='promptTaskDeletion'
                            @tap="toggleTaskComplete">
                <check-box class="p-0 m-0 m-r-4" :checked="task.completed" flexShrink="0"
                           @checkedChange="toggleTaskComplete"/>
                <label fontSize='15' color='#5B5A66'
                       textWrap="true"
                       :textDecoration="task.completed ? 'line-through' : 'none'"
                       :fontWeight="task.completed ? 'normal' : 'bold'"
                       :text='task.title'/>
            </flexbox-layout>
        </stack-layout>
        <stack-layout verticalAlignment='bottom' flexShrink="0">
            <label text.decode='&#xf303;' fontSize='14' color='#B8B7BF'
                   class='fas p-16'/>
        </stack-layout>
    </flexbox-layout>
</template>

<script>
    import Category from './pages/Category'

    export default {
        props: {
            task: {
                type: Object
            },
            category: {
                type: Object,
                default: null,
                required: false
            }
        },
        mounted () {
            let _category$ = this.category
            if (this.category === null) {
                _category$ = this.$categories.getDocument(this.task.categories)
                this.category$.name = _category$.name
                this.category$.color = _category$.color
            } else {
                this.category$.name = _category$.name
                this.category$.color = _category$.color
            }
        },
        data () {
            return {
                category$: {
                    name: '',
                    color: ''
                }
            }
        },
        methods: {
            async promptTaskDeletion() {
                const actionResult = await confirm({
                      title: "Delete Task",
                      message: "Are you sure about deleting task \"" + this.task.title + "\"?",
                      okButtonText: "Yes",
                      cancelButtonText: "No"
                    })
                if(actionResult){
                    this.$tasks.deleteDocument(this.task.id)
                    this.$emit('updateTasks')
                    this.$root.$emit('database::change::tasks')
                }
            },
            gotoCategory() {
                this.$navigateTo(Category,{
                    props: {
                        categoryId: this.task.categories
                    }
                })
            },
            toggleTaskComplete ($event) {
                // doing this check to prevent it from calling itself every time.
                if($event.value === this.task.completed) return;
                if (this.task.completed) {
                    this.$tasks.updateDocument(this.task.id, {
                        completed: false,
                        completed_at: null
                    })
                } else {
                    this.$tasks.updateDocument(this.task.id, {
                        completed: true,
                        completed_at: Date.now()
                    })
                }
                this.$emit('updateTasks')
            }
        }
    }
</script>
