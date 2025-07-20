/*
@param {rs} - search object created by search.create()
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