# FORJA BRAVA SIGR

Prototipo académico de un sistema integral para un restaurante colombiano de comida rápida. Incluye un menú digital público y un panel administrativo para el catálogo, pedidos, reservas, caja y reportes. Está implementado como sitio estático con HTML, CSS y JavaScript en el navegador.

## Objetivo

Demostrar el recorrido desde la consulta del menú y la creación de pedidos hasta su gestión administrativa, junto con operaciones locales de reservas, caja e informes. Los datos son de demostración y no deben usarse para la operación de un negocio ni para guardar información real de clientes.

## Tecnologías

- HTML5.
- CSS3 y Tailwind CSS 4, compilado con la CLI oficial.
- JavaScript vanilla, sin framework frontend.
- Node.js y npm para compilar Tailwind y servir los archivos estáticos.
- `localStorage` y `sessionStorage` para datos de demostración en el navegador.

La interfaz usa Playfair Display y DM Sans desde Google Fonts, con alternativas Georgia y Arial. Las fuentes no están guardadas localmente y requieren conexión para descargarse; el sitio conserva las alternativas si no hay conexión.

## Requisitos

- Node.js y npm instalados.
- Navegador moderno con JavaScript y almacenamiento local habilitados.
- No se necesita backend, base de datos ni Docker para el menú y los módulos administrativos locales. El HTML solicita las fuentes tipográficas a Google Fonts; si no hay conexión, aplica las fuentes alternativas del sistema.

## Instalación y ejecución

Desde la raíz del repositorio:

```bash
npm ci
npm run build
npm start
```

`npm ci` instala las dependencias exactas registradas en `package-lock.json`. `npm run build` compila Tailwind y `npm start` inicia un servidor estático en el puerto `4173`.

- Sitio público: <http://localhost:4173/>
- Panel administrativo: <http://localhost:4173/admin.html>

Detén el servidor con `Ctrl+C`. Si cambias el CSS de entrada y quieres recompilarlo sin esperar a terminar la edición, usa `npm run watch:css` en una terminal y deja `npm start` ejecutándose en otra. Para una compilación puntual puedes usar `npm run build:css`.

### Scripts disponibles

| Comando | Función |
| --- | --- |
| `npm start` | Sirve los archivos estáticos en `http://localhost:4173`. |
| `npm run build` | Ejecuta la compilación de CSS de Tailwind. |
| `npm run build:css` | Genera y minifica `css/tailwind.css` desde `css/input.css`. |
| `npm run watch:css` | Mantiene la compilación de Tailwind observando cambios. |

El HTML carga el archivo compilado `css/tailwind.css`; si se modifica `css/input.css`, hay que volver a compilar antes de revisar o publicar esos cambios.

## Uso del sistema

### Menú público y carrito

El sitio presenta 13 productos iniciales en cuatro categorías: hamburguesas, perros, salchipapas y antojos. Los filtros permiten consultar cada categoría. El carrito admite agregar y quitar unidades y calcula el subtotal con los precios configurados en el catálogo.

### Compra demostrativa

El checkout está dividido en estas etapas:

1. Selección opcional de complementos disponibles en el catálogo.
2. Datos de contacto del cliente.
3. Modalidad de entrega y medio de pago.
4. Confirmación simulada.
5. Comprobante con número de pedido, cliente, productos, cantidades, total, entrega y pago.

Las modalidades son recoger en el restaurante y domicilio. La tarifa de domicilio está configurada actualmente como `0` en `js/checkout.js` (`deliveryFee`); no hay una tarifa real definida. Los métodos PSE, Nequi y tarjeta son simulaciones. No se solicitan datos financieros ni se realizan cobros. El botón de impresión abre la función de impresión del navegador.

El checkout agrega el pedido a la misma colección que consulta el panel administrativo. Los complementos provienen del catálogo ya disponible; no se han definido bebidas en el catálogo inicial.

### Panel administrativo

El panel de `admin.html` ofrece:

- Panel principal con indicadores locales.
- Consulta, edición de disponibilidad y eliminación de productos del catálogo.
- Consulta y registro manual de pedidos, detalle y cambio de estado.
- Reservas con creación, edición, cancelación, filtros y calendario.
- Caja basada en pedidos entregados, con exclusión de cancelados y registro de cierres.
- Reportes por periodo, productos vendidos, estados y cierres.

Al abrir por primera vez el panel en un navegador sin datos, se inicializa el catálogo de demostración con 13 productos y un pedido de muestra. No se debe asumir que estos datos representan ventas reales.

