// Close Rate by Deal Algorithm


// Future Parameters:
// Quarter Closed
// Segmentation Metric, i.e. deals that had specific property (null by default)

function closeRateByDeal (closedDeals, lostDeals) {
    if (closedDeals.length > 0 && lostDeals.length > 0) {
    // Get all ACV values from closedDeals & lostDeals Arrays to account for Services only deals
    let wonDealArray = closedDeals.map(({ ACV }) => ACV)
    let lostDealArray = lostDeals.map(({ ACV }) => ACV)
        return (wonDealArray.length / (wonDealArray.length + lostDealArray.length)) * 100
    } else {
        return 0
    }
  };

module.exports = closeRateByDeal;