// backend/routes/students.js
const express = require('express');
const router = express.Router();
const { getStudents, addStudent, updateStudent, deleteStudent } = require('../controllers/studentController');
const auth = require('../middleware/auth');

router.get('/', auth, getStudents);
router.post('/', auth, addStudent);
router.put('/:id', auth, updateStudent);
router.delete('/:id', auth, deleteStudent);

module.exports = router;
