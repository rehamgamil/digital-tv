<template>
  <div class="main-layout">
    <main-navbar />
    <div class="main-content">
      <PageBanner
        :pageTitle="getBannerTitle"
        :height="getHeight"
        :bannerImg="getBannerImg"
      />
      <!-- <PageBanner :pageTitle="getBannerTitle" :height="getHeight" />  -->
      <router-view class="container pt-5 pb-5" />
      <main-footer v-if="getFooterStatus" />
    </div>
  </div>
</template>

<script>
import MainNavbar from '../layouts/components/mainNavbar.vue'
import MainFooter from '../layouts/components/MainFooter.vue'
import PageBanner from '../components/ui/PageBanner.vue'

export default {
  name: 'MainLayout',
  components: {
    MainNavbar,
    MainFooter,
    PageBanner,
  },
  data() {
    return {
      // bannerTitleI18: this.$route.meta.bannerTitleI18 === false ? false : true,
    }
  },
  computed: {
    getBannerTitle() {
      const bannerTitle = this.$route.meta.title ? this.$route.meta.title : ''
      const bannerTitleI18 =
        this.$route.meta.bannerTitleI18 === false ? false : true
      return bannerTitleI18 ? this.$t(bannerTitle) : bannerTitle
    },
    getHeight() {
      return this.$route.meta.height ? this.$route.meta.height : '200px'
    },
    getBannerImg() {
      return this.$route.meta.bannerImg ? this.$route.meta.bannerImg : ''
    },
    getFooterStatus() {
      return this.$route.meta.footerStatus === false ? false : true
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
    > .container {
      min-height: var(--main-content-container-height);
    }
  }
}
</style>
