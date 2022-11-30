const APP_PPAYMENT_ALIAS = 'memb'
const return_url = window.location.host + '/payment/payment-status'

export default class Payment {
  constructor(data = {}) {
    if (Object.keys(data).length) this.fillData(data)
    else this.setInitialValue()
  }

  setInitialValue() {
    this.merchant_transaction_id = ''
    this.reference = ''
    this.amount = ''
    this.name = ''
    this.address = {
      city: '',
      country: '',
      state: '',
      street1: '',
      customer_email: '',
      first_name: '',
      last_name: '',
      postcode: '',
    }
    this.return_url = return_url
  }

  fillData(data) {
    if (data) {
      this.merchant_transaction_id = `${APP_PPAYMENT_ALIAS}${data.merchant_transaction_id}` ?? ''
      this.reference = `${APP_PPAYMENT_ALIAS}${data.reference}` ?? ''
      this.amount = data.amount ?? ''
      this.name = data.name ?? ''
      this.address.city = data.address.city ?? ''
      this.address.country = data.address.country ?? ''
      this.address.state = data.address.state ?? ''
      this.address.street1 = data.address.street1 ?? ''
      this.address.customer_email = data.address.customer_email ?? ''
      this.address.first_name = data.address.first_name ?? ''
      this.address.last_name = data.address.last_name ?? ''
      this.address.postcode = data.address.postcode ?? ''
      this.return_url = return_url
    } else {
      this.setInitialValue()
    }
  }
}
