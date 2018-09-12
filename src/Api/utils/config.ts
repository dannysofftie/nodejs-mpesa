require('dotenv').config()
/*
 * All endpoints provided by mpesa
 */
export default {
    baseurl: process.env.MPESA_ENV === 'development' ? 'sandbox.safaricom.co.ke' : 'api.safaricom.co.ke',
    accessTokenEndpoint: '/oauth/v1/generate?grant_type=client_credentials',
    reversalEndpoint: '/mpesa/reversal/v1/request',
    transactionStatus: '/mpesa/transactionstatus/v1/query',
    accountBalance: '/mpesa/accountbalance/v1/query',
    b2bEndpoint: '/mpesa/b2b/v1/paymentrequest',
    b2cEndpoint: '/mpesa/b2c/v1/paymentrequest',
    c2bRegisterUrlEndpoint: '/mpesa/c2b/v1/registerurl',
    c2bSimulateTransactionEndpoint: '/mpesa/c2b/v1/simulate',
    stkPushQueryEndpoint: '/mpesa/stkpushquery/v1/query',
    stkRequestEndpoint: '/mpesa/stkpush/v1/processrequest',
    consumerKey: !process.env.CONSUMER_KEY ? (function () {
        throw new Error('Set process.env.CONSUMER_KEY in your environment variables')
    })() : process.env.CONSUMER_KEY,
    consumerSecret: !process.env.CONSUMER_SECRET ? (function () {
        throw new Error('Set process.env.CONSUMER_SECRET in your environment variables')
    })() : process.env.CONSUMER_SECRET,
    certificateFilePath: !process.env.CERTIFICATE_FILE_PATH ? (function () {
        throw new Error('Set process.env.CERTIFICATE_FILE_PATH in your environment variables')
    }) : process.env.CERTIFICATE_FILE_PATH
}