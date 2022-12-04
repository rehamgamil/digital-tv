<template>
  <div class="mt-4">
    <b-row>
      <b-col lg="4" md="6" sm="7" class="mb-3">
      <!-- <b-col lg="4" md="6" sm="7" class="mb-3" v-for="(i, key) in items" :key="key"> -->
        <b-card class="my-membership-card">
          <b-row>
            <b-col cols="8">
              <!-- <h6 class="fw-bold">{{ i.packagee.packageName }}</h6> -->
              <h6 class="fw-bold">Golden Membership</h6>
              <!-- <p class="member-details">Until {{ i.end_date.substr(0, 10) }}</p> -->
              <p class="member-details">Until 10 jan 2023</p>
            </b-col>
            <b-col cols="4">
              <img
                src="@/assets/images/icons/barcode.jpg"
                alt=""
                class="img-scan"
              />
            </b-col>
          </b-row>
          <b-row class="mt-3">
            <b-col cols="8">
              <!-- <P class="member-details">#{{ i.id }}</P> -->
              <P class="member-details">#1122334455</P>
            </b-col>
            <b-col cols="4">
              <!-- <p class="text-center active">{{ i.status }}</p> -->
              <p class="text-center active">Active</p>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>
    <!-- <b-card class="" v-for="(i, key) in items" :key="key">
      <b-row>
        <b-col cols="9">
          <h6 class="fw-bold">{{ i.packagee.packageName }}</h6>
          <p class="member-details"> {{ i.end_date.substr(0,10) }}</p>
        </b-col>
        <b-col cols="3">
          <img
            src="@/assets/images/icons/HelloTech-qr-code-1024x1024.jpg"
            alt=""
            class="img-scan"
          />
        </b-col>
      </b-row>
      <b-row class="mt-3">  
        <b-col cols="9">
          <P class="member-details">#{{  i.packagee.id }}</P>
        </b-col>
        <b-col cols="3">
          <p class="text-center active fw-bold">{{  i.status }}</p>
        </b-col>
      </b-row>
    </b-card> -->

    <!-- <b-button v-b-modal.add-dependent variant="primary" class="mt-2">
      <i class="fas fa-user-plus btn-dependent"></i
      >{{ $t('global.addDependent') }}
    </b-button>
    <b-modal
      id="add-dependent"
      size="xl"
      hide-footer
      centered
      class="dependent-modal"
    >
      <h4 class="member-modal-details mb-4 px-2">
        <i class="fas fa-user-plus btn-dependent"></i
        >{{ $t('global.addDependent') }}
      </h4>

      <base-modal-content :details="details" />
      <h6 class="fw-bold px-2">{{ $t('global.searchByPhoneNumber') }}</h6>
      <input
        id="input"
        class="border rounded py-2 px-3 mx-2"
        :placeholder="$t('global.search')"
      />
      <button class="btn-search-number py-2 px-3 rounded">
        {{ $t('global.search') }}
      </button>
      <h6 class="my-3 px-2">{{ $t('global.or') }}</h6>

      <b-button
        variant="primary"
        class="btn-new-member px-3 mx-2"
        v-b-modal.add-dependent
        @click="redirectToAddMember()"
      >
        {{ $t('global.addNewMember') }}
      </b-button>
    </b-modal> -->
  </div>
</template>

<script>
//import profileServices from '../profileService'
//import BaseModalContent from '@/components/baseModalContent.vue'
export default {
  name: 'MyMembership',
  //components: { BaseModalContent },
  data() {
    return {
      items: '',
    }
  },
  // methods: {
  //   getAllData() {
  //     profileServices.getAllPurchases(1).then((res) => {
  //       this.items = res.data.data.memberships
  //     })
  //   },
  //   redirectToAddMember() {
  //     this.$router.push({ name: 'addMember' })
  //   },
  // },
  // created() {
  //   this.getAllData()
  // },
}
</script>

<style lang="scss">
.my-membership-card {
  .member-details {
    color: var(--co-primary);
  }
  .active {
    color: var(--co-secondary-light);
    font-weight: bold;
  }
}
.dependent-modal {
  .member-modal-details {
    color: var(--co-primary);
    font-weight: bold;
  }
  .btn-search-number {
    background-color: var(--co-body-text);
    color: var(--co-white);
  }
  .btn-new-member {
    margin-bottom: 250px;
  }
}

.img-scan {
  width: 100%;
}
#add-dependent .modal-header {
  border-bottom: unset !important;
}

.btn-dependent {
  padding-inline-end: 10px;
}
</style>
