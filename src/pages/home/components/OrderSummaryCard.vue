<template>
  <div class="order-summary-card">
    <h5 class="mb-3">{{ $t('memberships.yourOrderDetails') }}</h5>

    <div class="content-container">
      <div class="item">
        <span class="title">{{ packageName }}</span>
        <span class="value">{{
          `${packageValue} ${$t('global.currency')}`
        }}</span>
      </div>
      <div class="item">
        <span class="title">{{ $t('memberships.registrationFees') }}</span>
        <span class="value">{{
          `${registrationFeesValue} ${$t('global.currency')}`
        }}</span>
      </div>
      <div class="item">
        <span class="title">{{ $t('memberships.VAT') }}</span>
        <span class="value">{{ `${VATValue} ${$t('global.currency')}` }}</span>
      </div>
      <div class="custom-divider"></div>
      <div class="item">
        <span class="title">{{ $t('memberships.total') }}</span>
        <span class="value">{{
          `${totalValue} ${$t('global.currency')}`
        }}</span>
      </div>
    </div>

    <b-form-checkbox
      v-model="agreeTermsAndConditions"
      id="orderSummary-agreeTermsAndConditions"
      name="orderSummary-agreeTermsAndConditions"
      variant="danger"
    >
      {{ $t('global.agreeTermsAndConditions') }}
    </b-form-checkbox>

    <div class="text-center mt-4">
      <b-button
        v-b-modal="'order-summary'"
        variant="primary"
        class="rounded py-3 px-5"
      >
        <i class="fas fa-check-circle"></i>
        {{ $t('memberships.proceedToPayment') }}
      </b-button>
      <b-modal
        ref="my-modal"
        id="order-summary"
        title=""
        size="sm"
        class="base-modal"
        close-only
        hide-header
        hide-footer
        centered
      >
        <base-modal-content />
        <div class="text-center payment-modal py-3">
          <img
            src="@/assets/images/icons/success.png"
            alt=""
            class="mb-3 modal-success"
          />
          <h5 class="message fw-bold">
            {{ $t('memberships.paymentReceived') }}
          </h5>
          <p class="payment-received pb-2">
            we`ve received
            <span class="price">563.5 {{ $t('global.currency') }}</span> payment
          </p>
          <span class="line-payment"></span>
          <h6 class="pt-3 fw-bold">{{ $t('memberships.paymentDetails') }}</h6>
          <div class="payment">
            <div class="item">
              <span class="details">{{ $t('memberships.amount') }}</span>
              <span class="fw-bold">563.5 {{ $t('global.currency') }}</span>
            </div>
            <div class="item">
              <span class="details">{{ $t('memberships.date') }}</span>
              <span class="fw-bold">oct 10,2022</span>
            </div>
            <div class="item">
              <span class="details">{{ $t('memberships.methode') }}</span>
              <span class="fw-bold">VISA</span>
            </div>
            <div class="item mb-3">
              <span class="details">{{ $t('memberships.referenceNo') }}</span>
              <span class="fw-bold">#21358431</span>
            </div>
          </div>

          <b-button
            class="px-4"
            variant="primary"
            block
            v-b-modal.contact-send
            >{{ $t('global.close') }}</b-button
          >
        </div>
      </b-modal>
    </div>
  </div>
</template>

<script>
import BaseModalContent from '@/components/baseModalContent.vue'
export default {
  components: { BaseModalContent },
  props: {
    orderData: { type: Object },
  },
  data() {
    return {
      agreeTermsAndConditions: true,
      packageName: 'Golden Membership',
      packageValue: 390,
      registrationFeesValue: 100,
      VATValue: 73.5,
      totalValue: 563.5,
    }
  },
}
</script>

<style lang="scss">
.order-summary-card {
  max-width: 690px;
  min-width: 600px;
  background: var(--co-body-bg);
  border: 1px solid var(--co-primary);
  border-radius: 1rem;
  padding: 2rem 1.5rem;
  position: absolute;
  top: -3rem;
  .item {
    display: flex;
    justify-content: space-between;
    margin: 0.5rem 0;
    .title {
      font-size: 14px;
    }
    .value {
      color: var(--co-primary);
      font-size: 14px;
      font-weight: bold;
    }
  }
}
.line-payment {
  display: flex;
  border: 0.4000000059604645px solid var(--co-secondary-text);
}
.payment-modal {
  .payment-received {
    white-space: nowrap;
    color: var(--co-secondary-text);
  }
  .price {
    color: var(--co-third-text);
    font-weight: bold;
  }
}
.payment {
  .item {
    display: flex;
    justify-content: space-between;
  }

  .details {
    color: var(--co-secondary-text);
  }
}
</style>
