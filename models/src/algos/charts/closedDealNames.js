const closedDealNameArray = (closedDeals) => {
    let arr = closedDeals.map(({ companyName }) => companyName)
    return arr;
}


module.exports = closedDealNameArray;