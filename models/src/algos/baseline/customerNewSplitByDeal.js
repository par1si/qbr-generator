// Close Rate by Deal Algorithm


// Future Parameters:
// Quarter Closed
// Segmentation Metric, i.e. deals that had specific property (null by default)

function customerNewSplitByDeal (closedDeals, lostDeals) {
    if (closedDeals.length > 0 && lostDeals.length > 0) {
    // Mapping all of the dealTypes into an array
    let dealArray = closedDeals.map(({ dealType }) => dealType)

    function removeNew (dealType) {
        return (dealType === 'Vertical Expansion' || dealType === 'Horizontal Expansion')
    }

    let arr = dealArray.filter(removeNew)

        return ((arr.length / dealArray.length) * 100).toFixed(2)
    } else {
        return 0
    }
  };

module.exports = customerNewSplitByDeal;