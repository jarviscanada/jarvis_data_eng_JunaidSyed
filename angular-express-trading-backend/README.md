# Angular Trading Backend Application

### Project Description

Tech Stack: TypeScript, JavaScript, ExpressJS, NodeJS

The Angular Trading application is a web application for storing and managing trading accounts. The backend consists of multiple API enpoints that perform CRUD operations on trader profiles such as depositing, withdrawing and updating personal info. There are also endpoints for obtaining and deleting daily list of quotes.

### Quick Start

The application can run from source using `npm run start` command.

### Implementation

This Angular backend is created using Express.js as the backend framework and with the use of various HTTP requests such as GET, POST and DELETE. The backend is organized into different folders which consist of:
- sql file to create the DB
- Config file to connect to DB
- DB models to create tables
- API routes that contain the endpoints

### Test

The application was tested manually using postman to conect to the endpoints. The endpoints were tested on sample db data with different sets of test cases. These test cases involved CRUD operations where the application output was compared with my personal output to ensure similar results.

### Improvements

Performance can be improved with:

1. Thorough error checking against the db data
2. User input sanitization and validation to minimize errors and bugs


