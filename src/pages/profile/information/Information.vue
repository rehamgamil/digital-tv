<template>
  <div>
    <p>{{ $t('auth.insertYourPersonalInformation') }}</p>

    <b-form @submit.prevent="onSubmit">
      <b-row>
        <b-col lg="6">
          <MainInput
            v-model="user.fullName"
            label="Full Name"
            id="user-fullName"
          />

          <!-- :value="user.phone" -->
          <!-- <PhonePicker
            :phone="user.phone"
            :phoneCC="user.phoneCC"
            :phoneCCName="user.phoneCCName"
            v-on:valueChanged="
              user.phone = $event?.nationalNumber;
              user.phoneCC = $event?.countryCallingCode;
              user.phoneCCName = $event?.countryCode;
              user.phoneWithCC = $event?.e164;
            "
            :label="$t('global.mobileNumber')"
            id="user-phone"
          /> -->
        </b-col>

        <b-col lg="6">
          <MainInput
            v-model="user.id_number"
            :label="$t('global.IDNumber')"
            id="user-idNumber"
          />
        </b-col>
        <b-col lg="6">
          <MainInput
            v-model="user.email"
            :label="$t('global.email')"
            id="user-email"
          />
        </b-col>
        <b-col lg="6">
          <PhonePicker
            :phone="user.phone"
            :phoneCC="user.phoneCC"
            :phoneCCName="user.phoneCCName"
            v-on:valueChanged="
              user.phone = $event?.nationalNumber,
              user.phoneCC = $event?.countryCallingCode,
              user.phoneCCName = $event?.countryCode,
              user.phoneWithCC = $event?.e164
            "
            label="Mobile Number"
            id="user-phone"
          />
        </b-col>

        <b-col lg="6">
          <DateTimePicker
            v-model="user.birth_date"
            :label="$t('global.birthDate')"
            type="date"
          />
        </b-col>
        <b-col lg="6">
          <MainSelect
            :options="GENDERS"
            v-model="user.gender"
            :label="$t('global.gender')"
            optionLabelKey="name"
            optionValueKey="id"
          />
        </b-col>

        <!-- <b-col lg="6">
          <MainInput
            v-model="user.password"
            :label="$t('global.password')"
            type="password"
            id="password"
          />
        </b-col> -->
        <b-col lg="6">
          <MainSelect
            :options="MARITAL_STATUS"
            v-model="user.marita_status"
            :label="$t('global.maritalStatus')"
            optionLabelKey="name"
            optionValueKey="id"
          />
        </b-col>

        <!-- <b-col lg="6">
          <MainInput
            v-model="user.birth_place"
            :label="$t('global.placeOfBirth')"
            id="user-birthPlace"
          />
        </b-col> -->

        <!-- <b-col lg="6">
          <MainInput
            v-model="user.profession"
            :label="$t('global.profession')"
            id="user-profession"
          />
        </b-col> -->
        <!-- <b-col lg="6">
          <MainInput
            v-model="user.national_address"
            :label="$t('global.nationalAddress')"
            id="user-nationalAddress"
          />
        </b-col> -->

        <!-- <b-col lg="12">
          <MainTextarea
            :value="user.academic_brief"
            v-on:valueChanged="user.academic_brief = $event"
            :label="$t('auth.briefAboutYourAcademicAndProfessionalLife')"
            id="user-academicBrief"
          />
        </b-col> -->

        <b-col lg="12">
          <input-file
            v-on:valueChanged="user.profile_photo_path = $event"
            label=""
            id="profileImage"
            :url="`${uploadImageURL}${user.id}`"
            :uploadStatus="true"
          />
        </b-col>
      </b-row>
      <div class="save-information">
        <button label="save" :loading="loading" class="btn-information">
          Save
        </button>
      </div>
    </b-form>
  </div>
</template>

<script>
import { core } from '@/config/pluginInit'
import { GENDERS, MARITAL_STATUS } from '@/config/constantLists'
import authService, { uploadImageURL } from '../../auth/auth.service'
// import userService from '../user.service'
import User from '../models/User'

export default {
  name: 'InformationPage',
  data() {
    return {
      loading: false,
      user: new User(),
      GENDERS,
      MARITAL_STATUS,
      uploadImageURL,
    }
  },
  methods: {
    whoami() {
      this.loading = true
      authService
        .whoami()
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
      authService
        .update(this.user)
        .then((response) => {
          core.showSnackbar('success', response.data.message)
          this.whoami()
        })
        .catch(() => {
          this.loading = false
        })
    },
  },
  created() {
    this.whoami()
  },
}
</script>

<style>
.btn-information {
  background-color: var(--co-primary);
  padding: 15px;
  width: 50%;
  color: white;
  border-radius: 30px;
}

.save-information {
  display: flex;
  justify-content: center;
}
</style>
