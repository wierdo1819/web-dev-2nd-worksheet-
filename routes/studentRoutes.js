const express = require('express');
const students = require('../data/students');

const router = express.Router();

function findStudentIndex(id) {
  return students.findIndex((student) => student.id === id);
}

function parseStudentId(value) {
  if (!/^\d+$/.test(value)) {
    return null;
  }

  const id = Number(value);
  return Number.isSafeInteger(id) && id > 0 ? id : null;
}

function validateStudent(body) {
  const errors = [];
  const input = body && typeof body === 'object' && !Array.isArray(body) ? body : {};
  const name = typeof input.name === 'string' ? input.name.trim() : '';
  const course = typeof input.course === 'string' ? input.course.trim() : '';
  const age = input.age;

  if (!name) {
    errors.push('name is required and must be a non-empty string.');
  }
  if (!Number.isInteger(age) || age < 1 || age > 120) {
    errors.push('age is required and must be an integer between 1 and 120.');
  }
  if (!course) {
    errors.push('course is required and must be a non-empty string.');
  }

  let email = '';
  if (input.email !== undefined && input.email !== null && input.email !== '') {
    if (typeof input.email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email.trim())) {
      errors.push('email must be a valid email address when provided.');
    } else {
      email = input.email.trim();
    }
  }

  return {
    errors,
    student: { name, age, course, email },
  };
}

// GET /students — list all students.
router.get('/', (req, res) => {
  return res.status(200).json({ count: students.length, data: students });
});

// GET /students/:id — get one student by ID.
router.get('/:id', (req, res) => {
  const id = parseStudentId(req.params.id);
  if (id === null) {
    return res.status(400).json({ error: 'Bad Request', message: 'Student ID must be a positive integer.' });
  }

  const student = students.find((item) => item.id === id);
  if (!student) {
    return res.status(404).json({ error: 'Not Found', message: `No student exists with ID ${id}.` });
  }

  return res.status(200).json({ data: student });
});

// POST /students — create a student.
router.post('/', (req, res) => {
  const { errors, student } = validateStudent(req.body);
  if (errors.length > 0) {
    return res.status(400).json({ error: 'Bad Request', messages: errors });
  }

  const nextId = students.reduce((maximum, item) => Math.max(maximum, item.id), 0) + 1;
  const newStudent = { id: nextId, ...student };
  students.push(newStudent);

  return res.status(201).json({ message: 'Student created successfully.', data: newStudent });
});

// PUT /students/:id — replace the editable fields of a student.
router.put('/:id', (req, res) => {
  const id = parseStudentId(req.params.id);
  if (id === null) {
    return res.status(400).json({ error: 'Bad Request', message: 'Student ID must be a positive integer.' });
  }

  const index = findStudentIndex(id);
  if (index === -1) {
    return res.status(404).json({ error: 'Not Found', message: `No student exists with ID ${id}.` });
  }

  const { errors, student } = validateStudent(req.body);
  if (errors.length > 0) {
    return res.status(400).json({ error: 'Bad Request', messages: errors });
  }

  students[index] = { id, ...student };
  return res.status(200).json({ message: 'Student updated successfully.', data: students[index] });
});

// DELETE /students/:id — remove a student.
router.delete('/:id', (req, res) => {
  const id = parseStudentId(req.params.id);
  if (id === null) {
    return res.status(400).json({ error: 'Bad Request', message: 'Student ID must be a positive integer.' });
  }

  const index = findStudentIndex(id);
  if (index === -1) {
    return res.status(404).json({ error: 'Not Found', message: `No student exists with ID ${id}.` });
  }

  const [deletedStudent] = students.splice(index, 1);
  return res.status(200).json({ message: 'Student deleted successfully.', data: deletedStudent });
});

module.exports = router;
