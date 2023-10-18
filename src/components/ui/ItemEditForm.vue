<script>
import BreadCrumbs from './BreadCrumbs.vue'
export default {
    props: [
        'title',
        'model',
        'fields',
        'breadcrumbs'
    ],
    data() {
        return {
            local_model: this.model
        }
    },
    components: {
        BreadCrumbs
    },
    emits: ['save-event']
}
</script>

<template>
    <div class="content-header row">
        <div class="content-header-left col-md-8 col-12 mb-2 breadcrumb-new">
        <h3 class="content-header-title mb-0 d-inline-block">{{ title }}</h3>
        <div class="row breadcrumbs-top d-inline-block">
            <div class="breadcrumb-wrapper col-12">
                <BreadCrumbs :links="breadcrumbs" />
            </div>
        </div>
        </div>
    </div>
    <div class="content-body">
        <div class="row">
            <div class="col-12">
                <section class="card">
                    <div class="card-content">
                        <div class="card-body">
                            <div class="col-12">
                                <div class="row">
                                    <div class="col-12">
                                        <form class="form-horizontal row mt-2">
                                            <div class="col-12">
                                                <fieldset v-for="field in fields" v-bind:key="field.name" class="form-label-group">
                                                    <input v-if="field.type == 'text'" v-model="local_model[field['model']]" type="text" class="form-control" :id="field.name" :placeholder="field.placeholder">
                                                    <textarea v-else-if="field.type == 'textarea'" v-model="local_model[field['model']]" class="form-control" :id="field.name" :placeholder="field.placeholder" rows="5"></textarea>
                                                    <label :for="field.name">{{ field.placeholder }}</label>
                                                </fieldset>
                                            </div>
                                            <div class="col-12 text-right">
                                                <button @click="$emit('save-event', local_model)" type="button" class="btn-gradient-primary my-1">Save</button>
                                            </div>
                                        </form>
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