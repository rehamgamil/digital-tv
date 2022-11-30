import api from '@/axios'
import { ABOUT_US_ID } from '../../config/constant'


export default {
  findOne () {
    return api().get(`about-us/${ABOUT_US_ID}`)
  }
}
