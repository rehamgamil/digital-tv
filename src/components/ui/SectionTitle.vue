<template>
  <div
    class="section-title d-flex justify-content-between text-center py-5"
    :class="this.mode === 'secondary' ? 'text-white' : ''"
  >
    <h3 class="font-bolder text-base uppercase"><slot></slot></h3>
    <router-link
      :to="url"
      class="border-b border-solid"
      :class="
        this.mode === 'secondary'
          ? 'text-white border-white'
          : 'text-primary border-primary'
      "
      >{{ $t('global.viewAll') }}</router-link
    >
  </div>
</template>

<script>
export default {
  props: {
    url: {
      type: String,
      required: true,
    },
    mode: {
      type: String,
      required: false,
    },
  },
}
</script>

<style>
</style>