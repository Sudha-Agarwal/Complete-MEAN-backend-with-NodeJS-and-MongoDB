const mongoose = require('mongoose');

// Define PatientReport Schema
const patientReportSchema = new mongoose.Schema({
    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        required: true
    },
    reportText: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Create PatientReport model
const PatientReport = mongoose.model('PatientReport', patientReportSchema);

module.exports = PatientReport;
