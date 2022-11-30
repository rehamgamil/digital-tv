<template>
  <router-view />
</template>

<script>
import { getLanguage } from './utils/helper'

export default {
  name: 'App',
  mounted() {
    document.title = this.$t('global.appName')
    const language = getLanguage()
    const root = document.documentElement
    root.setAttribute('lang', language.value)
    root.setAttribute('dir', language.direction)
  },
}
</script>
