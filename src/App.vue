<script>
import { RouterView } from 'vue-router'
import TheHeader from './components/common/TheHeader.vue'
import TheMainMenu from './components/common/TheMainMenu.vue'
import TheFooter from './components/common/TheFooter.vue'

export default {
  data() {
    return {
      is_authenticated: false
    }
  },
  components: {
    TheHeader,
    TheMainMenu,
    TheFooter
  },
  methods: {
    isAuthenticatedCheck() {

      if($cookies.get("apitoken") != null) {
        this.is_authenticated = true
      }
      else {
        this.is_authenticated = false
      }

      if(!this.is_authenticated) {
        this.$router.push({ path: '/' })
      }
    }
  },
  created() {
    this.isAuthenticatedCheck()
  },
  watch: {
    '$route' (to, from) {
      this.isAuthenticatedCheck()
    }
  }
}
</script>

<template>
    <template v-if="is_authenticated">
      <TheHeader />
      <TheMainMenu />

      <div class="app-content content">
          <div class="content-wrapper">
              <router-view />
          </div>
        </div>

      <TheFooter />
    </template>

    <template v-else>
      <router-view name="auth" @authorized="isAuthenticatedCheck" />
    </template>
</template>

<style scoped>

</style>
