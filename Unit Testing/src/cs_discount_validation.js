/**
 * @NApiVersion 2.1
 * @NScriptType ClientScript
 * 
 * TUTORIAL NOTES:
 * Client Scripts run directly in the user's browser as they use NetSuite.
 * They are great for instant validation before a user saves a form.
 */
define(['N/currentRecord', 'N/ui/dialog'], function (currentRecord, dialog) {

    /**
     * saveRecord runs when the user clicks the "Save" button.
     * It MUST return a boolean: true to allow saving, false to block it!
     */
    function saveRecord(context) {
        // In client scripts, context.currentRecord is the record the user is working on
        const rec = context.currentRecord;

        // Get the values for total and discount
        const subtotal = rec.getValue({ fieldId: 'subtotal' }) || 0;
        const discountAmount = rec.getValue({ fieldId: 'discountamount' }) || 0;

        // Validation rule: You cannot give a discount larger than 50% of the subtotal
        const maxDiscount = subtotal * 0.5;

        // Note: discountAmount is often negative in NetSuite, so we use Math.abs to make it positive for comparison
        if (Math.abs(discountAmount) > maxDiscount) {
            // Show a popup alert to the user
            dialog.alert({
                title: 'Discount Too High',
                message: 'You cannot provide a discount greater than 50% of the subtotal.'
            });

            // Return false to prevent the record from being saved
            return false;
        }

        // Return true to allow saving
        return true;
    }

    return {
        saveRecord: saveRecord
    };
});
