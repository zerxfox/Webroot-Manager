#!/system/bin/sh

while [[ -z $(ls /sdcard) ]]
do
  sleep 10
done

su -lp 2000 -c "cmd notification post -S bigtext -t 'Webroot Manager' 'Tag' 'Running on http://localhost:8080' > /dev/null 2>&1"

su -c "chmod 777 /data/adb/modules/webroot/files" >> /data/local/tmp/webroot.log 2>&1
if [ $? -eq 0 ]; then
    echo "$(date) - Successfully changed permissions for /data/adb/modules/webroot/files" >> /data/local/tmp/webroot.log
else
    echo "$(date) - Error changing permissions for /data/adb/modules/webroot/files" >> /data/local/tmp/webroot.log
fi

su -c "/system/bin/webroot" >> /data/local/tmp/webroot.log 2>&1
if [ $? -eq 0 ]; then
    echo "$(date) - Webroot successfully started" >> /data/local/tmp/webroot.log
else
    echo "$(date) - Error starting Webroot" >> /data/local/tmp/webroot.log
fi
