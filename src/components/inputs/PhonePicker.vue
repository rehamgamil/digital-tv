<template>
  <label class="input-label">{{ label }}</label>
  <MazPhoneNumberInput
    :key="phoneCCName"
    v-model="phoneNumber"
    show-code-on-list
    :preferred-countries="['SA', 'EG', 'US', 'GB']"
    :default-country-code="phoneCCName ? phoneCCName : 'SA'"
    :translations="{
      countrySelector: {
        placeholder: $t('phonePicker.countryCode'),
        error: $t('phonePicker.chooseCountry'),
      },
      phoneInput: {
        placeholder: label ? label : $t('phonePicker.phoneNumber'),
        example: $t('phonePicker.example'),
      },
    }"
    :no-example="true"
    @update="results = $event"
    :success="results?.isValid"
    :disabled="disabled"
   
  />
</template>

<script>
import MazPhoneNumberInput from 'maz-ui/components/MazPhoneNumberInput'

export default {
  components: { MazPhoneNumberInput },
  data() {
    return {
      phoneNumber: '',
      results: '',
    }
  },
  props: {
    label: {
      default: '',
      type: String,
    },
    value: {
      default: '',
      type: String,
    },
    phone: {
      default: '',
      type: String,
    },
    phoneCC: {
      default: '',
      type: String,
    },
    phoneCCName: {
      default: '',
      type: String,
    },
    // id: {
    //   default: '',
    //   type: String,
    // },
    disabled: {
      default: false,
    },
  },
  watch: {
    phone: function (val) {
      this.phoneNumber = val
    },
    phoneNumber: function () {
      setTimeout(() => {
        this.$emit('valueChanged', this.results?.isValid ? this.results : '')
      }, 500)
    },
  },
}
</script>

<style lang="scss">
html[lang='ar'] input.m-phone-number-input__input {
 direction: ltr;
 text-align: end;
}
</style>
