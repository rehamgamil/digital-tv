<template>
  <div class="d-flex gap-3 mt-5 mb-3">
 <img src="@/assets/images/icons/loading.png" alt="" class="live-icon">
 <h3 class="fw-bold color">Today Racec</h3>


</div>
  <div
    class="place-list d-flex gap-3 mt-3"
  >
    <today-card v-for="item in 4" :key="item" />
  </div>
</template>

<script>
import todayCard from '../todayRacec/todayCard.vue'
export default {
  components: { todayCard },
  props: {
    items: { type: Array, default: () => [] },
  },
}
</script>

<style>
.color{
  color: var(--co-primary);
}
</style>