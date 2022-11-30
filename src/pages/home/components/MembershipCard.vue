<template>
  <div class="membership-card">
    <div class="img-container">
      <img
        :src="fileFullPathFromApi(memberData.image)"
        :onerror="`this.src='${bannerpage}'`"
      />
    </div>
    <div class="content-container">
      <span class="price">{{
        `${memberData.amount ? memberData.amount : '---'} ${$t(
          'global.currency'
        )}`
      }}</span>
      <h3 class="title">{{ memberData.packageName }}</h3>
      <span class="date">{{
        `${
          memberData.period_in_months ? memberData.period_in_months : '---'
        } ${$t('global.months')}`
      }}</span>
      <p class="description">{{ memberData.packageDescription }}</p>
      <div class="actions">
        <b-button
          @click="$emit('idChanged', memberData.id)"
          v-b-modal.my-modal
          variant="outline-primary"
          class="btn-details"
          >{{ $t('global.details') }}</b-button
        >
        <b-button
          variant="primary"
          :to="{ name: 'Checkout', params: { id: memberData.id } }"
        >
          {{ $t('global.apply') }}
        </b-button>
      </div>
    </div>
  </div>
</template>

<script>
import bannerpage from '@/assets/images/bannerpage.jpg'
import { fileFullPathFromApi } from '@/utils/helper'

export default {
  props: {
    memberData: { type: Object },
  },
  data() {
    return {
      bannerpage,
    }
  },
  methods: {
    fileFullPathFromApi,
  },
}
</script>

<style lang="scss">
.membership-card {
  border: 1px solid var(--co-primary);
  border-radius: 14px;
  overflow: auto;
  .img-container {
    width: 100%;
    height: 150px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .content-container {
    padding: 2rem 1rem 1rem;
    position: relative;
    .price {
      position: absolute;
      top: -1.25rem;
      padding: 0.5rem;
      border-radius: 6px;
      background-color: var(--co-primary);
      color: var(--co-primary-text);
    }
    .title {
      font-weight: bold;
      font-size: 17px;
    }
    .date {
      font-weight: bold;
      font-size: 14px;
      color: var(--co-primary);
    }
    .description {
      font-size: 14px;
      color: var(--co-secondary-text);
      text-align: justify;
    }
    .actions {
      display: flex;
      justify-content: flex-end;
      column-gap: 0.5rem;
    }
  }
}
</style>
