<script>
export default {
    props: ['links'],
    methods: {
        getRouterParams(key, value) {
            let params = {}
            params[key] = value
            return params
        }
    }
}
</script>

<template>
    <ol class="breadcrumb">
        <li v-for="link in links" v-bind:key="link.title" class="breadcrumb-item">
            <span v-if="!link.to">{{ link.title }}</span>
            <RouterLink v-else-if="link.to && link.params" :to="{name: link.to, params: getRouterParams(link.params.key, link.params.value)}">{{ link.title }}</RouterLink>
            <RouterLink v-else :to="{name: link.to}">{{ link.title }}</RouterLink>
        </li>
    </ol>
</template>

<style scoped></style>