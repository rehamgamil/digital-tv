<template>
  <div class="main-footer">
    <b-container>
      <span>All Copyright Reserved @ JSCA 2022</span>
    </b-container>
  </div>
</template>

<script>
export default {
  name: 'MainFooter',
}
</script>

<style lang="scss">
.main-footer {
  height: var(--footer-height);
  // background-color: var(--co-primary);
  background-image: url('@/assets/images/bg-footer.png');
  color: var(--co-primary-text);
  display: flex;
  align-items: center;
  padding-inline: 10px;
  font-size: .875rem;
}
</style>