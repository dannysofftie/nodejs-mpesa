import { AccessToken } from './AccessToken'
import { Business2Customer } from './Business2Customer'
import { IB2cClient, ILipaNaMpesaOnlineClient } from './utils/interfaces'
import { LipaNaMpesaOnline } from './LipaNaMpesaOnline'

export class Mpesa {

    private async getToken() {
        return await new AccessToken().generateAccessToken()
    }

    /**
     * B2C middleware params: B2CInterface
     * @param params B2CInterface parameters
     * @param securityCrential Shortcode security credential e.g. 361reset
     */
    public async b2c(params: IB2cClient, securityCrential: string) {
        let token = await this.getToken()
        return await new Business2Customer(token, params).init(securityCrential)
    }

    /**
     *  For the business, this API enables them to preset all the correct info in the payment request and greatly 
     *  reduce chances of wrong payments being performed to their systems. 
     *  - It is a C2B transaction, but with the initiator being the organization instead of the customer
     * @param params data to api
     * @param passKey LipaNaMpesaOnline pass key
     */
    public async lipaNaMpesaRequest(params: ILipaNaMpesaOnlineClient, passKey: string) {
        let token = await this.getToken()
        return await new LipaNaMpesaOnline(token, params, passKey).init()
    }

}