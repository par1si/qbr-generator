const mongoose = require('mongoose');

const lostDealSchema = new mongoose.Schema({
    companyName: {
        type: 'string',
        required: true
    },
    industry: {
        type: 'string',
        required: true
    },
    ACV: {
        type: 'number',
        required: true
    },
    dateFirstEngaged: {
        type: Date,
        required: true
    },
    executiveInvolved: {
        type: 'String',
        required: true
    },
    mainCompetitor: {
        type: 'String',
        required: true
    },
    dealType: {
        type: 'String',
        required: true
    },
    revenueBooked: {
        type: 'Boolean',
        default: false
    },
    fiscalQuarterClosed: {
        type: 'String',
        required: true
    }
});

module.exports = mongoose.model('lostDeal', lostDealSchema)