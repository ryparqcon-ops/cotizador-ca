# 🏖️ Casa Austin - Consulta de Disponibilidad

Aplicación web para consultar disponibilidad de casas de playa de Casa Austin y generar mensajes personalizados para clientes.

## ✨ Características

- 🔍 **Consulta en tiempo real** de disponibilidad de 4 casas de playa
- 💬 **5 estilos de mensaje** personalizados para diferentes tipos de clientes
- 💱 **Conversión automática** de precios USD a soles
- 📅 **Fechas alternativas** con descuentos especiales
- 📱 **Enlaces directos** para reservas web
- 🎁 **Sistema de descuentos** configurable

## 🚀 Despliegue Rápido

### Opción 1: Vercel (Recomendado)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/tu-usuario/consulta-disponibilidad-final)

### Opción 2: Desarrollo Local
```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/consulta-disponibilidad-final.git
cd consulta-disponibilidad-final

# Instalar dependencias
npm install

# Ejecutar servidor local
npm run dev
```

## 🏗️ Estructura del Proyecto

```
consulta-disponibilidad-final/
├── index.html              # Aplicación principal
├── web-version.html        # Versión web optimizada
├── assets/                 # Recursos estáticos
│   ├── bootstrap.min.css
│   ├── daterangepicker.css
│   ├── jquery-3.5.1.min.js
│   └── moment.min.js
├── styles/
│   └── style.css          # Estilos personalizados
├── package.json           # Configuración del proyecto
├── vercel.json           # Configuración de Vercel
└── README.md             # Este archivo
```

## 🎯 Funcionalidades

### 1. Consulta de Disponibilidad
- Integración con API de Casa Austin
- Verificación en tiempo real de 4 casas
- Manejo de fechas con Moment.js

### 2. Generación de Mensajes
- **Premium**: Enfoque en exclusividad y comodidad
- **Urgencia**: Crea sentido de escasez
- **Emocional**: Conecta con experiencia de playa
- **Valor**: Destaca relación precio-calidad
- **Simple**: Comunicación directa y clara

### 3. Sistema de Precios
- Conversión automática USD → Soles
- Tipo de cambio configurable (default: 3.6)
- Formato profesional de precios

### 4. Fechas Alternativas
- Búsqueda inteligente de fechas cercanas
- Mantiene el mismo número de noches
- Descuentos especiales para fechas alternativas

## 🔧 Configuración

### Variables de Entorno
```javascript
// Configuración por defecto
const tipoCambio = 3.6;           // Tipo de cambio USD a Soles
const numPersonas = 2;            // Número de personas por defecto
const apiEndpoint = 'https://casaaustin.pe/api/landing-precios.php';
```

### Personalización
- Modifica `styles/style.css` para cambiar la apariencia
- Ajusta los mensajes en `index.html` (líneas 239-255)
- Configura el tipo de cambio en la interfaz

## 📱 Uso

1. **Seleccionar fechas** usando el DateRangePicker
2. **Configurar parámetros** (personas, tipo de cambio)
3. **Elegir estilo** de mensaje
4. **Consultar disponibilidad** haciendo clic en "Consultar"
5. **Copiar mensaje** generado para enviar al cliente

## 🌐 API Integration

La aplicación se conecta con:
- **Endpoint**: `https://casaaustin.pe/api/landing-precios.php`
- **Método**: POST
- **Parámetros**: 
  - `start_date`: Fecha de inicio (YYYY-MM-DD)
  - `end_date`: Fecha de fin (YYYY-MM-DD)
  - `num_personas`: Número de personas
  - `tipo_cambio`: Tipo de cambio USD/Soles

## 🎨 Estilos de Mensaje

### 1. Premium
```
🏖️ ¡CONFIRMADO! UNA ESCAPADA PREMIUM TE ESPERA
✨ 0 casas disponibles para quienes valoran comodidad, privacidad y estilo
```

### 2. Urgencia
```
⚡ ¡ÚLTIMAS FECHAS DISPONIBLES!
🔥 Solo quedan pocas opciones para estas fechas
```

### 3. Emocional
```
🌊 ¡Tu escapada perfecta te está esperando!
🏖️ Disfruta del mar y la tranquilidad en nuestras casas exclusivas
```

### 4. Valor
```
💰 ¡Excelente relación precio-calidad!
🏠 Casas independientes con todas las comodidades
```

### 5. Simple
```
📅 Consulta de Disponibilidad
✅ Casas disponibles para las fechas seleccionadas
```

## 🚀 Despliegue en Vercel

1. **Fork** este repositorio
2. **Conecta** tu cuenta de Vercel
3. **Importa** el proyecto
4. **Despliega** automáticamente

### Configuración de Vercel
El archivo `vercel.json` ya está configurado para:
- Servir archivos estáticos
- Redireccionar todas las rutas a `index.html`
- Headers de seguridad
- Optimización de rendimiento

## 🔒 Seguridad

- Headers de seguridad configurados
- Validación de entrada en formularios
- Sanitización de datos de API
- Protección XSS y CSRF

## 📊 Rendimiento

- Carga inicial: < 2 segundos
- Consulta API: < 3 segundos
- Generación de mensaje: < 1 segundo
- Optimizado para móviles

## 🛠️ Tecnologías

- **Frontend**: HTML5, CSS3, JavaScript ES6+
- **Librerías**: jQuery 3.7.1, Bootstrap 4, Moment.js
- **API**: Fetch API, Axios
- **Despliegue**: Vercel
- **Control de Versiones**: Git

## 📝 Changelog

### v1.0.0
- ✅ Consulta de disponibilidad en tiempo real
- ✅ 5 estilos de mensaje personalizados
- ✅ Conversión automática de precios
- ✅ Sistema de fechas alternativas
- ✅ Despliegue web optimizado

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 📞 Soporte

Para soporte técnico o consultas:
- 📧 Email: soporte@casaaustin.pe
- 🌐 Web: https://casaaustin.pe
- 📱 WhatsApp: +51 999 999 999

---

**Desarrollado con ❤️ para Casa Austin**

