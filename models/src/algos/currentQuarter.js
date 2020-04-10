var d = new Date(2020,01,01)

console.log(d)

function getQuarter(d) {
    var m = d.getMonth() + 1;
    var q = Math.floor(((m - 2) / 3) + 1)
    console.log(q)
    return 'Q' + q
}

console.log(getQuarter(d))