# FORJA BRAVA — SIGR

**Sistema Integral de Gestión de Restaurante** para FORJA BRAVA, un restaurante colombiano de comida rápida. Es una aplicación de demostración exclusivamente frontend que reúne un menú digital público y un panel administrativo.

## 1. Presentación del proyecto

### Objetivo

Mostrar en un solo sitio el recorrido de consulta del menú, selección de productos, checkout y gestión administrativa de pedidos. También presenta operaciones de catálogo, reservas, caja e informes. Todos los datos son de demostración y se guardan en el navegador.

### Funcionalidades principales

- Menú digital con 13 productos iniciales, filtros por categoría e imágenes.
- Catálogo administrativo para agregar, editar, activar, desactivar y eliminar productos.
- Carrito con cantidades, subtotal y complementos disponibles del catálogo.
- Checkout en etapas, modalidades para recoger o recibir a domicilio, métodos de pago simulados y comprobante imprimible.
- Registro e inicio de sesión local de clientes, perfil editable y cierre de sesión.
- Administración de pedidos, estados y detalles; reservas con operaciones de creación, consulta, edición y cancelación; calendario de reservas.
- Caja basada en pedidos entregados y reportes calculados a partir de los datos locales.

### Tecnologías

- HTML5, CSS3 y JavaScript vanilla.
- Tailwind CSS 4, compilado mediante su CLI.
- Node.js y npm para instalar las herramientas de compilación y servir el sitio estático.
- `localStorage` y `sessionStorage` para la persistencia de demostración.

La página usa Google Fonts (DM Sans y Playfair Display) y algunas fotografías remotas de Unsplash. Esos recursos necesitan conexión a Internet; se usan fuentes de respaldo si Google Fonts no está disponible. Las fotografías de los productos y otros recursos locales están en `assets/images/`.

## 2. Requisitos previos

- Windows 10 o Windows 11.
- Node.js en una versión LTS compatible y npm. Descarga oficial: <https://nodejs.org/>.
- Navegador web actualizado con JavaScript y almacenamiento local habilitados.
- Conexión a Internet para descargar las dependencias de npm y los recursos remotos.

Después de instalar Node.js, abre PowerShell y comprueba la instalación:

```powershell
node -v
npm -v
```

## 3. Descargar el proyecto desde GitHub

1. Abre en GitHub la página del repositorio donde está publicado FORJA BRAVA — SIGR.
2. Selecciona **Code** y luego **Download ZIP**.
3. Espera a que termine la descarga.
4. Extrae el archivo ZIP con el Explorador de archivos.
5. Abre las carpetas extraídas hasta encontrar la raíz del proyecto.

El ZIP puede crear carpetas anidadas, por ejemplo `Urestaurante-main/Urestaurante/`. La carpeta correcta es aquella que contiene directamente `package.json`, `package-lock.json`, `index.html` y `admin.html`. Los comandos de npm deben ejecutarse desde esa carpeta.

Ejemplo de la estructura raíz:

```text
Urestaurante/
├── package.json
├── package-lock.json
├── index.html
├── admin.html
├── README.md
├── assets/
├── css/
└── js/
```

## 4. Abrir PowerShell en la carpeta del proyecto

1. En el Explorador de archivos, entra a la carpeta que contiene `package.json`.
2. Selecciona la barra de direcciones.
3. Escribe `powershell` y presiona Enter.
4. Comprueba el contenido de la carpeta:

```powershell
Get-ChildItem
```

Debes ver `package.json`, `package-lock.json`, `index.html`, `admin.html` y `README.md`. Si no aparecen, estás en otra carpeta. Puedes localizar el archivo con:

```powershell
Get-ChildItem -Recurse -Filter package.json -File | Select-Object -ExpandProperty FullName
```

Usa la ruta que corresponda a la raíz del proyecto para cambiarte a ella. Por ejemplo, reemplaza la ruta de ejemplo por la que encontraste:

```powershell
cd "C:\ruta\a\Urestaurante"
```

La carpeta `node_modules` no hace falta para reconocer la raíz: npm la genera al instalar dependencias.

## 5. Instalar dependencias

Desde la raíz del proyecto, ejecuta:

```powershell
npm install
```

El comando instala Tailwind CSS y su CLI, cuyas dependencias están declaradas en `package.json` y registradas en `package-lock.json`. npm crea `node_modules/` automáticamente. Esa carpeta no se descarga desde GitHub ni debe cargarse al repositorio.

