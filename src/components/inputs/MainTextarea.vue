<template>
  <b-form-group :label="label" :label-for="id" class="main-textarea">
    <textarea
      v-model="inputValue"
      :id="id"
      :class="'form-control bg-white'"
      :placeholder="placeholder"
      :disabled="disabled"
    >
    </textarea>
  </b-form-group>
</template>
<script>
export default {
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
    id: {
      default: '',
      type: String,
    },
    value: {
      default: '',
      type: String,
    },
    placeholder: {
      default: '',
      type: String,
    },
    disabled: {
      default: false,
    },
  },
  watch: {
    value: function (val) {
      this.inputValue = val
    },
    inputValue: function (val) {
      // this.$emit('input', val)
      this.$emit('valueChanged', val)
    },
  },
}
</script>
