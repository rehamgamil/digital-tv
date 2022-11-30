/* eslint-disable */
import * as $axios from "./Helpers/AxiosInstance";

let DEFAULT_PAYMENT_GATEWAY = "Default";
let DEFAULT_PAYMENT_GATEWAY_TYPE = "Hosted";

export const PAYMENT_DEFAULT = {
    get gateway() {
        return DEFAULT_PAYMENT_GATEWAY;
    },
    set gateway(v) {
        DEFAULT_PAYMENT_GATEWAY = v;
    },
    get type() {
        return DEFAULT_PAYMENT_GATEWAY_TYPE;
    },
    set type(v) {
        DEFAULT_PAYMENT_GATEWAY_TYPE = v
    }
}

export class PaymentGatewaySDK {
    info = {};
    config = {};
    axios;

    constructor({gateway = "", gatewayType = "", config = {}}) {
        this.gateway = gateway || PAYMENT_DEFAULT.gateway;
        this.gatewayType = gatewayType || PAYMENT_DEFAULT.type;
        this.init(config);
    }

    init(config = {}) {
        return this.loadInfo()
            .then(x => this.loadConfig()
                .then(x => config ? this.mergeConfig(config) : this));
    }

    async loadInfo(force = false) {
        if (!force && Object.keys(this.info).length > 2) {
            return Promise.resolve(this.info);
        }

        return this.getInfo()
            .then(info => {
                this.info = info;
                this.info['baseUrl'] = this.info['baseUrl'] || '';
                if (this.info['baseUrl'].substring(this.info['baseUrl'].length - 1) !== "/") {
                    this.info['baseUrl'] = this.info['baseUrl'] + '/';
                }

                return this.info;
            })
    }
    
    getInfo() {
        let info = {};
        return import('./info.json')
            .then((file) => {

                return import('./config.json')
                    .then((configFile) => {
                        return info = Object.assign({}, file.default || file || {}, configFile.default || configFile || {});
                    });
            });
    }

    async loadConfig(gateway = "") {
        gateway = gateway || this.gateway || PAYMENT_DEFAULT.gateway

        // if (!force && Object.keys(this.config).length) {
        //     return;
        // }
        if (!(this.gateway = gateway)) {
            return;
        }

        let configFile;

        try {
            configFile = (await import(`./Configs/${this.gateway}.json`)).default;
        } catch (e) {
            configFile = (await import(`./Configs/${PAYMENT_DEFAULT.gateway}.json`)).default;
        }

        let {info, data} = configFile;

        this.info['payment_gateway'] = info['payment_gateway'] || this.gateway;
        this.info['payment_gateway_type'] = info['payment_gateway_type'] || this.gatewayType;

        this.setConfig({
            ...info,
            ...data
        })

        return this;
    }

    mergeConfig(config = {}) {
        this.setConfig({
            ...this.config,
            ...config
        });

        return this;
    }

    setConfig(config = {}) {
        this.config = config

        this.config['project'] = ("project" in this.config) ? this.config['project'] : (this.info["project"] || undefined);
        this.config['api_key'] = ("api_key" in this.config) ? this.config['api_key'] : (this.info["api_key"] || undefined);
        this.config['is_live'] = ("is_live" in this.config) ? this.config['is_live'] : (this.info["is_live"] || 0);

        return this;
    }

    getConfig($key = undefined, $default = undefined) {
        if (!$key) {
            let config = Object.assign({}, this.config);
            if ("api_key" in config) {
                delete config['api_key'];
            }
            return config;
        }

        let result;
        try {
            result = $key in this.config ? this.config[$key] : $default;
        } catch (e) {
            result = $default;
        }

        return result;
    }

    withConfig(data = {}) {
        return {
            ...this.getConfig(),
            ...data
        };
    }

    withBaseData(data = {}) {
        let {/*authorization_key, */payment_gateway, project, is_live, is_mada = 0, entityId_credit_card, entityId_mada} = {...this.info, ...this.config};
        return {
            /*authorization_key, */payment_gateway, project, is_live, is_mada,
            entityId_credit_card, entityId_mada,
            ...data
        };
    }

    getAxios() {
        return this.loadInfo()
            .then(x => {
                this.axios = this.axios || $axios.makeAxios({debug: this.info.debug});

                $axios.setAxiosToken(this.getConfig('api_key'), this.axios)
                $axios.setAxiosBaseUrl(this.info['baseUrl'], this.axios)

                return this.axios;
            })
    }

    async getDriver() {
        let type = (await this.loadConfig()).getConfig('payment_gateway'),
            o;

        try {
            o = (await import(`./Types/${type}.js`)).default;
        } catch (e) {
            console.error(80, this.getConfig())
            throw new Error(`Driver [${type}] is missing!`);
        }

        return o.make(this);
    }

    async proxy(method, ...args) {
        let sdk = await this.getDriver();

        return new Promise((resolve, reject) => {
            sdk[method](...args)
                .then((response) => {
                    let {status, data} = response;
                    let success = status === 201 && Number(data['status'] || 0) === 1;

                    let results = (sdk[`${method}BuildResponse`] || (() => ({}))).call(sdk, success, data);

                    (success && resolve || reject)(results)

                    return data;
                })
                .catch((error) => {

                    let results = (sdk[`${method}BuildResponse`] || (() => ({}))).call(sdk, false, error);

                    reject(results)
                    return results;
                })
        })
    }

    async initPayment(configurations = {}) {
        return await this.proxy('initPayment', ...arguments);
    }

    async registerPayment(body = {}) {
        return await this.proxy('registerPayment', ...arguments);
    }
}

export function Noon(gatewayType = "Hosted", config = {}) {
    return new PaymentGatewaySDK({gateway: "Noon", gatewayType, config})
}

export function HyperPay(gatewayType = "Hosted", config = {}) {
    return new PaymentGatewaySDK({gateway: "HyperPay", gatewayType, config})
}
