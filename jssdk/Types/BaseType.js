/* eslint-disable */

export class BaseType {
    /**
     * @type {PaymentGatewaySDK}
     */
    sdk;

    constructor(sdk) {
        this.sdk = sdk;
    }

    getAxios() {
        return this.sdk.getAxios();
    }

    async initPayment(configurations = {}) {
        let axios = await this.getAxios();

        let {initiate} = this.sdk.info;
        return await axios[initiate.method](initiate.path, this.sdk.withConfig(configurations));
    }

    initPaymentBuildResponse(success = true, payload = {}) {
        let gateway = this.sdk.getConfig('payment_gateway', payload && payload['gateway'] || undefined);
        let is_live = this.sdk.getConfig('is_live', 0);
        
        let results = {
            success, gateway, is_live,
        };

        if (success) {
            results = {
                ...results, url: payload['checkout_url'] || ""
            }
        } else {
            results = {
                ...results, message: payload['message'] || ""
            }
        }

        return results;
    }

    async registerPayment(body = {}) {
        let axios = await this.getAxios();

        let {register} = this.sdk.info;
        return await axios[register.method](register.path, this.sdk.withBaseData(body));
    }

    registerPaymentBuildResponse(success = true, payload = {}) {
        let gateway = this.sdk.getConfig('payment_gateway', payload && payload['gateway'] || undefined);

        let results = {
            success, gateway,
        };

        if (success) {
            results = {
                ...results, url: payload['checkout_url'] || ""
            }
        } else {
            results = {
                ...results, message: payload['message'] || ""
            }
        }

        return results;
    }
}
