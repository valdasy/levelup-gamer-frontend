Claro, aquí está tu README actualizado con la sección completa de pruebas unitarias:

---

# LEVEL-UP GAMER

Tienda online de productos gaming desarrollada con React y Bootstrap para la evaluación parcial 2 de Desarrollo FullStack II.

## Descripción del Proyecto

Level-Up Gamer es una aplicación web que permite a los usuarios navegar por un catálogo de productos gaming, agregar productos al carrito de compras, registrarse como usuarios y gestionar su perfil. El proyecto incluye validaciones para usuarios mayores de 18 años y descuentos automáticos del 20% para correos institucionales de DuocUC.

## Características Principales

- Catálogo de productos con filtros por categoría y búsqueda
- Carrito de compras con actualización de cantidades
- Sistema de registro y login de usuarios
- Validación de edad (mayores de 18 años)
- Descuento automático del 20% para correos @duocuc.cl
- Código de referido único por usuario
- Diseño responsivo adaptado a diferentes dispositivos
- Interfaz minimalista con animaciones suaves

## Tecnologías Utilizadas

- React 18
- React Router DOM
- Bootstrap 5
- React-Bootstrap
- CSS3 con diseño responsivo
- Jest y React Testing Library para pruebas unitarias
- Karma y Jasmine para testing de funciones JavaScript

## Requisitos Previos

- Node.js (versión 14 o superior)
- npm (versión 6 o superior)

## Instalación y Ejecución

1. Clonar el repositorio:
```bash
git clone https://github.com/vichinho/levelup-gamer-frontend
cd levelup-gamer-frontend
```

2. Instalar dependencias:
```bash
npm install
```

3. Ejecutar el proyecto en modo desarrollo:
```bash
npm start
```

4. Abrir en el navegador:
```
http://localhost:3000
```

## Pruebas Unitarias

El proyecto cuenta con **35 pruebas unitarias** implementadas utilizando dos frameworks de testing: Jest y Karma/Jasmine.

### Ejecutar Pruebas con Jest

Para ejecutar las pruebas de componentes React con Jest y React Testing Library:

```bash
# Ejecutar tests en modo watch
npm test

# Ejecutar tests con reporte de cobertura
npm run test:coverage
```

**Resultados esperados:**
- ✅ 27 tests ejecutados
- Reporte de cobertura disponible en: `coverage/lcov-report/index.html`

### Ejecutar Pruebas con Karma/Jasmine

Para ejecutar las pruebas de funciones JavaScript con Karma y Jasmine:

```bash
# Ejecutar tests una vez
npm run test:karma:single

# Ejecutar tests en modo watch
npm run test:karma
```

**Resultados esperados:**
- ✅ 8 tests ejecutados
- Reporte de cobertura disponible en: `coverage-karma/html/index.html`

### Visualizar Reportes de Cobertura

Después de ejecutar las pruebas, puedes abrir los reportes HTML en tu navegador:

**Reporte Jest:**
```
coverage/lcov-report/index.html
```

**Reporte Karma:**
```
coverage-karma/html/index.html
```

### Estadísticas de Testing

| Framework | Tests | Archivos | Estado |
|-----------|-------|----------|--------|
| Jest + React Testing Library | 27 | 6 suites | ✅ PASS |
| Karma + Jasmine | 8 | 1 suite | ✅ PASS |
| **TOTAL** | **35** | **7 suites** | ✅ **SUCCESS** |

## Componentes Testeados

### Tests con Jest (React Testing Library)
- **FilterBar**: Validación de búsqueda y filtrado por categorías
- **ProductReview**: Sistema de reseñas y calificaciones de productos
- **RegisterForm**: Validaciones de registro (edad, contraseñas, email)
- **ReferralCode**: Generación y visualización de códigos de referido
- **Validators**: Funciones de validación (email, edad, contraseñas)

### Tests con Karma/Jasmine
- **validators.js**: Pruebas unitarias de funciones de validación
  - validateEmail: Validación de formato de email
  - isOver18: Verificación de edad mínima
  - validatePassword: Validación de longitud de contraseña
  - isDuocEmail: Detección de correos institucionales

## Funcionalidades Implementadas

### Registro de Usuarios

- Validación de email
- Verificación de edad (mayores de 18 años)
- Validación de contraseñas coincidentes
- Generación automática de código de referido

### Gestión del Carrito

- Agregar productos con cantidades personalizadas
- Actualizar cantidades desde el carrito
- Eliminar productos individuales
- Vaciar carrito completo
- Cálculo automático de subtotales y totales
- Aplicación de descuentos según tipo de usuario

### Catálogo de Productos

- Visualización de productos por categorías
- Búsqueda por nombre o descripción
- Filtrado por categoría específica
- Información detallada de cada producto

## Validaciones Implementadas

- Email válido (formato correcto)
- Edad mínima de 18 años
- Contraseña mínima de 6 caracteres
- Confirmación de contraseña
- Detección automática de correos @duocuc.cl para descuentos

## Scripts Disponibles

```bash
# Desarrollo
npm start                    # Inicia el servidor de desarrollo
npm run build               # Genera build de producción

# Testing
npm test                    # Ejecuta tests Jest en modo watch
npm run test:coverage       # Genera reporte de cobertura Jest
npm run test:karma          # Ejecuta tests Karma en modo watch
npm run test:karma:single   # Ejecuta tests Karma una vez

# Otros
npm run eject               # Expone configuración de Create React App
```

## Autor

Desarrollado como proyecto académico para DSY1104 - Desarrollo FullStack II

## Notas Adicionales

Este proyecto fue creado con Create React App y sigue las mejores prácticas de desarrollo frontend moderno. El diseño minimalista utiliza una paleta de colores profesional con fuentes Inter y Poppins para una mejor experiencia de usuario.

