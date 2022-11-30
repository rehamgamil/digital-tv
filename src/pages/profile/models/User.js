export default class User {
  constructor(data = {}) {
    if (data && Object.keys(data).length) this.fillData(data)
    else this.setInitialValue()
  }

  setInitialValue() {
    this.id = ''
    this.activated = false
    this.uid = ''
    this.name = ''
    this.id_number = ''
    this.total_purchases = 0
    this.phone = null
    this.phoneCC = ''
    this.phoneCCName = ''
    this.phoneWithCC = ''
    this.email = ''
    this.marita_status = ''
    this.status = ''
    this.nationality = '' //
    this.gender = ''
    this.birth_date = null
    this.birth_place = ''
    this.profession = ''
    this.national_address = ''
    this.academic_brief = ''
    this.profile_photo_path = ''
    this.formal_photo = ''
    this.created_at = null
    this.updated_at = null
    this.deleted_at = null
  }

  fillData(data) {
    if (data) {
      this.id = data.id ?? ''
      this.activated = data.activated ?? false
      this.uid = data.uid ?? ''
      this.name = data.name ?? ''
      this.id_number = data.id_number ?? ''
      this.total_purchases = data.total_purchases ?? 0
      this.phone = data.phone ?? null
      this.phoneCC = data.phoneCC ?? ''
      this.phoneCCName = data.phoneCCName ?? ''
      this.phoneWithCC = data.phoneWithCC ?? ''
      // this.phone = '01144224422'
      // this.phoneCC = '+20'
      // this.phoneCCName = 'EG'
      // this.phoneWithCC = '+201144224422'
      this.email = data.email ?? ''
      this.marita_status = data.marita_status ?? ''
      this.status = data.status ?? ''
      this.nationality = data.nationality ?? ''
      this.gender = data.gender ?? ''
      this.birth_date = data.birth_date ?? null
      this.birth_place = data.birth_place ?? ''
      this.profession = data.profession ?? ''
      this.national_address = data.national_address ?? ''
      this.academic_brief = data.academic_brief ?? ''
      this.profile_photo_path = data.profile_photo_path ?? ''
      this.formal_photo = data.formal_photo ?? ''
      this.created_at = data.created_at ?? null
      this.updated_at = data.updated_at ?? null
      this.deleted_at = data.deleted_at ?? null
    } else {
      this.setInitialValue()
    }
  }
}
