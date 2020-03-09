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
    fiscalQuarterClosed: {
        type: 'String'
    }
});

module.exports = mongoose.model('LostDeal', lostDealSchema);