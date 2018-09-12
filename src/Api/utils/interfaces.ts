export interface IBusiness2Customer {
    /**
     * This is the credential/username used to authenticate the transaction request
     */
    InitiatorName: string,
    /**
     * Base64 encoded string of the Security Credential,
     * which is encrypted using M-Pesa public key and validates the transaction on M-Pesa Core system
     */
    SecurityCredential: string,
    /**
     * Unique command for each transaction type e.g. SalaryPayment, BusinessPayment, PromotionPayment
     */
    CommandID: string,
    /**
     * The amount being transacted
     */
    Amount: string | number,
    /**
     * Organization’s shortcode initiating the transaction
     */
    PartyA: string | number,
    /**
     * Phone number receiving the transaction
     */
    PartyB: string | number,
    /**
     * Comments that are sent along with the transaction
     */
    Remarks: string,
    /**
     * The timeout end-point that receives a timeout response
     */
    QueueTimeOutURL: string,
    /**
     * The end-point that receives the response of the transaction
     */
    ResultURL: string,
    /**
     * An optional statement
     */
    Occassion?: string
}

export interface IB2cClient {
    /**
     * Name of the organization initiating transaction
     *  - As obtained from Safaricom developer portal
     */
    InitiatorName: string,
    /**
     * Amount to transact in kSh
     * - Given as 1000 or '1000'
     */
    Amount: string | number,
    /**
     * Organization’s shortcode initiating the transaction
     */
    Sender: string | number,
    /**
     * Phone number receiving the transaction
     */
    Receiver: string | number,
    /**
     * The timeout end-point that receives a timeout response
     */
    QueueTimeOutURL: string,
    /**
     * The end-point that receives the response of the transaction
     */
    ResultURL: string
}

export interface ILipaNaMpesaOnline {
    /**
     * This is organizations shortcode (Paybill or Buygoods - A 5 to 6 digit account number) 
     * used to identify an organization and receive the transaction 
     */
    BusinessShortCode: string,
    /**
     * This is the password used for encrypting the request sent:
     * - A base64 encoded string. (The base64 string is a combination of Shortcode+Passkey+Timestamp)
     */
    Password: string,
    /**
     * This is the Timestamp of the transaction, normaly in the formart of 
     * - YEAR+MONTH+DATE+HOUR+MINUTE+SECOND (YYYYMMDDHHMMSS) 
     * - Each part should be atleast two digits apart from the year which takes four digits
     */
    Timestamp: string,
    /**
     * This is the transaction type that is used to identify the transaction when sending the request to M-Pesa. 
     * - The transaction type for M-Pesa Express is "CustomerPayBillOnline" 
     */
    TransactionType: string,
    /**
     * This is the Amount transacted normaly a numeric value. Money that customer pays to the Shorcode. Only whole numbers are supported
     */
    Amount: string | number,
    /**
     * The phone number sending money. 
     * The parameter expected is a Valid Safaricom Mobile Number that is M-Pesa registered in the format 
     * - 2547XXXXXXXX
     */
    PartyA: string | number,
    /**
     * The organization receiving the funds. The parameter expected is a 5 to 6 digit as defined on the Shortcode description above. 
     * - This can be the same as BusinessShortCode value above
     */
    PartyB: string | number,
    /**
     * The Mobile Number to receive the STK Pin Prompt. This number can be the same as PartyA value above
     */
    PhoneNumber: string | number,
    /**
     * A CallBack URL is a valid secure URL that is used to receive notifications from M-Pesa API. 
     * - It is the endpoint to which the results will be sent by M-Pesa API
     */
    CallBackURL: string,
    /**
     * Account Reference: This is an Alpha-Numeric parameter that is defined by your system as an Identifier of the transaction for CustomerPayBillOnline transaction type. Along with the business name, 
     * this value is also displayed to the customer in the STK Pin Prompt message. Maximum of 12 characters
     */
    AccountReference: string,
    /**
     * This is any additional information/comment that can be sent along with the request from your system. Maximum of 13 Characters
     */
    TransactionDesc: string
}

export interface ILipaNaMpesaOnlineClient {
    /**
     * This is the shortcode of the organization initiating the request and expecting the payment.
     * - (Paybill or Buygoods - A 5 to 6 digit account number) 
     * used to identify an organization and receive the transaction 
     */
    BusinessShortCode: string,
    /**
     * This is the Amount transacted normaly a numeric value. Money that customer pays to the Shorcode. Only whole numbers are supported
     */
    Amount: string | number,
    /**
     * The phone number sending money. 
     * The parameter expected is a Valid Safaricom Mobile Number that is M-Pesa registered in the format 
     * - 2547XXXXXXXX
     */
    CustomerPhoneNumber: string | number,
    /**
     * A CallBack URL is a valid secure URL that is used to receive notifications from M-Pesa API. 
     * - It is the endpoint to which the results will be sent by M-Pesa API
     */
    CallBackURL: string,
    /**
     * Account Reference: This is an Alpha-Numeric parameter that is defined by your system as an Identifier of the transaction for CustomerPayBillOnline transaction type. Along with the business name, 
     * this value is also displayed to the customer in the STK Pin Prompt message. Maximum of 12 characters
     */
    AccountReference: string
}