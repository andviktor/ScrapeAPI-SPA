<script setup>
    import { computed } from 'vue'
    const current_year = computed(() => new Date().getFullYear())
</script>

<template>
    <footer class="footer footer-static footer-transparent">
        <p class="clearfix blue-grey lighten-2 text-sm-center mb-0 px-2">
            <span class="float-md-left d-block d-md-inline-block">Copyright  &copy; 
            {{ current_year }}
            <a class="text-bold-800 grey darken-2" href="mailto:and.viktor@gmail.com">Viktor Andreev</a>, All rights reserved.</span>
        </p>
        <p class="clearfix blue-grey lighten-2 text-sm-center mb-0 px-2">
            <span class="float-md-left d-block d-md-inline-block">
                <small>Template by <a class="text-bold-800 grey darken-2" href="https://themeselection.com/" target="_blank">ThemeSelection</a></small>
            </span>
        </p>
    </footer>
</template>

<style scoped></style>