# Webroot Manager

**Webroot Manager** analyzes each module for a `webroot` and automatically creates a web interface for interacting with modules.

---

## 🚀 Technical Requirements

- **Android 10+**
- **Magisk, Apatch, or KSU**
- **Terminal** (e.g., Termux)

---

## 🏁 Running Webroot Manager

1. **Via the action button** (available since Magisk v28.0).
2. **Manually through the browser:** open `localhost:8080`.

---

## 🔄 Restarting Webroot Manager

Enter the following command in the terminal:

```bash
su -c webroot
```

---

## 📍 Determining the Local IP Address

To control another device, both devices must be connected to the same Wi-Fi network.

To determine the local IP address, follow these steps:

- Go to the module menu on the second device.
- If the Wi-Fi connection is active, you will see information in the format IP:port.
- Otherwise, the message "Unavailable" will appear.
- If the IP is not shown, you can connect to the Wi-Fi network and restart the module to see the local IP.

---

## ⚠️ Possible Issues

### ❓ Browser not opening `localhost:8080`

**Solution:** Enter the following command in the terminal:
```bash
su -c webroot
```

### ❓ Webroot Manager is displaying pages incorrectly

**Solution:** This issue is not related to Webroot Manager. It simply combines the module's `html` and its components into one configuration. Module developers can adapt their modules to work with Webroot Manager in the future.

---

## 📚 Developer Documentation

Webroot Manager analyzes the module structure:

```
module/
├── webroot/
│   ├── index.html
│   ├── oresty.conf
│   └── module_icon.png
├── service.sh
└── customize.sh
```

### Required Files:
- The `webroot` folder and the `index.html` file are **mandatory**.
- `module_icon.png` — the icon for your module. If it's missing, the default one is used.
- `oresty.conf` — the configuration for your module. It is automatically detected if present.

**Note:** The `index.html` file can be generated later after launching your module.

---

### 📑 File Path Recommendations

When linking **css**, **js**, **php**, **sh**, or other files in `html`, do not include the leading slash `/` in `href` or `src`. Otherwise, Webroot Manager will not be able to correctly link the files.

#### Correct examples:
```html
<img src="files/icon.png">
<link href="styles.css">
```

#### Incorrect examples:
```html
<img src="/files/icon.png">
<link href="/styles.css">
```

---

## 🌐 OpenResty Configuration (`oresty.conf`)

This section explains the OpenResty configuration settings for handling logs and executing `.sh` scripts via the web interface.

### 📝 Configuration for Executing .sh Scripts

This configuration block allows executing `.sh` scripts through the web interface. Scripts should be located in the `/data/adb/modules/$module_name/webroot/` directory, where `$module_name` is the name of your module's folder.

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

### 📜 Configuration for Displaying Logs

This configuration block handles requests for the module logs located at `/data/adb/modules/$module_name/webroot/script_logs.out`, where `$module_name` is the name of your module's folder.

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
