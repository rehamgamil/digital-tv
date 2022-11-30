<template>
  <div
    class="place-list d-flex gap-3"
  >
    <live-card v-for="item in 4" :key="item" />
  </div>
</template>

<script>
import LiveCard from '../Live/LiveCard.vue'
export default {
  components: { LiveCard },
  props: {
    items: { type: Array, default: () => [] },
  },
}
</script>