<template>
  <div>
    <b-skeleton-wrapper :loading="!dataLoaded">
      <template #loading>
        <b-card>
          <b-skeleton width="85%"></b-skeleton>
          <b-skeleton width="55%"></b-skeleton>
          <b-skeleton width="70%"></b-skeleton>
          <br/>
          <b-skeleton width="50%"></b-skeleton>
          <b-skeleton width="75%"></b-skeleton>
        </b-card>
      </template>
      <b-form @submit.prevent="placeCardOrder">
        <div class="row" v-show="!hyperpayForm">
          <div class="col-lg-6 col-md-12 mb-5">
            <h4 class="pb-4 fw-bold">{{ $t('checkOut.checkoutYourOrder') }}</h4>


            <div class="checkout-order">
              <b-card sub-title="Card subtitle" class="checkout-order-details">
                <div class="p-3">
                  <div class="d-flex justify-content-between fw-bold pb-2">
                    <p>{{ $t('checkOut.product') }}</p>
                    <p>{{ $t('memberships.total') }}</p>
                  </div>

                  <div
                    class="
                      d-flex
                      justify-content-between
                      order-details-price
                      pt-4
                      pb-2
                    "
                  >
                    <p class="">{{ membership.packageName }}</p>
                    <p class="">
                      {{ membership.amount + $t('global.currency') }}
                    </p>
                  </div>

                  <div class="pt-3">
                    <!-- <p class="coupon-text">{{ $t('checkOut.couponCode') }}</p>
                    <div class="py-2 d-flex order-details-input">
                      <input type="text" name="name" class="input-payment" />
                      <button class="input-btn-checkout">
                        {{ $t('global.apply') }}
                        <span><i class="fas fa-check-circle"></i></span>
                      </button>
                    </div> -->
                    <div
                      class="d-flex justify-content-between pt-3 order-subtotal"
                    >
                      <p>{{ $t('checkOut.subtotal') }}</p>
                      <p>{{ membership.amount + $t('global.currency') }}</p>
                    </div>
                    <div class="d-flex justify-content-between order-vat">
                      <p>{{ $t('memberships.VAT') }}</p>
                      <p>{{ vat + $t('global.currency') }}</p>
                    </div>
                    <div
                      class="
                        d-flex
                        justify-content-between
                        order-total-details
                        pt-3
                      "
                    >
                      <div class="total-order">
                        <h5 class="fw-bold">{{ $t('memberships.total') }}</h5>
                        <span>(inc. {{ $t('memberships.VAT') }})</span>
                      </div>
                      <h5 class="align-self-center fw-bold price">
                        {{ total + $t('global.currency') }}
                      </h5>
                    </div>
                  </div>
                </div>
              </b-card>
            </div>
          </div>
          <div class="col-lg-6 col-md-12">
            <h4 class="fw-bold">{{ $t('checkOut.setYourPaymentMethod') }}</h4>
            <b-form-group v-slot="{ ariaDescribedby }" class="custom-radio">
              <b-form-radio
                v-model="paymentMethod"
                :aria-describedby="ariaDescribedby"
                name="paymentMethod"
                value="cash"
              >
                <img
                  class="radio-img"
                  src="@/assets/images/icons/cash.png"
                  alt=""
                />
                <span>{{ $t('checkOut.cashPayment') }}</span>
              </b-form-radio>
              <b-form-radio
                v-model="paymentMethod"
                :aria-describedby="ariaDescribedby"
                name="paymentMethod"
                value="online"
              >
                <img
                  class="radio-img"
                  src="@/assets/images/icons/credit.png"
                  alt=""
                />
                <span>{{ $t('checkOut.onlinePayment') }}</span>
              </b-form-radio>
            </b-form-group>

            <b-form-checkbox
              v-model="agreeTermsAndConditions"
              id="agreeTermsAndConditions"
              name="agreeTermsAndConditions"
            >
              {{ $t('checkOut.IAgree') }} {{ $t('checkOut.conditions') }}
            </b-form-checkbox>
            <!-- <b-button
              @click="placeCardOrder"
              :disabled="!paymentMethod || !agreeTermsAndConditions"
              class="btn-purchase fw-bold"
            >
              {{ $t('checkOut.purchase') }}
            </b-button> -->
            <SubmitBtn
              :label="$t('checkOut.purchase')"
              :loading="loading"
              :disabled="!paymentMethod || !agreeTermsAndConditions"
              className="btn-purchase fw-bold"
              position="center"
            />
          </div>
        </div>
      </b-form>
    </b-skeleton-wrapper>

    <transition name="fade">
      <div
        class="overlay justify-content-center align-items-center"
        :class="{ 'd-flex': hyperpayForm }"
        v-show="hyperpayForm"
      >
        <div class="hyperpay-form bg-white p-3 mx-4">
          <h5 class="border-bottom pb-2">Enter your card information</h5>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { paymentConfig } from '@/utils/payment'
