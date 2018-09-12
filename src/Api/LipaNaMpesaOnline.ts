import request from './utils/request'
import { ILipaNaMpesaOnline, ILipaNaMpesaOnlineClient } from './utils/interfaces'
import config from './utils/config'

export class LipaNaMpesaOnline {

    private token: string
    private data: ILipaNaMpesaOnline

    constructor(token: string, data: ILipaNaMpesaOnlineClient, passKey: string) {
        let date = new Date(),
            timestamp = date.getFullYear() + '' + date.getMonth() + '' + date.getDate() + '' + date.getHours() + '' + date.getMinutes() + '' + date.getMilliseconds()

        this.token = token
        this.data = {
            BusinessShortCode: data.BusinessShortCode,
            Amount: data.Amount,
            PartyA: data.CustomerPhoneNumber,
            PartyB: data.BusinessShortCode,
            Password: Buffer.from(data.BusinessShortCode + passKey + timestamp).toString('base64'),
            CallBackURL: data.CallBackURL,
            PhoneNumber: data.CustomerPhoneNumber,
            AccountReference: data.AccountReference,
            TransactionType: 'CustomerPayBillOnline',
            Timestamp: timestamp,
            TransactionDesc: 'Pay bill online'
        }

    }

    public async init() {
        let data = await request(this.token, config.stkRequestEndpoint, this.data)
        console.log(data)
        return data
    }

}