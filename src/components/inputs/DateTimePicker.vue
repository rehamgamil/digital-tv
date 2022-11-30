<template>
  <MazPicker
    v-model="dateValue"
    :label="label"
    :format="format"
    :time="showTime"
    :only-time="showOnlyTime"
    :locale="locale"
    :minute-interval="1"
    :disabled="disabled"
  />
</template>

<script>
import MazPicker from 'maz-ui/components/MazPicker'
import { getLanguage } from '../../utils/helper'

export default {
  components: { MazPicker },
  data() {
    return {
      dateValue: '',
      locale: getLanguage().value,
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
      default: 'dateTime',
      type: String,
    },
    disabled: {
      default: false,
      type: Boolean,
    },
  },
  computed: {
    format() {
      let dateFormat
      if (this.type == 'date') {
        dateFormat = 'YYYY-MM-DD'
      } else if (this.type == 'time') {
        dateFormat = 'hh:mm:ss a'
      } else {
        dateFormat = 'YYYY-MM-DDTHH:mm:ss'
      }
      return dateFormat
    },
    showTime() {
      return this.type == 'dateTime' ? true : false
    },
    showOnlyTime() {
      return this.type == 'time' ? true : false
    },
  },
  watch: {
    value: function (val) {
      this.dateValue = val
    },
    dateValue: function (val) {
      this.$emit('input', val)
    },
  },
}
</script>
