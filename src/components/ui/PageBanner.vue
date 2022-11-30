<template>
  <div
    class="page-banner"
    :style="{
      backgroundImage: `url(${backgroundURL})`,
      height: height,
    }"
  >
    <div class="page-title">
      <h2 class="text-white">{{ pageTitle }}</h2>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    pageTitle: { type: String, default: '' },
    pageLine: { type: String, default: '' }, // ?
    height: { type: String, default: '200px' },
  },
  computed: {
    backgroundURL() {
      return require(`@/assets/images/bannerpage.jpg`)
    },
  },
}
</script>

<style lang="scss">
.page-banner {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
