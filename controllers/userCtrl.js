const userModel = require('../models/userModels');
const bcrypt = require('bcryptjs');

exports.bookingappointmentpageController = async (req, res) => {
    try {
        const existingUser = await userModel.findOne({
            where: {
                email: req.body.email
            }
        });
        if (existingUser) {
            return res.status(409).json({ message: 'User already exists', success: false });
        }
        const newUser = await userModel.create(req.body);
        res.status(201).json({ message: 'User added successfully', success: true, newUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: `Server error: ${error.message}` });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await userModel.findAll();
        // Phone numbers ko decrypt karen
        const decryptedUsers = users.map(user => {
            return {
                id: user.id,
                username: user.username,
                phonenumber: user.phonenumber, // Ye assumption hai ki ye hashed phone number hai
                email: user.email
            };
        });
        res.status(200).json(decryptedUsers);
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: `Error fetching users: ${error.message}` });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const user = await userModel.destroy({
            where: { id: req.params.id }
        });
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        res.status(200).json({ success: true, message: 'User deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: `Server error: ${error.message}` });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const { username, phonenumber, email } = req.body;
        const updatedUser = await userModel.update({ username, phonenumber, email }, {
            where: { id: req.params.id }
        });
        if (updatedUser[0] === 0) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        res.status(200).json({ success: true, message: 'User updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: `Server error: ${error.message}` });
    }
};
