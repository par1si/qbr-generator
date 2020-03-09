const newBusinessACVArray = (closedDeals) => {
    if (closedDeals.length > 0) {
    
    // Mapping all of the dealTypes into an array
    let newDealArray = closedDeals.map(({ dealType }) => dealType)
    let newDealACVArray = closedDeals.map(({ ACV }) => ACV)

        for (i = 0; i < newDealArray.length; i++) {
            if (newDealArray[i] === 'Vertical Expansion') {
                newDealACVArray.splice(i, 1)
            }
        }
    // Reducer
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    // Reducing newDealACVArray
    let newBusinessTotal = newDealACVArray.reduce(reducer);
        return newBusinessTotal
    } else {
        return 0
    }
};

module.exports = newBusinessACVArray;