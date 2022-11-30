<template>
  <MazInput
    v-model="inputValue"
    :id="id"
    :label="label"
    :type="type"
    :disabled="disabled"
    :autocomplete="autocomplete ? 'on' : 'off'"
  />
</template>

<script>
import MazInput from 'maz-ui/components/MazInput'

export default {
  components: { MazInput },
  data() {
    return {
      inputValue: '',
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
    type: {
      default: 'text',
      type: String,
    },
    id: {
      default: '',
      type: String,
    },
    disabled: {
      default: false,
      type: Boolean,
    },
    autocomplete: {
      default: false,
      type: Boolean,
    },
  },
  watch: {
    value: function (val) {
      this.inputValue = val
    },
    inputValue: function (val) {
      this.$emit('input', val)
    },
  },
}
</script>

<style>

</style>
