/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 * 
 * TUTORIAL NOTES:
 * This is a simple User Event script. It runs automatically when records are created, loaded, or saved.
 * Here, we are using the 'beforeSubmit' event to validate data before a record is saved to the database.
 */
define(['N/record', 'N/log', 'N/error'], function(record, log, error) {

    /**
     * The beforeSubmit function runs before a record is saved to the database.
     * We can use it to validate data or modify the record before it saves.
     */
    function beforeSubmit(context) {
        // We only want to run this logic when a new record is being created
        if (context.type !== context.UserEventType.CREATE) {
            return; // Exit early if it's an edit or view
        }

        // 'context.newRecord' gives us the record that is about to be saved
        const newCustomer = context.newRecord;

        // Let's get the value of the 'companyname' field
        const companyName = newCustomer.getValue({ fieldId: 'companyname' });

        // Let's log that we are checking this customer
        log.debug('Checking Customer', 'Company Name: ' + companyName);

        // Simple Validation: If the company name is empty, we throw an error to block the save
        if (!companyName) {
            log.error('Validation Failed', 'Company Name is empty');
            
            throw error.create({
                name: 'MISSING_COMPANY_NAME',
                message: 'Company Name is required for new customers.',
                notifyOff: false
            });
        }
        
        // If validation passes, we can also modify fields automatically!
        // E.g., setting a default "tier" if none was provided
        const tier = newCustomer.getValue({ fieldId: 'custentity_tier' });
        if (!tier) {
            newCustomer.setValue({ fieldId: 'custentity_tier', value: '1' }); 
        }
    }

    // We export the function so NetSuite knows which function to run for 'beforeSubmit'
    return {
        beforeSubmit: beforeSubmit
    };
});
