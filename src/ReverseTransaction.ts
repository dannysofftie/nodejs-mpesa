/**
 * According to the documentation, this API enables one to reverse a transaction done.
 *  But there are some limitations to this I believe you need to know:
 *
 * You will probably only be able to reverse a transaction where you are the credit party.
 *
 * Obviously the reversal is dependent on the funds being available in the originally credited account. If there are no funds in the originally credited account, the reversal fails.
 *
 * Charges accrued during the transaction will most probably not be reversed.
 *
 * You cannot reverse a reversal transaction.
 *
 * Any C2B transaction reversal that will cause the customers account to exceed the maximum allowed account limit (100K) or Daily transaction limits will be declined. If possible notify the customer beforehand.
 *
 * Not a limitation but a requirement: an initiator needs the Org Reversals Initiator role to be able to perform reversals via API.
 *
 * @export
 * @class ReverseTransaction
 */
export class ReverseTransaction {
    public constructor() {}
}
