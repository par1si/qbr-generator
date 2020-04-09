// Close Rate by Deal Algorithm


// Future Parameters:
// Quarter Closed
// Segmentation Metric, i.e. deals that had specific property (null by default)



function customerNewSplitByDeal (closedDeals, lostDeals) {
    if (closedDeals.length > 0 && lostDeals.length > 0) {
    // Mapping all of the dealTypes into an array
    let dealArray = closedDeals.map(({ dealType }) => dealType)
    let newDealArray = closedDeals.map(({ dealType }) => dealType)
        for (i = 0; i < newDealArray.length; i++) {
            if (newDealArray[i] === 'Vertical Expansion') {
                newDealArray.splice(i, 1)
            }
        }
        return (((dealArray.length - newDealArray.length)/ (newDealArray.length + dealArray.length)) * 100).toFixed(2)
    } else {
        return 0
    }
  };

module.exports = customerNewSplitByDeal;