<template>
 <page-banner height="367px"/>
<div class="page">

<live-list/>
<today-list/>
<last-list/>

</div>

    




    
    <!-- <b-row>
      <h1 class="text-center">{{ $t('memberships.all') }}</h1>

      <ExceptionWithImg
        v-if="exceptionMsg"
        :msg="exceptionMsg"
        :image="exceptionImg"
      />
      <b-col
        v-for="member in members"
        :key="member.id"
        lg="4"
        md="6"
        sm="12"
        class="p-4"
      >
        <MembershipCard :memberData="member" v-on:idChanged="idChanged" />
      </b-col>
    </b-row>
    <b-modal
      id="my-modal"
      class="details-modal"
      size="xl"
      hide-footer
      hide-close
      centered
    >
      <base-modal-content />
      <div class="details">
        <h4 class="mb-3 fw-bold">{{ details.packageName }}</h4>
        <h6 class="fw-bold">{{ $t('global.Descreption') }}</h6>
        <p class="details-description">{{ details.packageDescription }}</p>
        <h6 class="fw-bold pb-2">{{ $t('global.Services') }}</h6>
        <div>
          <div class="d-flex gap-3 services-details">
            <div
              v-for="(item, index) in details.services"
              :key="index"
              class="rounded service"
            >
              <b-button
                v-b-toggle="`collapse-${index}`"
                class="p-3 bg-transparent service-btn"
                >{{ item.service.serviceName }}</b-button
              >
              <b-collapse :id="`collapse-${index}`">
                <p class="text-white">{{ item.service.serviceDescription }}</p>
              </b-collapse>
            </div>
          </div>
        </div>
      </div>
    </b-modal> -->
 
</template>

<script>
import LiveList from '@/components/Live/LiveList.vue'
import PageBanner from '@/components/ui/PageBanner.vue'
import TodayList from '@/components/todayRacec/todayList.vue'
import LastList from '@/components/lastRacec/lastList.vue'
//import LiveList from '@/components/LiveRacec/LiveList.vue'
//import BaseModalContent from '@/components/baseModalContent.vue'
//import MembershipCard from './components/MembershipCard.vue'
//import homeService from './home.service'

export default {
  components: { LiveList, PageBanner, TodayList, LastList },
 
  name:
    'HomePage',
  
 //components: { MembershipCard, BaseModalContent }
//   data() {
//     return {
//       exceptionMsg: null,
//       exceptionImg: 'illustrator-noData.svg',
//       details: [],
//       members: [],
//       packageId: '',
//     }
//   },
//   methods: {
//     findAll() {
//       homeService
//         .findAll()
//         .then((response) => {
//           this.members = response.data.data
//           if (!this.members.length)
//             this.exceptionMsg = this.$t('table.thereAreNoData')
//         })
//         .catch(() => (this.exceptionMsg = this.$t('table.thereAreNoData')))
//     },
//     idChanged(id) {
//       this.details = this.members.find((item) => item.id == id)
//     },
//   },
//   created() {
//     this.findAll()
//   },
 }
</script>

<style lang="scss">


.live-icon{
  height: 30px;
}
.page{
  width: 90%;
  margin: auto;
  
}
</style>
