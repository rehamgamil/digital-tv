<template>
  <div class="auth-page">
    <b-form @submit.prevent="onSubmit">
      <div class="custom-card">
        <div>
          <MainInput
            v-on:valueChanged="user.new_password = $event"
            :label="$t('global.password')"
            type="password"
          />
          <MainInput
            v-on:valueChanged="user.password_confirmation = $event"
            :label="$t('global.confirmPassword')"
            type="password"
          />
        </div>
      </div>

      <SubmitBtn
        :label="$t('auth.setNewPassword')"
        :loading="loading"
        className="btn-auth"
        position="center"
      />
    </b-form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { core } from '@/config/pluginInit'
import authService from './auth.service'

export default {
  name: 'ForgetPassword',
  data() {
    return {
      loading: false,
      user: {
        phone: '',
        code: '',
        new_password: '',
        password_confirmation: '',
      },
    }
  },
  computed: {
    ...mapGetters({
      resetPasswordPhone: 'auth/resetPasswordPhone',
      resetPasswordCode: 'auth/resetPasswordCode',
    }),
  },
  methods: {
    ...mapActions({
      setAuthorizationToken: 'auth/setAuthorizationToken',
      setUserData: 'auth/setUserData',
      setResetPasswordPhone: 'auth/setResetPasswordPhone',
      setResetPasswordCode: 'auth/setResetPasswordCode',
    }),
    onSubmit() {
      this.loading = true
      this.user.phone = this.resetPasswordPhone
      this.user.code = this.resetPasswordCode
      authService
        .resetPasswordOTPSetNewPassword(this.user)
        .then((response) => {
          this.loading = false
          core.showSnackbar('success', response.data.message)
          this.setResetPasswordPhone('')
          this.setResetPasswordCode('')
          this.setAuthorizationToken(response.data.data.access_token)
          this.setUserData(response.data.data.ClientData)
          this.$router.push({ name: 'Home' })
        })
        .finally(() => (this.loading = false))
    },
  },
}
</script>

<style lang="scss">
@import '@/assets/styles/auth-page.scss';
</style>
