# Notes App

### Environment Setup

1. Clone the repo.
   ```bash
   $ git clone https://github.com/donymvarkey/notes-app.git
   ```
2. Install the dependencies with npm.
   ```bash
   $ cd notes-app
   $ npm i
   ```
3. Create a `.env` file in the project root directory and add the following contents.
   ```
   PORT=5000
   SIGNATURE="j+PPRMUwtEWIF84RW0+EAx1A/DslXrM2zek/91E2ioU="
   MONGO_URL="mongodb://localhost:27017/notes-app"
   ```
4. Run the node development server
   ```bash
   $ npm run dev
   ```
   You should see the following output in the terminal
   ```json
   {"level":"info","message":"Listening on http://127.0.0.1:5000"}
   {"level":"info","message":"Connected to MongoDB instance"}
   ```

## API Docs

1. ### User Registration
   URL: `/api/auth/register`<br/>
   Request Type: `POST`<br/>
   Request Body:
   ```json
   {
     "firstName": "John",
     "lastName": "Doe",
     "address": "Kochi, Kerala",
     "email": "johndoe@gmail.com",
     "password": "john1234"
   }
   ```
   Sample Response:
   ```json
   {
     "code": 200,
     "msg": "User registered successfully.",
     "data": null
   }
   ```
2. ### User Login
   URL: `/api/auth/login`
   Request Type: `POST`
   Request Body:
   ```json
   {
     "email": "johndoe@gmail.com",
     "password": "john1234"
   }
   ```
   Sample Response:
   ```json
   {
     "code": 200,
     "msg": "Login successful",
     "data": {
       "userid": "6251443b0027cc1b6eee32a6",
       "profileId": "6251443b0027cc1b6eee32a8",
       "firstName": "John",
       "lastName": "Doe",
       "address": "Kochi, Kerala",
       "email": "johndoe@gmail.com",
       "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...."
     }
   }
   ```
3. ### Add a new Note

   URL: `/api/notes`<br/>
   Request Type: `POST`<br />
   Request Body:

   ```json
   {
     "note": "This is a note."
   }
   ```

   Header Params:
   `x-auth-token: (jwt token recieved upon user login)`

   Sample Response:

   ```json
   {
     "code": 200,
     "msg": "Note created successfully",
     "data": {
       "userId": "6251443b0027cc1b6eee32a6",
       "userProfileId": "6251443b0027cc1b6eee32a8",
       "note": "This is a note.",
       "_id": "625145690027cc1b6eee32ac",
       "__v": 0
     }
   }
   ```

4. ### Get all notes
   URL: `/api/notes`<br/>
   Request Type: `GET`<br/>
   Header Params:
   `x-auth-token: (jwt token recieved upon user login)`<br/>
   Sample Response:
   ```json
    {
   	"code":  200,
   	"msg":  "Notes fetched successfully",
   	"data":  [
   			{
   				"_id":  "625145690027cc1b6eee32ac",
   				"userId":  "6251443b0027cc1b6eee32a6",
   				"userProfileId":  "6251443b0027cc1b6eee32a8",
   				"note":  "This note has two lines. This is thr second line",
   				"__v":  0
   			},
   			{...}
   	]
   }
   ```
5. ### Get a note with a particular ID
   URL: `/api/notes/:id`<br/>
   Request Type: `GET`<br/>
   Header Params:
   `x-auth-token: (jwt token recieved upon user login)`<br/>
   Sample Response:
   ```json
   {
     "code": 200,
     "msg": "Notes fetched successfully",
     "data": {
       "_id": "625145690027cc1b6eee32ac",
       "userId": "6251443b0027cc1b6eee32a6",
       "userProfileId": "6251443b0027cc1b6eee32a8",
       "note": "This note has two lines. This is thr second line",
       "__v": 0
     }
   }
   ```
6. ### Update a note

   URL: `/api/notes/:id`<br/>
   Request Type: `PUT`<br/>
   Request Body:

   ```json
   {
     "note": "This note is updated."
   }
   ```

   Header Params:
   `x-auth-token: (jwt token recieved upon user login)`
   Sample Response:

   ```json
   {
     "code": 200,
     "msg": "Note updated successfully",
     "data": {
       "_id": "625145690027cc1b6eee32ac",
       "userId": "6251443b0027cc1b6eee32a6",
       "userProfileId": "6251443b0027cc1b6eee32a8",
       "note": "This note has been updated.",
       "__v": 0
     }
   }
   ```

7. ### Delete a note
8. URL: `/api/notes/:id`<br/>
   Request Type: `DELETE`<br/>
   Request Body:

   ```json
   {
     "note": "This note is updated."
   }
   ```

   Header Params:
   `x-auth-token: (jwt token recieved upon user login)`
   Sample Response:

   ```json
   {
     "code": 200,
     "msg": "Note deleted successfully",
     "data": {
       "_id": "625145690027cc1b6eee32ac",
       "userId": "6251443b0027cc1b6eee32a6",
       "userProfileId": "6251443b0027cc1b6eee32a8",
       "note": "This note has been updated.",
       "__v": 0
     }
   }
   ```
