<template>
  <div>
    <b-form @submit.prevent="onSubmit">
      <b-row>
        <h6 class="text-information">{{ $t('addMember.fullName') }}</h6>
        <b-col lg="6" class="d-flex">
          <MainInput :label="$t('addMember.first')" id="user-first-name" />
          <MainInput :label="$t('addMember.second')" id="user-second-name" />
          <MainInput :label="$t('addMember.third')" id="user-third-name" />
          <MainInput :label="$t('addMember.fourth')" id="user-fourth-name" />
        </b-col>
      </b-row>
      <b-row>
        <b-col lg="6">
          <h6 class="text-information">{{ $t('addMember.phoneNumber') }}</h6>
          <!-- :value="user.phone" -->
          <PhonePicker
            :phone="user.phone"
            :phoneCC="user.phoneCC"
            :phoneCCName="user.phoneCCName"
            v-on:valueChanged="
              user.phone = $event?.nationalNumber;
              user.phoneCC = $event?.countryCallingCode;
              user.phoneCCName = $event?.countryCode;
            "
            id="user-phone"
          />
        </b-col>
        <b-col lg="6">
          <h6 class="text-information">{{ $t('global.email') }}</h6>
          <MainInput v-model="user.email" id="user-email" />
        </b-col>

        <b-col lg="6">
          <h6 class="text-information">{{ $t('global.birthDate') }}</h6>
          <DateTimePicker label="12-01-1990" type="date" />
        </b-col>
        <b-col lg="6">
          <h6 class="text-information">{{ $t('global.gender') }}</h6>
          <MainSelect
            :options="GENDERS"
            :label="$t('addMember.gender')"
            optionLabelKey="name"
            optionValueKey="id"
          />
        </b-col>

        <b-col lg="6">
          <h6 class="text-information">{{ $t('global.password') }}</h6>
          <MainInput
            v-model="user.password"
            :label="$t('global.password')"
            type="password"
            id="password"
          />
        </b-col>
        <b-col lg="6">
          <h6 class="text-information">{{ $t('global.maritalStatus') }}</h6>
          <MainSelect
            :options="MARITAL_STATUS"
            :label="$t('global.maritalStatus')"
            optionLabelKey="name"
            optionValueKey="id"
          />
        </b-col>

        <b-col lg="6">
          <h6 class="text-information">{{ $t('global.IDNumber') }}</h6>
          <MainInput :label="$t('addMember.idNumber')" id="user-idNumber" />
        </b-col>
        <b-col lg="6">
          <h6 class="text-information">{{ $t('global.placeOfBirth') }}</h6>
          <MainInput :label="$t('addMember.place')" id="user-birthPlace" />
        </b-col>

        <b-col lg="6">
          <h6 class="text-information">{{ $t('global.profession') }}</h6>
          <MainInput :label="$t('addMember.occupation')" id="user-profession" />
        </b-col>
        <b-col lg="6">
          <h6 class="text-information">{{ $t('global.nationalAddress') }}</h6>
          <MainInput
            :label="$t('addMember.national')"
            id="user-nationalAddress"
          />
        </b-col>

        <b-col lg="12">
          <MainTextarea
            v-on:valueChanged="user.academic_brief = $event"
            :label="$t('auth.briefAboutYourAcademicAndProfessionalLife')"
            id="user-academicBrief"
          />
        </b-col>

        <b-col lg="12">
          <input-file
            v-model="user.image"
            :defaultUrl="user.imageUrl"
            :label="$t('addMember.formalPhoto')"
            id="profileImage"
            url="/client/image/1"
            :uploadStatus="true"
          />
        </b-col>
      </b-row>

      <SubmitBtn :label="$t('addMember.next')" :loading="loading" class="btn-next" />
    </b-form>
  </div>
</template>

<script>
import { core } from '@/config/pluginInit'
import { GENDERS, MARITAL_STATUS } from '@/config/constantLists'
import userService from '../profile/user.service'
import User from '@/pages/profile/models/User'

export default {
  name: 'InformationPage',
  data() {
    return {
      loading: false,
      user: new User(),
      GENDERS,
      MARITAL_STATUS,
    }
  },
  methods: {
    findOne() {
      this.loading = true
      userService
        .findOne()
        .then((response) => {
          this.user.fillData(response.data.data)
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    },
    onSubmit() {
      this.loading = true
      userService
        .update(this.user)
        .then((response) => {
          core.showSnackbar('success', response.data.message)
          this.findOne()
        })
        .catch(() => {
          this.loading = false
        })
    },
  },
  created() {
    this.findOne()
  },
}
</script>

<style>
.text-information {
  margin-left: 10px;
  margin-top: 7px;
}
</style>
