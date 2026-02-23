/**
 * @NApiVersion 2.1
 * @NScriptType MapReduceScript
 * 
 * TUTORIAL NOTES:
 * Map/Reduce scripts are used for processing large amounts of data.
 * This script finds invoices without a memo, and sets a memo on each of them.
 */
define(['N/search', 'N/record', 'N/log'], function (search, record, log) {

    /**
     * getInputData runs first. It gathers all the data to be processed.
     * Usually, it returns a Search Object.
     */
    function getInputData() {
        log.debug('Starting Map/Reduce', 'Getting inputs...');

        // We create a search to find invoices that don't have a memo yet
        return search.create({
            type: search.Type.INVOICE,
            filters: [
                ['mainline', 'is', 'T'],
                'AND',
                ['memo', 'isempty', '']
            ],
            columns: ['internalid', 'entity']
        });
    }

    /**
     * map runs for EACH result returned by getInputData.
     * We use it to process individual records.
     */
    function map(context) {
        // context.value is a JSON string of the search result for this item. We must parse it!
        const searchResult = JSON.parse(context.value);
        const invoiceId = searchResult.id;

        log.audit('Processing Invoice', 'Invoice ID: ' + invoiceId);

        try {
            // Load the invoice record
            const invoiceRecord = record.load({
                type: record.Type.INVOICE,
                id: invoiceId,
                isDynamic: true
            });

            // Add a memo saying we processed it
            invoiceRecord.setValue({
                fieldId: 'memo',
                value: 'Processed by automation'
            });

            // Save the record
            const savedId = invoiceRecord.save();
            log.debug('Success', 'Updated Invoice ID: ' + savedId);

        } catch (e) {
            log.error('Error processing Invoice ' + invoiceId, e.message);
        }
    }

    /**
     * summarize runs at the very end to give us a summary of the whole process.
     */
    function summarize(summary) {
        log.audit('Map/Reduce Finished', 'Total processed: ' + summary.mapSummary.keys.length);

        // We can check for errors that happened during the process
        summary.mapSummary.errors.iterator().each(function (key, error) {
            log.error('Map Error for key: ' + key, error);
            return true;
        });
    }

    return {
        getInputData: getInputData,
        map: map,
        summarize: summarize
    };
});
