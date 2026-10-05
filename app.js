const express = require('express');
const studentRoutes = require('./routes/studentRoutes');
const logger = require('./middleware/logger');

const app = express();
const PORT = process.env.PORT || 3000;

// Parse JSON request bodies and log every request.
app.use(express.json());
app.use(logger);

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Student Management REST API is running.',
    endpoints: {
      students: '/students',
    },
  });
});

app.use('/students', studentRoutes);

// Return a JSON 404 for routes that do not exist.
app.use((req, res) => {
  res.status(404).json({
    error: 'Route not found',
    message: `${req.method} ${req.originalUrl} does not exist.`,
  });
});

// Express error handler (must have four parameters).
app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  // express.json() raises SyntaxError for malformed JSON.
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({
      error: 'Bad Request',
      message: 'Request body contains invalid JSON.',
    });
  }

  console.error(err);
  return res.status(500).json({
    error: 'Internal Server Error',
    message: 'An unexpected error occurred.',
  });
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Student Management API listening at http://localhost:${PORT}`);
  });
}

module.exports = app;
