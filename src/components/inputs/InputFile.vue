<template>
  <b-form-group :label="label" :label-for="id">
    <input
      v-if="!disabled"
      ref="fileInput"
      type="file"
      accept="image/*"
      @change="previewImage"
      :id="id"
      :class="'form-control-file bg-white'"
      style="display: none"
    />
    <div class="preview-container border p-2 mt-3" @click="selectImage">
      <!-- <p>{{ $t('form.preview') }}:</p> -->
      <template v-if="preview">
        <img :src="preview" class="img-fluid" />
        <!-- <p class="mb-0">{{ $t('form.fileName') }}: {{ image.name }}</p>
        <p class="mb-0">
          {{ $t('form.size') }}: {{ image.size / 1024 }}{{ $t('form.KB') }}
        </p> -->
      </template>
      <template v-else-if="defaultUrl">
        <img :src="defaultUrl" class="img-fluid" />
      </template>
      <template v-else>
        <img src="@/assets/images/icons/images.svg" class="img-icon" />
      </template>
    </div>
    <div class="upload-btn-container" v-if="uploadStatus">
      <button
        class="btn btn-outline-primary mt-2"
        :disabled="loading"
        @click.prevent="uploadImage"
      >
        <b-spinner v-if="loading" small></b-spinner>
        <span class="mx-2">{{ $t('form.upload') }}</span>
      </button>
    </div>
  </b-form-group>
</template>

<script>
import { core } from '@/config/pluginInit'
import mainService from '@/services/main'

export default {
  props: {
    label: {
      default: '',
      type: String,
    },
    id: {
      default: '',
      type: String,
    },
    validate: {
      default: '',
      required: false,
    },
    value: {
      default: '',
      type: String,
    },
    placeholder: {
      default: '',
      type: String,
    },
    disabled: {
      default: false,
      type: Boolean,
    },
    defaultUrl: {
      default: null,
      type: String,
    },
    uploadStatus: {
      default: false,
      type: Boolean,
    },
    url: {
      default: '',
      type: String,
    },
  },
  data: function () {
    return {
      loading: false,
      preview: null,
      image: null,
    }
  },
  methods: {
    selectImage() {
      this.$refs.fileInput.click()
    },
    previewImage(event) {
      const input = event.target
      if (input.files && input.files.length > 0) {
        const reader = new FileReader()
        reader.onload = (e) => {
          this.preview = e.target.result
        }
        this.image = input.files[0]
        reader.readAsDataURL(input.files[0])
      } else {
        this.preview = null
        this.image = null
      }
    },
    uploadImage() {
      if (this.image) {
        this.loading = true
        let formData = new FormData()
        formData.append('file', this.image)

        mainService
          .uploadFile(formData, this.url)
          .then((response) => {
            core.showSnackbar('success', response.data.message)
            this.$emit('valueChanged', response.data.path ? response.data.path : 'zzzzzzzzzzz')
            this.loading = false
          })
          .catch(() => {
            this.loading = false
          })
      } else {
        core.showSnackbar('error', this.$t('form.pleaseSelectImage'))
      }
    },
  },
  watch: {
    image: function () {
      this.$emit('input', this.image)
    },
    value(val) {
      if (val == null) {
        this.preview = null
        this.image = null
      }
    },
  },
}
</script>

<style lang="scss">
.preview-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;
  width: 180px;
  img {
    width: 100%;
    max-width: 230px;
    height: 100%;
    max-height: 230px;
    object-fit: contain;
  }
  .img-icon {
    width: 100px;
    height: 100px;
  }
}
</style>
