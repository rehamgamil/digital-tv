<template>
  <div class="auth-page">
    <h2 class="text-center mb-5 ">Sign Up</h2>
    <b-form @submit.prevent="onSubmit">
      
        <MainInput  class="signup-form " v-model="user.name" :label="$t('global.name')" id="name" />
     
        <PhonePicker
          v-on:valueChanged="user.phone = $event.e164"
          :label="$t('global.mobileNumber')"
          id="phoneNumber"
        />
        <div class="text-center">
        <MainInput
          v-model="user.email"
          :label="$t('global.email')"
          id="email"
          class="email"
          
        />
      </div>

        <MainSelect
          :options="GENDERS"
          v-model="user.gender"
          :label="$t('global.gender')"
          optionLabelKey="name"
          optionValueKey="id"
        />

        <MainInput
          v-model="user.password"
          :label="$t('global.password')"
          type="password"
          id="password"
        />

        <MainInput
          v-model="user.password_confirmation"
          :label="$t('global.confirmPassword')"
          type="password"
          id="user-password_confirmation"
        />
    

      <SubmitBtn
        label="Sign UP"
        :loading="loading"
        className="btn-auth"
        position="center"
      />
    </b-form>

    <p class="text-center text-secondary">
      {{ $t('auth.alreadyHaveAccount') }}
      <router-link :to="{ name: 'auth.SignIn' }" class="text-primary">
        {{ $t('auth.signIn') }}
      </router-link>
    </p>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { GENDERS } from '@/config/constantLists'
import authService from './auth.service'

export default {
  name: 'SignUp',
  data() {
    return {
      loading: false,
      user: {
        name: '',
        phone: '',
        email: '',
        birth_date: '',
        gender: '',
        password: '',
        password_confirmation: '',
      },
      GENDERS,
    }
  },
  methods: {
    ...mapActions({
      setOTPPhone: 'auth/setOTPPhone',
    }),
    onSubmit() {
      this.loading = true
      authService
        .signUp(this.user)
        .then(() => {
          this.loading = false
          this.setOTPPhone(this.user.phone)
          this.$router.push({ name: 'auth.ActiveNewClient' })
        })
        .finally(() => (this.loading = false))
    },
  },
}
</script>

<style lang="scss">
@import '@/assets/styles/auth-page.scss';

.auth-page {
  width: 520px;
}
</style>
