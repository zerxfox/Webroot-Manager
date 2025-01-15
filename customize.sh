#!/system/bin/sh

MODNAME="Webroot Manager"
DEVNAME="ZerxFox"
FRONTNAME="Rinker001"
MODREQ="Android 10+"
DEVLINK="@ZerxFox"
LINKPUB="t.me/GhostCISProject_TaD"
LANG=$(settings get system system_locales)
SYSTEM_BIN="$MODPATH/system/bin"
ARCH=$(uname -m)

is_language_supported() {
   [[ "$LANG" =~ "en-RU" || "$LANG" =~ "ru-" ]] && return 0 || return 1
}

case $ARCH in 
    aarch64|armv8)
        ui_print "$(is_language_supported && echo 'Начинаю установку. Ваша архитектура' || echo 'Starting the installation. Your architecture'): $ARCH"
        ;;
    *)
        ui_print "$(is_language_supported && echo 'Неподдерживаемая архитектура' || echo 'Unsupported architecture'): $ARCH"
        exit 1
        ;;
esac

su -c "cp -r $MODPATH/openresty /data/local/"
su -c "chmod -R 777 /data/local/openresty"
su -c "chmod 755 /data/adb/modules"
su -c "ln -s /data/local/openresty/nginx/sbin/nginx $SYSTEM_BIN/openresty"
su -c "rm -r $MODPATH/openresty"

print_info() {
    if is_language_supported; then
        ui_print "🔥 $MODNAME – ваш надежный инструмент для работы с WebUI"
        ui_print "Разработано:"
        ui_print "👨‍💻 Автор: $DEVNAME"
        ui_print "🎨 Фронтендер: $FRONTNAME"
        ui_print "Требования:"
        ui_print "📱 $MODREQ"
        ui_print "Следите за новостями:"
        ui_print "🔗 Telegram: $DEVLINK"
        ui_print "🔗 Канал: $LINKPUB"
        ui_print "Отдельная благодарность за помощь в тестировании"
    else
        ui_print "🔥 $MODNAME – your reliable tool for working with WebUI"
        ui_print "Developed by:"
        ui_print "👨‍💻 Author: $DEVNAME"
        ui_print "🎨 Frontender: $FRONTNAME"
        ui_print "Requirements:"
        ui_print "📱 $MODREQ"
        ui_print "Stay updated:"
        ui_print "🔗 Telegram: $DEVLINK"
        ui_print "🔗 Channel: $LINKPUB"
        ui_print "Special thanks for help with testing"
    fi
}

set_permissions() {
    set_perm_recursive $MODPATH 0 0 0755 0644
    set_perm $SYSTEM_BIN/webroot 0 0 0777
    set_perm $SYSTEM_BIN/openresty 0 0 0777
}

print_info
set_permissions
