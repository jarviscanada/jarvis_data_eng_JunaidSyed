#! /bin/sh

psql_host=$1
psql_port=$2
db_name=$3
psql_user=$4
psql_password=$5

# Check number of args
if [ $# -ne 5 ]; then
  echo "Need 5 parameters: ./host_info.sh psql_host psql_port db_name psql_user psql_password"
  exit 1
fi

lscpu_out=$(lscpu)

# uses lscpu output to get desired info based on awk_statement and regex
get_lscpu_value () {
  local regex=$1
  local awk_statement=$2
  echo "$lscpu_out" | egrep  "$regex" | awk "$awk_statement" | xargs
}

# hardware info
hostname=$(hostname -f)
cpu_number=$(get_lscpu_value "^CPU\(s\):" "{print \$2}")
cpu_architecture=$(get_lscpu_value "^Architecture:" "{print \$2}")
cpu_model=$(get_lscpu_value "^Model\ name:" "{print substr(\$0,12,length(\$0))}")
cpu_mhz=$(get_lscpu_value "^CPU\ MHz:" "{print \$3}")
L2_cache=$(get_lscpu_value "^L2\ cache:" "{print substr(\$3, 1, length(\$3)-1)}")
total_mem=$(echo "$(free -k)" | egrep "^Mem:" | awk '{print $2}' | xargs)
timestamp=$(date +'%Y-%m-%d %H:%M:%S')

# insert statement
insert_stmt=$(cat <<-END
INSERT INTO host_info (
  hostname, cpu_number, cpu_architecture,
  cpu_model, cpu_mhz, L2_cache, total_mem, timestamp
)
VALUES(
  '$hostname', '$cpu_number', '$cpu_architecture', '$cpu_model',
  '$cpu_mhz', '$L2_cache', '$total_mem', '$timestamp'
);
END
)

# export password
export PGPASSWORD="$psql_password"

# Insert data into the database
psql -h "$psql_host" -p "$psql_port" -d "$db_name" -U "$psql_user" -c "$insert_stmt"
exit $?