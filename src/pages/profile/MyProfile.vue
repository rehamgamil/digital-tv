<template>
  <div class="my-profile">
    <ProfileCard />
    <div class="profile-content">
      <ProfileNavbar />
      <router-view />
    </div>
  </div>
</template>

<script>
import ProfileCard from './components/ProfileCard.vue'
import ProfileNavbar from './components/ProfileNavbar.vue'

export default {
  name: 'MyProfile',
  components: { ProfileCard, ProfileNavbar },
  data() {
    return {}
  },
}
</script>

<style lang="scss">
@import '../../assets/styles/my-profile.scss';
</style>