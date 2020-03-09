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
    }
});

module.exports = mongoose.model('ClosedDeal', closedDealSchema);