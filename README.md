# FORJA BRAVA

Sitio estático para restaurante colombiano, desarrollado con HTML, JavaScript vanilla y Tailwind CSS v4. Tailwind compila las utilidades usadas en el HTML y `js/app.js`; los estilos de composición, animaciones, texturas y componentes de marca se conservan organizados en `css/styles.css`.

## Requisitos

- Node.js 20 o superior y npm.
- Navegador moderno.

## Instalación y ejecución

```bash
npm install
npm run build
npm start
```

Abre [http://localhost:4173](http://localhost:4173). `npm start` sirve la carpeta estática del proyecto, sin framework ni base de datos.

## Tailwind CSS

- `npm run build:css` compila `css/input.css` en `css/tailwind.css` (minificado).
- `npm run watch:css` mantiene la compilación activa mientras editas.
- `npm run build` ejecuta la compilación de producción.

La integración usa Tailwind CSS v4 y el CLI oficial. El tema centraliza los colores de marca y fuentes en `css/input.css`. Los breakpoints estándar de Tailwind están disponibles; la hoja complementaria conserva reglas de layout existentes durante la migración gradual.

## Personalización

- Productos, precios, imágenes, horario, ubicación, teléfono y WhatsApp: `js/app.js`.
- Marca, colores y fuentes de Tailwind: `css/input.css`.
- Componentes visuales específicos del restaurante: `css/styles.css`.
- La imagen original del hero se encuentra en `assets/images/hero-forja-brava.png`.
- Cambia `CONFIG.whatsappNumber` por el indicativo internacional y número, sin `+`, espacios ni guiones.

Los precios y datos de contacto son demostrativos. El formulario no envía datos y el carrito no procesa pagos.

## Estructura

```text
FORJA-BRAVA/
├── index.html
├── package.json
├── package-lock.json
├── css/
│   ├── input.css       # Entrada Tailwind y tema
│   ├── styles.css      # Componentes y detalles visuales propios
│   └── tailwind.css    # Salida compilada, generada por npm
├── js/app.js
├── assets/images/
└── README.md
```

## Git

```bash
git add index.html package.json package-lock.json css/input.css css/styles.css css/tailwind.css README.md
git commit -m "feat: integrate Tailwind CSS into FORJA BRAVA"
```
