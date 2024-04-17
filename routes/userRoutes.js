const express = require('express');
const { bookingappointmentpageController, getAllUsers, deleteUser, updateUser } = require('../controllers/userCtrl');

const router = express.Router();

router.post('/bookingappointmentpage', bookingappointmentpageController);
router.get('/users', getAllUsers);
router.delete('/users/:id', deleteUser);
router.put('/users/:id', updateUser);

module.exports = router;
