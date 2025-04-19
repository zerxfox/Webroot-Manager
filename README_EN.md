# Webroot-Manager

**Webroot Manager** analyzes each module for the presence of a `webroot` directory and automatically creates a web interface for interacting with modules.

## Technical Requirements:  
- Android 10+  
- Magisk, Apatch, or KSU  
- A terminal, such as Termux  

## Launching Webroot Manager  
1. **Via the Action Button** (available from Magisk v28.0).  
2. **Manually through a browser:** Open `localhost:8080`.  

## Restarting Webroot Manager  
Run the following command in the terminal:  

```bash
su -c webroot  
```

## Determining Local IP Address
To control another device, both devices must be connected to the same Wi-Fi network.

To determine the local IP address, follow these steps:

- Go to the module menu on the second device.
- If the Wi-Fi connection is active, you will see information in the format IP:port.
- Otherwise, a message "Unavailable" will appear.
- In that case, you can connect to a Wi-Fi network and restart the module to see the local IP.

## Developer Documentation  
Webroot Manager analyzes the following module structure:  

```
module
├── webroot
│   ├── index.html
│   └── module_icon.png
├── service.sh
└── customize.sh
```

In this structure:  
- The `webroot` directory and the `index.html` file are **mandatory**.  
- `module_icon.png` is the icon for your module. If absent, a default icon is used.  

**Note:** The `index.html` file can also be generated later after the module is launched.  

### File Path Recommendations  
When linking `css`, `js`, `php`, `sh`, or other files in `html`, avoid using a leading slash `/` in the `href` or `src` attributes. Otherwise, Webroot Manager will not properly connect these files.  

**Correct examples:**  
```html
<img src="files/icon.png">  
<link href="styles.css">
```  

**Incorrect examples:**  
```html
<img src="/files/icon.png">  
<link href="/styles.css">
```  

## Potential Issues  

### **Q: The browser doesn't open `localhost:8080`**  
**A:**  Entering the following command in the terminal:  
```bash
su -c webroot
```  


### **Q: Webroot Manager displays pages incorrectly**  
**A:** This issue is unrelated to the Webroot Manager itself. It merges the module's `html` and its components into a single configuration. Module developers can adapt their modules to work seamlessly with Webroot Manager in the future.  
