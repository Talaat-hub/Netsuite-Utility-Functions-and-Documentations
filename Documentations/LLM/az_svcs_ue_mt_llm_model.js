/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 */
define(['N/llm', 'N/record'], (llm, record) => {

    const beforeSubmit = (context) => {

        try {
            
            if (context.type !== context.UserEventType.CREATE && context.type !== context.UserEventType.EDIT) {
                return;
            }
            const rec = context.newRecord;
            const employee_name = rec.getValue('name');
            const job_title = rec.getValue('custrecord_az_emp_mahmoud_jobtitle');
            const experience = rec.getValue('custentity_experience_summary'); // Custom field example
    
            const prompt = `Generate a professional bio for an employee named ${employee_name}, with job title ${job_title}, and experience: ${experience}. Keep it under 200 words.`;
    
            const response = llm.generateText({
                model: llm.ModelFamily.COHERE_COMMAND_R,
                prompt: prompt,
                temperature: 0.7, // Controls creativity
                maxTokens: 300
            });
    
            rec.setValue({
                fieldId: 'custentity_employee_bio',
                value: response.text
            });

        } catch (errbeforeSubmit) {
            log.debug('errbeforeSubmit', errbeforeSubmit);
        }
    };

    return {
        beforeSubmit: beforeSubmit
    };
});