<template>
  <div class="aboutus-card">
    <!-- <h6>{{ aboutUsData.title }}</h6> -->
    <h6>title</h6>
    <p v-html="aboutUsData.paragraph"></p>
    <div class="aboutus-card__footer">
      <b-button
        class="py-0 text-capitalize"
        :to="{ name: 'AboutUs' }"
        variant="primary"
        >more</b-button
      >
    </div>
  </div>
</template>

<script>
//import aboutUsService from '../aboutUs.service'
//import AboutUs from '../models/AboutUs'

export default {
  data() {
    return {
     // aboutUsData: new AboutUs(),
    }
  },
  // methods: {
  //   findAboutUs() {
  //     aboutUsService.findOne().then((response) => {
  //       this.aboutUsData.fillData(response.data.data)
  //     })
  //   },
  // },
  // created() {
  //   this.findAboutUs()
  // },
}
</script>

<style lang="scss">
@import '@/assets/styles/_mixins.scss';

.aboutus-card {
  // max-width: 720px;
  margin: auto;
  // border: 1px solid var(--co-primary);
  border-radius: 14px;
  // background-color: var(--co-body-bg);
  background-color: #fafafa;
  padding: 1rem 2.75rem;
  transform: translateY(-44px);
  h6 {
    font-weight: bold;
    font-size: 1.5rem;
  }
  p {
    @include cut-nth-lines(5);
    text-align: justify;
    font-weight: bold;
  }
  &__footer {
    display: flex;
    justify-content: flex-end;
  }
}
</style>