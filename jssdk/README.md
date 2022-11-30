This is a step-by-step guide to run this js sdk integration *V2*

## Pre-requisite

* NodeJs *>= v16.17.0*
* Chrome

## Installation

* Place sdk folder in root: `./jssdk`. *(Just clone this repo and name the folder `jssdk`)*.
* Run: `npm install --save ./jssdk`

## Configuration:
1. Modify `project` and `api_key` in `./jssdk/config.json`. *(OPTIONAL)*
2. Modify `./jssdk/Configs/[Payment gateway].json` as per as your requirements.*(You should receive all needed data from your project manager)*.
3. To change production/test mode: modify `is_live` in *(project root)* `./config.json`, set it `1` to `production`.

## Usage:

```javascript
import {Noon} from "payment-gateway-server";

// Create payment gateway instance:
const PaymentGateway = Noon("Hosted");

// Initiation method:
PaymentGateway
  .initPayment(/* Object to attach/override request data. ex: amount, address, ... etc */)
  .then({url} => /* SDK response */)
  .catch((error) => /* Catching SDK error response */);

// Callback request registration:
PaymentGateway
  .registerPayment(/* Object contains the payload from request */)
  .then((response) => /* SDK response */)
  .catch((error) => /* Catching SDK error response */);
```

## Errors schema:

```json
{
  "success": false,
  "message": "[Your gateway error message]",
  "gateway": "[Your gateway name]",
  "errors": [
    "[Your gateway first error]",
    "[Your gateway second error]",
    // ...
  ]
} 
```

## Methods API Documentation

**initPayment**: 
> return: `Promise`

Success return:

```json
{
  "success": 1,
  "gateway": "[Your gateway name]",
  "url": "[Redirect url]"
}
```

Error return: Check [Errors schema](#errors-schema)

---

**registerPayment**:
> return: `Promise`

Success return:

```json
{
  "success": 1,
  "gateway": "[Your gateway name]",
  "data": {
    // gateway response ...
  }
}
```

Error return: Check [Errors schema](#errors-schema)

---

## Examples:

### HyperPay Example:

There are just three simple steps required to integrate :
> *[Full HyperPay **COPYandPAY** Integration Guide](https://hyperpay.docs.oppwa.com/tutorials/integration-guide) for hosted checkout.*
1. Prepare the checkout *(Use Payment initiation method bellow)*
2. Create the payment form and script tag *(Please check: [Integration Guide](https://hyperpay.docs.oppwa.com/tutorials/integration-guide#CNPStep2))*
3. After that the payment gateway will redirect the client to you return url with request payload *(STEP 2)*, Check Registering the request payload bellow.

### Payment initiation:


```javascript
import {HyperPay} from "payment-gateway-server";

/* AS IN VUE.JS LANGUAGE */

// Create payment gateway instance:
const PaymentGateway = HyperPay("Hosted");

// Initiation method: (PS: Please fill it all)
PaymentGateway
  .initPayment({
      "is_mada": 0,
      "amount": "120.00", // set default amount
      "name": "",
      "reference": "",
      "merchant_transaction_id": "",
      "address": { // set default client address
          "customer_email": "xxx",
          "street1": "xxx",
          "city ": "xxx",
          "state": "xxx",
          "country": "xxx",
          "postcode": "xxx",
          "first_name": "xxx",
          "last_name": "xxx"
      }
  })
  .then(({url}) => /* your js link as per the documentation you should include it in your HTML code. */)
  .catch((error) => {
      console.log(2, error)
  })
```

### Registering the request payload:

```javascript
import {HyperPay} from "payment-gateway-server";

/* AS IN VUE.JS LANGUAGE */

// Create payment gateway instance:
const PaymentGateway = HyperPay("Hosted");

// Callback request registration:
PaymentGateway
  .registerPayment(this.$route.query)
  // on success:
  .then(({success, gateway, data}) => {
      let successMessage = success ? "Success" : "Fail!";
      let payload = {success, gateway, data};
      
      console.log("Status: ", successMessage)
      console.log("Payload: ", payload)
      
      return payload
  })
  // on error:
  .catch(({success, gateway, message}) => {
      let successMessage = success ? "Success" : "Fail!";
      let payload = {success, gateway, message};

      console.log("Status: ", successMessage)
      console.log("Payload: ", payload)

      return payload
  })
```
