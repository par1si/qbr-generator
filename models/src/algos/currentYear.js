module.exports = function(date) {
    month = date.getMonth()
    year = date.getFullYear()
    if (month < 1) {
        return `FY${year}`
    } else {
        return `FY${year + 1}`
    }
}