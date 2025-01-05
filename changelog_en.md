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
- Support for Custom Module Icon Paths: Checks for module_icon.png in the module folder and uses a default icon if the file is missing.
- Nginx Integration: Automatic configuration generation for each module with web interface access.

v1.1.0

- Added missing libs.
- Fixed a rare issue with file access.
- Disabled modules with webroot no longer appear in the Webroot Manager.

v1.2.3

- Extended nginx capabilities.
- Added support for ***.sh scripts.
- Added a "Reload Webroot Manager" button to the home webpage.
- Simplified Webroot Manager restart in the terminal.
- Added list of modules supporting Webroot Manager.

v1.2.4

- Fixed styles.css.
