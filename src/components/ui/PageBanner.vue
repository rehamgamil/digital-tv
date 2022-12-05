<template>
  <div
    class="page-banner"
    :style="{
       backgroundImage: getBackgroundImage,
      height: height ? height : '240px',
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
    // pageLine: { type: String, default: '' }, // ?
    height: { type: String, default: '' },
    bannerImg: { type: String, default: '' },
  
  },
  computed: {
    getBackgroundImage() {
      return this.bannerImg ? `url(${this.bannerImg})` : 'none'
    },
  },
}
</script>

<style lang="scss">
.page-banner {
  // background: url('@/assets/images/bannerpage.jpg') no-repeat 50%;
  background-color: var(--co-primary);
  background-size: cover;
  isolation: isolate;

  display: flex;
  justify-content: center;
  align-items: center;
  background-position: top;
  background-size: cover;
  .page-title {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.5);
    h2 {
      font-size: 2.25rem;
      font-weight: bold;
    }
  }
}
</style>