## 6. Compilar los estilos de Tailwind CSS

Ejecuta:

```powershell
npm run build
```

Este comando compila Tailwind CSS desde `css/input.css` y genera o actualiza `css/tailwind.css`, que utilizan las páginas del sitio. Vuelve a ejecutarlo si modificas la entrada de estilos o las clases escaneadas por Tailwind.

Los otros scripts declarados en `package.json` son:

| Comando | Función |
| --- | --- |
| `npm run build:css` | Compila y minifica `css/tailwind.css`. |
| `npm run watch:css` | Recompila los estilos mientras detecta cambios. |
| `npm run build` | Ejecuta `npm run build:css`. |
| `npm start` | Inicia el servidor local estático. |

## 7. Ejecutar el proyecto

En PowerShell, desde la raíz, ejecuta:

```powershell
npm start
```

El servidor usa el puerto **4173** y debe permanecer ejecutándose mientras uses la aplicación. No cierres esa ventana de PowerShell. Para detener el servidor, vuelve a esa ventana y presiona `Ctrl+C`.

El servidor estático se define directamente en el script `start` de `package.json`; no hay un archivo independiente `server.js` ni un comando separado para el panel.

## 8. Acceder al sistema

Con el servidor en ejecución, abre estas direcciones en el navegador:

- Sitio público: <http://localhost:4173/>
- Panel administrativo: <http://localhost:4173/admin.html>

Ambas páginas usan el mismo servidor y puerto. No inicies un segundo servidor para abrir el panel.

### Credenciales administrativas de demostración

El formulario de `admin.html` contiene estos valores de prueba:

- Correo: `admin@forjabrava.com`
- Contraseña: `Admin123*`

La validación se realiza en JavaScript y los valores están visibles en el código fuente. No son credenciales seguras ni deben usarse para proteger información real.

## 9. Solución de problemas frecuentes

### `ENOENT: package.json not found`

PowerShell está abierto en una carpeta que no contiene el proyecto. Busca `package.json` con el comando de la sección 4, identifica la ruta raíz que también contiene `index.html` y `admin.html`, y entra allí con `cd "C:\ruta\encontrada"`. Luego vuelve a ejecutar `npm install`.

### `npm` no se reconoce como comando

Comprueba `node -v` y `npm -v`. Si tampoco se reconoce `node`, instala Node.js desde <https://nodejs.org/>. Si acabas de instalarlo, cierra y vuelve a abrir PowerShell para que Windows actualice el `PATH`.

### El puerto 4173 ya está ocupado (`EADDRINUSE`)

Puede haber otra instancia del servidor ejecutándose. Primero localiza la terminal donde corriste `npm start` y detén ese proceso con `Ctrl+C`. Si no encuentras esa terminal, PowerShell puede mostrar el proceso que escucha en el puerto:

```powershell
Get-NetTCPConnection -LocalPort 4173 -State Listen | Select-Object LocalAddress, LocalPort, OwningProcess
```

Si el PID corresponde a otra ventana de PowerShell donde iniciaste este proyecto, vuelve a esa ventana y presiona `Ctrl+C`. Si la ventana ya no está disponible, puedes detener solo ese proceso sustituyendo `<PID>` por el valor `OwningProcess`:

```powershell
Stop-Process -Id <PID>
```

No hay una opción de puerto alternativo configurada en este proyecto; el servidor usa el puerto 4173 definido en `package.json`.

### La página aparece sin estilos

Desde la raíz del proyecto, vuelve a compilar Tailwind:

```powershell
npm run build
```

Después recarga la página. Comprueba que exista `css/tailwind.css` y que estés abriendo el sitio mediante `http://localhost:4173/`, no abriendo el HTML directamente como archivo.

## 10. Funcionalidades del sistema

### Menú, carrito y checkout

El menú presenta 13 productos iniciales agrupados en hamburguesas, perros, salchipapas y antojos. El carrito permite cambiar cantidades y calcular el subtotal. En checkout se pueden elegir complementos que ya estén disponibles en el catálogo.

El checkout recoge los datos de contacto, permite escoger **recogida en el restaurante** o **domicilio**, ofrece PSE, Nequi y tarjeta como **métodos simulados**, y genera un comprobante con el número de pedido, cliente, productos, cantidades, entrega, pago y total. No solicita datos financieros ni efectúa cobros. El botón de impresión utiliza la impresión del navegador.

