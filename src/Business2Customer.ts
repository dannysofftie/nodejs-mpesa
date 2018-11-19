import request from './utils/request';
import config from './utils/config';
import { IB2cClient } from './utils/interfaces';
import { generateSecurityCredentials } from './utils/security';

/**
 * This API enables a Business or Organization to pay their customers for a variety of reasons.
 * The most common reasons a business can pay their customer include salary payments, promotion payments
 * (e.g. betting winnings payouts) or normal business payments (e.g. transfers from bank to mobile accounts).
 * Each of these scenarios has their own unique characteristics, but all lie under the B2C (Business to Consumer) API category.
 */
export class Business2Customer {
    /**
     * Access token to use in making API calls
     *
     * @private
     * @type {string}
     * @memberof Business2Customer
     */
    private token: string;

    /**
     * Data to send to the API
     *
     * @private
     * @type {{}}
     * @memberof Business2Customer
     */
    private data: {};

    constructor(token: string, params: IB2cClient) {
        this.token = token;
        this.data = {
            InitiatorName: params.InitiatorName,
            CommandID: 'BusinessPayment',
            Amount: params.Amount,
            PartyA: params.Sender,
            PartyB: params.Receiver,
            Remarks: 'B2C Transaction',
            QueueTimeOutURL: params.QueueTimeOutURL,
            ResultURL: params.ResultURL,
            Occassion: 'Pay',
        };
    }

    public async init(securityCrential: string) {
        let data = await request(this.token, config.b2cEndpoint, {
            ...this.data,
            SecurityCredential: await generateSecurityCredentials(securityCrential),
        });

        if (data['errorMessage'] != 'undefined') {
            if (data['errorMessage'] == 'Bad Request - Invalid QueueTimeOutURL')
                return {
                    error: 'Invalid QueueTimeOutURL',
                };
            else if (data['errorMessage'] == 'Invalid ResultURL')
                return {
                    error: 'Invalid ResultURL',
                };
            else if (data['errorMessage'] == 'Bad Request - Invalid PartyB')
                return {
                    error: 'Invalid Receiver number. Ensure format 254712345678',
                };
            else if (data['errorMessage'] == 'Bad Request - Invalid PartyA')
                return {
                    error: 'Invalid Sender shortcode',
                };
        }
        return data;
    }
}
