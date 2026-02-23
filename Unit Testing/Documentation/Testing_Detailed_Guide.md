# Unit Testing SuiteScripts: A Detailed Guide

This guide explains how we have implemented unit testing for SuiteScripts in this project using the Jest framework.

## 1. Core Concepts
SuiteScripts run in a NetSuite environment and depend on modules like `N/record`, `N/search`, and `N/log`. To test them locally, we use:
- **Mocking**: Substituting real NetSuite modules with fake ones located in the `__mocks__` directory.
- **Dependency Injection**: Using a `global.define` function to capture the script's entry point and inject our mocks.

## 2. Testing Entry Points
We test three types of scripts in this repository:

### User Event Scripts (`ue_customer_validation.js`)
We simulate the `beforeSubmit` event by providing a fake `context` containing a mocked `newRecord`.
- **Technique**: Mock `record.load` to simulate loading related data (like subsidiaries).
- **Assertion**: Use `expect(record.load).toHaveBeenCalledWith(...)`.

### Client Scripts (`cs_discount_validation.js`)
Client scripts are triggered by browser actions. We test the `saveRecord` function by verifying it returns `true` or `false` based on logic.
- **Technique**: Mock `dialog.alert` to ensure users are notified of validation errors.
- **Catching Errors**: We trigger the script's `try-catch` block by passing an invalid context object to ensure it logs errors gracefully.

### Map/Reduce Scripts (`mr_invoice_memo.js`)
We test `getInputData`, `map`, and `summarize` separately.
- **Summarize Testing**: We mock the summary error iterator to ensure that any errors that occurred during the map/reduce process are logged correctly using `log.error`.

## 3. Coverage
We aim for 100% code coverage. This is achieved by:
1.  Testing the "Happy Path" (valid data).
2.  Testing Validation Errors (invalid data).
3.  Testing Edge Cases (empty fields).
4.  Testing Exception Handling (triggering `catch` blocks).

To run the tests with coverage:
```bash
npm test
```
Or for a detailed report:
```bash
npx jest --coverage
```
