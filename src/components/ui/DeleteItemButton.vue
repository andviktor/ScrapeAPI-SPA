<script>
export default {
    data() {
      return {
        expanded: false
      }
    },
    emits: ['delete-event']
}
</script>

<template>
    <a @click="expanded = true" v-if="!expanded" class="mb-0 btn-sm btn btn-outline-danger round">Delete</a>
    <span v-if="expanded">Are you sure? <a @click="expanded = false" class="mb-0 btn-sm btn btn-outline-danger round">No</a> / <a @click="$emit('delete-event')" class="mb-0 btn-sm btn btn-outline-success round">Yes</a></span>
</template>

<style scoped></style>