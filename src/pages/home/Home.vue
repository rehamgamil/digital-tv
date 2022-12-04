<template>
 <page-banner height="367px"/>

 <div class="layer-home ">
  <div class="profile-card ">
    <div class="personal-data p-2">
     
      <h3 class="fw-bold mb-2">JCSA Tickets</h3>
      <p>Riyadh Racing season is underway at King Abdulaziz Racecourse and tickets are on sale now. Runningevery Thursday Friday and Saturday until Saturday March 18, 2023 the 2022-2023 race programme features number of important domestic cups as well as The Saudi Cup on February 24-25, 2023.Choose date to attend Riyadah Racing season underway at King Abdulaziz Racecourse and tickets are on sale now. Running every Thursday,Friday and Saturday until Saturday March 18, 2023 the 2022 race programme features anumber of important domestic cups as well as The Saudi Cup on February 24-25, 2023.</p>
     
    </div>

   
  </div>
 </div>
<div class="page">
  
<live-list class="mt-5"/>
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
.layer-home{
   position: relative;
   width: 80%;
   margin: auto;
}

.profile-card{
  position: absolute;
    top: -7rem;
padding: 10px;
    border: 1px solid #0e1815;
    border-radius: 1rem;
    background-color: var(--co-body-bg);
}
</style>
