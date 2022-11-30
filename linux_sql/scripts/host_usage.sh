#hardward usage info
memory_free=$(echo "$(free -m)" | egrep "^Mem:" | awk '{print $4}' | xargs)
cpu_idle=$(echo $(vmstat) | egrep "procs" | awk '{print $38}' | xargs)
cpu_kernel=$(echo $(vmstat) | egrep "procs" | awk '{print $37}' | xargs)
disk_io=$(echo "$(vmstat -d)" | egrep "^sda" | awk '{print $10}' | xargs)
disk_available=$(echo "$(df -BM /)" | egrep "^/" | awk '{print substr($4, 1, length($4)-1)}' | xargs)