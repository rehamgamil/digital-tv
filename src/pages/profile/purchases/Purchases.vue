<template>
  <div class="purchases">
    <b-table
      striped
      hover
      show-empty
      responsive
      :items="items"
      :busy="isBusy"
      class="membership-table mb-0"
      :fields="fields"
    >
      <template #empty>
        <h4 class="text-center">{{ $t('table.thereAreNoData') }}</h4>
      </template>
      <template #cell(start_date)="data">
        {{ data.item.start_date.substr(0, 10) }}
      </template>
      <template #cell(packageName)="data">
        <p class="p-0 m-0 d-flex flex-column">
          <span>{{ data.item.packagee.packageName }}</span>
          <span class="text-muted">#{{ data.item.id }}</span>
        </p>
      </template>
      <template #cell(packageeAmount)="data">
        {{ data.item.packagee.amount }}
      </template>
    </b-table>
    <footer class="bg-primary mt-0 footer-table">
      <div class="d-flex justify-content-between text-white align-items-center">
        <!-- <p class="m-0 p-0">1-4 from 10 member</p>
        <div class="m-0 p-0 d-flex justify-content-start gap-2 align-items-center">
          <span>row per page</span>
          <div class="d-flex gap-2">
            <span class="arrow-box">
              <i class="fas fa-arrow-left"></i>
            </span>
            <span class="arrow-box">
              <i class="fas fa-arrow-right"></i>
            </span>
          </div>
        </div>  -->
        <p class="m-0">{{ formatNumber(items.length) }} {{ $t('table.rows') }}</p>
      </div>
    </footer>
  </div>
</template>

<script>
import profileServices from '../profileService'
import { formatNumber } from '@/utils/helper'

export default {
  name: 'PurchasesPage',
  data() {
    return {
      isBusy: false,
      fields: [
        {
          label: this.$t('memberships.item'),
          key: 'packageName',
        },
        {
          label: this.$t('memberships.purchaseDate'),
          key: 'start_date',
        },
        {
          label: this.$t('memberships.price'),
          key: 'packageeAmount',
        },
      ],
      items: [],
    }
  },
  methods: {
    formatNumber,
    getAllData() {
      this.isBusy = true
      profileServices
        .getAllPurchases(1)
        .then((res) => {
          this.items = res.data.data.memberships
        })
        .finally(() => {
          this.isBusy = false
        })
    },
  },
  created() {
    this.getAllData()
  },
}
</script>

<style lang="scss">
.purchases {
  border-radius: 10px;
  overflow: hidden;
}
.table {
  border-collapse: separate;
  border-spacing: 0 8px;
  vertical-align: middle;
}
.table > thead {
  background-color: var(--co-primary) !important;
  color: var(--co-white);
  padding: 15px !important;
}
.table > thead tr th:first-of-type {
  border-start-start-radius: 10px !important;
  overflow: hidden;
}
.table > thead tr th:last-of-type {
  border-start-end-radius: 10px !important;
  overflow: hidden;
}

.table td,
.table th {
  margin-bottom: 2px;
  padding: 12px 30px;
  font-weight: lighter;
}
.table-striped > tbody > tr:nth-of-type(odd) > * {
  background-color: #eefaf8 !important  ;
}
.table-striped > tbody > tr:nth-of-type(even) > * {
  background-color: #e8eff1 !important  ;
}
.gap-2 {
  gap: 24px;
}
.arrow-box {
  background: var(--co-white);
  color: var(--co-primary);
  padding: 2px 8px;
  border-radius: 5px;
}
.footer-table {
  padding: 12px 30px;
}
</style>
