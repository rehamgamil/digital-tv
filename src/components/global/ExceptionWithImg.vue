<template>
  <div>
    <img
      class="icon-err"
      :src="require('@/assets/images/error/' + (image ? image : defaultImage))"
    />
    <p class="p-err">{{ msg }}</p>
  </div>
</template>

<script>
const defaultImage = "illustrator-something-wrong.svg";

export default {
  name: "ExceptionWithImg",
  props: {
    msg: {
      type: String,
      default: "",
    },
    image: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      defaultImage,
    };
  },
};
</script>

<style lang="scss" scoped>
.icon-err {
  width: 100%;
  max-height: 60vh;
}
.p-err {
  position: relative;
  padding: 0.75rem 1.25rem;
  margin-bottom: 1rem;
  border: 1px solid transparent;
  border-radius: 0.25rem;
  text-align: center !important;
  font-size: xx-large;
  color: #e8505b;
}
</style>
