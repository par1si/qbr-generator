const mongoose = require('mongoose');

const closedDealSchema = mongoose.Schema({
    _userId: {
        type: 'string'
    },
    companyName: {
        type: 'string'
    },
    industry: {
        type: 'string'
    },
    termLength: {
        type: 'number'
    },
    ACV: {
        type: 'number'
    },
    multiYearRevenue: {
        type: 'number'
    },
    servicesHours: {
        type: 'number'
    },
    closedOn: { 
        type: Date, 
        default: Date.now 
    },
    dateFirstEngaged: {
        type: Date
    },
    executiveInvolved: {
        type: 'String',
    },
    mainCompetitor: {
        type: 'String'
    },
    dealType: {
        type: 'String'
    },
    revenueBooked: {
        type: 'Boolean',
        default: true
    },
    fiscalQuarterClosed: {
        type: 'String'
    },
    fiscalYear: {
        type: 'String'
    }
});

closedDealSchema.methods.getFiscalYear = function(date) {
    month = date.getMonth()
    year = date.getFullYear()
    if (month < 1) {
        return `FY${year}`
    } else {
        return `FY${year + 1}`
    }
};

closedDealSchema.methods.getFiscalQuarter = function(date) {
    var m = date.getMonth() + 1;
    var q = Math.floor(((m - 2) / 3) + 1)
    if (q < 1) {
        return `Q${q + 1}`
    } else {
        return `Q${q}`
    }
};



module.exports = mongoose.model('ClosedDeal', closedDealSchema);