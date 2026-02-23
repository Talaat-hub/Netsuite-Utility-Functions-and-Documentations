# NetSuite and AI

# N/llm Module (SuiteScript 2.1)

The `N/llm` module provides a high-level API for integrating Large Language Model (LLM) capabilities directly within NetSuite. This enables developers to build intelligent features like automated text generation, summarization, and data extraction into their scripts and workflows natively.

---

## Module Members

### Objects

#### `llm.ModelFamily` (Enum)

An enum containing the supported LLM model families.

- `COHERE_COMMAND_R`: Cohere Command R model.

---

### Methods

#### `llm.generateText(options)`

Generates text using the specified LLM model.

- **Parameters:**
  - `model` (llm.ModelFamily) (Required): The LLM model family to use.
  - `prompt` (string) (Required): The input prompt for the LLM.
  - `temperature` (number) (Optional): Controls the randomness of the output. Higher values produce more creative responses.
  - `maxTokens` (number) (Optional): The maximum number of tokens to generate in the response.
  
- **Returns:**
  - `Object`: An object containing the generated response in the `text` property.

---

## Practical Example: Generating an Employee Bio

This example demonstrates how to use the `N/llm` module in a User Event script to automatically generate a professional bio when an employee record is created or edited.

**File:** `ue_mt_llm_model.js`

```javascript
/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 *
 * This script uses llm.generateText() to automatically generate a professional
 * bio for an employee upon creation or edit, based on their name, job title,
 * and experience summary.
 */
define(['N/llm', 'N/record'], (llm, record) => {

    const beforeSubmit = (context) => {
        try {
            // Run only on CREATE and EDIT events
            if (context.type !== context.UserEventType.CREATE && context.type !== context.UserEventType.EDIT) {
                return;
            }
            
            const rec = context.newRecord;
            const employee_name = rec.getValue('name');
            const job_title = rec.getValue('custrecord_az_emp_mahmoud_jobtitle');
            const experience = rec.getValue('custentity_experience_summary'); // Custom field example
    
            // Construct a clear and specific prompt for the LLM
            const prompt = `Generate a professional bio for an employee named ${employee_name}, with job title ${job_title}, and experience: ${experience}. Keep it under 200 words.`;
    
            // Generate text using the Cohere Command R model
            const response = llm.generateText({
                model: llm.ModelFamily.COHERE_COMMAND_R,
                prompt: prompt,
                temperature: 0.7, // Controls creativity
                maxTokens: 300    // Limit the length of the bio
            });
    
            // Set the generated text directly into the employee's bio field
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
```

---

# Connect to External AI via HTTPS

If you need to connect to other LLMs (like OpenAI, Google Gemini, Anthropic Claude, etc.) that are not natively supported by `N/llm`, you can use standard HTTPS requests inside NetSuite.

The `Old Documentation` folder contains conceptual examples, while the other files in the `LLM` folder provide practical, working examples of this external integration pattern:

- [ai_cs_using_https.js](https://github.com/Talaat-hub/Netsuite-Utility-Functions-and-Documentations/blob/main/Documentations/LLM/Old%20Documentation/ai_cs_using_https.js) - Client Script example
- [ai_sl_using_https.js](https://github.com/Talaat-hub/Netsuite-Utility-Functions-and-Documentations/blob/main/Documentations/LLM/Old%20Documentation/ai_sl_using_https.js) - Suitelet example
- [ai_ue_using_https.js](https://github.com/Talaat-hub/Netsuite-Utility-Functions-and-Documentations/blob/main/Documentations/LLM/Old%20Documentation/ai_ue_using_https.js) - User Event example

### Note

In our HTTPS examples, we are using the AI model `gemini-1.5-flash`. Feel free to change this through the endpoint URL inside the POST request within the Suitelet.

## Authors

[Mahmoud Talaat](https://www.linkedin.com/in/mahmoudtalaat21/) – NetSuite Developer

Feel free to connect or contribute!

Let me know if you have special focus and I’ll tailor it even more!