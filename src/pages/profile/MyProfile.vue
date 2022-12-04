<template>
<div>
<page-banner pageTitle="My Profile " class="mb-5"/>
</div>
  <div class="my-profile">
    <b-container>
    <ProfileCard />
    <div class="profile-content">
      <ProfileNavbar />
      <router-view />
    </div>
  </b-container>
  </div>
</template>

<script>
import PageBanner from '@/components/ui/PageBanner.vue'
import ProfileCard from './components/ProfileCard.vue'
import ProfileNavbar from './components/ProfileNavbar.vue'

export default {
  name: 'MyProfile',
  components: { ProfileCard, ProfileNavbar, PageBanner },
  data() {
    return {}
  },
}
</script>

<style lang="scss">
@import '../../assets/styles/my-profile.scss';
</style>
