const existingBusinessACVTotal = (closedDeals) => {
    if (closedDeals.length > 0) {
    
    // Mapping all of the dealTypes into an array
    let existingDealArray = closedDeals.map(({ dealType }) => dealType)
    let existingDealACVArray = closedDeals.map(({ ACV }) => ACV)

    let arrLength = existingDealArray.length
    let newArr = []
    

        for (i = 0; i < arrLength; i++) {
            if (existingDealArray[i] !== 'New') {
                /* existingDealArray.splice(i, 1) */
                newArr.push(existingDealACVArray[i])
            }
        }
    // Reducer
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    // Reducing newDealACVArray
    let existingBusinessTotal = newArr.reduce(reducer);
        return existingBusinessTotal
    } else {
        return 0
    }
};

module.exports = existingBusinessACVTotal;