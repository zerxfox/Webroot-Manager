v1.0.0

Core Features:
- Initial Setup: Basic structure and functionality of the module.
- Burger Menu: Convenient navigation for managing settings.
- Themes: Support for multiple visual interface styles.
- Theme Switching: Real-time switching between available themes.
- Module Icon Switching: Dynamic verification of icon presence in the module folder with a fallback to an alternative path if the file is missing.
- Theme Selection Memory: The selected theme is saved and applied on subsequent launches.

New Features for Modules:
- Dynamic Module List Generation: Automatic creation of an HTML file with cards for each module.
- Support for Custom Module Icon Paths: Checks for `module_icon.png` in the module folder and uses a default icon if the file is missing.
- Nginx Integration: Automatic configuration generation for each module with web interface access.

v1.1.0

- Added missing libs.
- Fixed a rare issue with file access.
- Disabled modules with webroot no longer appear in the Webroot Manager.

v1.2.3

- Extended nginx capabilities.
- Added support for `***.sh` scripts.
- Added a "Reload Webroot Manager" button to the home webpage.
- Simplified Webroot Manager restart in the terminal.
- Added list of modules supporting Webroot Manager.

v1.2.4

- Fixed `styles.css`.

v1.2.5

- The module archive size has been reduced.
- A symlink to openresty has been added.
- The information menu in customize.sh has been updated.
- Architecture compatibility check added.

v1.2.6

- Added the ability to control the device via the local IP.
- Code improvements.

v1.3.0

- Implemented streaming response handling in OpenResty using `ngx.pipe` and `stdout_read_line()`. Now script output is sent to the client immediately instead of waiting for execution to finish.    
- Improved shell script execution: data is now flushed in real time, providing better responsiveness.  
- Added cleaning of access.log and error.log after starting Webroot Manager.

v1.4.0

- Increased command timeout.
- Removed notification. The startup status is displayed through the module description.
- Added log reading from `script-logs.out`.
- Implemented modular configuration via `oresty.conf`.

v1.4.1

- Added `lua-resty-http` module.
- Code improvements.

v2.0.0

🔌 KSU WebUI API Emulation

- In HTML pages of modules opened via Webroot Manager, a JS shim `window.ksu` is now injected on the fly, emulating the KernelSU WebUI API: `ksu.exec()`, `ksu.toast()`, `ksu.fullScreen()`, `ksu.moduleInfo()`.
- Added a server-side endpoint `POST /api/exec` (Lua + ngx.pipe) that executes a shell command and returns stdout/stderr/exit code in JSON.
- Access to `/api/exec` is protected by a one-time token (X-Auth), generated at each startup (`TOKEN=$(tr -dc 'A-Za-z0-9' </dev/urandom | head -c 32)`) and injected into `<meta name="webroot-token">`.
- Thanks to this, modules originally written for KernelSU's built-in WebUI can now execute commands and display toasts directly inside Webroot Manager, without requiring separate modifications.

🖼️ Modules now open in an embedded frame instead of redirect

- Clicking a module card no longer navigates to a separate page, but opens an iframe within a popup overlay (`module-frame-overlay`).
- Added a draggable close button for the frame (drag & drop with pointerdown/move/up support, with a 6px threshold to distinguish clicks from dragging).
- Page background animation is now paused while the module frame is open or the tab is inactive (`anim-paused`).
- External links (non-modules) continue to open as before: internal ones in the current tab, external ones in a new tab (`target=_blank`, noopener).

🌍 UI Localization (RU/EN)

- Added full language switching support via `data-i18n` / `data-i18n-aria` attributes and a JS translation dictionary.
- Default language is determined from the device's system locale (via `settings get system system_locales`; previously only `en-RU`/`ru-*` were checked), with the user's choice saved to `localStorage`.
- A separate language selector (RU/EN) has been added to the menu, next to the theme picker.

🎨 Completely revamped interface

- `styles.css` has been almost entirely rewritten: new components include `status-chip`, `signal-bars`, `widget-card`, `icon-badge`, `nav-panel`, `section-label`, `eyebrow`, `main-heading`, `module-dot`, and more.
- The sidebar has been turned into a separate panel (`nav-panel`) with an explicit close button (`nav-close`), rather than relying solely on a second hamburger click.
- Google web fonts (Poppins/Inter) are now used instead of the system Roboto.
- Added `viewport-fit=cover` for proper rendering on displays with notches/cutouts.
- Removed 3 themes (`mutedOcean`, `duskyLavender`, `foggyRiver`); the theme list has been slightly reduced and visually reworked.

⚙️ Miscellaneous

- In the nginx config for modules, `index.html` is now served directly via Lua (`content_by_lua_block`) with `Cache-Control: no-store`, ensuring that the ksu shim and token are always fresh and never cached.
- Added `try_files ... @module_fallback` with module detection based on the Referer header — a fallback for relative paths within module webroots.
- Removed the `chmod 755 /data/adb/modules` line from `customize.sh` — it no longer touches permissions on other modules' directories during installation.
