<template>
  <div class="order-summary">
    <OrderSummaryCard />
  </div>
</template>

<script>
import OrderSummaryCard from './components/OrderSummaryCard.vue'
// import homeService from './home.service'

export default {
  name: 'OrderSummary',
  components: { OrderSummaryCard },
  props: { id: { type: String, default: '' } },
  data() {
    return {
      members: [],
      details: null,
    }
  },
  methods: {
    // findAll() {
    //   homeService.findAll().then((response) => {
    //     this.members = response.data.data
    //   })
    // },
  },
  created() {
    // this.findAll()
  },
}
</script>

<style lang="scss">
.order-summary {
  display: flex;
  justify-content: center;
  position: relative;
}
</style>
