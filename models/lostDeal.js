const mongoose = require('mongoose');

const lostDealSchema = mongoose.Schema({
    _userId: {
        type: 'string'
    },
    companyName: {
        type: 'string'
    },
    industry: {
        type: 'string'
    },
    ACV: {
        type: 'number'
    },
    dateFirstEngaged: {
        type: Date
    },
    executiveInvolved: {
        type: 'String'
    },
    mainCompetitor: {
        type: 'String'
    },
    dealType: {
        type: 'String'
    },
    revenueBooked: {
        type: 'Boolean',
        default: false
    },
    closedOn: {
        type: Date,
    },
    fiscalQuarterClosed: {
        type: 'String'
    },
    fiscalYear: {
        type: 'String'
    }
});

lostDealSchema.methods.getFiscalYear = function(date) {
    month = date.getMonth()
    year = date.getFullYear()
    if (month < 1) {
        return `FY${year}`
    } else {
        return `FY${year + 1}`
    }
};

lostDealSchema.methods.getFiscalQuarter = function(date) {
    date.setHours(25)
    var m = date.getMonth() + 1;
    var q = Math.floor(((m - 2) / 3) + 1)
        return `Q${q}`
    
};

module.exports = mongoose.model('LostDeal', lostDealSchema);