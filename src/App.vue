<script setup>
import { RouterView } from 'vue-router'
import TopPanel from './components/common/TopPanel.vue'
import MainMenu from './components/common/MainMenu.vue'
import FooterPanel from './components/common/FooterPanel.vue'
</script>

<template>
  <TopPanel />
  <MainMenu />

  <div class="app-content content">
      <div class="content-wrapper">
          <RouterView />
      </div>
    </div>

  <FooterPanel />
</template>

<style scoped>

</style>
