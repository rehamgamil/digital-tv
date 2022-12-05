<template>
  <div class="auth-page sign-in">
    <b-form @submit.prevent="onSubmit">
      <div class="custom-card">
        <div>
          <PhonePicker
            v-on:valueChanged="user.phone = $event.e164"
            :label="$t('global.mobileNumber')"
          />
          <MainInput
          v-on:valueChanged="user.password = $event"
            :label="$t('global.password')"
            type="password"
          />

          <div class="mt-3 px-3 d-flex justify-content-end">
            <!-- <b-form-checkbox class="remember-me">
          {{ $t('auth.rememberMe') }}
        </b-form-checkbox> -->
            <router-link  :to="{ name: 'auth.ForgetPassword' }" class="text-dark">
              {{ $t('auth.forgetPassword') }}
            </router-link>
          </div>
        </div>
      </div>
      <p class="text-secondary">
        {{ $t('auth.dontHaveAccount') }}
        <router-link :to="{ name: 'auth.SignUp' }">
          {{ $t('auth.createNewAccount') }}
        </router-link>
      </p>
      <SubmitBtn
        :label="$t('auth.signIn')"
        :loading="loading"
        className="btn-auth"
        position="center"
      />
    </b-form>

    <AuthFooter />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { core } from '@/config/pluginInit'
import authService from './auth.service'
import AuthFooter from './components/AuthFooter.vue'

export default {
  name: 'SignIn',
  components: { AuthFooter },
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
  .remember-me + label {
    color: var(--co-secondary-text);
  }
}
</style>
