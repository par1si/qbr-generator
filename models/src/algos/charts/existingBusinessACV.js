const existingBusinessACVTotal = (closedDeals) => {
    if (closedDeals.length > 0) {
    
    // Mapping all of the dealTypes into an array
    let existingDealArray = closedDeals.map(({ dealType }) => dealType)
    let existingDealACVArray = closedDeals.map(({ ACV }) => ACV)

    let arrLength = existingDealArray.length
    let newArr = []
    
        if (existingDealArray.length != 0) {

        for (i = 0; i < arrLength; i++) {
            if (existingDealArray[i] !== 'New') {
                newArr.push(existingDealACVArray[i])
            }
        }
    }

    
    // Reducer
    const reducer = (accumulator, currentValue) => accumulator + currentValue;

    // Reducing newDealACVArray, as long as it has values in it
        if (newArr.length > 0) {
            let existingBusinessTotal = newArr.reduce(reducer);
            return existingBusinessTotal
        } else {
            return 0
        }
        
    // Returning '0' to the chart if there are no deals to display.
    } else {
        return 0
    }
};

module.exports = existingBusinessACVTotal;