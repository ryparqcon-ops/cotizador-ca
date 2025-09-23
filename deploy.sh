#!/bin/bash

# Script de despliegue para Casa Austin - Consulta de Disponibilidad
echo "🚀 Iniciando despliegue de Casa Austin - Consulta de Disponibilidad"

# Verificar que estamos en el directorio correcto
if [ ! -f "package.json" ]; then
    echo "❌ Error: No se encontró package.json. Asegúrate de estar en el directorio del proyecto."
    exit 1
fi

# Instalar dependencias
echo "📦 Instalando dependencias..."
npm install

# Verificar que los archivos necesarios existen
echo "🔍 Verificando archivos necesarios..."
required_files=("index.html" "web-version.html" "vercel.json" "README.md")
for file in "${required_files[@]}"; do
    if [ ! -f "$file" ]; then
        echo "❌ Error: No se encontró $file"
        exit 1
    fi
done

echo "✅ Todos los archivos necesarios están presentes"

# Crear directorio public si no existe
if [ ! -d "public" ]; then
    echo "📁 Creando directorio public..."
    mkdir public
fi

# Copiar archivos necesarios a public
echo "📋 Copiando archivos a directorio public..."
cp -r assets public/
cp -r styles public/
cp index.html public/

echo "✅ Archivos copiados exitosamente"

# Verificar configuración de Vercel
echo "🔧 Verificando configuración de Vercel..."
if [ -f "vercel.json" ]; then
    echo "✅ vercel.json encontrado"
else
    echo "❌ Error: vercel.json no encontrado"
    exit 1
fi

echo ""
echo "🎉 ¡Despliegue preparado exitosamente!"
echo ""
echo "📋 Próximos pasos:"
echo "1. Sube el proyecto a GitHub"
echo "2. Conecta tu repositorio con Vercel"
echo "3. Despliega automáticamente"
echo ""
echo "🌐 Tu aplicación estará disponible en: https://tu-proyecto.vercel.app"
echo ""
echo "💡 Comandos útiles:"
echo "   npm run dev     - Ejecutar servidor local"
echo "   npm start       - Ejecutar con serve"
echo "   npm run preview - Vista previa"

