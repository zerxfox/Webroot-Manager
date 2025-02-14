Telegram [Chat](https://t.me/GhostCISProject_TaD) [<img src="https://img.icons8.com/color/48/000000/telegram-app.png" width="20"/>](https://t.me/GhostCISProject_TaD) | [Channel](https://t.me/GhostCISProject) [<img src="https://img.icons8.com/color/48/000000/telegram-app.png" width="20"/>](https://t.me/GhostCISProject)  

[English](https://github.com/zerxfox/Webroot-Manager?tab=readme-ov-file#webroot-manager-en) | [Русский](https://github.com/zerxfox/Webroot-Manager?tab=readme-ov-file#webroot-manager-ru)

# Webroot-Manager [en] 

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

------------------------

# Webroot-Manager [ru] 

**Webroot Manager** анализирует каждый модуль на наличие `webroot` и автоматически создаёт веб-интерфейс для взаимодействия с модулями.  

## Технические требования:  
- Android 10+  
- Magisk, Apatch или KSU  
- Терминал, например, Termux  

## Запуск Webroot Manager  
1. **Через action button** (доступно с Magisk v28.0).  
2. **Вручную через браузер:** откройте `localhost:8080`.  

## Перезапуск Webroot Manager  
Введите команду в терминале:  

```bash
su -c webroot  
```  

## Определение локального IP-адреса
Чтобы управлять другим устройством, оба устройства должны быть подключены к одной и той же Wi-Fi сети. 

Для определения локального IP-адреса выполните следующие действия:
  
- Зайдите в меню модуля на втором устройстве.
- Если Wi-Fi соединение активно, вы увидите информацию в формате IP:порт.
- В противном случае появится сообщение "Недоступно".
- В ином случае, вы можете подключиться к Wi-Fi сети и перезапустить модуль, чтобы увидеть локальный IP.

## Документация для разработчиков  
Webroot Manager анализирует следующую структуру модуля:  

```
module/
├── webroot/
│   ├── index.html
│   └── module_icon.png
├── service.sh
└── customize.sh
```

В этой структуре:  
- Папка `webroot` и файл `index.html` — **обязательны**.  
- `module_icon.png` — это иконка вашего модуля. Если её нет, используется стандартная.  

**Примечание:** Файл `index.html` может быть сгенерирован позже, после запуска вашего модуля.  

### Рекомендации по путям к файлам  
При подключении `css`, `js`, `php`, `sh` или других файлов в `html`, начальный слэш `/` в `href` или `src` указывать не нужно. В противном случае Webroot Manager не сможет подключить файлы корректно.  

**Правильные примеры:**  
```html
<img src="files/icon.png">  
<link href="styles.css">
```  

**Неправильные примеры:**  
```html
<img src="/files/icon.png">  
<link href="/styles.css">
```

## Возможные ошибки  

### **В: Браузер не открывает `localhost:8080`**  
**О:** Введите следующую команду в терминале:  
```bash
su -c webroot
```  

### **В: Webroot Manager некорректно отображает страницы**  
**О:** Эта ошибка не связана с Webroot Manager. Он объединяет `html` модуля и его компоненты в единую конфигурацию. Разработчики модулей могут адаптировать свои модули для работы с Webroot Manager в будущем.  
