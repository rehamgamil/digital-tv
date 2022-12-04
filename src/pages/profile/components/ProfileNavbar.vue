<template>
  <div class="profile-navbar">
    <router-link v-for="(item, index) in items" :key="index" :to="item.to">
      <span>{{ item.title }}</span>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'ProfileNavbar',
  data() {
    return {
      items: [
        {
          title: this.$t('profile.myMembership.moduleName'),
          to: { name: 'profile.MyMembership' },
        },
        {
          title: this.$t('profile.information.moduleName'),
          to: { name: 'profile.Information' },
        },
        {
          title: this.$t('profile.list.moduleName'),
          to: { name: 'profile.myList' },

        },
      ],
    }
  },
}
</script>

<style lang="scss">
.profile-navbar {
  display: flex;
  column-gap: 1rem;
  // padding-bottom: 1rem;
  margin-bottom: 1rem;
  border-bottom: 1px solid var(--co-secondary-text);

  a {
    position: relative;
    display: flex;
    justify-content: center;
    color: var(--co-body-text);
    text-decoration: none;
    padding-bottom: 1rem;

    &.router-link-exact-active {
      color: var(--co-primary);
      font-weight: bold;
      &::before,
      &::after {
        content: ' ';
        position: absolute;
        background-color: var(--co-primary);
        border-radius: 2px;
      }
      &::after {
        left: 0;
        right: 0;
        bottom: -2px;
        height: 3px;
        width: 100%;
        background-color: var(--co-primary);
        border-radius: 2px;
      }
      &::before {
        bottom: -5px;
        height: 8px;
        width: 40%;
      }
    }
  }
}
</style>
