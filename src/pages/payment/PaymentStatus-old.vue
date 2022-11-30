<template>
  <div class="payment-status">
    <div class="spinner-border" v-if="loading">
      <span class="sr-only">Loading...</span>
    </div>
    <template v-else>
      <div class="payment-status__image">
        <img
          :src="require(`@/assets/images/${paymentImage}.svg`)"
          alt="payment-status"
        />
      </div>
      <div
        class="payment-status__title mt-2"
        :class="status ? 'text-success' : 'text-danger'"
      >
        {{ statusMessage }}
      </div>
    </template>
  </div>
</template>

<script>
import { registerPayment } from "@/utils/payment";
export default {
  data() {
    return {
      loading: true,
      statusMessage: "",
      status: null
    };
  },
  computed: {
    paymentImage() {
      return this.status == true ? "payment-success" : "payment-failure";
    }
  },
  created() {
    registerPayment(this.$route.query)
      .then(() => {
        this.statusMessage = "payment successful";
        this.status = true;
      })
      .catch(() => {
        this.statusMessage = "payment failed, something went wrong";
        this.status = false;
      })
      .finally(() => {
        this.loading = false;
      });
  }
};
</script>

<style lang="scss">
.payment-status {
  position: relative;
  min-height: 40vh;
  font-size: 2rem;
  margin-top: 2rem;
  padding: 0 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  .spinner-border {
    width: 3rem !important;
    height: 3rem !important;
    border-style: dotted !important;
  }
  &__image {
    margin-top: 2rem;
    img {
      width: 5rem;
    }
  }
}
</style>
