#!/system/bin/sh

while [[ -z $(ls /sdcard) ]]
do
  sleep 10
done

LANG=$(settings get system system_locales)

is_russian() {
  [[ "$LANG" == *"en-RU"* ]] || [[ "$LANG" == *"ru-"* ]]
}

if su -c "chmod 777 /data/adb/modules/webroot/files" >> /data/local/tmp/webroot.log 2>&1; then
    result_message="Успешно изменены права для /data/adb/modules/webroot/files"
    result_message_en="Successfully changed permissions for /data/adb/modules/webroot/files"
else
    result_message="Ошибка при изменении прав для /data/adb/modules/webroot/files"
    result_message_en="Error changing permissions for /data/adb/modules/webroot/files"
fi
echo "$(date) - $(is_russian && echo "$result_message" || echo "$result_message_en")" >> /data/local/tmp/webroot.log

if su -c "/system/bin/webroot" >> /data/local/tmp/webroot.log 2>&1; then
    result_message="✅ Webroot Manager успешно запущен [localhost:8080]"
    result_message_en="✅ Webroot Manager successfully started [localhost:8080]"
else
    result_message="❌ Ошибка при запуске Webroot Manager"
    result_message_en="❌ Error starting Webroot"
fi

sed -i '6,7d' /data/adb/modules/webroot/module.prop
echo "description=[$(date)] $(is_russian && echo "$result_message" || echo "$result_message_en")" >> /data/adb/modules/webroot/module.prop
