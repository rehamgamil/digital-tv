<template>
  <div class="about">
   
    <b-container class="mt-3">
      <!-- <h6 class="fw-bold">{{ aboutUsDescription.title }}</h6> -->
      <h3 class="fw-bold">Sub Title</h3>
      <p class="about-des">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis fugit nobis doloremque quo vitae sint dolorem tenetur voluptatibus numquam autem quisquam error praesentium magnam dicta, sed cum libero commodi voluptatum!
        <!-- {{ aboutUsDescription.paragraph }} -->
      </p>
    </b-container>
  </div>
</template>

<script>
import aboutUsService from './aboutUs.service'
export default {
  components: {  },
  name: 'AboutUs',
  data() {
    return {
      aboutUsDescription: '',
    }
  },
  methods: {
    findAboutUs() {
      aboutUsService.findOne().then((response) => {
        this.aboutUsDescription = response.data.data
      })
    },
  },
  created() {
    this.findAboutUs()
  },
}
</script>

<style>
.about-des {
  color: var(--co-secondary-text);
}
</style>
