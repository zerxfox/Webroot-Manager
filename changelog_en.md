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
