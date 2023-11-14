<script>
import BreadCrumbs from './BreadCrumbs.vue'
import DeleteItemButton from './DeleteItemButton.vue'
export default {
    props: [
        'items',
        'columns',
        'action_buttons_class',
        'action_buttons',
        'delete_button',
        'item_title', 
        'items_title', 
        'breadcrumbs', 
        'top_buttons'
    ],
    data() {
        return {
            action_buttons_with_params: {}
        }
    },
    components: {
        BreadCrumbs,
        DeleteItemButton
    },
    methods: {
        setActionButtonsWithParams() {
            let component = this
            let result = {}
            component.items.map(function(item) {
                let local_action_buttons = []
                component.action_buttons.map(function(action_button) {
                    let local_action_button_params = {}
                    local_action_button_params[action_button.params.name] = item[action_button.params.key]
                    local_action_buttons.push(local_action_button_params)
                })
                result[item.id] = local_action_buttons
            })
            return result
        },
        deleteEvent(id) {
            this.$emit('delete-event', id)
        }
    },
    created() {
        this.action_buttons_with_params = this.setActionButtonsWithParams()
    },
    emits: ['delete-event']
}
</script>

<template>
    <div class="content-header row">
        <div class="content-header-left col-md-8 col-12 mb-2 breadcrumb-new">
        <h3 class="content-header-title mb-0 d-inline-block">{{ items_title }}</h3>
        <div class="row breadcrumbs-top d-inline-block">
            <div class="breadcrumb-wrapper col-12">
                <BreadCrumbs :links="breadcrumbs" />
            </div>
        </div>
        </div>
        <div class="content-header-right col-md-4 col-12 d-none d-md-inline-block">
        <div class="btn-group float-md-right">
            <RouterLink v-for="top_button in top_buttons" v-bind:key="top_button.title" :to="{name: top_button.to}" class="btn-gradient-secondary btn-sm white">{{ top_button.title }}</RouterLink>
        </div>
        </div>
    </div>
    <div class="content-body">
        <div v-if="items.length == 0">No {{ items_title.toLowerCase() }} found.</div>
        <div v-else>
            <div class="d-none d-md-block">
                <div class="col-12">
                    <div class="row px-1">
                        <div v-for="column in columns" v-bind:key="column.title" :class="column.header_class" class="col-12 py-1">
                            <p class="mb-0">{{ column.header }}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <section 
                    v-for="item in items" 
                    v-bind:key="item.id" 
                    class="card pull-up"
                >
                    <div class="card-content">
                        <div class="card-body">
                            <div class="col-12">
                                <div class="row">
                                    <div v-for="column in columns" v-bind:key="column.title" :class="column.class" class="col-12 py-1">
                                        <p class="mb-0"><span class="d-inline-block d-md-none text-bold-700 mr-1">{{ column.header }}:</span>{{ item[column.title] }}</p>
                                    </div>
                                    <div :class="action_buttons_class" class="col-12 py-1 text-md-right">
                                        <p class="mb-0">
                                            <RouterLink 
                                                v-for="(action_button, index) in action_buttons" 
                                                v-bind:key="action_button.title" 
                                                :to="{name: action_button.to, params: action_buttons_with_params[item.id][index]}" 
                                                :class="action_button.class"
                                                class="mb-0 mr-1 btn-sm btn round"
                                            >
                                            
                                            {{ action_button.state_trigger ? action_button.state_title : action_button.title }}
                                            </RouterLink>
                                            <DeleteItemButton v-if="delete_button" @delete-event="this.deleteEvent(item.id)" />
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    </div>
</template>

<style scoped></style>