var d = new Date('2020-02-01T00:00:00.000Z')

d.setHours(25)

console.log(d)

function getQuarter(d) {
    var m = d.getMonth() + 1;
    var q = Math.floor(((m - 2) / 3) + 1)
    console.log(q)
    return 'Q' + q
}

console.log(getQuarter(d))