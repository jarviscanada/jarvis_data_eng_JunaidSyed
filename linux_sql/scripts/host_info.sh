#hardware info
hostname=$(hostname -f)
cpu_number=$(echo "$lscpu_out"  | egrep "^CPU\(s\):" | awk '{print $2}' | xargs)
cpu_architecture=$(echo "$lscpu_out"  | egrep "^Architechture:" | awk '{print $2}' | xargs)
cpu_model=$(echo "$lscpu_out"  | egrep "^Model name:" | awk '{print $2}' | xargs)
cpu_mhz=$(echo "$lscpu_out"  | egrep "^CPU MHz:" | awk '{print $2}' | xargs)
l2_cache=$(echo "$lscpu_out"  | egrep "^L2 cache:" | awk '{print substr($3, 1, length($3)-1)}' | xargs)
total_mem=$(echo "$(free -k)" | egrep "^Mem:" | awk '{print $2}' | xargs)
timestamp=$(date +'%Y-%m-%d %H:%M:%S')
