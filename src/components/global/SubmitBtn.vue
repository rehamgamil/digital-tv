<template>
  <div class="d-flex" :class="itemPosition">
    <b-button
      variant="primary"
      class="rounded"
      :class="className"
      type="submit"
      :disabled="loading || disabled"
    >
      <b-spinner v-if="loading" small></b-spinner>
      <span class="mx-2">{{ label }}</span>
    </b-button>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      default: '',
      type: String,
    },
    loading: {
      default: false,
      type: Boolean,
    },
    position: {
      default: '',
      type: String,
    },
    className: {
      default: '',
      type: String,
    },
    disabled: {
      default: false,
      type: Boolean,
    },
  },
  computed: {
    itemPosition() {
      switch (this.position) {
        case 'start':
          return 'justify-content-start'
        case 'center':
          return 'justify-content-center'
        case 'end':
        default:
          return 'justify-content-end'
      }
    },
  },
}
</script>
