import { Mpesa } from '../src';

(async () => {
    const mpesa = new Mpesa();

    const registerurlparams = {
        ShortCode: '601414',
        ResponseType: 'Completed',
        ConfirmationURL: 'https://application.localtunnel.me/c2b-confirmation/success',
        ValidationURL: 'https://application.localtunnel.me/c2b-validation/success',
        CommandID: 'CustomerPayBillOnline',
        Amount: '5',
        Msisdn: '254708374149',
        BillRefNumber: 'account',
    };

    let b2cResponse = await mpesa.customer2business(registerurlparams).catch(err => err);

    console.log(b2cResponse);
})();
