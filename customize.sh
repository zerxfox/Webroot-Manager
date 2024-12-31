#!/system/bin/sh

MODNAME="Webroot Manager"
DEVNAME="ZerxFox"
FRONTNAME="Rinker001"
MODREQ="Android 10+"
DEVLINK="@ZerxFox"
LINKPUB="t.me/GhostCISProject_TaD"
LANG=$(settings get system system_locales)
SYSTEM_BIN="$MODPATH/system/bin"

su -c "cp -r $MODPATH/nginx /data/local/"
su -c "chmod 755 /data/adb/modules"

is_language_supported() {
   [[ "$LANG" =~ "en-RU" || "$LANG" =~ "ru-" ]] && return 0 || return 1
}
            
print_info() {
    if is_language_supported; then
        ui_print " ├─ $MODNAME"
        ui_print " ├─ Информационный блок"
        ui_print " ├─ Этот модуль предоставляет возможность"
        ui_print " ├─ удобного доступа к WebUI различных модулей"
        ui_print " ├─ • Разработчик:       $DEVNAME"
        ui_print " ├─ • Фронтендер:        $FRONTNAME"
        ui_print " ├─ • Требования:        $MODREQ"
        ui_print " ├─ • Telegram:          $DEVLINK"
        ui_print " ├─ Отдельная благодарность за помощь в тестировании"
        ui_print " └─ TG-канал: $LINKPUB"
    else
        ui_print " ├─ $MODNAME"
        ui_print " ├─ Information block"
        ui_print " ├─ This module provides an easy way"
        ui_print " ├─ to access the WebUI of various modules"
        ui_print " ├─ • Developer:       $DEVNAME"
        ui_print " ├─ • Frontender:      $FRONTNAME"
        ui_print " ├─ • Requirements:    $MODREQ"
        ui_print " ├─ • Telegram:        $DEVLINK"
        ui_print " ├─ Special thanks for help with testing"
        ui_print " └─ TG-channel: $LINKPUB"
    fi
}

set_permissions() {
    set_perm_recursive $MODPATH 0 0 0755 0644
    set_perm $SYSTEM_BIN/webroot 0 0 0777
    set_perm $SYSTEM_BIN/nginx 0 0 0777
}

print_info
set_permissions