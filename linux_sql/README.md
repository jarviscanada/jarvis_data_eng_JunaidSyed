# Linux Cluster Monitor

### Project Description

Tech Stack: Git, Bash, docker, PSQL

This Linux cluster monitor project is an agent monitoring tool which uses bash scripts to record host hardware specifications (model, architecture, etc) and host hardware usage (memory, cpu usage, etc). The recorded information is then stored in a PostgresSQL database. The hardware specifications are captured and stored once on installation while hardware usage is monitored every minute. This data can then be used by an infrasturcture team in the future to generate reports and resource planning.

### Architecture

![Architecture Image](https://github.com/jarviscanada/jarvis_data_eng_JunaidSyed/blob/feature/architecture/linux_sql/assets/Architecture.drawio.png)

### Quick Start

Note: arguments with [ ] requires you to provide the data to command

1. Install Postgress and Docker
2. Open terminal then create and run psql instance
   `./scripts/psql_docker.sh [create|start|stop] [username] [password]`
3. Create database and tables
   ```
   export PGPASSWORD=[password]
   psql -h localhost -U [username] -c "CREATE DATABASE host_agent;"
   psql -h localhost -U [username] -d host_agent -f ./sql/ddl.sql
   ```
4. Insert host hardware info into the database
   `./scripts/host_info.sh localhost 5432 host_agent [username] [password]`
5. Insert host hardware usage data into the database
   `./scripts/host_usage.sh localhost 5432 host_agent [username] [password]`
6. Edit crontab jobs file
   `crontab -e`
7. Add job to crontab file to run every minute
   `* * * * * bash /path/to/host_usage.sh localhost 5432 host_agent postgres password > /tmp/host_usage.log`

### Script File Descriptions

- `./scripts/host_info.sh`: Runs once on host setup. Collects host hardware information and inserts into host_info table in databse.
- `./scripts/host_usage.sh`: Runs every minute using chrontab. Collects host usage data and inserts into host_usage table in database.
- `./scripts/psql_docker.sh`: Used to create container using psql image and starts/stops docker containers.
- `./sql/ddl.sql`: Automates the process for creating tables for host_info and host_usage tables.
- `./sql/queries.sql`: Queries to analyze database tables.

### Database Modeling

#### host_info

| Property         | Description                                      | Data Type | Constraints                   |
| ---------------- | ------------------------------------------------ | --------- | ----------------------------- |
| id               | Unique host identifier                           | serial    | primary key, not null, unique |
| hostname         | Name of the host                                 | string    | not null, unique              |
| cpu_number       | Number of CPUs                                   | integer   | not null                      |
| cpu_architecture | CPU architecture of host                         | string    | not null                      |
| cpu_model        | CPU model of host                                | string    | not null                      |
| cpu_mhz          | Clock speed of CPU caluclated in megahertz (mhz) | float     | not null                      |
| L2_cache         | Amount of L2 cache measured in kilobytes         | integer   | not null                      |
| total_mem        | Total memory of the host measured in kilobytes   | integer   | not null                      |
| timestamp        | Timestamp of data collection in UTC time         | timestamp | not null                      |

#### host_usage

| Property       | Description                                   | Data Type | Constraints                                             |
| -------------- | --------------------------------------------- | --------- | ------------------------------------------------------- |
| timestamp      | Timestamp of data collection in UTC time      | timestamp | part of primary key, not null                           |
| host_id        | Host identifier                               | serial    | part of primary key, foriegn key to host_info, not null |
| memory_free    | Free memory of the host measured in megabytes | integer   | not null                                                |
| cpu_idle       | Percentage of idle CPU time                   | integer   | not null                                                |
| cpu_kernel     | Percentage of kernal CPU usage time           | integer   | not null                                                |
| disk_io        | Number of disk I/0 operations in progress     | integer   | not null                                                |
| disk_available | Available disk space measured in megabytes    | integer   | not null                                                |

### Test

All testing was done manually. Scripts were tested for every test case and results were checked according to specifications.

- `./scripts/host_info.sh`: create, start, stop, number of arguments
- `./scripts/host_usage.sh`: data insertion, data collection, number of arguments
- `./scripts/psql_docker.sh`: data insertion, correct data collection, number of arguments
- `./sql/ddl.sql`: 2 table creations with respective columns

### Improvements

There are a few improvements that can be made for more practical uses.

- Analyze hardware updates
- Connection to remote SQL servers and databases to store data
- Include other important information about hardware usage for more monitoring capabilities
