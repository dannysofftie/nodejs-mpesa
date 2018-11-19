require('dotenv').config();

import { Mpesa } from '../src';

(async () => {
    const mpesa = new Mpesa();
    const passkey = 'bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919';
    const data = {
        Amount: 1,
        CustomerPhoneNumber: '254720421336',
        BusinessShortCode: '174379',
        CallBackURL: 'http://application.localtunnel.me/stk-push/sucess/callback',
        AccountReference: 'Sample Shop',
    };

    let b2cResponse = await mpesa.lipaNaMpesaRequest(data, passkey).catch(err => err);

    console.log(b2cResponse);
})();
