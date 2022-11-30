<template>
  <div class="">
    <b-row class="family-member">
      <b-col
        md="4"
        class=""
        v-for="(child, key) in childs"
        :key="key"
      >
        <b-card class="">
          <b-row>
            <div class="d-flex align-items-center gap-3">
              <b-col cols="3">
                <img
                  src="../../../assets/images/user/avatar.svg"
                  alt=""
                  class="img-scan"
                />
              </b-col>
              <b-col cols="9" class="">
                <h6 class="">{{ child.parent.name }}</h6>
                <span class="family-id">#{{ child.id }}</span>
              </b-col>
            </div>
          </b-row>
          <b-row class="text-end">
            <b-col>
              <span class="active">{{ child.status }}</span>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>
    <b-button v-b-modal.add-dependent variant="primary" class="mt-4">
      <i class="fas fa-user-plus btn-dependent"></i
      >{{ $t('global.addDependent') }}</b-button
    >
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
        @click="redirectToFamily()"
      >
        {{ $t('global.addNewMember') }}
      </b-button>
    </b-modal>
  </div>
</template>

<script>
import familyService from './familyService'
export default {
  name: 'FamilyPage',
  data() {
    return {
      childs: '',
    }
  },
  methods: {
    getChilds() {
      familyService.getClientChilds(1).then((res) => {
        this.childs = res.data.data
      })
    },
    redirectToFamily() {
      this.$router.push({ name: 'profile.Family' })
    },
  },
  created() {
    this.getChilds()
  },
}
</script>

<style lang="scss">
.family-member{
  .family-id {
  color: var(--co-secondary-text);
}
.active {
    color: var(--co-secondary-light);
    font-weight: bold;
  }
}

.btn-dependent {
  padding-inline-end: 10px;
}
</style>