import { mapGetters } from 'vuex'
import homeService from '@/pages/home/home.service'
import Membership from '@/pages/home/models/Membership'

export default {
  name: 'CheckoutPage',
  props: { id: { type: String, default: '' } },
  computed: {
    ...mapGetters({ paymentGateway: 'settings/paymentGateway' }),
    total() {
      return this.membership.amount + this.vat
    },
  },
  data() {
    return {
      loading: false,
      dataLoaded: false,
      hyperpayForm: false,
      paymentMethod: '',
      agreeTermsAndConditions: false,
      vat: 10,
      membership: new Membership(),
    }
  },
  methods: {
    async placeCardOrder() {
      this.loading = true
      const res = await paymentConfig()
      if (this.paymentGateway == 'HyperPay') {
        this.hyperpayForm = true
        // create script tag and src = res.url
        const script = document.createElement('script')
        script.src = res.url
        document.body.appendChild(script)
        // create form and append to hyperpay-form
        const form = document.createElement('form')
        form.classList.add('paymentWidgets')
        form.setAttribute('data-brands', 'VISA MASTER AMEX')
        form.action = '/payment/payment-status'
        document.querySelector('.hyperpay-form').appendChild(form)
      }
      console.log(res)
      this.loading = false
    },
    findOne() {
      homeService
        .findOne(this.id)
        .then((response) => {
          this.membership.fillData(response.data.data)
        })
        .catch(() => this.$router.push({ name: 'Home' }))
        .finally(() => (this.dataLoaded = true))
    },
  },
  created() {
    this.findOne()
  },
}
</script>

<style lang="scss">
.checkout-order {
  // width: 80%;
  .order-details-price {
    border-top: 1px solid var(--co-secondary-text);
    border-bottom: 1px solid var(--co-secondary-text);
  }
  .coupon-text {
    font-size: 14px;
  }
  .order-details-input {
    position: relative;
    justify-items: center;
    align-content: center;
    .input-btn-checkout {
      background-color: var(--co-primary);
      padding: 11px;
      color: white;
      border-radius: 20px;
      position: absolute;
      right: 0;
    }
    .input-payment {
      border: 1px solid var(--co-secondary-text);
      border-radius: 20px;
      padding: 10px;
      width: 100%;
    }
    input:focus {
      outline: none;
    }
  }
  .order-subtotal {
    color: var(--co-secondary-text);
  }
  .order-total-details {
    padding-bottom: 35px;
    border-bottom: 1px solid var(--co-secondary-text);
    .price {
      color: var(--co-primary);
    }
  }
  .order-vat {
    color: var(--co-secondary-text);
  }
}

.img-payment {
  width: 10%;
}
.btn-purchase {
  background-color: var(--co-primary);
  border-radius: 25px;
  text-align: center;
  padding: 15px;
  margin-top: 20px;
  color: white;
  width: 100%;
}

.custom-radio {
  .form-check {
    display: flex;
    align-items: center;
    column-gap: 10px;
    .form-check-label {
      display: flex;
      align-items: center;
      column-gap: 10px;
      .radio-img {
        width: 40px;
      }
    }
  }
}
</style>
