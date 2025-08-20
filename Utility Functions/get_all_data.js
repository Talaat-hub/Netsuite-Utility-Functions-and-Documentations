/*
@param {rs} - search object created by search.create()

---

## Example Usage

const search_object = search.create({
type: 'employee',
filters: [ ........

});

const results = getAllData(search_object) // more than 1000 records can be held
*/

const getAllData = (rs) => {
    try {
        const results = rs.run();
        const searchResults = [];
        let searchid = 0;
        do {
            var resultslice = results.getRange({ start: searchid, end: searchid + 1000 });
            resultslice.forEach(function (slice) {
                searchResults.push(slice);
                searchid++;
            }
            );
        } while (resultslice.length >= 1000);
        return searchResults;
    } catch (errGetAllData) {
        log.debug('errGetAllData', errGetAllData)
    }
};