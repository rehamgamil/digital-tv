<template>
  <div class="custom-page-title">
    <h1 class="">{{ pageTitle }}</h1>
  </div>
</template>

<script>
export default {
  props: {
    pageTitle: { type: String, default: '' },
  },
}
</script>

<style lang="scss">
.custom-page-title {
  text-align: center;
  h1 {
    position: relative;
    font-size: 40px;
    // text-transform: lowercase;
    padding-bottom: 1rem;
    display: flex;
    justify-content: center;
    &::before,
    &::after {
      content: ' ';
      position: absolute;
      border-radius: 2px;
    }
    &::after {
      background-color: var(--co-primary);
      bottom: -5px;
      height: 8px;
      width: 80px;
    }
    &::before {
      bottom: -2px;
      height: 3px;
      width: 200px;
      background-color: var(--co-primary);
      border-radius: 2px;
    }
  }
}
</style>