### Acceso de demostración

El panel tiene estas credenciales académicas, definidas directamente en el código:

- Correo: `admin@forjabrava.com`
- Contraseña: `Admin123*`

No son credenciales seguras. La validación del panel ocurre en JavaScript y la contraseña está incluida en `admin.html`; cualquier persona que descargue el repositorio puede verla. No uses esta autenticación para proteger datos reales ni la publiques como acceso operativo.

### Cuenta de cliente

El formulario de cliente permite crear una cuenta local, iniciar sesión, consultar el perfil, actualizar nombre y teléfono, y cerrar sesión. Los correos se normalizan para evitar duplicados sin distinguir mayúsculas. La sesión activa guarda únicamente el identificador del cliente en `sessionStorage`; sus datos de perfil se recuperan del navegador.

Las contraseñas se derivan en el navegador con PBKDF2 y una sal aleatoria antes de guardarse en `localStorage`; la contraseña original no se almacena. Esto no convierte la autenticación en segura: quien controla el navegador puede modificar los datos o suplantar una sesión. Solo sirve para demostración y requiere un navegador con Web Crypto en `localhost` o HTTPS.

## Persistencia y limitaciones

- Catálogo, pedidos, reservas y cierres se guardan bajo la clave `forja-sigr-demo` en `localStorage`.
- El carrito usa la clave independiente `forja-cart` en `localStorage`.
- Las cuentas de demostración de clientes usan `forja-clientes-demo` en `localStorage`; la sesión de la pestaña usa `forja-cliente-session` en `sessionStorage`.
- La sesión demostrativa del administrador usa `forja-admin` en `sessionStorage`.
- Los cambios se comparten entre pestañas del mismo navegador y origen mediante los eventos de almacenamiento; no se sincronizan entre dispositivos o navegadores.
- Borrar los datos del sitio en el navegador elimina estos registros. No existe copia de seguridad ni recuperación central.
- No hay backend, API, base de datos, autenticación de servidor, control de acceso seguro, pasarela de pagos ni registro comercial de pedidos.
- El registro, inicio y cierre de sesión, y perfil de clientes se validan solo en el navegador. No protegen datos ni vistas en un servidor y no son apropiados para producción.
- La tarifa de domicilio permanece en cero hasta que se defina y configure una tarifa válida en `js/checkout.js`.

## Estructura del proyecto

```text
.
├── index.html                  # Sitio público, menú, carrito, cuenta y checkout
├── admin.html                  # Acceso y estructura del panel administrativo
├── README.md                   # Esta documentación
├── package.json                # Scripts y dependencias de desarrollo
├── package-lock.json           # Versiones bloqueadas para npm ci
├── .gitignore                  # Exclusiones de Git
├── assets/
│   └── images/                 # Fotografías locales del sitio y los productos
├── css/
│   ├── input.css               # Entrada de Tailwind CSS
│   ├── tailwind.css            # CSS compilado que carga el HTML
│   ├── styles.css              # Estilos de marca, público y checkout
│   └── admin.css               # Estilos del panel administrativo
└── js/
    ├── app.js                  # Menú, filtros, carrito y autenticación local de clientes
    ├── checkout.js             # Checkout, pedido y comprobante
    └── admin.js                # Catálogo, pedidos, reservas, caja e informes
```

## Archivos para GitHub

Para la carga manual desde GitHub, selecciona estos archivos de la raíz: `.gitignore`, `README.md`, `index.html`, `admin.html`, `package.json` y `package-lock.json`. Selecciona también las carpetas completas `assets/`, `css/` y `js/`. Conserva `css/tailwind.css`, porque ambas páginas lo cargan y se necesita para que el sitio se vea correctamente antes de compilar.

No incluyas `node_modules/`, archivos `.env` o secretos, registros locales, cachés ni artefactos temporales. La regla para `node_modules/` y las reglas de `.env` ya están escritas en `.gitignore`. Este proyecto no requiere archivos `.env`.

No selecciones `node_modules/`, `.git/`, archivos `.env`, registros, cachés, archivos temporales ni carpetas de configuración local del editor. Aunque `node_modules/` está excluido en `.gitignore`, actualmente hay 643 archivos de esa carpeta añadidos al índice local de Git; esa regla no los quita del índice. Esto no afecta una carga manual si no seleccionas esa carpeta, pero sí debe limpiarse antes de hacer un commit local. No incluyas credenciales de producción; las credenciales administrativas del repositorio son exclusivamente una demostración insegura.
