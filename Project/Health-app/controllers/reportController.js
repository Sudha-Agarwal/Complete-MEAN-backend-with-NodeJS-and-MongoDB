const Patient = require('../models/patient');
const PatientReport = require('../models/patientReport');


// Show form to create patient report
exports.showCreateReportForm = (req, res) => {
    res.render('reports/createReport');
};
// Handle creation of patient report
exports.createReport = async (req, res) => {
    try {
        const { patientName, patientEmail, reportText } = req.body;

        // Find patient based on provided name and email
        const patient = await Patient.findOne({ name: patientName, email: patientEmail });
        if (!patient) {
            return res.status(404).send('Patient not found');
        }

        const newReport = new PatientReport({
            patientId: patient._id,
            reportText
        });

        await newReport.save();
        res.redirect(`/reports/reports/${newReport._id}`);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

// View individual patient report
exports.viewReport = async (req, res) => {
    try {
        const report = await PatientReport.findById(req.params.reportId);
        if (report) {
            // Fetch patient details using patientId from the report
            const patient = await Patient.findById(report.patientId);
            if (!patient) {
                return res.status(404).send('Patient not found');
            }

            res.render('reports/viewReport', { report, patient });
        } else {
            res.status(404).send('Report not found');
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
};

// View all patient reports
exports.viewAllReports = async (req, res) => {
    try {
        const reports = await PatientReport.find();
        res.render('reports/viewAllReports', { reports });
    } catch (error) {
        res.status(400).send(error.message);
    }
};
