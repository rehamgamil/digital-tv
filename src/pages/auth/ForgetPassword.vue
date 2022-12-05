<template>
  <div class="auth-page">
    <b-form @submit.prevent="onSubmit">
      <div class="custom-card">
        <div>
          <h3>{{ $t('auth.forgetPassword') }}</h3>
          <p class="text-secondary">{{ $t('auth.forgetPasswordText') }}</p>

          <PhonePicker
            v-on:valueChanged="user.phone = $event.e164"
            :label="$t('global.mobileNumber')"
          />
        </div>
      </div>

      <SubmitBtn
        :label="$t('auth.resetPassword')"
        :loading="loading"
        className="btn-auth"
        position="center"
      />
    </b-form>
  </div>
</template>

<script>
// import { mapActions } from 'vuex'
// import { core } from '@/config/pluginInit'
// import authService from './auth.service'

export default {
  name: 'ForgetPassword',
  data() {
    return {
      loading: false,
      user: {
        phone: '',
      },
    }
  },
  // methods: {
  //   ...mapActions({ setResetPasswordPhone: 'auth/setResetPasswordPhone' }),
  //   onSubmit() {
  //     this.loading = true
  //     authService
  //       .resetPasswordOTP(this.user)
  //       .then((response) => {
  //         this.loading = false
  //         core.showSnackbar('success', response.data.message)
  //         this.setResetPasswordPhone(this.user.phone)
  //         this.$router.push({ name: 'auth.ResetPasswordOTP' })
  //       })
  //       .finally(() => (this.loading = false))
  //   },
  // },
}
</script>

<style lang="scss">
@import '@/assets/styles/auth-page.scss';
</style>
