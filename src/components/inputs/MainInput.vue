<template>
  <div>
    <p v-if="labelStatus" class="input-label">{{ label }}</p>

    <MazInput
      v-model="inputValue"
      :id="id"
      :placeholder="label"
      :type="type"
      :disabled="disabled"
      :autocomplete="autocomplete ? 'on' : 'off'"
    />
  </div>
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
    labelStatus: {
      default: true,
      type: Boolean,
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
      this.$emit('valueChanged', val)
    },
  },
}
</script>

