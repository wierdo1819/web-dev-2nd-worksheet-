# Student Management REST API

A beginner-friendly REST API for the Web Dev III Unit 2 assignment. It uses **Node.js**, **Express**, modular routing, custom logging middleware, and an in-memory JavaScript array. It does not use a database or Mongoose.

## Project structure

```text
student-management-rest-api/
├── app.js
├── package.json
├── README.md
├── .gitignore
├── .vscode/
│   └── launch.json
├── data/
│   └── students.js
├── middleware/
│   └── logger.js
├── postman/
│   └── Student_Management_API.postman_collection.json
└── routes/
    └── studentRoutes.js
```

## Open and run in VS Code

1. Open **VS Code**.
2. Select **File → Open Folder…** and choose the `student-management-rest-api` folder.
3. Open **Terminal → New Terminal**.
4. Install the dependency once:

   ```bash
   npm install
   ```

5. Start the API:

   ```bash
   npm run dev
   ```

   Or use `npm start` for a normal start. The server listens at `http://localhost:3000` by default. Set the `PORT` environment variable to use a different port.
6. Open `http://localhost:3000` in a browser to see the health response, or test the endpoints with Postman.

### Run from VS Code debugger

Open **Run and Debug** in VS Code and select **Run Student API**. The included launch configuration starts `app.js` and pauses at breakpoints.

## Student fields

- `name` — required, non-empty string
- `age` — required integer from 1 to 120
- `course` — required, non-empty string
- `email` — optional; if supplied, must be a valid email address

Example JSON body:

```json
{
  "name": "Jordan Lee",
  "age": 20,
  "course": "BCA",
  "email": "jordan@example.com"
}
```

## API endpoints

| Method | Endpoint | Description | Success status |
|---|---|---|---:|
| `GET` | `/students` | List all students | 200 |
| `GET` | `/students/:id` | Get one student by ID | 200 |
| `POST` | `/students` | Create a student | 201 |
| `PUT` | `/students/:id` | Replace a student's editable fields | 200 |
| `DELETE` | `/students/:id` | Delete a student | 200 |

A malformed or invalid request receives **400 Bad Request**. A valid ID that does not exist receives **404 Not Found**. Unknown URL paths also receive 404. Responses are JSON.

### cURL examples

List students:

```bash
curl http://localhost:3000/students
```

Get student 1:

```bash
curl http://localhost:3000/students/1
```

Create a student:

```bash
curl -X POST http://localhost:3000/students \
  -H 'Content-Type: application/json' \
  -d '{"name":"Jordan Lee","age":20,"course":"BCA","email":"jordan@example.com"}'
```

Update student 1 (PUT expects all required fields):

```bash
curl -X PUT http://localhost:3000/students/1 \
  -H 'Content-Type: application/json' \
  -d '{"name":"Aarav Patel","age":21,"course":"BCA","email":"aarav@example.com"}'
```

Delete student 1:

```bash
curl -X DELETE http://localhost:3000/students/1
```

## Test with Postman

Import `postman/Student_Management_API.postman_collection.json` into Postman. The collection contains requests for listing, reading, creating, updating, deleting, and checking invalid/not-found cases. The collection uses `http://localhost:3000` as its base URL.

## Notes

- Data is stored only in `data/students.js` as an array. Created, updated, or deleted data is **not persistent** and resets when the server restarts.
- The custom middleware logs each request's timestamp, method, URL, response status, and duration in the VS Code terminal.
- Keep the server running while testing requests from Postman.
