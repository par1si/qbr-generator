const mongoose = require('mongoose');

const closedDealSchema = new mongoose.Schema({
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
    multiYearRevenue: {
        type: 'number',
        required: true
    },
    servicesHours: {
        type: 'number',
        required: true
    },
    closedOn: { 
        type: Date, 
        required: true, 
        default: Date.now 
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
        default: true
    },
    fiscalQuarterClosed: {
        type: 'String',
        required: true
    }
});



module.exports = mongoose.model('closedDeal', closedDealSchema)