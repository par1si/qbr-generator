// Get all ACV numbers into an array.

const closedDealACVArray = (closedDeals) => {
    let reducer = (accumulator, currentValue) => accumulator + currentValue;
    let arr = closedDeals.map(({ ACV }) => ACV)
    let arr2 = [];
    let arr3 = [];
    for (i = 0; i < arr.length; i++) {
        let number = arr[i]
        arr2.push(number)
        let reducedACV = arr2.reduce(reducer)
        arr3.push(reducedACV)
        }
    return arr3
}

module.exports = closedDealACVArray;