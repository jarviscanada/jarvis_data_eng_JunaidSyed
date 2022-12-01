#! /bin/sh

psql_host=$1
psql_port=$2
db_name=$3
psql_user=$4
psql_password=$5

# Check number of args
if [ $# -ne 5 ]; then
  echo "Need 5 parameters: ./host_usage.sh psql_host psql_port db_name psql_user psql_password"
  exit 1
fi

vmstat_out=$(vmstat --unit M -t)

# uses vmstat output to get the desired value using regex and awk_statement
get_vmstat_value () {
  local regex=$1
  local awk_statement=$2
  echo $vmstat_out | egrep  "$regex" | awk "$awk_statement" | xargs
}

# hardware usage info
hostname=$(hostname -f)
timestamp=$(echo $vmstat_out | awk '{print $43, $44}')
memory_free=$(get_vmstat_value "procs" "{print \$29}")
cpu_idle=$(get_vmstat_value "procs" "{print \$40}")
cpu_kernel=$(get_vmstat_value "procs" "{print \$39}")
disk_io=$(echo "$(vmstat -d)" | egrep "^sda" | awk '{print $10}' | xargs)
disk_available=$(echo "$(df -BM /)" | egrep "^/" | awk '{print substr($4, 1, length($4)-1)}' | xargs)

host_id="(SELECT id FROM host_info WHERE hostname=\"$hostname\")";
# Construct the INSERT statement
insert_stmt=$(cat <<-END
INSERT INTO host_usage (
  timestamp, host_id, memory_free, cpu_idle,
  cpu_kernel, disk_io, disk_available
)
VALUES (
  '$timestamp', '$host_id', '$memory_free', '$cpu_idle',
  '$cpu_kernel', '$disk_io', '$disk_available'
);
END
)

# export password
export PGPASSWORD="$psql_password"

# Insert data into the database
psql -h "$psql_host" -p "$psql_port" -d "$db_name" -U "$psql_user" -c "$insert_stmt"
exit $?