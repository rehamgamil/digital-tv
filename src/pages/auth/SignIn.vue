<template>
  <div class="auth-page sign-in">
    <h2 class="text-center pb-5 mb-5">SIGN IN</h2>
    <b-form @submit.prevent="onSubmit" >
      <div class="form-signin">
      <PhonePicker class="phone-input"
        v-on:valueChanged="user.phone = $event.e164"
        :label="$t('global.mobileNumber')"
      /></div>
      <MainInput
      class="pass-input"
        v-model="user.password"
        :label="$t('global.password')"
        type="password"
      />

      <div class="mt-3 px-3 d-flex justify-content-between">
        <b-form-checkbox class="remember-me">
          {{ $t('auth.rememberMe') }}
        </b-form-checkbox>
        <!-- <router-link :to="{ name: 'auth.SignUp' }" class="text-dark">
          {{ $t('auth.forgotPassword') }}
        </router-link> -->
      </div>

      <SubmitBtn
        :label="$t('auth.signIn')"
        :loading="loading"
        className="btn-auth"
        position="center"
      />
    </b-form>

    <p class="text-center text-secondary">
      {{ $t('auth.dontHaveAccount') }}
      <router-link :to="{ name: 'auth.SignUp' }" class="text-primary">
        {{ $t('auth.createNewAccount') }}
      </router-link>
    </p>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { core } from '@/config/pluginInit'
import authService from './auth.service'

export default {
  name: 'SignIn',
  data() {
    return {
      loading: false,
      user: {
        phone: '',
        password: '',
      },
    }
  },
  methods: {
    ...mapActions({
      setAuthorizationToken: 'auth/setAuthorizationToken',
      setUserData: 'auth/setUserData',
    }),
    onSubmit() {
      this.loading = true
      authService
        .signIn(this.user)
        .then((response) => {
          this.loading = false
          core.showSnackbar('success', response.data.message)
          this.setAuthorizationToken(response.data.data.access_token)
          this.setUserData(response.data.data.ClientData)
          this.$router.push({ name: 'Home' })
        })
        .finally(() => (this.loading = false))
      // core.showSnackbar('success', 'zzzzzzz')
      // this.setAuthorizationToken('zzzzzzzzzzzzzzzzzzzzzzz')
      // this.setUserData({ name: 'name' })
      // this.$router.push({ name: 'Home' })
    },
  },
}
</script>

<style lang="scss">
@import '@/assets/styles/auth-page.scss';

.sign-in {
  max-width: 520px;

  .remember-me + label {
    color: var(--co-secondary-text);
  }
}

.form-signin{
  border-radius: 60px;
}
</style>
