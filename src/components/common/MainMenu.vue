<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
    <div class="main-menu menu-fixed menu-dark menu-bg-default rounded menu-accordion menu-shadow">
      <div class="main-menu-content">
        <RouterLink to="/" class="navigation-brand d-none d-md-block d-lg-block d-xl-block"><img class="brand-logo" alt="CryptoDash admin logo" src="/src/assets/app-assets/images/logo/logo.png"/></RouterLink>
        <ul class="navigation navigation-main" id="main-menu-navigation" data-menu="menu-navigation">
          <li class="active">
            <RouterLink to="/"><i class="icon-grid"></i><span class="menu-title" data-i18n="">Dashboard</span></RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink to="/projects"><i class="icon-layers"></i><span class="menu-title" data-i18n="">Projects</span></RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink to="/faq"><i class="icon-support"></i><span class="menu-title" data-i18n="">FAQ</span></RouterLink>
          </li>
        </ul>
      </div>
    </div>
</template>

<style scoped></style>