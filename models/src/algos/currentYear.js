module.exports = function() {
    const today = new Date();
    month = today.getMonth()
    year = today.getFullYear()
    if (month < 1) {
        return `FY${year}`
    } else {
        return `FY${year + 1}`
    }
}