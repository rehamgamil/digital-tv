<template>
  <MazSelect
    v-model="selectValue"
    :id="id"
    :label="label"
    :options="optionsObject"
    :disabled="disabled"
  />
</template>

<script>
import MazSelect from 'maz-ui/components/MazSelect'
export default {
  components: { MazSelect },
  data() {
    return {
      selectValue: '',
    }
  },
  props: {
    options: {
      type: Array,
      default: () => [],
    },
    noOptionsText: {
      type: String,
      default: '',
    },
    id: {
      default: 'selct',
      type: String,
    },
    label: {
      default: '',
      type: String,
    },
    value: {
      default: '',
      type: String,
    },
    optionLabelKey: {
      default: 'label',
      type: String,
    },
    optionValueKey: {
      default: 'value',
      type: String,
    },
    disabled: {
      default: false,
      type: Boolean,
    },
  },
  computed: {
    optionsObject() {
      return this.options && this.options.length > 0
        ? this.options.map((item) => ({
            value: item[this.optionLabelKey],
            label: item[this.optionValueKey],
          }))
        : []
    },
  },
  watch: {
    value: function (val) {
      this.selectValue = val
    },
    selectValue: function (val) {
      this.$emit('input', val)
      this.$emit('change', val)
    },
  },
}
</script>

<style lang="scss"></style>
