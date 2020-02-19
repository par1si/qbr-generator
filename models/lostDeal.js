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
    termLength: {
        type: 'number',
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
    }
});

module.exports = mongoose.model('lostDeal', lostDealSchema)