La tarifa de domicilio está actualmente en `0` en la constante `deliveryFee` de `js/checkout.js`; no hay una tarifa real configurada. Tampoco hay bebidas definidas en el catálogo inicial. No se registra una orden comercial ni interviene WhatsApp en el checkout.

### Cuenta de cliente

El formulario permite registrar clientes, evitar correos duplicados, iniciar sesión, consultar y actualizar nombre y teléfono del perfil, y cerrar sesión. Las contraseñas se derivan en el navegador con PBKDF2 y sal antes de guardarse; la sesión de cliente se mantiene en `sessionStorage` para la pestaña actual.

La autenticación es exclusivamente demostrativa: los datos y la sesión pueden inspeccionarse o modificarse desde el navegador. No autentica ni protege usuarios en un servidor.

### Panel administrativo

El panel permite gestionar productos, revisar o registrar pedidos, consultar detalles y cambiar sus estados; administrar reservas y verlas en calendario; registrar cierres de caja basados en pedidos entregados; y consultar reportes por fechas, ventas, productos, estados e historial de cierres. Los pedidos cancelados no se cuentan como ventas entregadas.

Cuando el panel se abre por primera vez en un navegador sin datos para `forja-sigr-demo`, crea el catálogo de demostración y un pedido de muestra. Estos datos no representan transacciones reales.

## 11. Arquitectura y persistencia

FORJA BRAVA — SIGR es exclusivamente frontend. No utiliza backend, Express, API de servidor ni PostgreSQL o base de datos externa. El script `npm start` sirve archivos estáticos en el puerto 4173.

- El catálogo, los pedidos, las reservas y los cierres usan la clave `forja-sigr-demo` en `localStorage`.
- El carrito usa `forja-cart` en `localStorage`.
- Las cuentas de clientes usan `forja-clientes-demo` en `localStorage` y la sesión de cliente `forja-cliente-session` en `sessionStorage`.
- La sesión administrativa de demostración usa `forja-admin` en `sessionStorage`.
- `localStorage` permite compartir cambios entre pestañas del mismo navegador y origen; no sincroniza computadores, dispositivos ni navegadores.
- Los datos dependen del almacenamiento local del navegador. Si se borran los datos del sitio, se pierden los registros de demostración.
- Los pagos no realizan cobros reales y la autenticación no es apropiada para producción.

La página también carga Google Fonts y fotografías de Unsplash desde Internet. Esos recursos remotos pueden no mostrarse sin conexión; las fotografías de productos están incluidas localmente.

## 12. Estructura del proyecto

```text
.
├── index.html                 # Sitio público, cuenta de cliente y checkout
├── admin.html                 # Panel administrativo
├── README.md                  # Manual del proyecto
├── package.json               # Dependencias y scripts npm; servidor estático
├── package-lock.json          # Versiones de dependencias para npm
├── .gitignore                 # Archivos excluidos de Git
├── assets/
│   └── images/                # 18 imágenes PNG locales
├── css/
│   ├── input.css              # Entrada, tema y fuentes de Tailwind CSS
│   ├── tailwind.css           # Hoja compilada cargada por las páginas
│   ├── styles.css             # Estilos del sitio público y checkout
│   └── admin.css              # Estilos del panel administrativo
└── js/
    ├── app.js                 # Menú, filtros, carrito y cuenta de cliente
    ├── checkout.js            # Checkout, pedidos y comprobante
    └── admin.js               # Catálogo, pedidos, reservas, caja e informes
```

No hay un archivo `tailwind.config.js`, `.env`, `server.js` ni una carpeta local de fuentes en la estructura actual.

## 13. Control de versiones con GitHub

GitHub aloja el código fuente y permite consultar los cambios que se vayan guardando en el historial del repositorio. Para que otro usuario pueda instalar y ejecutar el proyecto, el repositorio debe conservar los HTML, las carpetas `assets/`, `css/` y `js/`, `package.json`, `package-lock.json` y este README. No se documentan hashes ni versiones de commits.

## 14. Preparar los archivos para GitHub

Incluye los archivos de la raíz `index.html`, `admin.html`, `README.md`, `package.json`, `package-lock.json` y `.gitignore`, además de las carpetas completas `assets/`, `css/` y `js/`. Conserva `css/tailwind.css`, que las páginas cargan directamente.

No incluyas `node_modules/`, `.git/`, archivos `.env`, secretos, registros, cachés, archivos temporales ni carpetas locales de configuración del editor. `node_modules/` se genera con `npm install`; el proyecto no requiere archivos `.env`.
