import request from './utils/request';
import { ILipaNaMpesaOnline, ILipaNaMpesaOnlineClient } from './utils/interfaces';
import config from './utils/config';

export class LipaNaMpesaOnline {
    private token: string;
    private data: ILipaNaMpesaOnline;

    constructor(token: string, params: ILipaNaMpesaOnlineClient, passKey: string) {
        let date = new Date(),
            timestamp = date.getFullYear() + '' + date.getMonth() + '' + date.getDate() + '' + date.getHours() + '' + date.getMinutes() + '' + date.getSeconds();

        this.token = token;
        this.data = {
            BusinessShortCode: params.BusinessShortCode,
            Amount: params.Amount,
            PartyA: params.CustomerPhoneNumber,
            PartyB: params.BusinessShortCode,
            Password: Buffer.from(params.BusinessShortCode + passKey + timestamp).toString('base64'),
            CallBackURL: params.CallBackURL,
            PhoneNumber: params.CustomerPhoneNumber,
            AccountReference: params.AccountReference,
            TransactionType: 'CustomerPayBillOnline',
            Timestamp: timestamp,
            TransactionDesc: 'Pay bill online',
        };
        console.log(timestamp, this.data.Timestamp);
    }

    public async init() {
        return await request(this.token, config.stkRequestEndpoint, this.data);
    }
}
