// In-memory data only: all changes are lost when the server process restarts.
const students = [
  { id: 1, name: 'Aarav Patel', age: 20, course: 'BCA', email: 'aarav@example.com' },
  { id: 2, name: 'Priya Shah', age: 21, course: 'BSc IT', email: 'priya@example.com' },
  { id: 3, name: 'Kabir Mehta', age: 19, course: 'BCA', email: '' },
];

module.exports = students;
