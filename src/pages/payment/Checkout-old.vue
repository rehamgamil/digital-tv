<template>
  <!-- checkout page -->
  <div class="checkout shadow-none bg-transparent p-0">
    <div class="row">
      <div class="col-md-6 col-lg-8">
        <div class="checkout__info shadow-lg rounded-lg">
          <div class="checkout__info--header mb-3">
            <h5>{{ $t("personalInfo") }}</h5>
          </div>
          <user-info-form :user="user" />
          <hr />
          <user-addresses class="my-4" />
          <hr />
          <payment class="my-4" @paymentMethod="setPaymentMethod" />
          <!-- <app-button :loading="loading" @click.native="placeOrder">{{
            $t("placeOrder")
          }}</app-button> -->
        </div>
      </div>

      <div class="col-md-6 col-lg-4 mt-4 mt-md-0">
        <order-summary />
      </div>
    </div>
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
// import AppButton from "@/components/Global/AppButton.vue";
import { displayErrors, clearErrors } from "@/helpers/errors";
import UserAddresses from "@/components/Address/UserAddresses.vue";
import OrderSummary from "@/components/Checkout/orderSummary.vue";
import UserInfoForm from "@/components/Checkout/UserInfoForm.vue";
import Payment from "@/components/Checkout/Payment.vue";
import { mapGetters } from "vuex";
import { EventBus } from "@/main";
import { paymentConfig } from "@/utils/payment";

export default {
  name: 'CheckoutPage',
  components: {
    // AppButton,
    UserAddresses,
    OrderSummary,
    UserInfoForm,
    Payment
  },

  data() {
    return {
      loading: false,
      code: "",
      addressId: localStorage.getItem("mainAddress"),
      paymentMethod: null,
      hyperpayForm: false
    };
  },
  computed: {
    ...mapGetters({
      userData: "auth/user"
    }),
    user() {
      return { ...this.userData, notes: "" };
    }
  },
  methods: {
    setPaymentMethod(paymentMethod) {
      this.paymentMethod = paymentMethod;
    },
    placeOrder() {
      if (this.paymentMethod === "cash") {
        return this.placeCashOrder();
      } else if (this.paymentMethod === "card") {
        return this.placeCardOrder();
      }
      return this.$toasted.show("please select payment method", {
        type: "error",
        position: "bottom-center",
        duration: 3000
      });
    },

    async placeCashOrder() {
      const order_products = this.orderItems.map(item => {
        return {
          productId: item.product.id,
          quantity: item.quantity
        };
      });
      const { name, phone, email, notes } = this.user;
      const data = {
        name,
        phone,
        email,
        notes,
        order_products,
        offer_code: this.code,
        addressId: this.addressId
      };
      this.loading = true;
      clearErrors();
      try {
        await this.$api.post("/orders", data, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        });
        this.$toasted.show("order placed succssefuly", {
          type: "success",
          position: "bottom-center",
          duration: 3000
        });
        this.$router.push({ name: "orders-history" });
        this.$store.dispatch("cart/clearCart");
      } catch (err) {
        const errors = err.response.data.errors;
        if ("addressId" in errors) {
          this.$toasted.show(errors.addressId[0], {
            type: "error",
            position: "bottom-center",
            duration: 3000
          });
        } else {
          displayErrors(errors);
        }
      }
      this.loading = false;
    },
    async placeCardOrder() {
      this.loading = true;
      const gateway = this.$store.state.settings.paymentGateway;
      const res = await paymentConfig();
      if (gateway == "HyperPay") {
        this.hyperpayForm = true;
        // create script tag and src = res.url
        const script = document.createElement("script");
        script.src = res.url;
        document.body.appendChild(script);
        // create form and append to hyperpay-form
        const form = document.createElement("form");
        form.classList.add("paymentWidgets");
        form.setAttribute("data-brands", "VISA MASTER AMEX");
        form.action = "/checkout/payment-status";
        document.querySelector(".hyperpay-form").appendChild(form);
      }
      console.log(res);
      this.loading = false;
    }
  },
  created() {
    EventBus.$on("offerApplied", code => {
      this.code = code;
    });
  }
};
</script>

<style lang="scss">
.checkout {
  margin: 24px 0;

  .checkout__info,
  .order-summary {
    background: var(--bg-secondary-color);
    padding: 24px;
  }

  .order-summary {
    overflow: hidden;

    .cart__products {
      max-height: 320px;
      overflow-y: auto;
      overflow-x: hidden;
      padding-inline-end: 10px;
    }
  }
  .disable-payment {
    pointer-events: none;
    opacity: 0.5;
  }
}
</style>
