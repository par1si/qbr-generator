const quarterlyQuotaArray = (quarterlyQuota, closedDealACVArray) => {
    let quota = []
    for (i = 0; i < closedDealACVArray.length; i++) {
        quota.push(quarterlyQuota)
    }
    return quota
}

module.exports = quarterlyQuotaArray;