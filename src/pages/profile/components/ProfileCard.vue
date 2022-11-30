<template>
  <div class="profile-card">
    <div class="personal-data">
      <div class="img-container">
        <img
          :src="userData.formal_photo"
          :onerror="`this.src='${defaultImg}'`"
        />
      </div>
      <h3>{{ userData.name }}</h3>
      <span
        >{{ $t('profile.id') }}: {{ userData.id ? userData.id : '--' }}</span
      >
    </div>

    <div class="custom-divider"></div>

    <div class="additional-data">
      <div class="item">
        <span class="title">{{ $t('profile.memberSince') }}</span>
        <span class="sub-title">{{ formatDate(userData.created_at) }}</span>
      </div>
      <div class="item mt-3">
        <span class="title">{{ $t('profile.totalPurchases') }}</span>
        <span class="sub-title">
          {{ userData.total_purchases ? userData.total_purchases : 0 }}
        </span>
      </div>
      <div class="item mt-3">
        <span class="title">{{ $t('global.gender') }}</span>
        <span class="sub-title">{{
          userData.gender ? userData.gender : '--'
        }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import authService from '../../auth/auth.service'
import User from '../models/User'
import { formatDate } from '@/utils/helper'
import defaultImg from '@/assets/images/user/avatar.svg'

export default {
  name: 'ProfileCard',
  data() {
    return {
      defaultImg,
      userData: new User(),
    }
  },
  methods: {
    formatDate,
    whoami() {
      authService.whoami().then((response) => {
        this.userData.fillData(response.data.data)
      })
    },
  },
  created() {
    this.whoami()
  },
}
</script>
