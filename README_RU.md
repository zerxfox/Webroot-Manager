# Webroot Manager

**Webroot Manager** анализирует каждый модуль на наличие `webroot` и автоматически создаёт веб-интерфейс для взаимодействия с модулями.

---

## 🚀 Технические требования

- **Android 10+**
- **Magisk, Apatch или KSU**
- **Терминал** (например, Termux)

---

## 🏁 Запуск Webroot Manager

1. **Через action button** (доступно с Magisk v28.0).
2. **Вручную через браузер:** откройте `localhost:8080`.

---

## 🔄 Перезапуск Webroot Manager

Введите команду в терминале:

```bash
su -c webroot
```

---

## 📍 Определение локального IP-адреса

Чтобы управлять другим устройством, оба устройства должны быть подключены к одной и той же Wi-Fi сети.

Для определения локального IP-адреса выполните следующие действия:

- Зайдите в меню модуля на втором устройстве.
- Если Wi-Fi соединение активно, вы увидите информацию в формате IP:порт.
- В противном случае появится сообщение "Недоступно".
- В ином случае, вы можете подключиться к Wi-Fi сети и перезапустить модуль, чтобы увидеть локальный IP.

---

## ⚠️ Возможные ошибки

### ❓ Браузер не открывает `localhost:8080`

**Ответ:** Введите следующую команду в терминале:
```bash
su -c webroot
```

### ❓ Webroot Manager некорректно отображает страницы

**Ответ:** Эта ошибка не связана с Webroot Manager. Он лишь объединяет `html` модуля и его компоненты в единую конфигурацию. Разработчики модулей могут адаптировать свои модули для работы с Webroot Manager в будущем.

---

## 📜 Список изменений

Для полного списка изменений, пожалуйста, ознакомьтесь с:

[![Changelog](https://img.shields.io/badge/📜-Changelog-blue)](changelog_ru.md)

---

## 📚 Документация для разработчиков

Webroot Manager анализирует структуру модуля:

```
module/
├── webroot/
│   ├── index.html
│   ├── oresty.conf
│   └── module_icon.png
├── service.sh
└── customize.sh
```

### Обязательные файлы:
- Папка `webroot` и файл `index.html` — **обязательны**.
- `module_icon.png` — иконка вашего модуля. Если её нет, используется стандартная.
- `oresty.conf` — конфигурация вашего модуля. Подхватывается автоматически, при её наличии.

**Примечание:** Файл `index.html` может быть сгенерирован позже, после запуска вашего модуля.

---

### 📑 Рекомендации по путям к файлам

При подключении **css**, **js**, **php**, **sh** или других файлов в `html`, начальный слэш `/` в `href` или `src` указывать не нужно. В противном случае Webroot Manager не сможет корректно подключить файлы.

#### Правильные примеры:
```html
<img src="files/icon.png">
<link href="styles.css">
```

#### Неправильные примеры:
```html
<img src="/files/icon.png">
<link href="/styles.css">
```

---

## 🌐 Конфигурация OpenResty (`oresty.conf`)

В этом разделе объясняются настройки конфигурации OpenResty для обработки логов и выполнения `.sh` скриптов через веб-интерфейс.

### 📝 Конфигурация для выполнения .sh скриптов

Этот блок конфигурации позволяет выполнять `.sh` скрипты через веб-интерфейс. Скрипты должны находиться в директории `/data/adb/modules/$module_name/webroot/`, где `$module_name` — это имя папки вашего модуля.

```nginx
location ~* /$module_name/webroot/.*\.sh$ {
    root /data/adb/modules;
    default_type text/plain;
    content_by_lua_block {
        local pipe = require("ngx.pipe")
        local uri = ngx.var.uri
        local script_path = ngx.var.document_root .. uri

        local file = io.open(script_path, "r")
        if not file then
            ngx.status = 404
            ngx.say("Error: script not found")
            return
        end
        file:close()

        local args_str = ngx.var.query_string or ""
        local args_table = {}
        for arg in string.gmatch(args_str, "[^&]+") do
            table.insert(args_table, arg)
        end

        local command = {"sh", script_path}
        for _, v in ipairs(args_table) do
            table.insert(command, v)
        end

        local proc, err = pipe.spawn(command, { stdout = true, stderr = true })
        if not proc then
            ngx.status = 500
            ngx.say("Error: failed to execute script - ", err)
            return
        end

        proc:set_timeouts(300000, 3600000, 3600000, 86400000)

        ngx.header["Content-Type"] = "text/plain"
        ngx.flush(true)

        while true do
            local line, err = proc:stdout_read_line()
            if not line then
                break
            end
            ngx.say(line)
            ngx.flush(true)
        end

        proc:wait()
    }
}
```

### 📜 Конфигурация для отображения логов

Этот блок конфигурации предназначен для обработки запроса к логам модуля, находящимся по пути `/data/adb/modules/$module_name/webroot/script_logs.out`, где `$module_name` — наименование папки вашего модуля.

```nginx
location $module_name/logs {
    content_by_lua_block {
        local file_path = "/data/adb/modules/$module_name/webroot/script_logs.out"
        local offset = tonumber(ngx.var.arg_offset) or 0

        local file, err = io.open(file_path, "rb")
        if not file then
            ngx.status = 500
            ngx.say("Error opening log: ", err)
            return
        end

        local ok, seek_err = file:seek("set", offset)
        if not ok then
            ngx.status = 500
            ngx.say("Error seeking log: ", seek_err)
            file:close()
            return
        end

        local data = file:read("*a")
        local new_offset = file:seek("cur")
        file:close()

        if not data or #data == 0 then
            ngx.status = 204
            return
        end

        ngx.header["Content-Type"] = "text/plain"
        ngx.header["X-Log-Offset"] = tostring(new_offset)
        ngx.print(data)
    }
}
```
