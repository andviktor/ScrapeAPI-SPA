<script setup>
import { RouterView } from 'vue-router'
import TheHeader from './components/common/TheHeader.vue'
import TheMainMenu from './components/common/TheMainMenu.vue'
import TheFooter from './components/common/TheFooter.vue'
</script>

<template>
  <TheHeader />
  <TheMainMenu />

  <div class="app-content content">
      <div class="content-wrapper">
          <RouterView />
      </div>
    </div>

  <TheFooter />
</template>

<style scoped>

</style>
