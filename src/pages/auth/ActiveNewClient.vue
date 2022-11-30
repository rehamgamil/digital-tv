<template>
  <div class="auth-page otp">
    <div class="otp mx-auto max-w-3xl pt-10 text-center">
      <h1 class=" text-2xl font-bold">{{ $t('auth.otp') }}</h1>
      <p class="mb-4">{{ $t('auth.EnterTheCodeYouRecivedOnYourPhone') }}</p>
      <b-form @submit.prevent="onSubmit">
        <div class="d-flex gap-4 justify-center">
          <input
            v-for="(otp, index) in otpInputs"
            :key="index"
            v-model="otpInputs[index]"
            class="
              otp-input
              border border-solid border-black
              rounded-md
              text-center text-2xl
              font-bold
              focus:outline-none
              focus:ring-2
              focus:ring-primary
              focus:border-transparent
              mb-4
              md:mb-0
            "
            maxlength="1"
            @keyup="focusNext(index)"
            :ref="`otp${index}`"
            id="otp"
            type="text"
          />
        </div>
        <!-- <div class="my-4 sm:w-1/2 md:w-1/3 m-auto">
          <button
            class="bg-primary text-white py-2 px-5 text-sm outline-none"
            type="submit"
          >
          {{ $t('auth.verify') }}
          </button>
        </div> -->
        <SubmitBtn
          :label="$t('auth.verify')"
          :loading="loading"
          className="btn-auth"
          position="center"
        />
      </b-form>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { core } from '@/config/pluginInit'
import authService from './auth.service'

export default {
  data() {
    return {
      otpInputs: ['', '', '', '', ''],
      loading: false,
      user: {
        phone: '',
        code: '',
      },
    }
  },
  computed: {
    ...mapGetters({
      otpPhone: 'auth/otpPhone',
    }),
  },
  methods: {
    ...mapActions({
      setOTPPhone: 'auth/setOTPPhone',
      setAuthorizationToken: 'auth/setAuthorizationToken',
      setUserData: 'auth/setUserData',
    }),
    onSubmit() {
      this.loading = true
      this.user.phone = this.otpPhone
      this.user.code = this.otpInputs.join('')
      authService
        .activeNewClient(this.user)
        .then((response) => {
          this.loading = false
          this.setOTPPhone('')
          core.showSnackbar('success', response.data.message)
          this.setAuthorizationToken(response.data.data.access_token)
          this.setUserData(response.data.data.ClientData)
          this.$router.push({ name: 'Home' })
        })
        .finally(() => (this.loading = false))
    },
    focusNext(index) {
      if (this.otpInputs[index].length === 1 && index < 4) {
        this.$refs[`otp${index + 1}`][0].focus()
      }
      // call verify function when all inputs are filled and all inputs are numbers
      else if (
        this.otpInputs[index].length === 1 &&
        index === 4 &&
        this.otpInputs.every((otp) => otp !== '')
      ) {
        this.onSubmit()
      }
    },
  },
  mounted() {
    this.$refs.otp0[0].focus()
  },
}
</script>

<style lang="scss">
@import '@/assets/styles/auth-page.scss';
.otp-input {
  width: 55px;
  height: 50px;
}
</style>
