# Tech Context - Consulta de Disponibilidad Casa Austin

## Stack Tecnológico

### Frontend
- **HTML5**: Estructura semántica y accesible
- **CSS3**: Estilos modernos con Bootstrap 4
- **JavaScript ES6+**: Lógica de negocio y manipulación del DOM
- **jQuery 3.7.1**: Manipulación del DOM y AJAX
- **Bootstrap 4.5.2**: Framework CSS responsive
- **DateRangePicker**: Componente para selección de fechas
- **Moment.js**: Manipulación y formateo de fechas

### Backend/Desktop
- **Electron 25.9.0**: Framework para aplicaciones de escritorio
- **Node.js 18.18.2**: Runtime de JavaScript
- **Electron Builder 24.9.1**: Herramienta de empaquetado

### APIs Externas
- **Casa Austin API**: `https://casaaustin.pe/api/landing-precios.php`
  - Endpoint para consulta de disponibilidad
  - Parámetros: fechas, personas, tipo de cambio
  - Respuesta: JSON con disponibilidad y precios

### Dependencias Principales
```json
{
  "dependencies": {
    "axios": "^1.10.0",
    "jquery": "^3.7.1"
  },
  "devDependencies": {
    "electron": "^25.9.0",
    "electron-builder": "^24.9.1"
  }
}
```

## Arquitectura Técnica

### Estructura del Proyecto
```
consulta-disponibilidad-final/
├── main/
│   ├── main.js          # Proceso principal de Electron
│   └── preload.js       # Script de precarga para seguridad
├── assets/
│   ├── *.css           # Estilos de componentes
│   ├── *.js            # Librerías JavaScript
│   └── *.png           # Iconos y recursos
├── styles/
│   └── style.css       # Estilos personalizados
├── index.html          # Interfaz principal
├── web-version.html    # Versión web alternativa
├── package.json        # Configuración del proyecto
└── dist/              # Builds de distribución
```

### Configuración de Electron
```javascript
// main.js - Configuración de la ventana principal
const mainWindow = new BrowserWindow({
    width: 400,
    height: 630,
    alwaysOnTop: true,
    frame: true,
    icon: path.join(__dirname, '../assets/icon_512.png'),
    webPreferences: {
        nodeIntegration: false,
        contextIsolation: true,
        preload: path.join(__dirname, 'preload.js')
    }
});
```

## Integración con APIs

### API de Casa Austin
```javascript
// Consulta de disponibilidad
const response = await fetch('https://casaaustin.pe/api/landing-precios.php?' + 
    new URLSearchParams({
        fecha_inicio: fechaInicio,
        fecha_fin: fechaFin,
        personas: numPersonas,
        tipo_cambio: tipoCambio,
        detalles_disponibilidad: 1,
        _t: Date.now()
    })
);
```

### Estructura de Respuesta API
```json
{
    "estadoDisponibilidad": 1,
    "totalCasasDisponibles": 3,
    "casas": [
        {
            "id": 1,
            "precio": "65",
            "disponible": true
        }
    ]
}
```

## Configuración de Build

### Electron Builder
```json
{
    "build": {
        "appId": "com.casaaustin.consulta-disponibilidad",
        "productName": "Consulta de Disponibilidad",
        "mac": {
            "target": [{"target": "dmg", "arch": ["arm64"]}],
            "category": "public.app-category.utilities"
        },
        "win": {
            "target": [{"target": "nsis", "arch": ["x64"]}]
        }
    }
}
```

### Scripts de Build
```json
{
    "scripts": {
        "start": "electron .",
        "build": "electron-builder",
        "build:mac": "electron-builder --mac --arm64",
        "build:win": "electron-builder --win --x64",
        "dist": "npm run build:mac"
    }
}
```

## Configuración de Desarrollo

### Requisitos del Sistema
- **Node.js**: >= 18.18.2
- **npm**: >= 8.0.0
- **Electron**: 25.9.0 (versión específica para compatibilidad)

### Instalación
```bash
# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm start

# Build para producción
npm run build:mac
npm run build:win
```

### Variables de Entorno
```javascript
// Configuración por defecto
const CONFIG = {
    API_URL: 'https://casaaustin.pe/api/landing-precios.php',
    DEFAULT_TIPO_CAMBIO: 3.6,
    DEFAULT_PERSONAS: 2,
    CACHE_TTL: 300000, // 5 minutos
    MAX_RETRIES: 3
};
```

## Seguridad

### Electron Security
- **Context Isolation**: Habilitado para prevenir acceso directo a Node.js
- **Node Integration**: Deshabilitado en el renderer
- **Preload Script**: Para comunicación segura entre procesos

### Validación de Datos
```javascript
// Validación de entrada
function validarEntrada(datos) {
    if (!datos.fechaInicio || !datos.fechaFin) {
        throw new Error('Fechas requeridas');
    }
    if (datos.personas < 1 || datos.personas > 20) {
        throw new Error('Número de personas inválido');
    }
    if (datos.tipoCambio < 1 || datos.tipoCambio > 10) {
        throw new Error('Tipo de cambio inválido');
    }
}
```

## Performance

### Optimizaciones Implementadas
- **Lazy Loading**: Carga de librerías solo cuando se necesitan
- **Caching**: Cache simple para evitar consultas repetitivas
- **Debouncing**: Evitar consultas excesivas en cambios de UI
- **Async/Await**: Operaciones asíncronas para no bloquear UI

### Métricas de Performance
- **Tiempo de Carga**: < 2 segundos
- **Tiempo de Consulta API**: < 3 segundos
- **Tiempo de Generación de Mensaje**: < 1 segundo
- **Uso de Memoria**: < 100MB

## Compatibilidad

### Sistemas Operativos Soportados
- **macOS**: 10.14+ (Intel y Apple Silicon)
- **Windows**: 10+ (x64)
- **Linux**: Ubuntu 18.04+ (x64)

### Navegadores (Versión Web)
- **Chrome**: 90+
- **Firefox**: 88+
- **Safari**: 14+
- **Edge**: 90+

## Troubleshooting

### Problemas Conocidos
1. **Electron Import Issues**: Resuelto con versión 25.9.0
2. **API CORS**: Solucionado con proxy en desarrollo
3. **Date Format**: Manejo consistente con Moment.js

### Soluciones Implementadas
- **Versión Web**: `web-version.html` como alternativa
- **Error Handling**: Mensajes de error amigables
- **Fallbacks**: Funcionalidad básica sin API
