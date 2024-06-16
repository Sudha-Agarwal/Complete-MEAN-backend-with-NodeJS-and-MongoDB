const Doctor = require('../models/doctor');

exports.registerDoctor = async (req, res) => {
    try {
        const { name, email, password, specialty } = req.body;
        const newDoctor = new Doctor({ name, email, password, specialty });
        await newDoctor.save();
        res.redirect('/doctors');
    } catch (error) {
        res.status(400).send(error.message);
    }
};

exports.loginDoctor = async (req, res) => {
    try {
        const { email, password } = req.body;
        const doctor = await Doctor.findOne({ email, password });
        if (doctor) {
            res.render('doctors/doctorDetails', { doctor });
        } else {
            res.status(400).send('Doctor not found or incorrect password');
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
};

exports.getAllDoctors = async (req, res) => {
    try {
        const doctors = await Doctor.find();
        res.render('doctors/viewAllDoctors', { doctors });
    } catch (error) {
        res.status(400).send(error.message);
    }
};

// Search doctors by name
exports.searchDoctorsByName = async (req, res) => {
    try {
        const { search } = req.query;
        const regex = new RegExp(search, 'i'); // Case-insensitive search regex

        const doctors = await Doctor.find({ name: regex });
        res.render('doctors/viewAllDoctors', { doctors });
    } catch (error) {
        res.status(400).send(error.message);
    }
};

exports.getDoctorById = async (req, res) => {
    try {
        const doctor = await Doctor.findById(req.params.id);
        if (doctor) {
            res.render('doctors/doctorDetails', { doctor });
        } else {
            res.status(400).send('Doctor not found');
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
};

exports.updateDoctor = async (req, res) => {
    try {
        const { name, email, password, specialty } = req.body;
        const doctor = await Doctor.findByIdAndUpdate(req.params.id, { name, email, password, specialty }, { new: true });
        if (doctor) {
            res.redirect('/doctors');
        } else {
            res.status(400).send('Doctor not found');
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
};

exports.deleteDoctor = async (req, res) => {
    try {
        await Doctor.findByIdAndDelete(req.params.id);
        res.redirect('/doctors');
    } catch (error) {
        res.status(400).send(error.message);
    }
};
