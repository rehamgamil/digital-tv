export default class Membership {
  constructor(data = {}) {
    if (data && Object.keys(data).length) this.fillData(data)
    else this.setInitialValue()
  }

  setInitialValue() {
    this.id = ''
    this.period_in_months = 0
    this.image = ''
    this.translations = []
    this.prices = []
    this.packageName = ''
    this.packageDescription = ''
    this.amount = 0
  }

  fillData(data) {
    if (data) {
      this.id = data.id ?? null
      this.period_in_months = data.period_in_months ?? 0
      this.image = data.image ?? ''
      this.translations = data.translations ?? []
      this.prices = data.prices ?? []
      this.packageName = data.packageName ?? ''
      this.packageDescription = data.packageDescription ?? ''
      this.amount = data.amount ?? 0
    } else {
      this.setInitialValue()
    }
  }
}
