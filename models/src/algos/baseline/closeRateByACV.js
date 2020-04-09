// Close Rate by ACV Algorithm


// Future Parameters:
// Quarter Closed
// Segmentation Metric, i.e. deals that had specific property (null by default)

function closeRateByACV (closedDeals, lostDeals) {
    if (closedDeals.length > 0 && lostDeals.length > 0) {
    // Get all ACV values from closedDeals Array
    let result = closedDeals.map(({ ACV }) => ACV)
    // Accumulate all ACV values from closedDeals array, store to a variable (totalWonACV)
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    let totalWonACV = result.reduce(reducer);
  
    // Get all ACV values from lostDeals Array
    let lostResult = lostDeals.map(({ ACV }) => ACV)
    // Accumulate all ACV values from lostDeals array, store to a variable (totalLostACV)
    let totalLostACV = lostResult.reduce(reducer);
  
        return ((totalWonACV / (totalWonACV + totalLostACV)) * 100).toFixed(2)
    } else {
        return 0
    }
  };

module.exports = closeRateByACV;