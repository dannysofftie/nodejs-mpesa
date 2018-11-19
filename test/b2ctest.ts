import { Mpesa } from '../src';

(async () => {
    const mpesa = new Mpesa();

    let b2cResponse = await mpesa
        .business2customer(
            {
                Amount: 100,
                InitiatorName: 'apitest414',
                Sender: '601414',
                Receiver: '254708374149',
                QueueTimeOutURL: 'https://application.localtunnel.me/b2c-result/timeout',
                ResultURL: 'https://application.localtunnel.me/b2c-result/success',
            },
            '414reset'
        )
        .catch(err => err);

    console.log(b2cResponse);
})();
