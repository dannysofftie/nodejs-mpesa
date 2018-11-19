import request from './utils/request';
import config from './utils/config';

interface IParams {
    ShortCode: string;
    ResponseType: 'Completed' | 'Cancelled';
    ConfirmationURL: string;
    ValidationURL: string;
    CommandID: string;
    Amount: string;
    Msisdn: string;
    BillRefNumber: string;
}

/**
 * This API is used to simulate payment requests from clients and to your API.
 * It basically simulates a payment made from the client phone's STK/SIM Toolkit menu,
 * and enables you to receive the payment requests in real time.
 *
 * @export
 * @class Customer2Business
 */
export class Customer2Business {
    /**
     * Access token to use in making API calls
     *
     * @private
     * @type {string}
     * @memberof Customer2Business
     */
    private token: string;

    private params: {};

    private c2bdata: {};

    public constructor(token: string, params: IParams) {
        this.token = token;
        this.params = {
            ShortCode: params.ShortCode,
            ResponseType: params.ResponseType,
            ValidationURL: params.ValidationURL,
            ConfirmationURL: params.ConfirmationURL,
        };
        this.c2bdata = {
            ShortCode: params.ShortCode,
            CommandID: params.CommandID,
            Amount: params.Amount,
            Msisdn: params.Msisdn,
            BillRefNumber: params.BillRefNumber,
        };
    }

    /**
     * Register app urls, both confirmation and validation urls.
     *
     * @private
     * @returns
     * @memberof Customer2Business
     */
    private async registerUrls() {
        return await request(this.token, config.c2bRegisterUrlEndpoint, this.params);
    }

    /**
     * Perform transaction.
     *
     * @returns
     * @memberof Customer2Business
     */
    public async initiateC2B() {
        const status = await this.registerUrls();
        const response = await request(this.token, config.c2bSimulateTransactionEndpoint, this.c2bdata);
        return { status, response };
    }
}
