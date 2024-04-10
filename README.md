# Backend API Documentation

This backend API is developed using Node.js and Express.js, with MongoDB as the database. It provides endpoints for managing tasks (todos) within boards.

## Technologies Used:
- Node.js
- Express.js
- MongoDB (Mongoose for ORM)

## Endpoints:

### 1. Create or Get Board (POST /todos)
- **Description:**
  Create a new board or retrieve an existing board by boardId.

### 2. Add Task to Board (POST /todos/add)
- **Description:**
  Add a new task (todo) to a board.

### 3. Get Tasks from Board (GET /todos/:boardId)
- **Description:**
  Retrieve all tasks (todos) associated with a board.

### 4. Delete Task from Board (DELETE /todos/delete/:boardId/:todoId)
- **Description:**
  Delete a specific task (todo) from a board.

### 5. Update Task (PUT /todos/update/:todoId)
- **Description:**
  Update an existing task (todo) by todoId.

## Usage:
1. **Clone the Repository:**
   ```bash
   git clone <repository_url>
2. **Install Dependencies:**
   ```npm install
3. **Install Dependencies:**
  Create a .env file and add the following:
  ```MONGODB_URI=<your_mongodb_uri>
    PORT=<port_number>
4. **Start the Server:**
   ```npm start

4. **Access the API Endpoints:**
  Use tools like Postman or cURL to interact with the API endpoints described above, or install Rest Client Extension in VSCode.