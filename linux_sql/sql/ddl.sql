\c host_agent

-- host_info table
CREATE TABLE IF NOT EXISTS host_info (
    id SERIAL NOT NULL PRIMARY KEY UNIQUE,
    hostname VARCHAR(500) NOT NULL UNIQUE,
    cpu_number INTEGER NOT NULL,
    cpu_architecture VARCHAR(500) NOT NULL,
    cpu_model VARCHAR(500) NOT NULL,
    cpu_mhz FLOAT NOT NULL,
    L2_cache INTEGER NOT NULL,
    total_mem INTEGER NOT NULL,
    timestampUTC TIMESTAMP NOT NULL
);

-- host_usage table
CREATE TABLE IF NOT EXISTS host_usage (
    timestampUTC TIMESTAMP NOT NULL,
    host_id INTEGER NOT NULL REFERENCES host_info (id) ON DELETE CASCADE,
    memory_free INTEGER NOT NULL,
    cpu_idle INTEGER NOT NULL,
    cpu_kernel INTEGER NOT NULL,
    disk_io INTEGER NOT NULL,
    disk_available INTEGER NOT NULL,
    PRIMARY KEY (timestampUTC, host_id)
);