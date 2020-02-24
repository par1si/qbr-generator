function getSalesCycleLength (closedDeals) {
    if (closedDeals.length > 0) {

        // Mapping all of the close & first engaged dates into an array, then converting
        // to time in ms.
        let closeDatesArray = closedDeals.map(({ closedOn }) => closedOn)
        let engagedDatesArray = closedDeals.map(({ dateFirstEngaged }) => dateFirstEngaged)
        let closeDateResults = closeDatesArray.map(function(item, i) {
            return item.getTime()
        })
        let engagedDateResults = engagedDatesArray.map(function(item, i) {
            return item.getTime()
        })

        // Initializing a new array to hold the time differences
        let timeDifferenceArray = []
        let dayDifferenceArray = []

        // Pushing the difference between the time values into a new array and converting
        // from milliseconds to days elapsed
        function compare(arr1, arr2) {
            for (i = 0; i < arr1.length; i++) {
                let result = arr1[i] - arr2[i]
                if (result > 0) {
                timeDifferenceArray.push(result)
                }
            }
        }
        function getDays(arr) {
            for (i = 0; i < arr.length; i++) {
                let result = (arr[i] / 86400000)
                dayDifferenceArray.push(result)
            }
        }
        const reducer = (accumulator, currentValue) => accumulator + currentValue;

        // Calling the functions
        compare(closeDateResults, engagedDateResults);
        getDays(timeDifferenceArray)

        // Saving the totals/averages
        let totalSalesCycleLength = dayDifferenceArray.reduce(reducer)
        let averageSalesCycleLength = (totalSalesCycleLength / dayDifferenceArray.length)
        
        return averageSalesCycleLength;


        } else {
            return 0
        }
}

module.exports = getSalesCycleLength;