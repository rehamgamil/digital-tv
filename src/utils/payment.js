import { HyperPay, Noon } from 'payment-gateway-server'
import store from '@/store'

const gateway = store.state.settings.paymentGateway
// const amount = store.getters["cart/total"];
// const address = store.getters["profile/mainAddress"];
const checkoutConfig = {
  merchant_transaction_id: '123456789',
  reference: new Date().toUTCString(),
  amount: '100',
  name: 'Ahmed',
  address: {
    city: 'Cairo',
    country: 'EG',
    state: 'Cairo',
    street1: 'street1',
    customer_email: 'customer_email',
    first_name: 'first_name',
    last_name: 'last_name',
    postcode: 'postal_code',
  },
  return_url: 'http://localhost:8090/payment/payment-status',
}

let PaymentGateway =
  gateway === 'HyperPay' ? HyperPay('Hosted') : Noon('Hosted')

async function paymentConfig() {
  const res = await PaymentGateway.initPayment(checkoutConfig)
  if (gateway === 'Noon') window.open(res.url, '_self')
  return res
}

async function registerPayment(payload) {
  const res = await PaymentGateway.registerPayment(payload)
  return res
}

export { paymentConfig, registerPayment }
