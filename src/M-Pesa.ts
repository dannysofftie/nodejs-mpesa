import { AccessToken } from './AccessToken';
import { Business2Customer } from './Business2Customer';
import { IB2cClient, ILipaNaMpesaOnlineClient } from './utils/interfaces';
import { LipaNaMpesaOnline } from './LipaNaMpesaOnline';
import { Customer2Business } from './Customer2Business';

export class Mpesa {
    /**
     *  Generate access token to use for subsequent api calls
     */
    private async getToken() {
        return await new AccessToken().generateAccessToken();
    }

    /**
     * This API enables a Business or Organization to pay their customers for a variety of reasons.
     * The most common reasons a business can pay their customer include salary payments, promotion payments
     * (e.g. betting winnings payouts) or normal business payments (e.g. transfers from bank to mobile accounts).
     * Each of these scenarios has their own unique characteristics, but all lie under the B2C (Business to Consumer) API category.
     *
     *
     * @param params B2CInterface parameters
     * @param securityCrential Shortcode security credential e.g. 361reset
     */
    public async business2customer(params: IB2cClient, securityCrential: string) {
        let token = await this.getToken();
        return await new Business2Customer(token, params).init(securityCrential);
    }

    /**
     *  For the business, this API enables them to preset all the correct info in the payment request and greatly
     *  reduce chances of wrong payments being performed to their systems.
     *  - It is a C2B transaction, but with the initiator being the organization instead of the customer
     * @param params data to api
     * @param passKey LipaNaMpesaOnline pass key
     */
    public async lipaNaMpesaRequest(params: ILipaNaMpesaOnlineClient, passKey: string) {
        let token = await this.getToken();
        return await new LipaNaMpesaOnline(token, params, passKey).init();
    }

    /**
     * Listen for activities on our registered paybill / till number, for payments made to and from.
     *
     * @param params
     */
    public async customer2business(params: any) {
        const token = await this.getToken();
        return await new Customer2Business(token, params).initiateC2B();
    }
}
