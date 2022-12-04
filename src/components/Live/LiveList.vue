<template>
  <div class="pt-5">
  <div class="d-flex gap-3 ">
 <img src="@/assets/images/live.png" alt="" class="live-icon">
 <h3 class="fw-bold mb-3">Live Racec</h3>


</div>
  <div
    class="place-list d-flex gap-3"
  >
  
    <live-card v-for="item in 4" :key="item" />
  </div> 
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