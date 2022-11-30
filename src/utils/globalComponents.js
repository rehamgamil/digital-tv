import MainInput from '@/components/inputs/MainInput.vue'
import MainTextarea from '@/components/inputs/MainTextarea.vue'
import PhonePicker from '@/components/inputs/PhonePicker.vue'
import DateTimePicker from '@/components/inputs/DateTimePicker.vue'
import MainSelect from '@/components/inputs/MainSelect.vue'
import InputFile from '@/components/inputs/InputFile.vue'
import SubmitBtn from '@/components/global/SubmitBtn.vue'
import ExceptionWithImg from '@/components/global/ExceptionWithImg.vue'

export default {
  install: (app) => {
    app.component('MainInput', MainInput)
    app.component('MainTextarea', MainTextarea)
    app.component('PhonePicker', PhonePicker)
    app.component('DateTimePicker', DateTimePicker)
    app.component('MainSelect', MainSelect)
    app.component('InputFile', InputFile)
    app.component('SubmitBtn', SubmitBtn)
    app.component('ExceptionWithImg', ExceptionWithImg)
  }
}