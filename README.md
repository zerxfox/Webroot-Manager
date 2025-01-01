# Webroot-Manager [en] 

**Webroot Manager** analyzes each module for the presence of a `webroot` directory and automatically creates a web interface for interacting with modules.  

## Launching Webroot Manager  
1. **Via the Action Button** (available from Magisk v28.0).  
2. **Manually through a browser:** Open `localhost:8080`.  

## Restarting Webroot Manager  
Run the following two commands in the terminal:  

```bash
su -c "pkill nginx"  
su -c webroot  
```

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
When linking `css`, `js`, `php`, or other files in `html`, avoid using a leading slash `/` in the `href` or `src` attributes. Otherwise, Webroot Manager will not properly connect these files.  

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
**A:** Check if Webroot Manager is running by entering the following command in the terminal:  
```bash
su -c webroot
```  

- If the output shows:  
  ```
  nginx: [emerg] bind() to 0.0.0.0:8080 failed (98: Address already in use)
  ```
  This means Webroot Manager is already running.  

- If the output is empty, it confirms Webroot Manager is active.  

### **Q: Webroot Manager displays pages incorrectly**  
**A:** This issue is unrelated to the Webroot Manager itself. It merges the module's `html` and its components into a single configuration. Module developers can adapt their modules to work seamlessly with Webroot Manager in the future.  

------------------------

# Webroot-Manager [ru] 

**Webroot Manager** анализирует каждый модуль на наличие `webroot` и автоматически создаёт веб-интерфейс для взаимодействия с модулями.  

## Запуск Webroot Manager  
1. **Через action button** (доступно с Magisk v28.0).  
2. **Вручную через браузер:** откройте `localhost:8080`.  

## Перезапуск Webroot Manager  
Введите две команды в терминале:  

```bash
su -c "pkill nginx"  
su -c webroot  
```  

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
При подключении `css`, `js`, `php` или других файлов в `html`, начальный слэш `/` в `href` или `src` указывать не нужно. В противном случае Webroot Manager не сможет подключить файлы корректно.  

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
**О:** Проверьте, запущен ли Webroot Manager. Введите следующую команду в терминале:  
```bash
su -c webroot
```  

- Если вывод такой:  
  ```
  nginx: [emerg] bind() to 0.0.0.0:8080 failed (98: Address already in use)
  ```
  Это означает, что Webroot Manager уже запущен.  

- Если вывод пустой, это подтверждает, что Webroot Manager активен.  

### **В: Webroot Manager некорректно отображает страницы**  
**О:** Эта ошибка не связана с Webroot Manager. Он объединяет `html` модуля и его компоненты в единую конфигурацию. Разработчики модулей могут адаптировать свои модули для работы с Webroot Manager в будущем.  
