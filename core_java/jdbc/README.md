# JDBC Project

### Project Description

Tech Stack: Git, Docker, Java, JDBC, PSQL, Maven

The JDBC project is a CRUD application to understand the workflow and operations of JDBC by executing queries. Ths project accesses a postgres database which is created using docker images. JDBC is used to connect to the database to perform queries and follows the DAO design principles. Maven is used to manage the project and the dependencies such as PostgreSQL JDBC driver.

### Implementation

## ER Diagram

![ER Diagram](https://github.com/jarviscanada/jarvis_data_eng_JunaidSyed/blob/feature/architecture/linux_sql/assets/Architecture.drawio.png)

### DAO Design Pattern

The Data Access Object (DAO) pattern is a structural pattern that allows us to isolate the application/business layer from the persistence layer (such as a relational database) using an abstract API.
In this project the The DAO provides an abstraction between the JDBC and the business logic of the code.
Since we are using DAO as a pure abstraction layer, we make use of DTOs (data transfer objects). DTOs provide a single domain of data and fully encapsulates objects. The DTO is just a plain container for data, so it doesn't implement any other behavior. The JDBC project uses a concrete implementation of customer DAO and reacts to the entire domain of the customer data.

### Test

The application was tested manually on a sample data file with different sets of test cases. In order to see the data, I used PSQL command line tool to verify the results by querying for the data from the resulting CRUD operations.
