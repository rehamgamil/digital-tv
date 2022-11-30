<template>
  <div class="d-flex gap-3 mt-5 mb-3">
    <img src="@/assets/images/icons/time.png" alt="" class="live-icon" />
    <h3 class="fw-bold color-title">Last Racec</h3>
  </div>
  <div class="place-list d-flex gap-3 mt-3">
    <last-card v-for="item in 4" :key="item" />
  </div>
</template>

<script>
import lastCard from '../lastRacec/lastCard.vue'
export default {
  components: { lastCard },
  props: {
    items: { type: Array, default: () => [] },
  },
}
</script>

<style>
.color-title{
  color: var(--co-secondary-text);
}
</style>