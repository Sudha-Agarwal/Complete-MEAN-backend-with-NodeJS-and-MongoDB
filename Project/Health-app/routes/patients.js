const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');

// Patient main page
router.get('/', (req, res) => res.render('patients/patients'));
// View all patients
router.get('/all', patientController.getAllPatients);

// Register and login routes
//router.get('/register', (req, res) => res.render('patients/register'));
//router.get('/login', (req, res) => res.render('doctors/login'));
router.get('/register', patientController.showRegisterForm);

router.post('/register', patientController.registerPatient);
router.get('/login', patientController.showLoginForm);
router.post('/login', patientController.loginPatient);

// Patient report routes
router.get('/reports/create', patientController.showCreateReportForm);
router.post('/reports/create', patientController.createReport);
router.get('/reports/:reportId', patientController.viewReport);
router.get('/reports', patientController.viewAllReports);

//Patient report by patient Id
router.get('/reports/:id', patientController.getPatientProfile);

// Fetch patient profile and their reports
router.get('/:id', patientController.getPatientProfile);



// View all patients
//router.get('/all', patientController.getAllDoctors);
module.exports = router;


