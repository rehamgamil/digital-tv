/* eslint-disable */
import {BaseType} from "./BaseType";

class Noon extends BaseType {
    async initPayment(configurations = {}) {
        let axios = await this.getAxios();

        let {initiate} = this.sdk.info;
        return await axios[initiate.method](initiate.path, this.sdk.withConfig(configurations));
    }

    initPaymentBuildResponse(success = true, payload = {}) {
        let gateway = this.sdk.getConfig('payment_gateway', payload && payload['gateway'] || undefined);
        // let is_live = this.sdk.getConfig('is_live', 0);

        let results = {
            success, gateway, //is_live,
        };

        if (success) {
            results = {
                ...results, url: payload['checkout_url'] || ""
            }
        } else {
            if ("response" in payload && "data" in payload.response) {
                payload = payload.response['data'] || {};
            }
            results = {
                ...results,
                errors: [],
                message: payload['message'] || ""
            }
        }

        return results;
    }

    async registerPayment(body = {}) {
        let axios = await this.getAxios();

        return this.sdk.loadInfo()
            .then(info => {
                let {register} = info;
                
                return axios[register.method](register.path, this.sdk.withBaseData(body));
            })
    }

    registerPaymentBuildResponse(success = true, payload = {}) {
        let {gateway, message, data, response} = payload;
        gateway = gateway || this.sdk.getConfig('payment_gateway');
        response = response || {};
        data = data || response['data'] || {};
        message = message || data['message'] || "";
        let errors = [];

        let results = {
            success, gateway,
        };

        if (success) {
            results = {
                ...results, data
            }
        } else {
            if (response && 'data' in response) {
                data = response['data'] || {};

                if (data && 'data' in data) {
                    data = data['data'] || {};
                }

                if (data && 'message' in data) {
                    message = data['message'] || "";
                }

                errors = data && data['errors'] || [];
                message = data && data['message'] || message;
            }

            if (message && typeof message === 'object' && 'message' in message) {
                message = message['message'] || "";
            }

            results = {
                ...results,
                errors,
                message
            }
        }

        return results;
    }
}

const $exports = {
    async make(sdk, config = {}) {
        await sdk.init(config);
        return new Noon(sdk);
    }
};

export default $exports
