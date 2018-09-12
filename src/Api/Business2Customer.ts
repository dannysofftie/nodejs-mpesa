import request from './utils/request'
import config from './utils/config'
import { IB2cClient } from './utils/interfaces'
import { generateSecurityCredentials } from './utils/security'


export class Business2Customer {

    private token: string
    private data: {}

    constructor(token: string, params: IB2cClient) {
        this.token = token
        this.data = {
            InitiatorName: params.InitiatorName,
            CommandID: 'BusinessPayment',
            Amount: params.Amount,
            PartyA: params.Sender,
            PartyB: params.Receiver,
            Remarks: 'B2C Transaction',
            QueueTimeOutURL: params.QueueTimeOutURL,
            ResultURL: params.ResultURL,
            Occassion: 'Pay'
        }
    }

    public async init(securityCrential: string) {
        let data = await request(this.token, config.b2cEndpoint, { ...this.data, SecurityCredential: await generateSecurityCredentials(securityCrential) })
        // @ts-ignore
        if (data.errorMessage != 'undefined') {
            // @ts-ignore
            if (data.errorMessage == 'Bad Request - Invalid QueueTimeOutURL')
                return ({ error: 'Invalid QueueTimeOutURL' })
            // @ts-ignore
            else if (data.errorMessage == 'Invalid ResultURL')
                return ({ error: 'Invalid ResultURL' })
            // @ts-ignore
            else if (data.errorMessage == 'Bad Request - Invalid PartyB')
                return ({ error: 'Invalid Receiver number. Ensure format 254712345678' })
            // @ts-ignore
            else if (data.errorMessage == 'Bad Request - Invalid PartyA')
                return ({ error: 'Invalid Sender shortcode' })
        }
        return data
    }
}