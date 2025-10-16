/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
*/
 define(['N/log'], function(log) {


        const beforeLoad = (context) => {
            try {

                log.debug('Hello')
                
                if (context.type == context.UserEventType.CREATE || context.type == context.UserEventType.EDIT) {

                    context.form.addButton({
                        id: 'custpage_ai_help',
                        label: 'Taylor your about using ai',
                        functionName: `openAIAssistant`
                    });
    
                    // Change the path of the clinetscript to the relative ones you have
                    context.form.clientScriptModulePath = 'SuiteScripts/suiteScript2/ai_cs_using_https.js';
    
                }

            } catch (errbeforeLoad) {
                log.debug('errbeforeLoad', errbeforeLoad)
            }
        };

        return {
                beforeLoad : beforeLoad
          }
   }
)