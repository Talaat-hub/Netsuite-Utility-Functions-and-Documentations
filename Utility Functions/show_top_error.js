/*
@param {msgText} - The error message as a STRING

---

## Example Usage

if(!subsidiary){
showTopError("Please choose a subsidiary!"); Error message
}
*/

const showTopError = (msgText) => {
    try {
        const errorMessage = message.create({
            title: "Validation Error",
            message: msgText,
            type: message.Type.ERROR
        });

        errorMessage.show({
            duration: 10000 // 10 seconds
        });
    } catch (errshowTopError) {
        log.debug('errshowTopError', errshowTopError);
    }
};