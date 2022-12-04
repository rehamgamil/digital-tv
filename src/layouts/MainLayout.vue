<template>
  <div class="main-layout">
    <base-navbar/>
    <MainNavbar />

    <div class="main-content">
      <!-- <PageBanner :pageTitle="getBannerTitle" :height="getHeight" /> -->

      <router-view class="container pt-5 pb-5" />
    </div>
    <div>
      <app-footer/>
    </div>
  </div>
</template>

<script>
import AppFooter from '@/components/ui/AppFooter.vue'

import MainNavbar from '../components/MainNavbar.vue'
import BaseNavbar from '@/components/navbar/baseNavbar.vue'
//import PageBanner from '../components/ui/PageBanner.vue'

export default {
  name: 'MainLayout',
  components: {
    MainNavbar,
   // PageBanner,
    AppFooter,
    BaseNavbar,
  },
  data() {
    return {
      // bannerTitleI18: this.$route.meta.bannerTitleI18 === false ? false : true,
    }
  },
  computed: {
    getBannerTitle() {
      const bannerTitle = this.$route.meta.title ? this.$route.meta.title : ''
      const bannerTitleI18 = this.$route.meta.bannerTitleI18 === false ? false : true
      return bannerTitleI18 ? this.$t(bannerTitle) : bannerTitle
    },
    getHeight() {
      return this.$route.meta.height ? this.$route.meta.height : '200px'
    },
  },
}
</script>

<style lang="scss">
.main-layout {
  background-color: var(--co-body-bg);
  height: 100vh;
  display: grid;

  .main-content {
    overflow: auto;
    height: var(--main-content-height);
  }
}
</style>
