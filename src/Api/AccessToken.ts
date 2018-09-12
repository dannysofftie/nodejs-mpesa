import * as https from 'https'
import config from './utils/config'

/**
 * Top level access token generator
 * 
 * @export AccessToken
 * @class AccessToken
 */
export class AccessToken {
    private auth: string
    private CONSUMER_KEY: string
    private CONSUMER_SECRET: string

    /**
     * Initializes both consumer key and consumer secret
     * @param {string} consumer_key App's consumer key - obtain from safaricom developer portal
     * @param {string} consumer_secret App's consumer secret - obtain from safaricom developer portal
     */
    constructor() {
        this.CONSUMER_KEY = config.consumerKey
        this.CONSUMER_SECRET = config.consumerSecret
        this.auth = 'Basic ' + Buffer.from(this.CONSUMER_KEY + ':' + this.CONSUMER_SECRET).toString('base64')
    }

    /**
     * Generate access token  from consumer key and consumer secret
     *
     * @returns {Promise<string>}
     * @memberof AccessToken
     */
    public generateAccessToken(): Promise<string> {
        return new Promise((resolve, reject) => {
            const req = https.request({
                host: config.baseurl,
                path: config.accessTokenEndpoint,
                method: 'GET',
                headers: {
                    'Authorization': this.auth
                }
            }, (res) => {
                res.on('error', err => reject({
                    error: err
                }))
                res.on('data', chunk => resolve(JSON.parse(chunk.toString()).access_token))
            })
            req.on('error', error => reject(error))
            req.end()
        })
    }
}