function getSalesCycleLength (closedDeals) {
    if (closedDeals.length > 0) {
        // Mapping all of the close & first engaged dates into an array
        let closeDatesArray = closedDeals.map(({ closedOn }) => closedOn)
        let engagedDatesArray = closedDeals.map(({ dateFirstEngaged }) => dateFirstEngaged)

        // Need to convert date to time, then 
        // compute the difference between index 0 of close dates array & index 0 of engaged dates array

        } else {
            return 0
        }
}

module.exports = getSalesCycleLength;