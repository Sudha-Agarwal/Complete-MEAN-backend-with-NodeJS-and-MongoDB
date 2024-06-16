const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');

// Reports main page
router.get('/', (req, res) => res.render('reports/reports'));
// View all patients
router.get('/all', reportController.viewAllReports);

// Patient report routes
router.get('/create', reportController.showCreateReportForm);
router.post('/create', reportController.createReport);
router.get('/reports/:reportId', reportController.viewReport);
router.get('/reports', reportController.viewAllReports);

module.exports = router;