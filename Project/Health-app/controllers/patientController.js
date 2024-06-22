const Patient = require('../models/patient');
const PatientReport = require('../models/patientReport');

// Show registration form
exports.showRegisterForm = (req, res) => {
    console.log("register");
    res.render('patients/register');
};

// Handle patient registration
exports.registerPatient = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const newPatient = new Patient({ name, email, password });
        await newPatient.save();
        res.redirect('/patients');
    } catch (error) {
        res.status(400).send(error.message);
    }
};

// Show login form
exports.showLoginForm = (req, res) => {
    res.render('patients/login');
};

// Handle patient login
exports.loginPatient = async (req, res) => {
    try {
        const { email, password } = req.body;
        const patient = await Patient.findOne({ email, password });
        if (patient) {
            res.render('patients/patientProfile', { patient });
        } else {
            res.status(400).send('Patient not found or incorrect password');
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
};


exports.getAllPatients = async (req, res) => {
    try {
        const patients = await Patient.find();
        res.render('patients/viewAllPatients', { patients });
    } catch (error) {
        res.status(400).send(error.message);
    }
};


// Fetch patient profile and their reports
exports.getPatientProfile = async (req, res) => {
    try {
        //const { name, email,id } = req.query; // Assuming name and email are provided in the query parameters

        //console.log(req.params.id)
        // Fetch patient based on name and email
        const patient = await Patient.findById(req.params.id);
        console.log(patient._id);

        if (patient) {
            // Fetch all reports associated with the patient
            const reports = await PatientReport.find({ patientId: patient._id });

            // Render patientProfile.hbs with patient details and their reports
            res.render('patients/patientProfile', { patient, reports });
        } else {
            res.status(404).send('Patient not found');
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
};

// Show form to create patient report
exports.showCreateReportForm = (req, res) => {
    res.render('patients/createReport');
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
        res.redirect(`/patients/reports/${newReport._id}`);
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

            res.render('patients/viewReport', { report, patient });
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
        res.render('patients/viewAllReports', { reports });
    } catch (error) {
        res.status(400).send(error.message);
    }
};
