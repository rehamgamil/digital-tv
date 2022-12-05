<template>
  <div class="auth-page">
    <b-form @submit.prevent="onSubmit">
      <div class="custom-card">
        <b-row>
          <b-col md="12">
            <MainInput
              v-on:valueChanged="user.name = $event"
              :label="$t('global.name')"
              id="name"
            />
          </b-col>
          <b-col md="12">
            <MainInput
              v-on:valueChanged="user.email = $event"
              :label="$t('global.email')"
              id="email"
            />
          </b-col>

          <b-col md="12">
            <PhonePicker
              v-on:valueChanged="user.phone = $event.e164"
              :label="$t('global.mobileNumber')"
              id="phoneNumber"
            />
          </b-col>


          <b-col md="6">
            <DateTimePicker
              v-on:valueChanged="user.birth_date = $event"
              :label="$t('global.birthDate')"
              type="date"
            />
          </b-col>
          <b-col md="6">
            <MainSelect
              :options="GENDERS"
              v-on:valueChanged="user.gender = $event"
              :label="$t('global.gender')"
              optionLabelKey="name"
              optionValueKey="id"
            />
          </b-col>

          <b-col md="12">
            <MainInput
              v-on:valueChanged="user.password = $event"
              :label="$t('global.password')"
              type="password"
              id="password"
            />
          </b-col>
          <b-col md="12">
            <MainInput
              v-on:valueChanged="user.password_confirmation = $event"
              :label="$t('global.confirmPassword')"
              type="password"
              id="user-password_confirmation"
            />
          </b-col>
        </b-row>
      </div>

      <SubmitBtn
        :label="$t('auth.createNewAccount')"
        :loading="loading"
        className="btn-auth"
        position="center"
      />
    </b-form>

    <p class="text-center text-secondary">
      {{ $t('auth.alreadyHaveAccount') }}
      <router-link :to="{ name: 'auth.SignIn' }">
        {{ $t('auth.signIn') }}
      </router-link>
    </p>

    <AuthFooter />
  </div>
</template>

<script>
import AuthFooter from './components/AuthFooter.vue'
import { mapActions } from 'vuex'
import { GENDERS } from '@/config/constantLists'
import authService from './auth.service'

export default {
  name: 'SignUp',
  components: { AuthFooter },
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


</style>
