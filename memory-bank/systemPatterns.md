# System Patterns - Consulta de Disponibilidad Casa Austin

## Arquitectura General

### Patrón Principal: Electron Desktop App
```
┌─────────────────────────────────────┐
│           Electron Main Process     │
│  ┌─────────────────────────────────┐ │
│  │        main.js                  │ │
│  │  - Window Management            │ │
│  │  - IPC Communication            │ │
│  │  - API Integration              │ │
│  └─────────────────────────────────┘ │
└─────────────────────────────────────┘
                │
                ▼
┌─────────────────────────────────────┐
│        Renderer Process             │
│  ┌─────────────────────────────────┐ │
│  │        index.html               │ │
│  │  - UI Components                │ │
│  │  - User Interactions            │ │
│  │  - Message Generation           │ │
│  └─────────────────────────────────┘ │
└─────────────────────────────────────┘
                │
                ▼
┌─────────────────────────────────────┐
│        External API                 │
│  ┌─────────────────────────────────┐ │
│  │   casaaustin.pe/api/            │ │
│  │   landing-precios.php           │ │
│  └─────────────────────────────────┘ │
└─────────────────────────────────────┘
```

## Patrones de Diseño Implementados

### 1. Patrón MVC (Model-View-Controller)
- **Model**: API de Casa Austin (fuente de datos)
- **View**: HTML/CSS/JavaScript (interfaz de usuario)
- **Controller**: Lógica de negocio en JavaScript

### 2. Patrón Factory para Mensajes
```javascript
// Factory para diferentes estilos de mensaje
function generarMensaje(estilo, datos) {
    switch(estilo) {
        case '1': return generarMensajePremium(datos);
        case '2': return generarMensajeUrgencia(datos);
        case '3': return generarMensajeEmocional(datos);
        case '4': return generarMensajeValor(datos);
        case '5': return generarMensajeSimple(datos);
    }
}
```

### 3. Patrón Strategy para Conversión de Precios
```javascript
// Strategy para diferentes tipos de conversión
const conversionStrategies = {
    usdToSoles: (precio, tipoCambio) => Math.round(precio * tipoCambio),
    aplicarDescuento: (precio, descuento) => precio * (1 - descuento)
};
```

### 4. Patrón Observer para Actualizaciones de UI
```javascript
// Observer pattern para actualizar UI cuando cambian los datos
$('#estiloMensaje').on('change', function() {
    actualizarDescripcionEstilo($(this).val());
});
```

## Patrones de Comunicación

### 1. IPC (Inter-Process Communication)
```javascript
// Main Process
ipcMain.handle('consultar-disponibilidad', async (event, data) => {
    // Lógica de consulta API
});

// Renderer Process
const resultado = await window.electronAPI.consultarDisponibilidad(data);
```

### 2. API Integration Pattern
```javascript
// Patrón para integración con API externa
async function consultarAPI(datos) {
    try {
        const response = await fetch(API_URL, {
            method: 'GET',
            params: { ...datos, _t: Date.now() }
        });
        return await response.json();
    } catch (error) {
        // Manejo de errores
    }
}
```

## Patrones de Datos

### 1. Data Transformation Pipeline
```
API Response → Parse Data → Apply Business Logic → Format for UI → Generate Message
```

### 2. Caching Pattern
```javascript
// Cache simple para evitar consultas repetitivas
const cache = new Map();
const cacheKey = `${fechaInicio}-${fechaFin}-${personas}`;
```

## Patrones de UI/UX

### 1. Responsive Design Pattern
- Bootstrap 4 para grid system
- CSS custom para componentes específicos
- Mobile-first approach

### 2. Progressive Enhancement
- Funcionalidad básica sin JavaScript
- Mejoras progresivas con JavaScript
- Fallbacks para API no disponible

### 3. User Feedback Pattern
```javascript
// Feedback inmediato al usuario
$('#btnConsultar').prop('disabled', true).text('Consultando...');
// ... proceso ...
$('#btnConsultar').prop('disabled', false).text('Consultar');
```

## Patrones de Error Handling

### 1. Graceful Degradation
```javascript
try {
    const resultado = await consultarAPI(datos);
    // Procesar resultado
} catch (error) {
    // Mostrar mensaje de error amigable
    mostrarError('No se pudo conectar con el servidor');
}
```

### 2. Retry Pattern
```javascript
// Reintento automático en caso de fallo
async function consultarConReintento(datos, maxIntentos = 3) {
    for (let i = 0; i < maxIntentos; i++) {
        try {
            return await consultarAPI(datos);
        } catch (error) {
            if (i === maxIntentos - 1) throw error;
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
    }
}
```

## Patrones de Seguridad

### 1. Context Isolation
```javascript
// Electron security best practices
webPreferences: {
    nodeIntegration: false,
    contextIsolation: true,
    preload: path.join(__dirname, 'preload.js')
}
```

### 2. Input Validation
```javascript
// Validación de entrada del usuario
function validarEntrada(datos) {
    if (!datos.fechaInicio || !datos.fechaFin) {
        throw new Error('Fechas requeridas');
    }
    if (datos.personas < 1 || datos.personas > 20) {
        throw new Error('Número de personas inválido');
    }
}
```

## Patrones de Performance

### 1. Lazy Loading
```javascript
// Cargar recursos solo cuando se necesiten
const moment = await import('moment');
```

### 2. Debouncing
```javascript
// Evitar consultas excesivas
let timeoutId;
$('#fechas').on('change', function() {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(consultarDisponibilidad, 500);
});
```

## Patrones de Mantenibilidad

### 1. Separation of Concerns
- HTML: Estructura
- CSS: Presentación
- JavaScript: Lógica de negocio
- API: Datos

### 2. Configuration Pattern
```javascript
// Configuración centralizada
const CONFIG = {
    API_URL: 'https://casaaustin.pe/api/landing-precios.php',
    DEFAULT_TIPO_CAMBIO: 3.6,
    MAX_PERSONAS: 20,
    CACHE_TTL: 300000 // 5 minutos
};
```

### 3. Modular Architecture
- `main.js`: Proceso principal de Electron
- `index.html`: Interfaz de usuario
- `web-version.html`: Versión web alternativa
- `styles/style.css`: Estilos personalizados
- `assets/`: Recursos estáticos
